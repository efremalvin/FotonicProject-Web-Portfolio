/**
 * Konfigurasi brand & kontak Fotonic. Ubah di sini untuk memperbarui seluruh situs.
 */
export const siteConfig = {
  name: "Fotonic",
  subtitle: "Photo & Video Project",
  fullName: "Fotonic - Photo & Video Project",
  description:
    "Price list resmi Fotonic Photo & Video Project — paket foto Single, Group, Seminar & Sidang, serta add-on. Booking mudah langsung via WhatsApp.",
  url: "https://fotonic.vercel.app",
  /** Nomor WhatsApp admin, format internasional tanpa "+" atau spasi. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890",
  instagram: {
    handle: "@fotonicproject",
    url: "https://www.instagram.com/fotonicproject",
  },
} as const;

/** Nomor WhatsApp dalam format tampilan, mis. "+62 812-3456-7890". */
export function displayPhone(phone: string = siteConfig.whatsappNumber): string {
  return `+${phone.replace(/\D/g, "").replace(/^(\d{2})(\d{3})(\d{4})(\d+)$/, "$1 $2-$3-$4")}`;
}
