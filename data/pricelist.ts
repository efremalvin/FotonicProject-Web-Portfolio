/**
 * Price list resmi Fotonic - Photo & Video Project.
 * 3 Paket Utama (Single, Group, Sidang) dengan harga "Start From", tanpa durasi,
 * dan promo gratis Video Reels/Shorts pada masing-masing paket!
 */

export interface MainPackage {
  id: "single" | "group" | "sidang";
  name: string;
  categoryTitle: string;
  startingPrice: number;
  spots: string;
  editedPhotos: string;
  description: string;
  badge?: string;
  features: string[];
}

export const PROMO_BONUS = "FREE Video Reels / Shorts (Cinematic 15-60s)";
export const DELIVERY_NOTE = "All Files RAW & JPG via Google Drive";

export const MAIN_PACKAGES: MainPackage[] = [
  {
    id: "single",
    name: "Single Packet",
    categoryTitle: "Sesi Personal & Portrait",
    startingPrice: 100_000,
    spots: "Mulai 1 - 5 Spot Foto",
    editedPhotos: "5 - 15 Foto Final Edit",
    description: "Sesi foto personal, wisuda individu, portrait editorial, dan personal branding.",
    features: [
      "Spot foto fleksibel sesuai kebutuhan",
      "Foto edit profesional high-res",
      DELIVERY_NOTE,
      PROMO_BONUS,
    ],
  },
  {
    id: "group",
    name: "Group Packet",
    categoryTitle: "Sesi Sahabat & Keluarga",
    startingPrice: 250_000,
    spots: "Mulai 1 - 5 Spot Foto",
    editedPhotos: "10 - 20 Foto Final Edit",
    description: "Untuk foto bersama sahabat, keluarga, organisasi, atau tim kerja.",
    badge: "Favorit Bersama",
    features: [
      "Bebas ganti spot foto & konsep pose",
      "Foto edit grup & individu pilihan",
      DELIVERY_NOTE,
      PROMO_BONUS,
    ],
  },
  {
    id: "sidang",
    name: "Seminar & Sidang",
    categoryTitle: "Momen Kelulusan & Skripsi",
    startingPrice: 80_000,
    spots: "Mulai 1 - 5 Spot Foto",
    editedPhotos: "10 - 20 Foto Final Edit",
    description: "Abadikan euforia kelulusan seminar proposal, sidang sarjana, hingga yudisium.",
    badge: "Paling Populer",
    features: [
      "Dokumentasi lengkap momen wisuda/sidang",
      "Foto bersama keluarga & rekan kampus",
      DELIVERY_NOTE,
      PROMO_BONUS,
    ],
  },
];

/** Format angka ke Rupiah, mis. 80000 -> "Rp 80.000". */
export function formatRupiah(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}
