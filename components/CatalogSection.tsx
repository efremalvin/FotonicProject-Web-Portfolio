"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Camera,
  ExternalLink,
  Film,
  FolderOpen,
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
  type CatalogPhoto,
  type ServiceType,
} from "@/data/catalog";
import { resolveImageSrc, getDriveVideoEmbedUrl } from "@/lib/driveHelper";
import { cn } from "@/lib/utils";

type FilterType = "all" | ServiceType;

export default function CatalogSection() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedProject, setSelectedProject] = useState<CatalogProject | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const filteredProjects = useMemo(() => {
    if (filter === "all") return CATALOG_PROJECTS;
    return CATALOG_PROJECTS.filter((p) => p.serviceType === filter);
  }, [filter]);

  function handleOpenProject(project: CatalogProject) {
    setSelectedProject(project);
    setActivePhotoIndex(0);
  }

  function handleCloseModal() {
    setSelectedProject(null);
    setActivePhotoIndex(0);
  }

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
                      className="absolute inset-0 rounded-full bg-gold"
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
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isVideo = project.serviceType === "video";
              const imageSrc = resolveImageSrc(project.thumbnail);
              const photoCount = project.galleryPhotos?.length || 1;

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  onClick={() => handleOpenProject(project)}
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-card transition-all duration-300 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/5"
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
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE CATALOG MODAL (DETAIL KLIEN & GALERI FOTO TERPROTEKSI) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-ink-card shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold">
                      {selectedProject.clientName}
                    </span>
                    <span className="text-zinc-500">·</span>
                    <span className="text-xs text-zinc-400">{selectedProject.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    {selectedProject.eventName}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6">
                {selectedProject.serviceType === "video" ? (
                  /* Video Player Preview */
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-inner">
                    {getDriveVideoEmbedUrl(selectedProject.driveUrl) ? (
                      <iframe
                        src={getDriveVideoEmbedUrl(selectedProject.driveUrl)!}
                        title={selectedProject.eventName}
                        allow="autoplay"
                        className="size-full border-0"
                      />
                    ) : (
                      <div className="flex size-full flex-col items-center justify-center gap-3 p-4 text-center">
                        <p className="text-sm text-zinc-400">
                          Video preview tersimpan di Google Drive:
                        </p>
                        <a
                          href={selectedProject.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-wa py-2 text-xs"
                        >
                          Buka Video di Google Drive
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Photo Gallery Showcase Terproteksi */
                  <div>
                    {/* Foto Utama Aktif */}
                    {selectedProject.galleryPhotos && selectedProject.galleryPhotos.length > 0 && (
                      <div 
                        className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl bg-black"
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <Image
                          src={resolveImageSrc(selectedProject.galleryPhotos[activePhotoIndex].url, 1600)}
                          alt={selectedProject.galleryPhotos[activePhotoIndex].caption || selectedProject.clientName}
                          fill
                          draggable={false}
                          priority
                          sizes="(max-width: 1024px) 100vw, 850px"
                          className="pointer-events-none select-none object-contain"
                        />

                        {/* Navigasi Kiri / Kanan Foto */}
                        {selectedProject.galleryPhotos.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                setActivePhotoIndex((prev) =>
                                  prev === 0 ? selectedProject.galleryPhotos!.length - 1 : prev - 1
                                )
                              }
                              className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-gold hover:text-ink"
                            >
                              <ChevronLeft className="size-6" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setActivePhotoIndex((prev) =>
                                  prev === selectedProject.galleryPhotos!.length - 1 ? 0 : prev + 1
                                )
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-gold hover:text-ink"
                            >
                              <ChevronRight className="size-6" />
                            </button>
                          </>
                        )}

                        {/* Caption Bar & Proteksi Badge */}
                        <div className="pointer-events-none absolute bottom-0 inset-x-0 flex items-center justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-xs">
                          <span className="font-medium text-white">
                            {selectedProject.galleryPhotos[activePhotoIndex].caption || `Foto ${activePhotoIndex + 1} dari ${selectedProject.galleryPhotos.length}`}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                            <ShieldAlert className="size-3 text-gold" />
                            <span>Protected Preview</span>
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Thumbnail Carousel Bawah */}
                    {selectedProject.galleryPhotos && selectedProject.galleryPhotos.length > 1 && (
                      <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
                        {selectedProject.galleryPhotos.map((photo, i) => (
                          <button
                            key={photo.id}
                            type="button"
                            onClick={() => setActivePhotoIndex(i)}
                            className={cn(
                              "relative aspect-[4/3] w-20 shrink-0 select-none overflow-hidden rounded-xl border-2 transition",
                              activePhotoIndex === i
                                ? "border-gold shadow-md shadow-gold/30"
                                : "border-white/10 opacity-60 hover:opacity-100"
                            )}
                            onContextMenu={(e) => e.preventDefault()}
                          >
                            <Image
                              src={resolveImageSrc(photo.url, 300)}
                              alt=""
                              fill
                              draggable={false}
                              className="pointer-events-none select-none object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Info Deskripsi & Keamanan */}
                <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs text-zinc-400">{selectedProject.description}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-[11px] text-zinc-500">
                      <ShieldAlert className="size-3 text-gold" />
                      <span>Hak cipta &amp; dokumentasi dilindungi oleh Fotonic Project. Mode pratinjau aman tanpa unduhan.</span>
                    </p>
                  </div>

                  <a
                    href={selectedProject.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-semibold text-gold transition hover:bg-gold hover:text-ink"
                  >
                    <FolderOpen className="size-3.5" />
                    <span>Lihat di Drive Folder Klien</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
