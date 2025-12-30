"use client";

import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InstagramFeed() {
  // Mock Instagram feed - in production, these would be provided by the client
  const instagramPosts = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1617351166759-427aff10882e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYW5kbGUlMjBob21lfGVufDF8fHx8MTc2MTIxNTYyMXww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Luxury candle in home setting",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1651204790676-c86edd9accd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwY2FuZGxlcyUyMHN0eWxlZHxlbnwxfHx8fDE3NjEyMTU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Natural candles styled",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1617597190828-1bf579d485ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaG9tZSUyMGRlY29yfGVufDF8fHx8MTc2MTIxNTM3MHww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Minimalist home decor",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1607713109008-d00372938c2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBsaWZlc3R5bGUlMjBjYW5kbGVzfGVufDF8fHx8MTc2MTIxNTYyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Spa lifestyle candles",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1605191353027-d21e534a419a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwaG9tZSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTIwNDcyNXww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Cozy home interior",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1758467033035-48b65a1c7f10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBob21lJTIwc3R5bGluZ3xlbnwxfHx8fDE3NjEyMTU2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Botanical home styling",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-['Cormorant'] text-3xl md:text-5xl mb-4">
            Follow Our Journey
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our community on Instagram for daily inspiration,
            behind-the-scenes moments, and styling tips
          </p>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() =>
              window.open("https://instagram.com/stalkscents", "_blank")
            }
          >
            <Instagram className="w-4 h-4" />
            @stalkscents
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/stalkscents"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer"
            >
              <ImageWithFallback
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
