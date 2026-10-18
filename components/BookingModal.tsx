"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, MessageCircle, Sparkles, User, Video, X } from "lucide-react";
import { formatRupiah } from "@/data/pricelist";
import { buildBookingMessage, buildWhatsAppLink, type BookingItem } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";

interface BookingTarget extends BookingItem {
  kind: "package";
}

interface BookingContextValue {
  openBooking: (target: BookingTarget) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking harus dipakai di dalam <BookingProvider>");
  return ctx;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<BookingTarget | null>(null);
  const openBooking = useCallback((t: BookingTarget) => setTarget(t), []);
  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal target={target} onClose={() => setTarget(null)} />
    </BookingContext.Provider>
  );
}

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function BookingModal({ target, onClose }: { target: BookingTarget | null; onClose: () => void }) {
  const open = !!target;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {target && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
        >
          <motion.div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-[28px] border-t border-x border-white/10 bg-ink-soft p-5 pb-8 shadow-2xl sm:rounded-3xl sm:border sm:p-8"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Visual drag handle bar untuk mobile */}
            <div className="mx-auto -mt-1 mb-4 h-1.5 w-12 rounded-full bg-white/20 sm:hidden" />

            <BookingForm key={target.name} target={target} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BookingForm({ target, onClose }: { target: BookingTarget; onClose: () => void }) {
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");

  function redirect(withDetails: boolean) {
    const message = withDetails
      ? buildBookingMessage(target, {
          customerName,
          date,
        })
      : buildBookingMessage(target);
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    onClose();
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    redirect(true);
  }

  return (
    <>
      <button
        onClick={onClose}
        aria-label="Tutup"
        className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
      >
        <X className="size-5" />
      </button>

      <span className="eyebrow">
        <MessageCircle className="size-3.5" /> Form Booking Paket
      </span>
      <h2 id="booking-title" className="mt-3 pr-8 font-display text-2xl leading-snug text-white">
        {target.name}
      </h2>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-xs uppercase tracking-wider text-zinc-400">Mulai dari</span>
        <span className="text-xl font-bold text-gold">{formatRupiah(target.price)}</span>
      </div>

      {/* Promo banner info */}
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-300">
        <Video className="size-4 shrink-0 text-emerald-400" />
        <span>Termasuk Promo FREE Video Reels / Shorts Sinematik!</span>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-400">
            <User className="size-3.5" /> Nama lengkap
          </span>
          <input
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Nama Anda"
            autoComplete="name"
            className="input-field"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-400">
            <CalendarDays className="size-3.5" /> Rencana tanggal sesi
          </span>
          <input
            type="date"
            required
            min={todayISO()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field [color-scheme:dark]"
          />
        </label>

        <button type="submit" className="btn-wa w-full py-3.5">
          <WhatsAppIcon size={18} /> Lanjut Booking ke WhatsApp
        </button>
        <button
          type="button"
          onClick={() => redirect(false)}
          className="w-full text-center text-xs text-zinc-500 underline-offset-4 transition hover:text-zinc-300 hover:underline"
        >
          Lewati form, langsung chat admin
        </button>
      </form>
    </>
  );
}
