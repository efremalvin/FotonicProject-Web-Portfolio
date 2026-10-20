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

// Browser memory cache tracker untuk memastikan foto di-prewarm dan instan saat dibuka
const preloadedUrls = new Set<string>();

function preloadPhotoUrl(url: string, width = 1200) {
  if (typeof window === "undefined" || !url) return;
  const fullUrl = resolveImageSrc(url, width);
  if (!fullUrl || preloadedUrls.has(fullUrl)) return;
  preloadedUrls.add(fullUrl);
  const img = new window.Image();
  img.src = fullUrl;
}

function preloadProject(project: CatalogProject) {
  if (!project) return;
  if (project.thumbnail) {
    preloadPhotoUrl(project.thumbnail, 600);
  }
  if (project.galleryPhotos && project.galleryPhotos.length > 0) {
    project.galleryPhotos.forEach((photo) => {
      preloadPhotoUrl(photo.url, 1200);
      preloadPhotoUrl(photo.url, 300);
    });
  }
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "20%" : dir < 0 ? "-20%" : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-20%" : dir < 0 ? "20%" : 0,
    opacity: 0,
  }),
};

export default function CatalogSection() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [projects, setProjects] = useState<CatalogProject[]>(CATALOG_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<CatalogProject | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

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

  // Pre-warm beberapa project pertama saat browser idle
  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {
      projects.slice(0, 4).forEach((p) => preloadProject(p));
    }, 800);
    return () => clearTimeout(timer);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.serviceType === filter);
  }, [filter, projects]);

  // Kunci scroll body dan pre-warm seluruh foto proyek yang dipilih
  useEffect(() => {
    if (selectedProject) {
      preloadProject(selectedProject);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedProject]);

  const handleOpenProject = useCallback((project: CatalogProject) => {
    preloadProject(project);
    setSelectedProject(project);
    setActivePhotoIndex(0);
    setDirection(0);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
    setActivePhotoIndex(0);
    setDirection(0);
  }, []);

  const handleNextPhoto = useCallback(() => {
    if (!selectedProject?.galleryPhotos?.length) return;
    setDirection(1);
    setActivePhotoIndex((prev) =>
      prev === selectedProject.galleryPhotos!.length - 1 ? 0 : prev + 1
    );
  }, [selectedProject]);

  const handlePrevPhoto = useCallback(() => {
    if (!selectedProject?.galleryPhotos?.length) return;
    setDirection(-1);
    setActivePhotoIndex((prev) =>
      prev === 0 ? selectedProject.galleryPhotos!.length - 1 : prev - 1
    );
  }, [selectedProject]);

  const handleSelectPhoto = useCallback(
    (index: number) => {
      setDirection(index > activePhotoIndex ? 1 : -1);
      setActivePhotoIndex(index);
    },
    [activePhotoIndex]
  );

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
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextPhoto();
      } else {
        handlePrevPhoto();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section id="katalog" className="relative border-b border-white/10 bg-gradient-to-b from-ink via-ink-card/30 to-ink py-20 sm:py-28">
      {/* Visual Section Separator Accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-gold/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow flex items-center gap-2">
              <Camera className="size-3.5 text-gold" />
              <span>Client Showcase</span>
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Katalog Hasil Foto &amp; Video
            </h2>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-zinc-400">
              Klik pada kartu proyek klien untuk melihat detail dan pratinjau galeri foto/video tanpa mengunduh.
            </p>
          </div>

          {/* Filter Tipe Jasa: Semua / Foto / Video */}
          <div className="flex rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md">
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

        {/* Grid Showcase Subfolder Klien (DAPAT DIKLIK UNTUK MELIHAT DETAIL) */}
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {filteredProjects.map((project) => {
            const isVideo = project.serviceType === "video";
            const imageSrc = resolveImageSrc(project.thumbnail, 600);
            const photoCount = project.galleryPhotos?.length || 1;

            return (
              <article
                key={project.id}
                onClick={() => handleOpenProject(project)}
                onMouseEnter={() => preloadProject(project)}
                onTouchStart={() => preloadProject(project)}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-card transition-all duration-300 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1"
              >
                {/* Thumbnail Cover dengan Proteksi Anti-Download */}
                <div 
                  className="relative aspect-[4/3] w-full select-none overflow-hidden bg-zinc-900"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <Image
                    src={imageSrc}
                    alt={project.clientName}
                    fill
                    unoptimized
                    draggable={false}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="pointer-events-none select-none object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-black/30 to-transparent" />

                  {/* Badge Tipe Jasa */}
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                    {isVideo ? (
                      <>
                        <Film className="size-3 text-gold" /> Video
                      </>
                    ) : (
                      <>
                        <Camera className="size-3 text-gold" /> Foto ({photoCount})
                      </>
                    )}
                  </span>

                  {/* Quick Hint Icon Overlay */}
                  <div className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-black/60 text-white/90 backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
                    {isVideo ? <Play className="size-3.5 fill-current" /> : <Images className="size-3.5" />}
                  </div>
                </div>

                {/* Informasi Subfolder Klien */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gold">
                    <User className="size-3.5" />
                    <span>{project.clientName}</span>
                  </div>

                  <h3 className="mt-1 text-base font-semibold leading-snug text-white group-hover:text-gold">
                    {project.eventName}
                  </h3>

                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-zinc-400">
                    <CalendarDays className="size-3 text-zinc-500" />
                    <span>{project.date}</span>
                  </p>

                  <p className="mt-3 flex-1 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tombol Lihat Detail Galeri */}
                  <div className="mt-5 border-t border-white/5 pt-3.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenProject(project);
                      }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-xs font-semibold text-white transition hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                    >
                      {isVideo ? (
                        <>
                          <Play className="size-3.5 text-gold" />
                          <span>Tonton Video &amp; Detail</span>
                        </>
                      ) : (
                        <>
                          <Images className="size-3.5 text-gold" />
                          <span>Lihat Galeri Foto ({photoCount})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE CATALOG MODAL (INSTANT LOAD & ULTRA SMOOTH SLIDE) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4 md:p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.97, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 12 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[96vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-ink shadow-2xl"
            >
              {/* Modal Header Simpel & Bersih */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 sm:px-7 sm:py-4 bg-ink-card/60 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  {/* Logo Fotonic Aperture */}
                  <div className="relative size-8 shrink-0 overflow-hidden rounded-full border border-gold/40 bg-gold/10 p-1">
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
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold uppercase tracking-wider text-white">
                        {selectedProject.clientName}
                      </span>
                      {selectedProject.packageName && (
                        <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-semibold text-gold border border-gold/30">
                          {selectedProject.packageName}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      {selectedProject.date}
                    </p>
                  </div>
                </div>

                {/* Tombol Tutup Silang Atas */}
                <button
                  type="button"
                  onClick={handleCloseModal}
                  aria-label="Tutup pratinjau"
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition hover:bg-white/15 hover:text-white"
                >
                  <span className="hidden sm:inline text-[11px]">Tutup</span>
                  <X className="size-4" />
                </button>
              </div>

              {/* Modal Body Simpel (Hanya Media Utama & Carousel) */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-7 space-y-4">
                {selectedProject.serviceType === "video" ? (
                  /* Video Player Bersih */
                  <div className="flex w-full justify-center">
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10 w-full transition-all duration-300 flex items-center justify-center",
                        selectedProject.videoAspectRatio === "portrait"
                          ? "max-w-[380px] aspect-[9/16] max-h-[75vh]"
                          : "aspect-video max-w-4xl max-h-[75vh]"
                      )}
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      {getDriveVideoStreamUrl(selectedProject.driveUrl) ? (
                        <video
                          src={getDriveVideoStreamUrl(selectedProject.driveUrl)!}
                          poster={resolveImageSrc(selectedProject.thumbnail, 900)}
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
                  /* Photo Gallery Showcase Luas & Adaptive (Instant Dual-Layer Loading & Gesture Swipe) */
                  <div className="space-y-4">
                    {/* Viewport Foto Utama */}
                    {selectedProject.galleryPhotos && selectedProject.galleryPhotos.length > 0 && (
                      <div 
                        className="relative flex h-[52vh] sm:h-[65vh] lg:h-[70vh] w-full select-none items-center justify-center overflow-hidden rounded-2xl bg-black/95 border border-white/10"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                          <motion.div
                            key={activePhotoIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="absolute inset-0 size-full flex items-center justify-center"
                          >
                            {/* Layer 1: Thumbnail Instant Blur-up Preview (0ms visual delay) */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={resolveImageSrc(selectedProject.galleryPhotos[activePhotoIndex].url, 300)}
                              alt=""
                              draggable={false}
                              className="pointer-events-none select-none absolute inset-0 size-full object-contain filter blur-[1px] opacity-75"
                            />

                            {/* Layer 2: Direct High-Res Image (Unoptimized CDN Direct Cache Hit) */}
                            <Image
                              src={resolveImageSrc(selectedProject.galleryPhotos[activePhotoIndex].url, 1200)}
                              alt={selectedProject.galleryPhotos[activePhotoIndex].caption || selectedProject.clientName}
                              fill
                              unoptimized
                              priority
                              draggable={false}
                              sizes="(max-width: 1280px) 100vw, 1200px"
                              className="pointer-events-none select-none relative size-full object-contain"
                            />
                          </motion.div>
                        </AnimatePresence>

                        {/* Navigasi Kiri / Kanan Foto */}
                        {selectedProject.galleryPhotos.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={handlePrevPhoto}
                              aria-label="Foto sebelumnya"
                              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex size-10 sm:size-12 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition hover:bg-gold hover:text-ink hover:scale-105 active:scale-95"
                            >
                              <ChevronLeft className="size-6 sm:size-7" />
                            </button>
                            <button
                              type="button"
                              onClick={handleNextPhoto}
                              aria-label="Foto selanjutnya"
                              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex size-10 sm:size-12 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition hover:bg-gold hover:text-ink hover:scale-105 active:scale-95"
                            >
                              <ChevronRight className="size-6 sm:size-7" />
                            </button>
                          </>
                        )}
                      </div>
                    )}

                    {/* Thumbnail Carousel Bawah */}
                    {selectedProject.galleryPhotos && selectedProject.galleryPhotos.length > 1 && (
                      <div 
                        ref={thumbnailContainerRef}
                        className="flex gap-2.5 overflow-x-auto py-2 px-1 [scrollbar-width:none] scroll-smooth"
                      >
                        {selectedProject.galleryPhotos.map((photo, i) => (
                          <button
                            key={photo.id}
                            type="button"
                            onClick={() => handleSelectPhoto(i)}
                            className={cn(
                              "relative aspect-[4/3] w-16 sm:w-20 shrink-0 select-none overflow-hidden rounded-xl border-2 transition-all duration-200",
                              activePhotoIndex === i
                                ? "border-gold ring-2 ring-gold/40 shadow-lg shadow-gold/20 scale-[1.03]"
                                : "border-white/10 opacity-50 hover:opacity-100 hover:border-white/30"
                            )}
                            onContextMenu={(e) => e.preventDefault()}
                          >
                            <Image
                              src={resolveImageSrc(photo.url, 300)}
                              alt=""
                              fill
                              unoptimized
                              draggable={false}
                              className="pointer-events-none select-none object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Modal: Proteksi & Tombol Tutup Jelas */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4 mt-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <ShieldAlert className="size-4 text-gold shrink-0" />
                    <span className="font-medium tracking-wide">Protected Image &amp; Media — Fotonic Project</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto rounded-full border border-white/15 bg-white/[0.05] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-white/15 hover:border-white/30"
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
