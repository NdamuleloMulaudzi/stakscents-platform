"use client";

import { useCart } from "@/hooks/use-cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Minus, Plus, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getCartTotal } = useCart();

  const handleCheckout = () => {
    // Placeholder for checkout logic
    toast.info("Checkout functionality coming soon!");
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-[#F8F4E3]">
        <SheetHeader>
          <SheetTitle className="font-cormorant text-2xl text-[#332515]">
            Shopping Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={onClose} variant="outline">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-220px)] mt-6">
              <div className="space-y-4 pr-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white rounded-lg border border-[#332515]/10"
                  >
                    <div className="w-20 h-20 shrink-0 rounded overflow-hidden bg-card">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-cormorant truncate pr-2 text-[#332515] text-lg font-bold">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#A0522D] hover:text-[#332515] transition-colors shrink-0"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-sm text-[#A0522D] mb-2 font-medium">
                        R {item.price.toFixed(2)}
                      </p>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-[#C9DBC3]/20 rounded transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3 text-[#332515]" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-[#332515]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-[#C9DBC3]/20 rounded transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3 text-[#332515]" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex flex-col justify-end">
                      <p className="font-cormorant text-lg font-bold text-[#332515]">
                        R {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="border-t pt-4 mt-4">
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-cormorant text-xl text-[#332515]">
                    Total:
                  </span>
                  <span className="font-cormorant text-2xl text-[#A0522D] font-bold">
                    R {getCartTotal().toFixed(2)}
                  </span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-[#332515] hover:bg-[#A0522D] text-[#F8F4E3]"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                <Button onClick={onClose} variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
