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
    name: "Single Wisuda",
    categoryTitle: "Paket Wisuda Individu",
    startingPrice: 100_000,
    spots: "Mulai 1 - 5 Spot Foto",
    editedPhotos: "5 - 15 Foto Final Edit",
    description: "Sesi foto wisuda khusus individu / portrait sarjana dengan toga lengkap dan personal branding.",
    features: [
      "Spot foto fleksibel area kampus / outdoor",
      "Foto edit profesional resolusi tinggi",
      DELIVERY_NOTE,
      PROMO_BONUS,
    ],
  },
  {
    id: "group",
    name: "Group Wisuda",
    categoryTitle: "Sesi Bersama Teman / Keluarga",
    startingPrice: 250_000,
    spots: "Mulai 1 - 5 Spot Foto",
    editedPhotos: "10 - 20 Foto Final Edit",
    description: "Sesi foto wisuda spesial bersama teman-teman terdekat atau momen hangat keluarga besar.",
    badge: "Favorit Bersama",
    features: [
      "Bebas ganti spot foto & konsep pose bersama teman/keluarga",
      "Foto edit kombinasi grup & individu pilihan",
      DELIVERY_NOTE,
      PROMO_BONUS,
    ],
  },
  {
    id: "sidang",
    name: "Seminar & Sidang",
    categoryTitle: "Paket Sempro, Semhas & Kompre",
    startingPrice: 80_000,
    spots: "Mulai 1 - 5 Spot Foto",
    editedPhotos: "10 - 20 Foto Final Edit",
    description: "Paket khusus abadikan momen seminar proposal (sempro), seminar hasil (semhas), hingga sidang komprehensif.",
    badge: "Paling Populer",
    features: [
      "Dokumentasi selebrasi pasca sempro, semhas & kompre",
      "Foto bersama dosen penguji, rekan, dan selempang",
      DELIVERY_NOTE,
      PROMO_BONUS,
    ],
  },
];

/** Format angka ke Rupiah, mis. 80000 -> "Rp 80.000". */
export function formatRupiah(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}
