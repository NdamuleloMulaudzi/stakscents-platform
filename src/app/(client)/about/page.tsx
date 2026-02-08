import { ImageWithFallback } from "@/components/shared/ui/image-with-fallback";
import { Leaf, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1674812709785-9497062872d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5kbGUlMjBtYWtpbmclMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxMjE1NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Stalkscents workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/50 to-primary/30" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl text-primary-foreground">
            <h1 className="font-['Cormorant'] text-4xl md:text-6xl mb-4">
              Our Story
            </h1>
            <p className="text-lg md:text-xl opacity-95">
              A journey of passion, craftsmanship, and natural beauty
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden h-[500px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1612446921414-96b306d59c1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5kbGUlMjBtYWtpbmclMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjM5MTE3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Retang Phaahla"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-[#332515] text-[1.9rem]">Meet Retang Phaahla</h2>
              <div className="space-y-6 text-[#332515]/80 text-[1.1rem]">
                <p>
                  Stalkscents was born from a deep passion for natural living
                  and the transformative power of fragrance. Founded by Retang
                  Phaahla, our journey began with a simple belief: that our
                  homes should be filled with scents that not only smell
                  beautiful but are also good for us and our planet.
                </p>
                <p>
                  Growing up surrounded by the earthy aromas of nature, Retang
                  developed an appreciation for the subtle ways scent can
                  influence our mood, energy, and well-being. This led to years
                  of studying aromatherapy, natural ingredients, and sustainable
                  practices.
                </p>
                <p>
                  Every Stalkscents product is hand-crafted in small batches,
                  using only the finest natural ingredients. We believe in
                  transparency, quality, and the art of slow, intentional
                  creation. Our mission is to bring the healing power of nature
                  into your home, one fragrance at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-[#C9DBC3]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#332515] text-center mb-12">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C9DBC3]/30 rounded-full mb-6">
                <Leaf className="w-8 h-8 text-[#332515]" />
              </div>
              <h3 className="text-[#332515] mb-4">Natural Ingredients</h3>
              <p className="text-[#332515]/70">
                We use only 100% natural, sustainably sourced ingredients in all
                our products. No synthetics, no compromises.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#A0522D]/20 rounded-full mb-6">
                <Heart className="w-8 h-8 text-[#A0522D]" />
              </div>
              <h3 className="text-[#332515] mb-4">Hand-Crafted</h3>
              <p className="text-[#332515]/70">
                Each product is lovingly made by hand in small batches, ensuring
                the highest quality and attention to detail.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C9DBC3]/30 rounded-full mb-6">
                <Sparkles className="w-8 h-8 text-[#332515]" />
              </div>
              <h3 className="text-[#332515] mb-4">Mindful Living</h3>
              <p className="text-[#332515]/70">
                We believe in creating products that enhance your well-being and
                support a more intentional, peaceful lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[#332515] mb-6">Join Our Community</h2>
          <p className="text-[#332515]/80 mb-8">
            We're more than just a fragrance brand. We're a community of people
            who appreciate the beauty of natural living and want to share that
            with others. Through our masterclasses and reseller program, we
            empower others to create and share the joy of natural fragrances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-[#332515] text-[#F8F4E3] rounded-full hover:bg-[#A0522D] transition-colors">
              Learn with Us
            </button>
            <button className="px-8 py-3 border border-[#332515] text-[#332515] rounded-full hover:bg-[#332515] hover:text-[#F8F4E3] transition-colors">
              Become a Reseller
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
