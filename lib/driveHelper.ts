/**
 * driveHelper.ts
 * Utilitas untuk mengonversi link/ID sharing Google Drive publik menjadi:
 * - Direct image URL (lh3.googleusercontent.com)
 * - Video embed preview (drive.google.com/file/d/.../preview)
 * - Folder embed view & direct view
 */

const DRIVE_ID_REGEX = /^[a-zA-Z0-9_-]{25,}$/;

const DRIVE_HOSTS = [
  "drive.google.com",
  "docs.google.com",
  "lh3.googleusercontent.com",
];

export function isDriveId(value: string | null | undefined): boolean {
  return !!value && DRIVE_ID_REGEX.test(value);
}

export function isDriveUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  try {
    const { hostname } = new URL(value);
    return DRIVE_HOSTS.includes(hostname);
  } catch {
    return false;
  }
}

export function extractDriveId(input: string | null | undefined): string | null {
  if (!input) return null;
  const value = input.trim();

  if (isDriveId(value)) return value;

  const patterns: RegExp[] = [
    /\/file\/d\/([a-zA-Z0-9_-]{25,})/,
    /\/folders\/([a-zA-Z0-9_-]{25,})/,
    /\/d\/([a-zA-Z0-9_-]{25,})/,
    /[?&]id=([a-zA-Z0-9_-]{25,})/,
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

export function getDriveImageUrl(idOrUrl: string, width = 1600): string | null {
  const id = extractDriveId(idOrUrl);
  if (!id) return null;
  return `https://lh3.googleusercontent.com/d/${id}=w${Math.round(width)}`;
}

export function getDriveVideoEmbedUrl(idOrUrl: string): string | null {
  const id = extractDriveId(idOrUrl);
  if (!id) return null;
  return `https://drive.google.com/file/d/${id}/preview`;
}

export function getDriveVideoStreamUrl(idOrUrl: string): string | null {
  const id = extractDriveId(idOrUrl);
  if (!id) return null;
  return `/api/video-stream?fileId=${id}`;
}

export function getDriveFolderUrl(idOrUrl: string): string | null {
  const id = extractDriveId(idOrUrl);
  if (!id) return null;
  return `https://drive.google.com/drive/folders/${id}`;
}

export function resolveImageSrc(src: string, width = 1200): string {
  if (!src) return "";
  if (src.startsWith("/")) return src;
  if (isDriveUrl(src) || isDriveId(src)) {
    return getDriveImageUrl(src, width) ?? src;
  }
  try {
    const url = new URL(src);
    if (url.hostname === "images.unsplash.com") {
      url.searchParams.set("w", String(Math.round(width)));
      return url.toString();
    }
  } catch {
    // ignore
  }
  return src;
}
