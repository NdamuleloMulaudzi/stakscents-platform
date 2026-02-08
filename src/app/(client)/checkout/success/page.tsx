"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { useCart } from "@/hooks/use-cart";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");
  const { clearCart } = useCart();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!reference) {
      setStatus("error");
      return;
    }

    async function verify() {
      try {
        const res = await fetch(`/api/payment/verify?reference=${reference}`);
        const data = await res.json();

        if (res.ok && data.status === "success") {
          setStatus("success");
          clearCart();
        } else {
          setStatus("error");
        }
      } catch (e) {
        setStatus("error");
      }
    }

    verify();
  }, [reference, clearCart]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-[#332515]" />
        <h2 className="text-xl font-cormorant text-[#332515]">
          Verifying your payment...
        </h2>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="text-3xl font-cormorant font-bold text-[#332515]">
          Payment Verification Failed
        </h1>
        <p className="text-[#332515]/70 max-w-md">
          We couldn't verify your payment. If you have been charged, please
          contact support with reference: {reference}
        </p>
        <Button onClick={() => router.push("/checkout")} variant="outline">
          Return to Checkout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center px-4">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600">
        <CheckCircle className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-cormorant font-bold text-[#332515]">
        Payment Successful!
      </h1>
      <p className="text-[#332515]/70 max-w-md">
        Thank you for your order. We have received your payment and will process
        your order shortly.
      </p>
      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm">
          Order Reference:{" "}
          <span className="font-mono font-bold">{reference}</span>
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => router.push("/shop")}
          className="bg-[#332515] text-[#F8F4E3]"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
