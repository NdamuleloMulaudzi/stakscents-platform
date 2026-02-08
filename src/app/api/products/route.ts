import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const category = searchParams.get("category");

  // Join with product_images
  let query = supabase.from("products").select("*, product_images(image)");

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

  // Transform data to include images array
  const productsWithImages = data.map((product: any) => ({
    ...product,
    images: product.product_images
      ? product.product_images.map((img: any) => img.image)
      : [],
  }));

  if (id && productsWithImages.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(productsWithImages);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, description, image, category, stock, images } = body;

    // Price is expected in Rands from frontend, convert to Cents for storage
    const priceInCents = Math.round(parseFloat(price) * 100);

    const { data: productData, error: productError } = await supabase
      .from("products")
      .insert([
        {
          name,
          price: priceInCents,
          description,
          image, // Main image
          category,
          stock: parseInt(stock) || 0,
        },
      ])
      .select();

    if (productError) {
      console.error("Supabase Error (Product):", productError);
      return NextResponse.json(
        { error: productError.message },
        { status: 500 },
      );
    }

    const newProduct = productData[0];

    // Insert gallery images if present
    if (images && Array.isArray(images) && images.length > 0) {
      const imagesToInsert = images.map((imgUrl: string, index: number) => ({
        product_id: newProduct.id,
        image: imgUrl,
        display_order: index,
      }));

      const { error: imagesError } = await supabase
        .from("product_images")
        .insert(imagesToInsert);

      if (imagesError) {
        console.error("Supabase Error (Images):", imagesError);
        // Continue but log error, product is created.
      }
    }

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    console.error("Error creating product:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Product deleted" });
}
