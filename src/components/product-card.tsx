"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/use-cart";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { cn } from "@/components/ui/utils";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
}) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  // Default inStock to true if not specified
  const inStock = product.inStock !== false;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white border border-[#332515]/10 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden bg-[#C9DBC3]/10 relative">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <div className="mb-2">
          {product.collection && (
            <span className="text-xs text-[#A0522D] tracking-wide uppercase">
              {product.collection}
            </span>
          )}
          <h4 className="text-[#332515] mt-1 font-['Cormorant'] text-lg font-bold">
            {product.name}
          </h4>
        </div>

        <p className="text-sm text-[#332515]/70 mb-3 line-clamp-2">
          {product.description}
        </p>

        {product.scent && (
          <p className="text-xs text-[#332515]/60 mb-3">
            Scent: {product.scent} {product.size && `• ${product.size}`}
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
          <span className="text-[#A0522D] font-medium">
            R {product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
              inStock
                ? "bg-[#332515] text-[#F8F4E3] hover:bg-[#A0522D]"
                : "bg-[#332515]/20 text-[#332515]/40 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">{inStock ? "Add" : "Sold Out"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
