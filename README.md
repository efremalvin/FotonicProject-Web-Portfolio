# Fotonic — Photo & Video Project

Website **price list & booking** resmi Fotonic Photo & Video Project ([@fotonicproject](https://www.instagram.com/fotonicproject)). Halaman ringkas, cepat (100% statis), dan setiap paket bisa langsung dipesan via WhatsApp.

**Stack:** Next.js (App Router, TypeScript) · Tailwind CSS v4 · Framer Motion · Lucide React · Deploy di Vercel

## ✨ Fitur
- **Header**: identitas Fotonic, tautan Instagram @fotonicproject, dan tombol chat admin.
- **Price List interaktif**: tab *Single*, *Group*, *Seminar & Sidang*, dan *Add-On*. Kartu paket menampilkan harga tebal, checklist fasilitas, dan keterangan pengiriman via Google Drive.
- **Form booking modal**: nama, rencana tanggal, serta add-on opsional dengan estimasi total. Setelah diisi, klien dialihkan ke WhatsApp dengan pesan yang sudah tersusun rapi.
- **Catatan & Ketentuan**: pengiriman file via Google Drive dan One Day Service (Express Edit).
- **Footer**: kontak WhatsApp, Instagram, dan hak cipta.

## 🗂️ Struktur
```
app/            layout.tsx · page.tsx · globals.css
components/     Navbar · PriceList · PriceCard · AddonSection · BookingModal · Notes · Footer
data/           pricelist.ts      ← SEMUA harga & paket diatur di sini
lib/            whatsapp.ts       ← generator link & pesan WhatsApp
                site.ts           ← nomor WA, Instagram, metadata
```

## ✏️ Mengubah Konten
| Kebutuhan | File |
| --- | --- |
| Harga, fasilitas, tambah/hapus paket atau add-on | `data/pricelist.ts` |
| Nomor WhatsApp admin | env `NEXT_PUBLIC_WHATSAPP_NUMBER` (atau default di `lib/site.ts`) |
| Format pesan WhatsApp | `lib/whatsapp.ts` → `buildBookingMessage()` |
| Teks catatan & ketentuan | `components/Notes.tsx` |

Contoh pesan yang terkirim:
```
Halo Admin Fotonic Project! Saya ingin booking Single Standard (60 Menit) seharga Rp 175.000. Mohon info ketersediaan jadwalnya.

Detail pemesanan:
• Nama: Andi
• Rencana tanggal: Sabtu, 24 Oktober 2026
• Add-on:
   - Cinematic Reels/TikTok Video (Rp 50.000)
• Estimasi total: Rp 225.000

Terima kasih 🙏
```

## 🚀 Menjalankan Secara Lokal
```bash
npm install
cp .env.example .env.local   # isi nomor WhatsApp admin
npm run dev                  # http://localhost:3000
npm run build                # cek build produksi
```
> **Windows PowerShell**: jika muncul *"running scripts is disabled"*, gunakan `npm.cmd run dev`.

## 🐙 Push ke GitHub
```bash
git add .
git commit -m "feat: revamp Fotonic price list & WhatsApp booking"
git branch -M main
git remote add origin https://github.com/<username>/fotonic-project.git   # sekali saja
git push -u origin main
```

## ▲ Deploy ke Vercel
1. Buka [vercel.com/new](https://vercel.com/new), lalu **Import Git Repository** dan pilih repo ini. Framework akan terdeteksi otomatis sebagai **Next.js**.
2. Di **Environment Variables**, tambahkan `NEXT_PUBLIC_WHATSAPP_NUMBER` = `62812xxxxxxxx` (format 62…, tanpa `+`/spasi).
3. Klik **Deploy**. Setelah itu, setiap `git push` ke `main` akan otomatis memperbarui website.
4. Jika mengubah env di Vercel, lakukan **Redeploy** agar nomor baru ikut ter-build.
5. (Opsional) Tambahkan domain kustom di **Settings → Domains**, lalu perbarui `url` di `lib/site.ts`.
