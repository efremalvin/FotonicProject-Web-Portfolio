import Image from "next/image";
import { ArrowDown, HardDriveDownload, Sparkles, Video, Camera, Aperture } from "lucide-react";
import Navbar from "@/components/Navbar";
import CatalogSection from "@/components/CatalogSection";
import PriceList from "@/components/PriceList";
import Notes from "@/components/Notes";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/components/BookingModal";
import { MAIN_PACKAGES, formatRupiah } from "@/data/pricelist";

const lowestPrice = Math.min(...MAIN_PACKAGES.map((p) => p.startingPrice));

export default function HomePage() {
  return (
    <BookingProvider>
      <Navbar />
      <main id="top">
        {/* ========================================================= */}
        {/* HERO SECTION DENGAN 2 FOTO GEAR (BODY & LENSA 35MM) DI KANAN */}
        {/* ========================================================= */}
        <section className="relative overflow-hidden border-b border-white/5 bg-ink py-16 sm:py-24 lg:py-28">
          {/* Subtle Ambient Gold Glow */}
          <div className="pointer-events-none absolute -left-20 top-1/4 h-[420px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />
          <div className="pointer-events-none absolute right-0 top-10 h-[500px] w-[600px] rounded-full bg-zinc-800/30 blur-[160px]" />

          <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
              
              {/* Kolom Kiri: Teks & Logo Brand */}
              <div className="text-center lg:col-span-7 lg:text-left">
                {/* Promo Badge Pill */}
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold shadow-sm backdrop-blur-md">
                  <Sparkles className="size-3.5 text-gold" />
                  <span>Promo Spesial: FREE Video Reels / Shorts!</span>
                </div>

                {/* Logo Fotonic Putih */}
                <div className="my-6 flex justify-center lg:justify-start">
                  <div className="relative w-full max-w-[280px] sm:max-w-[340px] transition-transform duration-500 hover:scale-[1.02]">
                    <Image
                      src="/images/logo-white.png"
                      alt="Fotonic Photo & Video Project"
                      width={1024}
                      height={442}
                      priority
                      draggable={false}
                      className="pointer-events-none select-none h-auto w-full object-contain drop-shadow-[0_12px_25px_rgba(0,0,0,0.9)]"
                    />
                  </div>
                </div>

                {/* Tagline & Headline */}
                <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Capturing Moments,{" "}
                  <span className="italic text-gradient-gold">Crafting Visual Stories</span>
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                  Layanan fotografi &amp; videografi profesional untuk outdoor &amp; indoor shoot — dari momen wisuda, perayaan sidang, portrait personal, hingga event kebersamaan. 
                  Dokumentasikan momen terbaik Anda dengan gear sinematik dan promo free video reels.
                </p>

                {/* Benefit Pills */}
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm lg:justify-start">
                  <span className="rounded-full border border-gold/50 bg-gold/15 px-4 py-2 font-bold text-gold">
                    Mulai dari {formatRupiah(lowestPrice)}
                  </span>
                  <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-zinc-300">
                    <Video className="size-4 text-emerald-400" />
                    <span>Free Video Reels</span>
                  </span>
                  <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-zinc-300">
                    <HardDriveDownload className="size-4 text-gold" />
                    <span>All RAW &amp; JPG via Drive</span>
                  </span>
                </div>

                {/* CTA Navigasi */}
                <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <a
                    href="#katalog"
                    className="btn-wa w-full sm:w-auto px-7 py-3.5 text-sm"
                  >
                    Lihat Hasil Karya &amp; Katalog
                  </a>
                  <a
                    href="#pricelist"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-gold hover:text-gold"
                  >
                    <span>Daftar Paket</span>
                    <ArrowDown className="size-4" />
                  </a>
                </div>
              </div>

              {/* Kolom Kanan: 2 Foto Gear (Kamera Body & Lensa 35mm f/1.7) Terproteksi */}
              <div className="relative mt-4 lg:mt-0 lg:col-span-5">
                <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                  {/* Efek Ambient Glow Belakang Gambar */}
                  <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-tr from-gold/15 via-transparent to-transparent opacity-60 blur-2xl" />

                  {/* Foto Utama: Kamera Nikon Z */}
                  <div className="relative select-none overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-2xl shadow-black">
                    <Image
                      src="/images/camera-hero.jpg"
                      alt="Nikon Z Camera Gear"
                      width={1024}
                      height={768}
                      priority
                      draggable={false}
                      className="pointer-events-none select-none h-auto w-full object-cover transition duration-700 ease-out hover:scale-105"
                    />

                    {/* Gradient Overlay Menyatu Gelap */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent hidden lg:block" />

                    {/* Chip Informasi Body Kamera */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/75 px-3 py-2 backdrop-blur-md">
                      <div>
                        <p className="text-xs font-bold text-white">Nikon Z Mirrorless</p>
                        <p className="text-[10px] text-zinc-400">High-resolution cinematic sensor</p>
                      </div>
                      <span className="flex size-6 items-center justify-center rounded-full bg-gold/15 text-gold">
                        <Camera className="size-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Foto Kedua: Lensa Prime 35mm f/1.7 (Floating Card Tumpang Tindih Aman, Tidak Lepas ke Kiri Layar HP) */}
                  <div className="absolute -bottom-6 left-3 sm:-bottom-8 sm:-left-4 z-20 w-40 sm:w-48 select-none overflow-hidden rounded-2xl border border-white/15 bg-black/90 p-1.5 shadow-2xl shadow-black backdrop-blur-md">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                      <Image
                        src="/images/lens-hero.jpg"
                        alt="35mm f/1.7 STM Prime Lens"
                        fill
                        draggable={false}
                        sizes="200px"
                        className="pointer-events-none select-none object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-white">35mm f/1.7 Prime</span>
                        <Aperture className="size-3 text-gold" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION KATALOG KARYA (BISA KLIK LIHAT DETAIL FOTO & VIDEO) */}
        {/* ========================================================= */}
        <CatalogSection />

        {/* ========================================================= */}
        {/* SECTION PRICE LIST (3 PAKET RESMI - START FROM) */}
        {/* ========================================================= */}
        <PriceList />

        {/* ========================================================= */}
        {/* SECTION CATATAN & KETENTUAN */}
        {/* ========================================================= */}
        <Notes />
      </main>
      <Footer />
    </BookingProvider>
  );
}
