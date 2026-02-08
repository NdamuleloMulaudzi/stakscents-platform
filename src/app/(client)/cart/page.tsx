// currently unused import removed to fix build
// Currently using the Drawer, but this page exists for structure.
// We can redirect to /checkout or just render a simple cart view.
// For now, let's just render the text "Cart" or similar, or redirect.

import Link from "next/link";
import { Button } from "@/components/shared/ui/button";

export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h1 className="font-cormorant text-4xl mb-4 text-[#332515]">
        Shopping Cart
      </h1>
      <p className="text-[#332515]/60 mb-8">
        Please use the cart drawer to manage your items.
      </p>
      <Button asChild className="bg-[#332515] text-[#F8F4E3]">
        <Link href="/shop">Continue Shopping</Link>
      </Button>
    </div>
  );
}
