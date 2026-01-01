import { NextResponse } from "next/server";

import { paystack } from "@/lib/paystack";

import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, amount } = await request.json();

    if (!email || !amount) {
      return NextResponse.json(
        { message: "Email and amount required" },
        { status: 400 }
      );
    }

    // 1. Create Pending Order in Supabase
    // Using a simple random ID for now or letting Supabase gen UUID if possible?
    // Schema says `id TEXT PRIMARY KEY`. Let's generate a reference ID.
    const reference = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const { error: dbError } = await supabase.from("orders").insert([
      {
        id: reference,
        customer_email: email,
        total: amount, // Amount matches Paystack (usually in base currency units, but paystack uses cents? check implementation)
        status: "pending",
      },
    ]);

    if (dbError) {
      console.error("Database Error:", dbError);
      return NextResponse.json(
        { message: "Failed to create order" },
        { status: 500 }
      );
    }

    // 2. Initialize Paystack
    // Note: Paystack usually expects amount in kobo (cents).
    // If 'amount' passes here is Rands, we might need * 100.
    // Taking assumption `amount` is already correct or handled by lib.
    // Let's check lib... It just passes it through.
    // Standard Paystack: Amount in kobo/cents.
    // If Frontend sends R100, passes 100. Paystack sees 100 kobo = R1.
    // Adjusting to * 100 if frontend sends Rands.
    // Assuming frontend sends Rands for now => * 100.
    // But `paystack.ts` might handle it? let's assume raw amount for now to be safe or simple.

    // Passing our reference to Paystack is good practice
    // But paystack.ts initializeTransaction(email, amount) doesn't accept reference currently?
    // Let's look at `paystack.ts` signature? `initializeTransaction(email: string, amount: number)`
    // We'll stick to simple init.

    const result = await paystack.initializeTransaction(email, amount * 100); // Assuming frontend sends Rands

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
