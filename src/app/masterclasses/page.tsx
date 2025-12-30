import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import {
  Calendar,
  Clock,
  Users,
  Video,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

export default function MasterclassesPage() {
  const masterclasses = [
    {
      id: 1,
      title: "Beginner Candle Making",
      duration: "2 hours",
      capacity: "20 people",
      price: "450",
      description:
        "Learn the fundamentals of candle making, from selecting wax to creating your first scented candle.",
      image:
        "https://images.unsplash.com/photo-1674812709785-9497062872d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5kbGUlMjBtYWtpbmclMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxMjE1NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      topics: [
        "Understanding wax types",
        "Wick selection",
        "Fragrance blending basics",
        "Pouring techniques",
      ],
    },
    {
      id: 2,
      title: "Advanced Scent Blending",
      duration: "3 hours",
      capacity: "15 people",
      price: "650",
      description:
        "Master the art of creating complex fragrance profiles and develop your signature scent.",
      image:
        "https://images.unsplash.com/photo-1607713109008-d00372938c2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBsaWZlc3R5bGUlMjBjYW5kbGVzfGVufDF8fHx8MTc2MTIxNTYyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      topics: [
        "Fragrance families",
        "Top, middle, and base notes",
        "Creating custom accords",
        "Testing throw",
      ],
    },
  ];

  const benefits = [
    "Learn from experienced artisan Retang Phaahla",
    "Hands-on guidance via live video sessions",
    "All materials list provided in advance",
    "Create your own candles during class",
    "Certificate of completion",
    "Lifetime access to class recordings",
    "Join our private community of makers",
    "Exclusive discount on Stalkscents products",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[65vh] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1674812709785-9497062872d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5kbGUlMjBtYWtpbmclMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxMjE1NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Candle making masterclass"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/60 to-primary/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl text-primary-foreground">
            <h1 className="font-cormorant text-4xl md:text-6xl mb-6">
              Online Masterclasses
            </h1>
            <p className="text-lg md:text-xl opacity-95">
              Learn the ancient art of candle making from the comfort of your
              home
            </p>
          </div>
        </div>
      </section>

      {/* Masterclasses */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {masterclasses.map((masterclass, index) => (
            <div
              key={masterclass.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              <div
                className={`rounded-2xl overflow-hidden h-[400px] ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <ImageWithFallback
                  src={masterclass.image}
                  alt={masterclass.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className={
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }
              >
                <h3 className="font-cormorant text-[#332515] mb-4">
                  {masterclass.title}
                </h3>
                <p className="text-[#332515]/80 mb-6">
                  {masterclass.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-[#332515]/70">
                    <Clock className="w-5 h-5" />
                    <span>{masterclass.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#332515]/70">
                    <Users className="w-5 h-5" />
                    <span>Max {masterclass.capacity}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-cormorant text-[#332515] mb-3">
                    What You'll Learn:
                  </h4>
                  <ul className="space-y-2">
                    {masterclass.topics.map((topic, idx) => (
                      <li
                        key={idx}
                        className="flex items-start space-x-2 text-[#332515]/70"
                      >
                        <span className="text-[#A0522D] mt-1">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl text-[#A0522D]">
                    R {masterclass.price}
                  </span>
                  <button className="inline-flex h-10 items-center justify-center rounded-full bg-[#332515] px-6 py-3 text-sm font-medium text-[#F8F4E3] transition-colors hover:bg-[#A0522D] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    <a
                      href="https://www.quicket.co.za"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center rounded-full bg-[#332515] px-6 py-3 text-sm font-medium text-[#F8F4E3] transition-colors hover:bg-[#A0522D] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      <span>Book on Quicket</span>
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4 bg-[#C9DBC3]/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-cormorant text-[#332515] text-center mb-12">
            What's Included
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-cormorant text-[#332515] mb-3">
                All Materials Provided
              </h4>
              <p className="text-[#332515]/70">
                Everything you need including wax, oils, wicks, containers, and
                packaging materials.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-cormorant text-[#332515] mb-3">
                Take Home Your Creations
              </h4>
              <p className="text-[#332515]/70">
                Leave with finished products to enjoy or gift, plus extra
                supplies to practice at home.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-cormorant text-[#332515] mb-3">
                Recipe Guides
              </h4>
              <p className="text-[#332515]/70">
                Detailed recipes and formulations to recreate products at home
                or start your business.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-cormorant text-[#332515] mb-3">
                Expert Instruction
              </h4>
              <p className="text-[#332515]/70">
                Learn from Retang Phaahla, with years of experience in natural
                fragrance creation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-linear-to-br from-[#C9DBC3]/30 to-[#A0522D]/20 rounded-2xl p-12">
          <h2 className="font-cormorant text-[#332515] mb-4">
            Ready to Start Creating?
          </h2>
          <p className="text-[#332515]/80 mb-8 max-w-2xl mx-auto">
            Join our next masterclass and discover the joy of creating natural
            fragrances. Perfect for personal enjoyment or starting your own
            fragrance business.
          </p>
          <button className="inline-flex h-11 items-center justify-center rounded-full bg-[#332515] px-8 py-6 text-base font-medium text-[#F8F4E3] transition-colors hover:bg-[#A0522D] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            <a
            href="https://www.quicket.co.za"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#332515] px-8 py-6 text-base font-medium text-[#F8F4E3] transition-colors hover:bg-[#A0522D] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <span>View Available Dates</span>
            <ExternalLink className="w-5 h-5 ml-2" />
          </a>
          </button>
        </div>
      </section>
    </div>
  );
}
