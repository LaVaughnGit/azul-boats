"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    alt: "Crystal clear water",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=600&q=80",
    alt: "Miami Beach aerial",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1544552942-9a7b93af3a7f?w=600&q=80",
    alt: "Waves on the water",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=80",
    alt: "Luxury speedboat",
    span: "col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=600&q=80",
    alt: "Sunset on the ocean",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80",
    alt: "Palm trees and beach",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1531961669-3869aa4cb6d4?w=600&q=80",
    alt: "Snorkeling in clear water",
    span: "",
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-28 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,53,0.4), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold text-[#FF6B35] uppercase tracking-[0.35em] mb-3">
            Gallery
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Life on{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF6B35, #FF2D78)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              the Water
            </span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Real moments from real days on Biscayne Bay. Your photos coming soon — book your trip today.
          </p>
        </motion.div>

        {/* Mosaic grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[200px] gap-3"
        >
          {PHOTOS.map((photo, idx) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              onClick={() => setLightbox(photo.src)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group border border-white/5 ${photo.span}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-white/25 mt-6"
        >
          Placeholder images — real photos coming soon
        </motion.p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden">
            <Image
              src={lightbox}
              alt="Gallery photo"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
