"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { Loader2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;
      try {
        const res = await fetch(`/api/products?id=${productId}`);
        if (res.ok) {
          const data = await res.json();
          // API returns array if using query builder as written?
          // My API update returns array. So taking first item.
          if (Array.isArray(data) && data.length > 0) {
            setProduct(data[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#332515]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <h1 className="font-cormorant text-4xl mb-4">Product Not Found</h1>
        <p className="text-muted-foreground">
          The product you're looking for doesn't exist.
        </p>
        <Button asChild className="mt-6">
          <a href="/shop">Browse All Products</a>
        </Button>
      </div>
    );
  }

  // Handle multiple images (simulated for now since data only has one)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
    toast.success(`Added ${quantity} ${product.name} to cart!`);
  };

  // Default details
  const displayDetails = {
    description:
      product.description ||
      `Experience the luxurious aroma of ${product.name}. Handcrafted with natural ingredients to bring a touch of elegance to your space.`,
    scentNotes: {
      top: "Fresh, natural notes",
      heart: "Balanced aromatic blend",
      base: "Warm, lasting fragrance",
    },
    ingredients: "100% natural ingredients, handcrafted with care.",
    details: [
      "Hand-poured in South Africa",
      "Natural, sustainable materials",
      "Premium quality guaranteed",
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div>
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-card">
            <ImageWithFallback
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-md bg-card border-2 transition-all ${
                  selectedImage === index
                    ? "border-[#A0522D]"
                    : "border-transparent hover:border-border"
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:pt-8">
          <h1 className="font-cormorant text-4xl md:text-5xl mb-4 text-[#332515]">
            {product.name}
          </h1>

          <p className="text-2xl mb-2 text-[#A0522D]">
            R {product.price.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground mb-6 capitalize">
            {product.category}
          </p>

          <div className="space-y-6 mb-8 text-[#332515]/80">
            <div>
              <h3 className="font-cormorant text-xl text-[#332515] mb-3">
                Description
              </h3>
              <p className="leading-relaxed">{displayDetails.description}</p>
            </div>

            <div>
              <h3 className="font-cormorant text-xl text-[#332515] mb-3">
                Scent Notes
              </h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-[#332515] font-medium">Top:</span>{" "}
                  {displayDetails.scentNotes.top}
                </li>
                <li>
                  <span className="text-[#332515] font-medium">Heart:</span>{" "}
                  {displayDetails.scentNotes.heart}
                </li>
                <li>
                  <span className="text-[#332515] font-medium">Base:</span>{" "}
                  {displayDetails.scentNotes.base}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-cormorant text-xl text-[#332515] mb-3">
                Ingredients
              </h3>
              <p className="leading-relaxed">{displayDetails.ingredients}</p>
            </div>

            <div>
              <h3 className="font-cormorant text-xl text-[#332515] mb-3">
                Details
              </h3>
              <ul className="space-y-2">
                {displayDetails.details.map((detail, index) => (
                  <li key={index}>• {detail}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4 pt-6 border-t border-border">
            <div>
              <label className="block mb-2 text-[#332515] font-medium">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-border rounded-full overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-muted transition-colors text-[#332515]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 text-center border-0 rounded-none focus-visible:ring-0 bg-transparent font-medium"
                    min="1"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-muted transition-colors text-[#332515]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-[#332515] hover:bg-[#A0522D] text-[#F8F4E3] h-12 rounded-full text-lg"
              size="lg"
            >
              <ShoppingCart className="mr-2 w-5 h-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-16 pt-16 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h4 className="font-cormorant text-xl mb-2 text-[#332515]">
              Natural Ingredients
            </h4>
            <p className="text-muted-foreground text-sm">
              Crafted with 100% natural ingredients and premium essential oils
            </p>
          </div>
          <div className="text-center">
            <h4 className="font-cormorant text-xl mb-2 text-[#332515]">
              Hand-Crafted
            </h4>
            <p className="text-muted-foreground text-sm">
              Each product is lovingly hand-made in small batches
            </p>
          </div>
          <div className="text-center">
            <h4 className="font-cormorant text-xl mb-2 text-[#332515]">
              Eco-Friendly
            </h4>
            <p className="text-muted-foreground text-sm">
              Sustainable packaging and recyclable materials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
