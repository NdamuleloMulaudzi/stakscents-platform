import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  // Placeholder for order creation in DB/Sanity
  return NextResponse.json({ message: "Order created", id: "ORDER-123" });
}
