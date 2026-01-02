"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/product";
import { Loader2 } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = [
    { label: "All", value: "All" },
    { label: "Candles", value: "candle" },
    { label: "Reed Diffusers", value: "diffuser" },
    { label: "Room & Linen Mists", value: "mist" },
    { label: "Bath Salts", value: "bath-salt" },
    { label: "Raw Materials", value: "raw-material" },
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[#332515] mb-4 font-cormorant text-5xl">
            Our Collection
          </h2>
          <p className="text-[#332515]/70 max-w-2xl mx-auto">
            Explore our range of natural home fragrances, from hand-poured
            candles to luxurious reed diffusers
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category.value
                  ? "bg-[#332515] text-[#F8F4E3]"
                  : "bg-white border border-[#332515]/20 text-[#332515] hover:border-[#332515]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#332515]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#332515]/60">
              No products found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
