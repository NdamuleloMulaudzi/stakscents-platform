"use client";

import React from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { useRouter } from "next/navigation";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } =
    useCart();

  // Map items to cart for compatibility with user snippet variable names if needed,
  // but let's just use 'items' directly or alias it.
  const cart = items;
  // Also need to check if removeFromCart exists or if it's removeItem. useCart has removeItem.
  const removeFromCart = removeItem;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[#332515]/50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#F8F4E3] z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#332515]/10">
          <h3 className="text-[#332515] font-cormorant text-2xl font-bold">
            Shopping Cart
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#C9DBC3]/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-[#332515]" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#332515]/60">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-white rounded-lg border border-[#332515]/10"
                >
                  <div className="w-20 h-20 shrink-0 rounded overflow-hidden bg-[#C9DBC3]/10">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#332515] text-base mb-1 truncate font-cormorant font-bold">
                      {item.name}
                    </h4>
                    <p className="text-sm text-[#A0522D] mb-2">
                      R{item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-[#C9DBC3]/20 rounded transition-colors"
                      >
                        <Minus className="w-4 h-4 text-[#332515]" />
                      </button>
                      <span className="text-sm text-[#332515] min-w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-[#C9DBC3]/20 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4 text-[#332515]" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-[#A0522D]/10 rounded transition-colors self-start"
                  >
                    <Trash2 className="w-5 h-5 text-[#A0522D]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-[#332515]/10 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#332515] font-cormorant text-xl">
                Total:
              </span>
              <span className="text-[#A0522D] font-cormorant text-2xl font-bold">
                R{getCartTotal().toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                router.push("/checkout");
              }}
              className="w-full bg-[#332515] text-[#F8F4E3] py-3 rounded-full hover:bg-[#A0522D] transition-colors font-medium"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={clearCart}
              className="w-full text-[#332515] py-2 hover:text-[#A0522D] transition-colors text-sm"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};
