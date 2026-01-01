import { NextResponse } from "next/server";

import { paystack } from "@/lib/paystack";

import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const {
      email,
      amount,
      firstName,
      lastName,
      address,
      city,
      province,
      postalCode,
      phone,
      items,
    } = await request.json();

    if (!email || !amount) {
      return NextResponse.json(
        { message: "Email and amount required" },
        { status: 400 }
      );
    }

    // 1. Create Pending Order in Supabase
    const reference = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const customer_name = `${firstName || ""} ${lastName || ""}`.trim();
    const shipping_details = {
      firstName,
      lastName,
      address,
      city,
      province,
      postalCode,
      phone,
    };

    // Insert Order
    const { error: dbError } = await supabase.from("orders").insert([
      {
        id: reference,
        customer_email: email,
        customer_name: customer_name,
        shipping_details: shipping_details,
        total: amount,
        status: "pending",
      },
    ]);

    if (dbError) {
      console.error("Database Error (Order):", dbError);
      return NextResponse.json(
        { message: "Failed to create order" },
        { status: 500 }
      );
    }

    // Insert Order Items
    if (items && Array.isArray(items)) {
      const orderItems = items.map((item: any) => ({
        order_id: reference,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        console.error("Database Error (Items):", itemsError);
        // We continue even if items fail, but log it. Ideally we should rollback or alert.
      }
    }

    // 2. Initialize Paystack
    const result = await paystack.initializeTransaction(email, amount * 100);

    if (result.status) {
      return NextResponse.json({
        authorization_url: result.data.authorization_url,
        reference: result.data.reference,
        orderId: reference,
      });
    } else {
      return NextResponse.json(
        { message: "Payment initialization failed" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
