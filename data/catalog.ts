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
  /** Rasio video: "portrait" (9:16) atau "landscape" (16:9) */
  videoAspectRatio?: "portrait" | "landscape";
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
    clientName: "Ripda",
    eventName: "Seminar & Sidang — Ripda",
    date: "7 Juli 2026",
    serviceType: "foto",
    category: "sidang",
    packageName: "Seminar & Sidang",
    driveUrl: "https://drive.google.com/drive/folders/1_UlPT8alsh9nIjwKoflciVfdVxKEBBmC",
    thumbnail: "https://lh3.googleusercontent.com/d/1UOs4KC5zex2Cf0PPi2FAsBpBBFno5PX9=w900",
    description: "Dokumentasi sesi foto wisuda & sidang untuk Ripda. Dilindungi hak cipta Fotonic Project.",
    highlights: ["6 Foto Final", "Outdoor & Indoor Shoot", "High-Resolution Output"],
    galleryPhotos: [
      { id: "1UOs4KC5zex2Cf0PPi2FAsBpBBFno5PX9", url: "https://lh3.googleusercontent.com/d/1UOs4KC5zex2Cf0PPi2FAsBpBBFno5PX9=w1600", caption: "Ripda — Foto 1" },
      { id: "1C8OhEePHvHScy-0uF-YICc_oJKtGd--j", url: "https://lh3.googleusercontent.com/d/1C8OhEePHvHScy-0uF-YICc_oJKtGd--j=w1600", caption: "Ripda — Foto 2" },
      { id: "1NnEMi2kJgt-EJ8CsgTDCWTuUdHIwldzc", url: "https://lh3.googleusercontent.com/d/1NnEMi2kJgt-EJ8CsgTDCWTuUdHIwldzc=w1600", caption: "Ripda — Foto 3" },
      { id: "165l0vcJK2eJa0dMZ1fn1tUQPSY9La_fE", url: "https://lh3.googleusercontent.com/d/165l0vcJK2eJa0dMZ1fn1tUQPSY9La_fE=w1600", caption: "Ripda — Foto 4" },
      { id: "1eZ0O8B3CkNc4a_5Lf2WjXl39m0u9Gkd0", url: "https://lh3.googleusercontent.com/d/1eZ0O8B3CkNc4a_5Lf2WjXl39m0u9Gkd0=w1600", caption: "Ripda — Foto 5" },
      { id: "1hIbOisANjB7bYOVFpQbS1Avoiaao5ws3", url: "https://lh3.googleusercontent.com/d/1hIbOisANjB7bYOVFpQbS1Avoiaao5ws3=w1600", caption: "Ripda — Foto 6" },
    ],
  },
  {
    id: "proj-2",
    clientName: "Lauren",
    eventName: "Seminar & Sidang — Lauren",
    date: "8 Juni 2026",
    serviceType: "foto",
    category: "sidang",
    packageName: "Seminar & Sidang",
    driveUrl: "https://drive.google.com/drive/folders/1g1kj22jUGD0FD0tVsH5Nrp8l_RHScZLX",
    thumbnail: "https://lh3.googleusercontent.com/d/1r0p_Eo-URWs15DJwGW3E1aj5gpl-4xcz=w900",
    description: "Dokumentasi sesi foto perayaan kelulusan sidang sarjana untuk Lauren.",
    highlights: ["5 Foto Final", "Outdoor Natural Lighting", "Graduation Moment"],
    galleryPhotos: [
      { id: "1r0p_Eo-URWs15DJwGW3E1aj5gpl-4xcz", url: "https://lh3.googleusercontent.com/d/1r0p_Eo-URWs15DJwGW3E1aj5gpl-4xcz=w1600", caption: "Lauren — Foto 1" },
      { id: "14zMFTwzjVCWp3GoYrcBH7eYLjRVwRpyi", url: "https://lh3.googleusercontent.com/d/14zMFTwzjVCWp3GoYrcBH7eYLjRVwRpyi=w1600", caption: "Lauren — Foto 2" },
      { id: "1SzmP3Qmzi5CaMVsBHKDF7tOaT7Y1tIum", url: "https://lh3.googleusercontent.com/d/1SzmP3Qmzi5CaMVsBHKDF7tOaT7Y1tIum=w1600", caption: "Lauren — Foto 3" },
      { id: "1zZo_wsYkcrT6rdfCqudryyje6tuNIf5_", url: "https://lh3.googleusercontent.com/d/1zZo_wsYkcrT6rdfCqudryyje6tuNIf5_=w1600", caption: "Lauren — Foto 4" },
      { id: "14rVQcaoQUTACjsfjWy8L7f0qQOIxtodW", url: "https://lh3.googleusercontent.com/d/14rVQcaoQUTACjsfjWy8L7f0qQOIxtodW=w1600", caption: "Lauren — Foto 5" },
    ],
  },
  {
    id: "proj-3",
    clientName: "Felix",
    eventName: "Group Packet — Felix",
    date: "19 Juli 2025",
    serviceType: "foto",
    category: "group",
    packageName: "Group Packet",
    driveUrl: "https://drive.google.com/drive/folders/16WtQMTS2WS7wTnlxRqzqtdjEqGm_X2px",
    thumbnail: "https://lh3.googleusercontent.com/d/1pcjrW8UkYQKR_dFv2TATRPb_opHmyDwN=w900",
    description: "Dokumentasi kebersamaan sahabat dan rekan wisuda bersama Felix.",
    highlights: ["Group Session", "6 Foto Final", "Outdoor Creative Tone"],
    galleryPhotos: [
      { id: "1pcjrW8UkYQKR_dFv2TATRPb_opHmyDwN", url: "https://lh3.googleusercontent.com/d/1pcjrW8UkYQKR_dFv2TATRPb_opHmyDwN=w1600", caption: "Felix — Foto 1" },
      { id: "1mfJjyPX1M6FZAX8FmOD03Ovj0hiM4z_o", url: "https://lh3.googleusercontent.com/d/1mfJjyPX1M6FZAX8FmOD03Ovj0hiM4z_o=w1600", caption: "Felix — Foto 2" },
      { id: "1Ly7Tp5gFL_u0lU-QH7TchgqrAhOwBAx5", url: "https://lh3.googleusercontent.com/d/1Ly7Tp5gFL_u0lU-QH7TchgqrAhOwBAx5=w1600", caption: "Felix — Foto 3" },
      { id: "1qiD1EEGXQ8zpAEgPEgW_vi5VKVl3mHXB", url: "https://lh3.googleusercontent.com/d/1qiD1EEGXQ8zpAEgPEgW_vi5VKVl3mHXB=w1600", caption: "Felix — Foto 4" },
      { id: "1ip628zG1mpQ30znlt7CTmy_L4YAbyxrR", url: "https://lh3.googleusercontent.com/d/1ip628zG1mpQ30znlt7CTmy_L4YAbyxrR=w1600", caption: "Felix — Foto 5" },
      { id: "1DRRNRnct2kM-nqJDXi7wCeXQPdj55fHC", url: "https://lh3.googleusercontent.com/d/1DRRNRnct2kM-nqJDXi7wCeXQPdj55fHC=w1600", caption: "Felix — Foto 6" },
    ],
  },
  {
    id: "proj-4",
    clientName: "Derby",
    eventName: "Single Packet — Derby",
    date: "23 Agustus 2025",
    serviceType: "foto",
    category: "single",
    packageName: "Single Packet",
    driveUrl: "https://drive.google.com/drive/folders/1H0grfonCccHsd6PayAi0rorGFaonE9pE",
    thumbnail: "https://lh3.googleusercontent.com/d/13S2fyG8XIikP8Rkih_NWIDjIXLTssYHb=w900",
    description: "Dokumentasi potret individual personal & graduation session untuk Derby.",
    highlights: ["Single Portrait", "Cinematic Bokeh", "High-Resolution Output"],
    galleryPhotos: [
      { id: "13S2fyG8XIikP8Rkih_NWIDjIXLTssYHb", url: "https://lh3.googleusercontent.com/d/13S2fyG8XIikP8Rkih_NWIDjIXLTssYHb=w1600", caption: "Derby — Foto 1" },
      { id: "1RiLVqX9QBdIiuwT6jfDpbyTOStmKZOUX", url: "https://lh3.googleusercontent.com/d/1RiLVqX9QBdIiuwT6jfDpbyTOStmKZOUX=w1600", caption: "Derby — Foto 2" },
      { id: "1co0xwI-_73dDFoY9Bi5w8uS2T8J0JzLv", url: "https://lh3.googleusercontent.com/d/1co0xwI-_73dDFoY9Bi5w8uS2T8J0JzLv=w1600", caption: "Derby — Foto 3" },
      { id: "1YJizwYvPPLCb7Hk1XaJncqsC9-HJcp8y", url: "https://lh3.googleusercontent.com/d/1YJizwYvPPLCb7Hk1XaJncqsC9-HJcp8y=w1600", caption: "Derby — Foto 4" },
    ],
  },
  {
    id: "proj-5",
    clientName: "Agatha",
    eventName: "Paket Sidang — Agatha",
    date: "9 September 2026",
    serviceType: "video",
    category: "sidang",
    packageName: "Paket Sidang",
    driveUrl: "https://drive.google.com/file/d/1H2sK8jVijq5uPQPK8nqmzI2LrTlVcH0p/view",
    thumbnail: "https://lh3.googleusercontent.com/d/1H2sK8jVijq5uPQPK8nqmzI2LrTlVcH0p=w900",
    description: "Dokumentasi cinematic highlight video untuk sesi perayaan sidang Agatha.",
    highlights: ["Full HD Sinematik", "Reels Video", "Color Graded"],
    videoAspectRatio: "portrait",
  },
];
