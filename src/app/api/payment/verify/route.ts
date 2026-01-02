import { NextResponse } from "next/server";
import { paystack } from "@/lib/paystack";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      { message: "Reference is required" },
      { status: 400 }
    );
  }

  try {
    // 1. Verify transaction with Paystack
    const verification = await paystack.verifyTransaction(reference);

    if (!verification.status || verification.data.status !== "success") {
      return NextResponse.json(
        { message: "Payment verification failed" },
        { status: 400 }
      );
    }

    // 2. Update order in Supabase
    // We need to find the order with this reference (which we stored as ID)
    const orderId = reference;
    // Note: In checkout/route.ts we set id = reference.

    const { error } = await supabase
      .from("orders")
      .update({ status: "paid" })
      .eq("id", orderId);

    if (error) {
      console.error("Database update error:", error);
      return NextResponse.json(
        { message: "Payment successful but order update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Order verified and updated",
      orderId: orderId,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
