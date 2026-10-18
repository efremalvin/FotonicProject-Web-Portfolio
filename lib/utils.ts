import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Menggabungkan className Tailwind secara aman (menghapus konflik kelas). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
