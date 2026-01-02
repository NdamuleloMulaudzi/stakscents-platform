import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const category = searchParams.get("category");

  let query = supabase.from("products").select("*");

  if (id) {
    query = query.eq("id", id);
  }

  if (category && category !== "all" && category !== "All") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (id && data.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // If ID was requested, return the object directly, not array?
  // Actually standard REST often returns array for collections, but filtering by ID usually returns the item.
  // For simplicity lets return array for now and handle in client, OR simply:
  // if (id) return NextResponse.json(data[0]);
  // But let's stick to array return for filtered lists, and maybe special case id?
  // Let's keep it simple: it returns a list. If filtered by ID, list has 1 item.
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, price, description, image, category, stock } = body;

  const { data, error } = await supabase
    .from("products")
    .insert([{ name, price, description, image, category, stock }])
    .select();

  if (error) {
    console.error("Supabase Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0], { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Product deleted" });
}
