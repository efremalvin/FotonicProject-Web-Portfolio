/**
 * Data Katalog Showcase Hasil Foto & Video Fotonic
 * Setiap subfolder klien memiliki daftar foto galeri (sample gallery) yang dapat
 * dibuka dan dilihat langsung secara interaktif di modal tanpa bisa didownload.
 */

export type ServiceType = "foto" | "video";
export type CategoryType = "single" | "group" | "sidang" | "wedding";

export interface CatalogPhoto {
  id: string;
  url: string;
  caption?: string;
  orientation?: "landscape" | "portrait" | "square";
}

export interface CatalogProject {
  id: string;
  clientName: string;
  eventName: string;
  date: string; // misal "12 Oktober 2026"
  serviceType: ServiceType; // "foto" | "video"
  category: CategoryType;
  /** Paket yang dipesan (misal Single, Group, Sidang, Custom) */
  packageName?: string;
  /** Link subfolder Google Drive proyek klien ini */
  driveUrl: string;
  /** Thumbnail utama representasi karya */
  thumbnail: string;
  description: string;
  highlights?: string[];
  /** Kumpulan foto-foto dari subfolder client yang sama untuk dilihat di modal */
  galleryPhotos?: CatalogPhoto[];
}

/**
 * Helper untuk parsing otomatis nama subfolder Google Drive dengan format:
 * "namaclient, tanggalshoot, jenisjasa, paketyangdipesan"
 * Contoh: "Arya Saputra, 12 Okt 2026, foto, Paket Sidang"
 */
export function parseSubfolderName(folderName: string): Partial<CatalogProject> {
  const parts = folderName.split(",").map((s) => s.trim());
  if (parts.length < 4) return {};

  const [clientName, date, rawService, packageName] = parts;
  const serviceType: ServiceType = rawService.toLowerCase().includes("video") ? "video" : "foto";
  
  let category: CategoryType = "sidang";
  const packLower = packageName.toLowerCase();
  if (packLower.includes("single")) category = "single";
  else if (packLower.includes("group")) category = "group";
  else if (packLower.includes("sidang")) category = "sidang";
  else if (packLower.includes("wedding")) category = "wedding";

  return {
    clientName,
    date,
    serviceType,
    packageName,
    eventName: `${packageName} — ${clientName}`,
    category,
  };
}

export const CATALOG_PROJECTS: CatalogProject[] = [
  {
    id: "proj-1",
    clientName: "Arya & Rekan",
    eventName: "Sidang Sarjana & Yudisium",
    date: "12 Oktober 2026",
    serviceType: "foto",
    category: "sidang",
    driveUrl: "https://drive.google.com/drive/folders/CONTOH_ID_SUBFOLDER_ARYA",
    thumbnail: "/images/hero-bg.jpg",
    description: "Sesi foto outdoor dan indoor saat momen kelulusan, dengan framing siluet dramatis dan candid hangat.",
    highlights: ["Spot Luar Ruangan", "20 Foto Final Edit", "Graduation Cap & Gown"],
    galleryPhotos: [
      { id: "p1-1", url: "/images/hero-bg.jpg", caption: "Siluet Golden Hour Wisuda" },
      { id: "p1-2", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80", caption: "Perayaan Selebrasi Bersama Rekan" },
      { id: "p1-3", url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80", caption: "Momen Penyerahan Selempang & Bunga" },
      { id: "p1-4", url: "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?auto=format&fit=crop&w=1200&q=80", caption: "Potret Resmi Toga Sarjana" },
    ],
  },
  {
    id: "proj-2",
    clientName: "Nadia & Friends",
    eventName: "Group & Friendship Session",
    date: "05 Oktober 2026",
    serviceType: "foto",
    category: "group",
    driveUrl: "https://drive.google.com/drive/folders/CONTOH_ID_SUBFOLDER_NADIA",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=75",
    description: "Dokumentasi kebersamaan sahabat dengan beragam pose interaktif, canda tawa, dan ekspresi natural.",
    highlights: ["3 Spot Foto", "15 Foto Final Edit", "Outdoor Natural Light"],
    galleryPhotos: [
      { id: "p2-1", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80", caption: "Kebersamaan Sahabat di Taman" },
      { id: "p2-2", url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80", caption: "Pose Ceria & Tertawa Bersama" },
      { id: "p2-3", url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80", caption: "Candid Sunset Conversation" },
    ],
  },
  {
    id: "proj-3",
    clientName: "Dimas Pratama",
    eventName: "Single Portrait & Graduation",
    date: "28 September 2026",
    serviceType: "foto",
    category: "single",
    driveUrl: "https://drive.google.com/drive/folders/CONTOH_ID_SUBFOLDER_DIMAS",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=75",
    description: "Portrait personal branding dengan tone warna sinematik saat golden hour dan framing editorial.",
    highlights: ["Portrait Edit", "High-res Master Files", "Studio & Outdoor"],
    galleryPhotos: [
      { id: "p3-1", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80", caption: "Close-up Editorial Lighting" },
      { id: "p3-2", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80", caption: "Medium Shot Casual Suit" },
      { id: "p3-3", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80", caption: "Warm Golden Tone Outdoor" },
    ],
  },
  {
    id: "proj-4",
    clientName: "Rizky & Tim",
    eventName: "Cinematic Highlight Reels",
    date: "18 September 2026",
    serviceType: "video",
    category: "sidang",
    driveUrl: "https://drive.google.com/file/d/CONTOH_ID_VIDEO_PREVIEW/view",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=900&q=75",
    description: "Video teaser vertikal 60 detik (Reels/TikTok) dengan sentuhan slow-motion dan color grade warm.",
    highlights: ["Full HD 60fps", "Color Graded", "Music Licensed"],
    galleryPhotos: [
      { id: "p4-1", url: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80", caption: "Behind The Scenes Sesi Video" },
      { id: "p4-2", url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80", caption: "Still Frame Slow-Motion Cut" },
    ],
  },
];
