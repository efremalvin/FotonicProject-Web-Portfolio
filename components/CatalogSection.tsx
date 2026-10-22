"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Camera,
  Film,
  Play,
  User,
  X,
  Sparkles,
  Images,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import {
  CATALOG_PROJECTS,
  type CatalogProject,
  type ServiceType,
} from "@/data/catalog";
import { resolveImageSrc, getDriveVideoStreamUrl } from "@/lib/driveHelper";
import { cn } from "@/lib/utils";

type FilterType = "all" | ServiceType;

// Aspect ratio mapping untuk variasi tinggi pin masonry ala Pinterest
function getPinAspectRatio(project: CatalogProject, idx: number): string {
  if (project.serviceType === "video") {
    return project.videoAspectRatio === "portrait" ? "aspect-[9/16]" : "aspect-[16/10]";
  }
  const ratios = [
    "aspect-[3/4]",   // Portrait sedang
    "aspect-[4/5]",   // Portrait klasik
    "aspect-[4/3]",   // Landscape
    "aspect-[2/3]",   // Portrait tinggi
    "aspect-square",  // Persegi
    "aspect-[3/4]",
  ];
  return ratios[idx % ratios.length];
}

export default function CatalogSection() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [projects, setProjects] = useState<CatalogProject[]>(CATALOG_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<CatalogProject | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Deteksi perangkat mobile untuk optimasi memori & resolusi
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch updated catalog dari Drive API jika dikonfigurasi
  useEffect(() => {
    let isMounted = true;
    async function loadCatalog() {
      try {
        const res = await fetch("/api/catalog");
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data.projects && data.projects.length > 0) {
          setProjects(data.projects);
        }
      } catch (e) {
        // Fallback ke static catalog
      }
    }
    loadCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.serviceType === filter);
  }, [filter, projects]);

  // Kunci scroll saat modal terbuka tanpa layout shift
  useEffect(() => {
    if (selectedProject) {
      const scrollY = window.scrollY;
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
        window.scrollTo(0, scrollY);
      };
    }
  }, [selectedProject]);

  const handleOpenProject = useCallback((project: CatalogProject) => {
    setSelectedProject(project);
    setActivePhotoIndex(0);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
    setActivePhotoIndex(0);
  }, []);

  const handleNextPhoto = useCallback(() => {
    if (!selectedProject?.galleryPhotos?.length) return;
    setActivePhotoIndex((prev) =>
      prev === selectedProject.galleryPhotos!.length - 1 ? 0 : prev + 1
    );
  }, [selectedProject]);

  const handlePrevPhoto = useCallback(() => {
    if (!selectedProject?.galleryPhotos?.length) return;
    setActivePhotoIndex((prev) =>
      prev === 0 ? selectedProject.galleryPhotos!.length - 1 : prev - 1
    );
  }, [selectedProject]);

  // Keyboard navigation: Tombol Panah Kiri/Kanan & Escape
  useEffect(() => {
    if (!selectedProject || selectedProject.serviceType === "video") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevPhoto();
      } else if (e.key === "ArrowRight") {
        handleNextPhoto();
      } else if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, handleNextPhoto, handlePrevPhoto, handleCloseModal]);

  // Otomatis geser thumbnail agar selalu terlihat di tengah
  useEffect(() => {
    if (!thumbnailContainerRef.current) return;
    const activeBtn = thumbnailContainerRef.current.children[activePhotoIndex] as HTMLElement;
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activePhotoIndex]);

  // Dukungan touch swipe untuk pengguna HP/Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        handleNextPhoto();
      } else {
        handlePrevPhoto();
      }
    }
    touchStartXRef.current = null;
  };

  const thumbnailWidth = isMobile ? 400 : 600;
  const modalPhotoWidth = isMobile ? 800 : 1200;

  return (
    <section id="katalog" className="relative border-b border-white/10 bg-gradient-to-b from-ink via-ink-card/30 to-ink py-16 sm:py-24">
      {/* Visual Section Separator Accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-44 w-44 sm:h-72 sm:w-72 rounded-full bg-gold/5 blur-[50px] sm:blur-[120px]" />
      <div className="pointer-events-none absolute -left-12 top-2/3 h-52 w-52 rounded-full bg-gold/[0.04] blur-[60px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow flex items-center gap-2">
              <Camera className="size-3.5 text-gold" />
              <span>Koleksi Foto &amp; Video</span>
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Galeri Karya
            </h2>
            <p className="mt-1.5 max-w-xl text-xs sm:text-sm leading-relaxed text-zinc-400">
              Dokumentasi setiap momen berharga dari hasil shoot klien kami. Klik pada kartu untuk membuka galeri lengkap.
            </p>
          </div>

          {/* Filter Tipe Jasa: Semua / Foto / Video */}
          <div className="flex rounded-full border border-white/10 bg-ink-card/90 sm:bg-white/[0.03] p-1 sm:backdrop-blur-md">
            {(
              [
                { id: "all", label: "Semua Karya", icon: Sparkles },
                { id: "foto", label: "Foto", icon: Camera },
                { id: "video", label: "Video", icon: Film },
              ] as const
            ).map((t) => {
              const active = filter === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFilter(t.id)}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm",
                    active ? "text-ink" : "text-zinc-400 hover:text-white",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="catalog-filter-pill"
                      className="absolute inset-0 rounded-full shadow-md shadow-gold/20"
                      style={{
                        background: "linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 50%, #b9853a 100%)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon className="relative size-3.5 shrink-0" />
                  <span className="relative font-medium">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* PINTEREST MASONRY COLLAGE (SUPER RINGAN & BEBAS LAG DI HP) */}
        {/* ========================================================= */}
        <div className="mt-8 sm:mt-12 columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-5">
          {filteredProjects.map((project, idx) => {
            const isVideo = project.serviceType === "video";
            const imageSrc = resolveImageSrc(project.thumbnail, thumbnailWidth);
            const photoCount = project.galleryPhotos?.length || 1;
            const aspectClass = getPinAspectRatio(project, idx);

            return (
              <article
                key={project.id}
                onClick={() => handleOpenProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenProject(project);
                  }
                }}
                className="pin-card group relative mb-3 sm:mb-5 cursor-pointer select-none overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-ink-card sm:shadow-lg transition-colors duration-150 sm:hover:border-gold/50"
              >
                {/* Media Image dengan Aspect Ratio Dinamis Pinterest */}
                <div 
                  className={cn("relative w-full overflow-hidden bg-zinc-900 select-none", aspectClass)}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <Image
                    src={imageSrc}
                    alt={project.clientName}
                    fill
                    unoptimized
                    draggable={false}
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 25vw"
                    className="pointer-events-none select-none object-cover sm:transition-transform sm:duration-500 sm:ease-out sm:group-hover:scale-105"
                  />

                  {/* Gradient Overlay Menyatu Halus */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:opacity-40 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-0" />

                  {/* Floating Pill Kiri Atas: Badge Tipe Karya */}
                  <span className="pointer-events-none absolute left-2 top-2 sm:left-3.5 sm:top-3.5 z-10 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/75 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-semibold text-white">
                    {isVideo ? (
                      <>
                        <Film className="size-2.5 sm:size-3 text-gold" />
                        <span>Reels</span>
                      </>
                    ) : (
                      <>
                        <Camera className="size-2.5 sm:size-3 text-gold" />
                        <span>{photoCount} Foto</span>
                      </>
                    )}
                  </span>

                  {/* Floating Icon Kanan Atas: Quick Hint */}
                  <div className="pointer-events-none absolute right-2 top-2 sm:right-3.5 sm:top-3.5 z-10 flex size-6 sm:size-8 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white transition-transform duration-200 sm:group-hover:scale-110 sm:group-hover:border-gold sm:group-hover:text-gold">
                    {isVideo ? <Play className="size-2.5 sm:size-3.5 fill-current" /> : <Images className="size-2.5 sm:size-3.5" />}
                  </div>

                  {/* Desktop Hover Overlay Interaktif (Pinterest Hover Card) */}
                  <div className="pointer-events-none absolute inset-0 z-10 hidden sm:flex flex-col justify-end p-4 lg:p-5 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 transition-opacity duration-200 sm:group-hover:opacity-100">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-gold">
                      {project.packageName || "Katalog Karya"}
                    </span>
                    <h3 className="text-base font-bold text-white leading-snug line-clamp-1 mt-0.5">
                      {project.clientName}
                    </h3>
                    <p className="text-[11px] text-zinc-300 line-clamp-2 mt-1 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-3.5 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-gold/40 bg-gold/20 py-2 text-xs font-bold text-gold backdrop-blur-sm shadow-sm transition-colors group-hover:bg-gold group-hover:text-ink">
                      {isVideo ? (
                        <>
                          <Play className="size-3 fill-current" />
                          <span>Tonton Video</span>
                        </>
                      ) : (
                        <>
                          <Images className="size-3" />
                          <span>Buka Galeri Foto</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Kartu Khusus Tampilan Mobile (Rapi & Kompak) */}
                <div className="p-2 sm:hidden flex flex-col gap-0.5 bg-ink-card border-t border-white/5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-white truncate">{project.clientName}</span>
                    {project.packageName && (
                      <span className="rounded-full bg-gold/10 px-1.5 py-0.5 text-[8.5px] font-medium text-gold border border-gold/20 truncate max-w-[80px]">
                        {project.packageName}
                      </span>
                    )}
                  </div>
                  <p className="text-[9.5px] text-zinc-400 truncate">{project.date}</p>
                </div>

                {/* Footer Metadata Desktop (Pinterest Style Pin Author / Project Bar) */}
                <div className="hidden sm:flex items-center justify-between px-4 py-3 bg-ink-card border-t border-white/5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold text-xs font-bold border border-gold/30">
                      {project.clientName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate leading-tight group-hover:text-gold transition-colors">
                        {project.clientName}
                      </p>
                      <p className="text-[10px] text-zinc-400 truncate leading-tight mt-0.5">
                        {project.packageName || project.eventName}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-500 shrink-0 font-medium">{project.date}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE CATALOG MODAL (INSTAN & 60FPS DI SEMUA HP) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 sm:bg-black/90 p-2 sm:p-4 md:p-6 overscroll-contain"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.14, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[96vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-ink shadow-2xl"
            >
              {/* Modal Header Simpel & Bersih */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-7 sm:py-4 bg-ink-card">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  {/* Logo Fotonic Aperture */}
                  <div className="relative size-7 sm:size-8 shrink-0 overflow-hidden rounded-full border border-gold/40 bg-gold/10 p-1">
                    <Image
                      src="/images/aperture-white.png"
                      alt="Fotonic"
                      width={32}
                      height={32}
                      unoptimized
                      className="size-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                        {selectedProject.clientName}
                      </span>
                      {selectedProject.packageName && (
                        <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold text-gold border border-gold/30">
                          {selectedProject.packageName}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
                      {selectedProject.date}
                    </p>
                  </div>
                </div>

                {/* Tombol Tutup Silang Atas */}
                <button
                  type="button"
                  onClick={handleCloseModal}
                  aria-label="Tutup pratinjau"
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs text-zinc-300 transition hover:bg-white/15 hover:text-white"
                >
                  <span className="hidden sm:inline text-[11px]">Tutup</span>
                  <X className="size-4" />
                </button>
              </div>

              {/* Modal Body Simpel */}
              <div className="flex-1 overflow-y-auto p-2.5 sm:p-6 md:p-7 space-y-3 sm:space-y-4">
                {selectedProject.serviceType === "video" ? (
                  /* Video Player Bersih */
                  <div className="flex w-full justify-center">
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10 w-full transition-all duration-300 flex items-center justify-center",
                        selectedProject.videoAspectRatio === "portrait"
                          ? "max-w-[360px] aspect-[9/16] max-h-[75vh]"
                          : "aspect-video max-w-4xl max-h-[75vh]"
                      )}
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      {getDriveVideoStreamUrl(selectedProject.driveUrl) ? (
                        <video
                          src={getDriveVideoStreamUrl(selectedProject.driveUrl)!}
                          poster={resolveImageSrc(selectedProject.thumbnail, thumbnailWidth)}
                          controls
                          controlsList="nodownload nofullscreen-overflow noplaybackrate"
                          disablePictureInPicture
                          playsInline
                          preload="metadata"
                          className="size-full object-contain bg-black"
                        />
                      ) : (
                        <div className="flex size-full flex-col items-center justify-center gap-3 p-6 text-center">
                          <Film className="size-10 text-gold" />
                          <p className="text-sm text-zinc-300">
                            Video preview sinematik siap diputar dalam resolusi tinggi.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Photo Gallery Showcase Luas & Adaptive (Jelas & Terang) */
                  <div className="space-y-3 sm:space-y-4">
                    {/* Viewport Foto Utama */}
                    {selectedProject.galleryPhotos && selectedProject.galleryPhotos.length > 0 && (
                      <div 
                        className="relative flex h-[48vh] sm:h-[65vh] lg:h-[70vh] w-full select-none items-center justify-center overflow-hidden rounded-2xl bg-black border border-white/10"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <Image
                          key={`${selectedProject.id}-${activePhotoIndex}`}
                          src={resolveImageSrc(selectedProject.galleryPhotos[activePhotoIndex].url, modalPhotoWidth)}
                          alt={selectedProject.galleryPhotos[activePhotoIndex].caption || selectedProject.clientName}
                          fill
                          unoptimized
                          priority
                          draggable={false}
                          referrerPolicy="no-referrer"
                          sizes="(max-width: 640px) 100vw, 1200px"
                          className="pointer-events-none select-none object-contain"
                        />

                        {/* Navigasi Kiri / Kanan Foto */}
                        {selectedProject.galleryPhotos.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={handlePrevPhoto}
                              aria-label="Foto sebelumnya"
                              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 flex size-9 sm:size-12 items-center justify-center rounded-full bg-black/75 text-white transition hover:bg-gold hover:text-ink active:scale-90"
                            >
                              <ChevronLeft className="size-5 sm:size-7" />
                            </button>
                            <button
                              type="button"
                              onClick={handleNextPhoto}
                              aria-label="Foto selanjutnya"
                              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 flex size-9 sm:size-12 items-center justify-center rounded-full bg-black/75 text-white transition hover:bg-gold hover:text-ink active:scale-90"
                            >
                              <ChevronRight className="size-5 sm:size-7" />
                            </button>
                          </>
                        )}
                      </div>
                    )}

                    {/* Thumbnail Carousel Bawah (Sangat Ringan dengan native async decode) */}
                    {selectedProject.galleryPhotos && selectedProject.galleryPhotos.length > 1 && (
                      <div 
                        ref={thumbnailContainerRef}
                        className="flex gap-2 sm:gap-2.5 overflow-x-auto py-1 px-0.5 [scrollbar-width:none] scroll-smooth"
                      >
                        {selectedProject.galleryPhotos.map((photo, i) => (
                          <button
                            key={photo.id}
                            type="button"
                            onClick={() => setActivePhotoIndex(i)}
                            className={cn(
                              "relative aspect-[4/3] w-13 sm:w-20 shrink-0 select-none overflow-hidden rounded-xl border-2 transition-all duration-100",
                              activePhotoIndex === i
                                ? "border-gold ring-2 ring-gold/40 shadow-md shadow-gold/20 scale-[1.03]"
                                : "border-white/10 opacity-50 hover:opacity-100 hover:border-white/30"
                            )}
                            onContextMenu={(e) => e.preventDefault()}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={resolveImageSrc(photo.url, 200)}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              referrerPolicy="no-referrer"
                              className="pointer-events-none select-none size-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Modal: Proteksi & Tombol Tutup Jelas */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 border-t border-white/10 pt-3 mt-1 sm:mt-2">
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-400">
                    <ShieldAlert className="size-3.5 sm:size-4 text-gold shrink-0" />
                    <span className="font-medium tracking-wide">Protected Image &amp; Media — Fotonic Project</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto rounded-full border border-white/15 bg-white/[0.05] px-5 py-2 text-xs font-semibold text-white transition hover:bg-white/15 hover:border-white/30"
                  >
                    Tutup Pratinjau
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
