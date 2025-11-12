"use client";

import { Package, Truck, Leaf } from "lucide-react";

export default function WhyUs() {
  const features = [
    {
      icon: <Package className="w-10 h-10 text-primary" />,
      title: "Wide Plant Collection",
      desc: "From tiny succulents to large trees — find the perfect plants for your home or garden.",
    },
    {
      icon: <Truck className="w-10 h-10 text-primary" />,
      title: "Fast & Free Delivery",
      desc: "We deliver your plants safely and quickly to your doorstep — free shipping on every order.",
    },
    {
      icon: <Leaf className="w-10 h-10 text-primary" />,
      title: "100% Eco Guarantee",
      desc: "All our products are organic, sustainable, and planet-friendly — or you get your money back.",
    },
  ];

  return (
    <section className="px-6 py-20 bg-lime-100 to-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="mb-12 text-3xl font-bold text-secondary md:text-4xl">
          Our Promises to You
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-2xl"
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="mb-3 text-xl font-semibold text-secondary">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-secondary/70">
                {feature.desc}
              </p>
              <div className="w-16 h-1 mx-auto mt-4 transition-all duration-300 rounded-full bg-lightGreen group-hover:w-24" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
