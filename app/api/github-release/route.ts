import { NextResponse } from "next/server";
import {
  configuredStableTag,
  fetchReleaseByTag,
  findInstallerAsset,
  normaliseVersion,
} from "@/lib/desktop-updates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CardKey = "standardFull" | "standardDemo" | "professionalFull" | "professionalDemo";

function emptyAsset() {
  return { available: false, url: "", name: "", size: 0, version: "", publishedAt: "" };
}

export async function GET() {
  // Keep the public download cards deliberately inactive until the signed
  // Desktop updater has passed production verification. Enable explicitly
  // with LEKHAFLOW_DOWNLOAD_CENTER_ENABLED=true after QA.
  if (String(process.env.LEKHAFLOW_DOWNLOAD_CENTER_ENABLED || "").toLowerCase() !== "true") {
    return NextResponse.json(
      {
        success: true,
        enabled: false,
        availableCount: 0,
        products: {
          standardFull: emptyAsset(),
          standardDemo: emptyAsset(),
          professionalFull: emptyAsset(),
          professionalDemo: emptyAsset(),
        },
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }

  try {
    // One immutable GitHub release contains all four assets for the same version.
    const tag = configuredStableTag("standard", "stable");
    const release = await fetchReleaseByTag(tag);
    const version = normaliseVersion(release.tag_name || tag);
    const publishedAt = release.published_at || "";

    const mappings: Array<{ key: CardKey; product: "standard" | "professional"; variant: "full" | "demo" }> = [
      { key: "standardFull", product: "standard", variant: "full" },
      { key: "standardDemo", product: "standard", variant: "demo" },
      { key: "professionalFull", product: "professional", variant: "full" },
      { key: "professionalDemo", product: "professional", variant: "demo" },
    ];

    const products: Record<CardKey, ReturnType<typeof emptyAsset>> = {
      standardFull: emptyAsset(),
      standardDemo: emptyAsset(),
      professionalFull: emptyAsset(),
      professionalDemo: emptyAsset(),
    };

    for (const item of mappings) {
      const asset = findInstallerAsset(release, item.product, version, item.variant);
      if (asset) {
        products[item.key] = {
          available: true,
          url: asset.browser_download_url,
          name: asset.name,
          size: asset.size,
          version,
          publishedAt,
        };
      }
    }

    const availableCount = Object.values(products).filter((item) => item.available).length;
    return NextResponse.json(
      {
        success: true,
        tag: release.tag_name,
        releaseName: release.name || "LekhaFlow " + version,
        releaseUrl: release.html_url || "",
        publishedAt,
        latestVersion: version,
        availableCount,
        products,
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch (error) {
    console.error("LekhaFlow release lookup failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "The four product installers are not available yet. Please try again after the official GitHub release is published.",
        products: {
          standardFull: emptyAsset(),
          standardDemo: emptyAsset(),
          professionalFull: emptyAsset(),
          professionalDemo: emptyAsset(),
        },
      },
      { status: 200, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }
}
