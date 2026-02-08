"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";
import { Separator } from "@/components/shared/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { ImageWithFallback } from "@/components/shared/ui/image-with-fallback";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  // Alias items to cart for compatibility with user logic
  const cart = items;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;

    // Extract everything
    const payload = {
      email,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      address: formData.get("address"),
      city: formData.get("city"),
      province: formData.get("province"),
      postalCode: formData.get("postalCode"),
      phone: formData.get("phone"),
      amount: total,
      items: cart, // Send cart items
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.authorization_url) {
        // Redirect to Paystack
        toast.info("Redirecting to payment...");
        window.location.href = data.authorization_url;
      } else {
        toast.error(data.message || "Payment initialization failed");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <h1 className="font-cormorant text-4xl mb-4 text-[#332515]">
          Your Cart is Empty
        </h1>
        <p className="text-[#332515]/60 mb-8">
          Add some products before checking out
        </p>
        <Button onClick={() => router.push("/products")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal >= 500 ? 0 : 75;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-cormorant text-4xl md:text-5xl mb-8 text-[#332515]">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-card p-6 rounded-lg border border-[#332515]/10">
              <h2 className="font-cormorant text-2xl mb-6 text-[#332515]">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-card p-6 rounded-lg border border-[#332515]/10">
              <h2 className="font-cormorant text-2xl mb-6 text-[#332515]">
                Shipping Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" required />
                  </div>
                  <div>
                    <Label htmlFor="province">Province</Label>
                    <Input id="province" name="province" required />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" name="postalCode" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-card p-6 rounded-lg border border-[#332515]/10">
              <h2 className="font-cormorant text-2xl mb-6 text-[#332515]">
                Payment Information
              </h2>
              <div className="bg-muted/50 p-4 rounded text-sm text-muted-foreground">
                <p>
                  You will be redirected to Paystack to complete your secure
                  payment.
                </p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#332515] hover:bg-[#A0522D] text-[#F8F4E3]"
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order & Pay"}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-lg border border-[#332515]/10 sticky top-24">
            <h2 className="font-cormorant text-2xl mb-6 text-[#332515]">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 shrink-0 rounded overflow-hidden bg-muted">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-cormorant truncate text-[#332515] font-bold">
                      {item.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#A0522D]">
                      R {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4 bg-[#332515]/10" />

            <div className="space-y-2 text-sm text-[#332515]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `R ${shipping.toFixed(2)}`}
                </span>
              </div>
              {subtotal >= 500 && (
                <p className="text-xs text-[#A0522D]">
                  Free shipping on orders over R500!
                </p>
              )}
            </div>

            <Separator className="my-4 bg-[#332515]/10" />

            <div className="flex justify-between font-cormorant text-xl font-bold text-[#332515]">
              <span>Total</span>
              <span>R {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
