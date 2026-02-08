import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-['Cormorant'] text-2xl mb-4">STALKSCENTS</h3>
            <p className="text-sm opacity-90">
              Crafting luxury home fragrances inspired by nature's essence.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-['Cormorant'] mb-4">Shop</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link
                  href="/products?category=all"
                  className="hover:opacity-100 transition-opacity"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=candle"
                  className="hover:opacity-100 transition-opacity"
                >
                  Candles
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=diffuser"
                  className="hover:opacity-100 transition-opacity"
                >
                  Diffusers
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=mist"
                  className="hover:opacity-100 transition-opacity"
                >
                  Room Mists
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-['Cormorant'] mb-4">Information</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link
                  href="/about"
                  className="hover:opacity-100 transition-opacity"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/masterclasses"
                  className="hover:opacity-100 transition-opacity"
                >
                  Masterclasses
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:opacity-100 transition-opacity">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:opacity-100 transition-opacity">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Cormorant'] mb-4">Contact</h4>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a
                  href="mailto:hello@stalkscents.com"
                  className="hover:opacity-100 transition-opacity"
                >
                  hello@stalkscents.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a
                  href="tel:+27123456789"
                  className="hover:opacity-100 transition-opacity"
                >
                  +27 12 345 6789
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Johannesburg, South Africa</span>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="font-['Cormorant'] mb-3">Follow Us</h5>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/stalkscents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} Stalkscents. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
