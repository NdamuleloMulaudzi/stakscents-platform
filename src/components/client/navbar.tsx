"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, Search, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { Badge } from "@/components/shared/ui/badge";

import { Cart } from "@/components/client/cart-drawer";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { getCartCount } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // Hide Navbar on Admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartCount = getCartCount();

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Shop",
      href: "/shop",
      hasDropdown: true,
      subItems: [
        { name: "All Products", category: "all", href: "/shop" },
        {
          name: "Candles",
          category: "candle",
          href: "/shop?category=candle",
        },
        {
          name: "Diffusers",
          category: "diffuser",
          href: "/shop?category=diffuser",
        },
        { name: "Mists", category: "mist", href: "/shop?category=mist" },
      ],
    },
    { name: "About", href: "/about" },
    { name: "Masterclasses", href: "/masterclasses" },
    { name: "Reseller", href: "/reseller" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <span className="font-['Cormorant'] text-2xl md:text-3xl tracking-wide">
                STALKSCENTS
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setShopDropdownOpen(true)}
                    onMouseLeave={() => setShopDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-1 transition-colors hover:text-accent ${
                        pathname.startsWith(item.href) ? "text-accent" : ""
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Link>
                    {shopDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg py-2">
                        {item.subItems?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => {
                              setShopDropdownOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-muted transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`transition-colors hover:text-accent ${
                      pathname === item.href ? "text-accent" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>

            {/* Cart & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCartOpen(true)}
                className="p-2 hover:text-accent transition-colors relative"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {isMounted && cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
              </button>

              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => {
                        if (!item.hasDropdown) {
                          setMobileMenuOpen(false);
                        }
                      }}
                      className={`block text-left py-2 transition-colors hover:text-accent ${
                        pathname === item.href ? "text-accent" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.hasDropdown && item.subItems && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                            }}
                            className="block text-left py-1 text-sm text-muted-foreground hover:text-accent transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
