import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let query = supabase
    .from("orders")
    .select("*, order_items(*)") // Enable joining
    .order("created_at", { ascending: false });

  if (id) {
    query = query.eq("id", id);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { id, customer_email, total, status } = body;

  const { data, error } = await supabase
    .from("orders")
    .insert([{ id, customer_email, total, status }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0], { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, status } = body;

  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0]);
}
