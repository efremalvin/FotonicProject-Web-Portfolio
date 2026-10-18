import { formatRupiah } from "@/data/pricelist";
import { siteConfig } from "@/lib/site";

export interface BookingItem {
  name: string;
  price: number;
}

export interface BookingDetails {
  /** Nama klien. */
  customerName?: string;
  /** Rencana tanggal dalam format YYYY-MM-DD (dari <input type="date">). */
  date?: string;
  /** Add-on tambahan yang dipilih. */
  addOns?: BookingItem[];
  /** Catatan bebas dari klien. */
  notes?: string;
}

/** Ubah "2026-10-24" menjadi "Sabtu, 24 Oktober 2026". */
export function formatIndonesianDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Menyusun pesan booking berbahasa Indonesia.
 *
 * Kalimat pembuka selalu:
 *   "Halo Admin Fotonic Project! Saya ingin booking [Nama Paket] seharga [Harga].
 *    Mohon info ketersediaan jadwalnya."
 * Detail (nama, tanggal, add-on, total) ditambahkan bila diisi melalui form.
 */
export function buildBookingMessage(item: BookingItem, details: BookingDetails = {}): string {
  const lines: string[] = [
    `Halo Admin Fotonic Project! Saya ingin booking ${item.name} seharga ${formatRupiah(item.price)}. Mohon info ketersediaan jadwalnya.`,
  ];

  const addOns = details.addOns ?? [];
  const detailLines: string[] = [];
  if (details.customerName?.trim()) detailLines.push(`• Nama: ${details.customerName.trim()}`);
  if (details.date) detailLines.push(`• Rencana tanggal: ${formatIndonesianDate(details.date)}`);
  if (addOns.length > 0) {
    detailLines.push("• Add-on:");
    for (const a of addOns) detailLines.push(`   - ${a.name} (${formatRupiah(a.price)})`);
    const total = item.price + addOns.reduce((sum, a) => sum + a.price, 0);
    detailLines.push(`• Estimasi total: ${formatRupiah(total)}`);
  }
  if (details.notes?.trim()) detailLines.push(`• Catatan: ${details.notes.trim()}`);

  if (detailLines.length > 0) {
    lines.push("", "Detail pemesanan:", ...detailLines);
  }
  lines.push("", "Terima kasih 🙏");

  return lines.join("\n");
}

/** Membuat tautan wa.me dengan teks yang sudah di-encode. */
export function buildWhatsAppLink(message: string, phone: string = siteConfig.whatsappNumber): string {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/** Shortcut: langsung menghasilkan link booking WhatsApp untuk sebuah paket/add-on. */
export function getBookingLink(item: BookingItem, details?: BookingDetails): string {
  return buildWhatsAppLink(buildBookingMessage(item, details));
}

/** Link chat umum (tanpa paket tertentu). */
export function getGeneralChatLink(): string {
  return buildWhatsAppLink(
    "Halo Admin Fotonic Project! Saya ingin bertanya mengenai paket foto. Mohon infonya ya. Terima kasih 🙏",
  );
}
