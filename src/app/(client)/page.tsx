import { ProductCard } from "@/components/client/product-card";
import Link from "next/link";
import { ImageWithFallback } from "@/components/shared/ui/image-with-fallback";
import { Button } from "@/components/shared/ui/button";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { InstagramFeed } from "@/components/client/instagram-feed";

export default function Home() {
  // Get best sellers (first 4 candles)
  const bestSellers = products
    .filter((p) => p.category === "candle")
    .slice(0, 4);

  const lifestyleImages = [
    "https://images.unsplash.com/photo-1617597190828-1bf579d485ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaG9tZSUyMGRlY29yfGVufDF8fHx8MTc2MTIxNTM3MHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1605191353027-d21e534a419a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwaG9tZSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTIwNDcyNXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1758467033035-48b65a1c7f10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBob21lJTIwc3R5bGluZ3xlbnwxfHx8fDE3NjEyMTU2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1617351166759-427aff10882e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYW5kbGUlMjBob21lfGVufDF8fHx8MTc2MTIxNTYyMXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Luxury candles"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/20" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl text-primary-foreground">
            <h1 className="font-['Cormorant'] text-4xl md:text-6xl lg:text-7xl mb-6">
              Nature's Essence,
              <br />
              Crafted with Care
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-95">
              Discover our collection of handcrafted home fragrances inspired by
              the earth
            </p>
            <Link href="/products">
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                size="lg"
              >
                Explore Collection <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-['Cormorant'] text-3xl md:text-5xl mb-4">
            Best Sellers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most loved scents, handcrafted with natural ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products?category=all">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Lifestyle Grid Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Cormorant'] text-3xl md:text-5xl mb-4">
              Elevate Your Space
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform your home into a sanctuary of calm with our curated
              fragrances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {lifestyleImages.map((image, index) => (
              <div
                key={index}
                className="aspect-[4/5] overflow-hidden rounded-sm relative"
              >
                <ImageWithFallback
                  src={image}
                  alt={`Lifestyle ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Masterclass CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="relative overflow-hidden rounded-lg h-[400px] md:h-[500px]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1674812709785-9497062872d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5kbGUlMjBtYWtpbmclMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxMjE1NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Candle making masterclass"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/60" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="max-w-2xl text-primary-foreground">
              <h2 className="font-['Cormorant'] text-3xl md:text-5xl mb-6">
                Learn the Art of Candle Making
              </h2>
              <p className="text-lg mb-8 opacity-95">
                Join our online masterclasses and discover the secrets to
                creating your own luxury home fragrances
              </p>
              <Link href="/masterclasses">
                <Button
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  size="lg"
                >
                  Book a Masterclass
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
