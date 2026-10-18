import { NextResponse } from "next/server";
import { CATALOG_PROJECTS, parseSubfolderName, type CatalogProject, type CatalogPhoto } from "@/data/catalog";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

/**
 * Route handler untuk mengambil subfolder dan file galeri secara otomatis dari Google Drive
 * GET /api/catalog
 */
export async function GET() {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  // Jika env belum dikonfigurasi, fallback ke data statis
  if (!apiKey || !folderId) {
    return NextResponse.json({
      source: "static_fallback",
      projects: CATALOG_PROJECTS,
    });
  }

  try {
    // 1. Ambil semua subfolder di dalam folder induk Google Drive
    const subfoldersUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'+and+trashed=false&key=${apiKey}&fields=files(id,name,mimeType)&orderBy=createdTime+desc`;

    const subfoldersRes = await fetch(subfoldersUrl, { next: { revalidate: 60 } }); // Cache 60 detik
    const subfoldersData = await subfoldersRes.json();

    if (!subfoldersData.files || subfoldersData.files.length === 0) {
      // Jika folder induk belum ada subfolder klien, tampilkan katalog default
      return NextResponse.json({
        source: "static_fallback_empty_drive",
        projects: CATALOG_PROJECTS,
      });
    }

    // 2. Untuk setiap subfolder klien, ambil file-file gambar/video di dalamnya
    const projects: CatalogProject[] = await Promise.all(
      subfoldersData.files.map(async (folder: DriveFile, idx: number) => {
        // Parsing nama folder: "namaclient, tanggalshoot, jenisjasa, paketyangdipesan"
        const parsed = parseSubfolderName(folder.name);

        // Ambil file di dalam subfolder ini
        const filesUrl = `https://www.googleapis.com/drive/v3/files?q='${folder.id}'+in+parents+and+trashed=false&key=${apiKey}&fields=files(id,name,mimeType)&orderBy=createdTime`;
        const filesRes = await fetch(filesUrl, { next: { revalidate: 60 } });
        const filesData = await filesRes.json();
        const files: DriveFile[] = filesData.files || [];

        // Filter foto dan video
        const imageFiles = files.filter((f) => f.mimeType.startsWith("image/"));
        const videoFiles = files.filter((f) => f.mimeType.startsWith("video/"));

        const isVideo = parsed.serviceType === "video" || (imageFiles.length === 0 && videoFiles.length > 0);

        // Thumbnail cover (ambil foto pertama atau thumbnail drive)
        const firstPhotoId = imageFiles[0]?.id;
        const thumbnail = firstPhotoId
          ? `https://lh3.googleusercontent.com/d/${firstPhotoId}=w900`
          : "/images/hero-bg.jpg";

        const galleryPhotos: CatalogPhoto[] = imageFiles.map((img, i) => ({
          id: img.id,
          url: `https://lh3.googleusercontent.com/d/${img.id}=w1600`,
          caption: `${parsed.clientName || folder.name} — Foto ${i + 1}`,
        }));

        const firstVideoId = videoFiles[0]?.id;
        const driveUrl = firstVideoId
          ? `https://drive.google.com/file/d/${firstVideoId}/view`
          : `https://drive.google.com/drive/folders/${folder.id}`;

        return {
          id: folder.id || `proj-${idx}`,
          clientName: parsed.clientName || folder.name,
          eventName: parsed.eventName || folder.name,
          date: parsed.date || "Terbaru",
          serviceType: isVideo ? "video" : "foto",
          category: parsed.category || "sidang",
          packageName: parsed.packageName || "Paket Dokumentasi",
          driveUrl,
          thumbnail,
          description: `Dokumentasi ${parsed.packageName || "foto & video"} untuk ${parsed.clientName || folder.name}. Dilindungi hak cipta Fotonic Project.`,
          galleryPhotos: galleryPhotos.length > 0 ? galleryPhotos : undefined,
        };
      })
    );

    return NextResponse.json({
      source: "google_drive",
      projects,
    });
  } catch (error) {
    console.error("Gagal mengambil data dari Google Drive API:", error);
    return NextResponse.json({
      source: "static_fallback_error",
      projects: CATALOG_PROJECTS,
    });
  }
}
