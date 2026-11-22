import { NextRequest, NextResponse } from "next/server";
import {
  configuredStableTag,
  fetchReleaseByTag,
  findInstallerAsset,
  normaliseVersion,
  productIdFromQuery,
} from "@/lib/desktop-updates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const product = productIdFromQuery(params.get("product"));
  const requestedVersion = String(params.get("version") || "").trim();

  if (!product || !requestedVersion || !/^\d+\.\d+\.\d+$/.test(requestedVersion)) {
    return NextResponse.json({ success: false, error: "Invalid download request." }, { status: 400 });
  }

  try {
    const tag = configuredStableTag(product);
    if (!tag) {
      return NextResponse.json({ success: false, error: "No approved update is available." }, { status: 404 });
    }

    const release = await fetchReleaseByTag(tag);
    const version = normaliseVersion(release.tag_name || tag);
    if (version !== requestedVersion) {
      return NextResponse.json({ success: false, error: "The requested product version is not approved." }, { status: 404 });
    }

    const asset = findInstallerAsset(release, product, version, "full");
    if (!asset || !asset.browser_download_url || !/^https:\/\//i.test(asset.browser_download_url)) {
      return NextResponse.json({ success: false, error: "The approved installer is unavailable." }, { status: 404 });
    }

    return NextResponse.redirect(asset.browser_download_url, {
      status: 302,
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
        "Referrer-Policy": "no-referrer",
      },
    });
  } catch (error) {
    console.error("Desktop update download error:", error);
    return NextResponse.json(
      { success: false, error: "The requested update is temporarily unavailable." },
      { status: 502 },
    );
  }
}
