import { CalendarCheck, HardDriveDownload, Info, Video, type LucideIcon } from "lucide-react";

const NOTES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: HardDriveDownload,
    title: "Pengiriman File via Google Drive",
    body: "Seluruh file mentah (RAW & JPG) beserta hasil edit dikirimkan secara aman melalui tautan Google Drive pribadi. Mohon segera unduh dan simpan file Anda setelah tautan diterima.",
  },
  {
    icon: Video,
    title: "Spesial Promo Free Video Reels",
    body: "Setiap paket pemesanan sudah termasuk bonus pengambilan video sinematik vertikal (Reels/TikTok) 15-60 detik dengan efek slow-motion dan color grading.",
  },
  {
    icon: CalendarCheck,
    title: "Booking Jadwal",
    body: "Jadwal dikonfirmasi oleh admin melalui WhatsApp sesuai ketersediaan slot. Disarankan melakukan booking beberapa hari sebelum tanggal sesi berlangsung.",
  },
  {
    icon: Info,
    title: "Pemilihan Foto Edit",
    body: "Setelah sesi selesai, Anda dapat memilih sendiri foto favorit yang akan diedit sesuai jumlah kuota jatah paket yang dipilih.",
  },
];

export default function Notes() {
  return (
    <section id="ketentuan" className="border-t border-white/5 bg-ink-soft">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="text-center">
          <span className="eyebrow">Info Penting</span>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Catatan Penting
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {NOTES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-ink-card p-5 sm:p-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
