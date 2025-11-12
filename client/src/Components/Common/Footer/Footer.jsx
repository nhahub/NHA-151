import React, { useState } from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import PrivacyPolicy from "../../Terms/PrivacyPolicy";
import TermsOfService from "../../Terms/TermOfService";

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <footer className="px-6 py-12 bg-[#1f2b23] text-white">
      <div className="grid grid-cols-1 gap-10 mx-auto max-w-7xl md:grid-cols-3">
        {/* Left: Intro */}
        <div>
          <h2 className="text-2xl font-bold text-lime-300">
            Stay Connected with Nature
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            Bringing greenery closer to your home. Explore beautiful indoor and
            outdoor plants, organic products, and everything you need to grow a
            healthy, sustainable lifestyle.
          </p>

          {/* Social Icons */}
          <div className="flex mt-6 space-x-4">
            <a
              href="#"
              className="p-2 transition-colors rounded-full bg-[#2e3a31] hover:bg-lime-600"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-lime-300" />
            </a>
            <a
              href="#"
              className="p-2 transition-colors rounded-full bg-[#2e3a31] hover:bg-lime-600"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-lime-300" />
            </a>
            <a
              href="#"
              className="p-2 transition-colors rounded-full bg-[#2e3a31] hover:bg-lime-600"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-lime-300" />
            </a>
            <a
              href="#"
              className="p-2 transition-colors rounded-full bg-[#2e3a31] hover:bg-lime-600"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-lime-300" />
            </a>
          </div>
        </div>

        {/* Middle: Quick Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-lime-300">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link to="/" className="hover:text-lime-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-lime-300">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/indoor" className="hover:text-lime-300">
                Indoor Plants
              </Link>
            </li>
            <li>
              <Link to="/outdoor" className="hover:text-lime-300">
                Outdoor Plants
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-lime-300">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Useful Info */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-lime-300">
            Useful Info
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="transition-colors hover:text-lime-300"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsTermsOpen(true)}
                className="transition-colors hover:text-lime-300"
              >
                Terms & Conditions
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="pt-6 mt-10 text-sm text-center border-t border-[#33463a] text-white/80">
        <p>
          © 2025 <span className="font-semibold text-lime-300">Greenify</span> —
          All Rights Reserved
        </p>
        <p className="mt-1 text-white/60">Powered by DEPI</p>
      </div>

      {/* Dialogs */}
      <PrivacyPolicy isOpen={isPrivacyOpen} setIsOpen={setIsPrivacyOpen} />
      <TermsOfService isOpen={isTermsOpen} setIsOpen={setIsTermsOpen} />
    </footer>
  );
}
