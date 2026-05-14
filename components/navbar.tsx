"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useBookingModal } from "./booking-modal-provider";

const NAV_LINKS = [
  { label: "Fleet", href: "#fleet" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useBookingModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#06061A]/85 backdrop-blur-2xl border-b border-white/8"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#">
            <Image src="/icons/logo.svg" alt="Azul Boat Rentals" width={155} height={40} priority />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#FF2D78] to-[#00E5FF] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Book Now CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+12018150643"
              className="text-sm text-white/50 hover:text-white transition-colors font-medium"
            >
              (201) 815-0643
            </a>
            <button
              onClick={openModal}
              className="relative px-6 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden group transition-transform hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #FF2D78, #7B2FBE)",
                boxShadow: "0 4px 20px rgba(255,45,120,0.4)",
              }}
            >
              Book Now
            </button>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="tel:+12018150643"
              className="text-xs text-white/50 hover:text-white transition-colors font-medium"
            >
              (201) 815-0643
            </a>
            <button
              className="w-10 h-10 flex items-center justify-center text-white rounded-xl hover:bg-white/5 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[#06061A]/95 backdrop-blur-2xl border-t border-white/8"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3">
                <button
                  onClick={() => {
                    openModal();
                    setMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-full text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #FF2D78, #7B2FBE)" }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
