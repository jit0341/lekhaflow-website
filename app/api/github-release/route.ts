import { NextResponse } from "next/server";
import {
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
  try {
    // The four public cards are pinned to the verified, immutable 15.2.1 release.
    const tag = "V15.2.1";
    const release = await fetchReleaseByTag(tag);
    const version = normaliseVersion(release.tag_name || tag);
    if (version !== "15.2.1") {
      throw new Error("The Download Center received an unexpected release version.");
    }

    const publishedAt = release.published_at || "";
    const mappings: Array<{
      key: CardKey;
      product: "standard" | "professional";
      variant: "full" | "demo";
    }> = [
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
      if (asset && asset.browser_download_url && asset.size > 0) {
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
        enabled: true,
        tag: release.tag_name,
        releaseName: release.name || "LekhaFlow " + version,
        releaseUrl: release.html_url || "",
        publishedAt,
        latestVersion: version,
        availableCount,
        products,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  } catch (error) {
    console.error("LekhaFlow V15.2.1 Download Center API error:", error);
    return NextResponse.json(
      {
        success: false,
        enabled: false,
        error: "Official LekhaFlow 15.2.1 download information is temporarily unavailable.",
        products: {
          standardFull: emptyAsset(),
          standardDemo: emptyAsset(),
          professionalFull: emptyAsset(),
          professionalDemo: emptyAsset(),
        },
      },
      { status: 502, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }
}
