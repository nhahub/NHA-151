import React from "react";
import img1 from "../../assets/images/about1.jpg";
import img2 from "../../assets/images/about3.jpg";

export default function AboutUs() {
  return (
    <div className="bg-[oklch(0.95_0.06_115)] text-[oklch(14.1%_0.005_285.823)]">
      {/* Hero Section */}
      <section className="px-6 py-16 bg-[oklch(0.70_0.13_125)]">
        <div className="flex flex-col-reverse items-center gap-10 mx-auto max-w-7xl md:flex-row">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-[oklch(45.3%_0.124_130.933)]">
              About Greenifiy
            </h1>
            <p className="mt-4 text-lg text-[oklch(14.1%_0.005_285.823)]/80 leading-relaxed">
              We’re passionate about helping people bring nature closer to their
              lives. At Greenifiy, we believe that every home deserves a touch
              of green — from small succulents to large, vibrant houseplants.
            </p>
          </div>

          {/* Image */}
          <div className="flex-1">
            <img
              src={img1}
              alt="About Simply Natural"
              className="w-full rounded-lg shadow-lg object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[oklch(45.3%_0.124_130.933)]">
            Our Story
          </h2>
          <p className="mt-6 text-[oklch(14.1%_0.005_285.823)]/80 leading-relaxed">
            Founded in 2020, Greenifiy started as a small local shop with a
            mission to make plant care simple and enjoyable. Over the years,
            we’ve grown into a trusted community for plant lovers, providing
            high-quality plants, care tips, and eco-friendly products to inspire
            sustainable living.
          </p>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="px-6 py-16 bg-[oklch(0.95_0.06_115)]">
        <div className="grid items-center max-w-6xl grid-cols-1 gap-10 mx-auto md:grid-cols-2">
          {/* Text */}
          <div>
            <h2 className="text-3xl font-semibold text-[oklch(45.3%_0.124_130.933)]">
              Our Mission & Values
            </h2>
            <p className="mt-4 text-[oklch(14.1%_0.005_285.823)]/80 leading-relaxed">
              Our mission is to promote a greener lifestyle by making it easy
              for everyone to care for plants — whether you’re a beginner or an
              expert gardener. We value sustainability, quality, and customer
              happiness above all else.
            </p>
            <ul className="mt-6 space-y-2 text-[oklch(14.1%_0.005_285.823)] list-disc list-inside">
              <li> Sustainable and eco-friendly approach</li>
              <li> Passion for nature and growth</li>
              <li> Helping people find joy in plant care</li>
            </ul>
          </div>

          {/* Image */}
          <div>
            <img
              src={img2}
              alt="Our Mission"
              className="w-full rounded-lg shadow-lg object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="px-6 py-16 bg-[oklch(0.70_0.13_125)]/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[oklch(45.3%_0.124_130.933)]">
            Meet Our Team
          </h2>
          <p className="mt-4 text-[oklch(14.1%_0.005_285.823)]/80 leading-relaxed max-w-3xl mx-auto">
            Our dedicated team of plant enthusiasts, gardeners, and designers
            work together to make your green journey simple and rewarding. We're
            here to support you every step of the way.
          </p>

          {/* Team Members */}
          <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 transition-shadow bg-white rounded-lg shadow hover:shadow-md"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-[oklch(0.70_0.13_125)]/60" />
                <h3 className="mt-4 text-lg font-semibold text-[oklch(45.3%_0.124_130.933)]">
                  Team Member {i}
                </h3>
                <p className="text-sm text-[oklch(14.1%_0.005_285.823)]/70">
                  Plant Specialist
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
