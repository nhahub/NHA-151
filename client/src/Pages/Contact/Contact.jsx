import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// إعداد أيقونة الماركر (علشان تظهر صح)
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Contact() {
  return (
    <div className="bg-[oklch(0.96_0.04_115)] text-[oklch(30%_0.01_285)]">
      {/* Hero Section */}
      <section className="bg-[oklch(0.75_0.12_125)] px-6 py-16 text-center text-[oklch(20%_0.01_285)]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[oklch(60%_0.15_130)]">
            Get in Touch
          </h1>
          <p className="mt-4 text-[oklch(25%_0.01_285)]/80 text-lg leading-relaxed">
            Have a question, feedback, or just want to say hello?
            <br />
            We’d love to hear from you — reach out anytime!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-16">
        <div className="grid grid-cols-1 gap-10 mx-auto max-w-7xl md:grid-cols-2">
          {/* Contact Form */}
          <div className="p-8 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold text-[oklch(60%_0.15_130)] mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[oklch(45%_0.1_130)]">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-[oklch(0.75_0.12_125)]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(60%_0.15_130)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[oklch(45%_0.1_130)]">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-[oklch(0.75_0.12_125)]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(60%_0.15_130)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[oklch(45%_0.1_130)]">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2 border border-[oklch(0.75_0.12_125)]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(60%_0.15_130)]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[oklch(60%_0.15_130)] text-white py-2 rounded-lg font-semibold hover:bg-[oklch(60%_0.15_130)]/90 shadow-sm transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center bg-[oklch(0.85_0.07_125)]/40 rounded-2xl shadow p-8">
            <h2 className="text-2xl font-semibold text-[oklch(60%_0.15_130)] mb-6">
              Contact Information
            </h2>

            <div className="space-y-4 text-[oklch(25%_0.01_285)]/80">
              <p className="flex items-center gap-3">
                <Mail className="text-[oklch(60%_0.15_130)]" />
                support@simplynatural.com
              </p>
              <p className="flex items-center gap-3">
                <Phone className="text-[oklch(60%_0.15_130)]" />
                +1 (555) 123-4567
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="text-[oklch(60%_0.15_130)]" />
                123 Green Street, Garden City, NY
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex mt-8 space-x-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="p-2 rounded-full bg-[oklch(0.75_0.12_125)]/30 hover:bg-[oklch(60%_0.15_130)] hover:text-white transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (React Leaflet) */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <MapContainer
            center={[40.73061, -73.9910849]} // New York coordinates
            zoom={13}
            scrollWheelZoom={false}
            className="z-0 w-full rounded-lg shadow-lg h-72"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[40.73061, -73.9910849]} icon={markerIcon}>
              <Popup>123 Green Street, Garden City, NY</Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </div>
  );
}
