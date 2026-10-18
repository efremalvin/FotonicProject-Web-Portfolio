import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const fileId = request.nextUrl.searchParams.get("fileId");
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;

  if (!fileId || !apiKey) {
    return new NextResponse("File ID dan API key dibutuhkan", { status: 400 });
  }

  const range = request.headers.get("range");
  const driveMediaUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;

  try {
    const fetchHeaders: Record<string, string> = {};
    if (range) {
      fetchHeaders["Range"] = range;
    }

    const driveRes = await fetch(driveMediaUrl, {
      headers: fetchHeaders,
    });

    if (!driveRes.ok && driveRes.status !== 206) {
      return new NextResponse("Gagal memuat video", { status: driveRes.status });
    }

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", driveRes.headers.get("Content-Type") || "video/mp4");
    responseHeaders.set("Accept-Ranges", "bytes");

    if (driveRes.headers.get("Content-Length")) {
      responseHeaders.set("Content-Length", driveRes.headers.get("Content-Length")!);
    }
    if (driveRes.headers.get("Content-Range")) {
      responseHeaders.set("Content-Range", driveRes.headers.get("Content-Range")!);
    }
    responseHeaders.set("Cache-Control", "public, max-age=3600");

    return new NextResponse(driveRes.body, {
      status: driveRes.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Video stream proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
