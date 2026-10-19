"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const HERO_IMAGES = [
  { src: "/images/camera-hero.jpg", alt: "Nikon Z Mirrorless Camera" },
  { src: "/images/lens-hero.jpg", alt: "35mm f/1.7 STM Prime Lens" },
];

export default function MobileHeroBackground() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500); // Berganti setiap 4.5 detik
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 block lg:hidden select-none overflow-hidden">
      {HERO_IMAGES.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentIdx === i ? "opacity-35" : "opacity-0"
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />
        </div>
      ))}
      {/* Overlay Gelap Halus agar foto gear terlihat jelas namun teks & logo tetap terbaca */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/50 to-ink/90" />
    </div>
  );
}
