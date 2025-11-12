import React from "react";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import plant1 from "../../../assets/images/1.jpg";
import plant2 from "../../../assets/images/2.jpg";

export default function GardenHeroSplit() {
  return (
    <section className="px-6 py-16 bg-lime-200 min-h-[70vh] flex items-center">
      <div className="flex flex-col items-center gap-12 mx-auto max-w-7xl md:flex-row">
        {/* Left: Images */}
        <div className="grid flex-1 grid-cols-2 gap-4">
          <img
            src={plant1}
            alt="Green plant"
            className="object-cover w-full rounded-lg shadow-lg aspect-4/3"
          />
          <img
            src={plant2}
            alt="Organic garden products"
            className="object-cover w-full rounded-lg shadow-lg aspect-4/3"
          />
        </div>

        {/* Right: Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-green-900 md:text-5xl">
            Grow it. Feel it. Live Green
          </h1>

          <p className="mt-4 leading-relaxed text-gray-700">
            Our nursery is more than just plants — it’s a green lifestyle.
            Discover beautiful flowers, trees, and home plants that bring life
            to your space, along with organic products made straight from
            nature.
          </p>

          <p className="mt-4 leading-relaxed text-gray-700">
            Whether you're a beginner or a plant lover, you’ll find everything
            you need to grow and care for your plants. Soon, you’ll even be able
            to buy or sell your own organic goods right from our platform!
          </p>

          {/* Social Icons */}
          <div className="flex justify-center mt-8 space-x-6 text-green-800 md:justify-start">
            <a
              href="#"
              className="transition-colors duration-200 hover:text-green-600"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="transition-colors duration-200 hover:text-green-600"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="transition-colors duration-200 hover:text-green-600"
              aria-label="YouTube"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="transition-colors duration-200 hover:text-green-600"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
