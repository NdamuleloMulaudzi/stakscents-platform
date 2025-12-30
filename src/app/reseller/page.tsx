"use client";

import { useState } from "react";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Truck, TrendingUp, Award } from "lucide-react";

export default function ResellerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Application submitted! We will contact you soon.");
    }, 1500);
  };

  const benefits = [
    {
      title: "Premium Quality",
      description:
        "Hand-poured in small batches using 100% natural soy wax and premium fragrance oils.",
      icon: Award,
    },
    {
      title: "Competitive Margins",
      description:
        "Enjoy attractive wholesale pricing that allows for healthy retail margins.",
      icon: TrendingUp,
    },
    {
      title: "Reliable Supply",
      description:
        "Consistent production and dedicated support to ensure your shelves are always stocked.",
      icon: Truck,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1920&auto=format&fit=crop"
          alt="Luxury candle retail display"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl text-white">
            <h1 className="font-cormorant text-4xl md:text-6xl mb-4 font-bold">
              Become a Stockist
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Partner with Stalkscents and bring premium natural fragrance to
              your customers
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Content */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#332515] mb-4">
            Why Partner With Us?
          </h2>
          <p className="text-[#332515]/70 max-w-2xl mx-auto">
            Join a growing network of boutique retailers who value quality,
            sustainability, and artistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5E5E5] text-center hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#F8F4E3] rounded-full mb-6">
                <benefit.icon className="w-6 h-6 text-[#A0522D]" />
              </div>
              <h3 className="font-cormorant text-xl text-[#332515] mb-3 font-semibold">
                {benefit.title}
              </h3>
              <p className="text-[#332515]/70">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-[#E5E5E5]">
          <div className="text-center mb-10">
            <h2 className="font-cormorant text-3xl text-[#332515] mb-2">
              Apply Now
            </h2>
            <p className="text-[#332515]/60 text-sm">
              Fill out the form below and we'll get back to you within 24-48
              hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-[#332515]">
                  Contact Name
                </Label>
                <Input
                  id="contactName"
                  required
                  placeholder="Jane Doe"
                  className="bg-[#F9F9F9] border-[#E5E5E5] focus-visible:ring-[#A0522D]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-[#332515]">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  required
                  placeholder="Boutique Name"
                  className="bg-[#F9F9F9] border-[#E5E5E5] focus-visible:ring-[#A0522D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#332515]">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className="bg-[#F9F9F9] border-[#E5E5E5] focus-visible:ring-[#A0522D]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#332515]">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+27 00 000 0000"
                  className="bg-[#F9F9F9] border-[#E5E5E5] focus-visible:ring-[#A0522D]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-[#332515]">
                Website / Instagram
              </Label>
              <Input
                id="website"
                placeholder="https://..."
                className="bg-[#F9F9F9] border-[#E5E5E5] focus-visible:ring-[#A0522D]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-[#332515]">
                Additional Information
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us a bit about your store and why you'd like to stock our products..."
                className="min-h-[120px] bg-[#F9F9F9] border-[#E5E5E5] focus-visible:ring-[#A0522D]"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-full bg-[#332515] text-[#F8F4E3] hover:bg-[#A0522D] text-lg font-medium transition-colors"
            >
              {isSubmitting ? "Sending..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
