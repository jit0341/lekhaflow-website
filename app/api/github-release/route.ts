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
type ProductId = "standard" | "professional";
type Channel = "stable" | "demo";
type Variant = "full" | "demo";

function emptyAsset() {
  return { available: false, url: "", name: "", size: 0, version: "", publishedAt: "", tag: "" };
}

function compareVersions(a: string, b: string): number {
  const pa = a.split(".").map((part) => Number(part));
  const pb = b.split(".").map((part) => Number(part));
  for (let i = 0; i < 3; i += 1) {
    if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) - (pb[i] || 0);
  }
  return 0;
}

export async function GET() {
  try {
    // Each product/channel can move to a new signed release independently.
    // This lets Standard Full receive a hotfix without republishing the
    // already-verified Standard Demo and Professional installers.
    const mappings: Array<{
      key: CardKey;
      product: ProductId;
      channel: Channel;
      variant: Variant;
    }> = [
      { key: "standardFull", product: "standard", channel: "stable", variant: "full" },
      { key: "standardDemo", product: "standard", channel: "demo", variant: "demo" },
      { key: "professionalFull", product: "professional", channel: "stable", variant: "full" },
      { key: "professionalDemo", product: "professional", channel: "demo", variant: "demo" },
    ];

    const tags = Array.from(new Set(
      mappings.map((item) => configuredStableTag(item.product, item.channel)),
    ));
    const releases = new Map<string, Awaited<ReturnType<typeof fetchReleaseByTag>>>();
    await Promise.all(tags.map(async (tag) => {
      releases.set(tag, await fetchReleaseByTag(tag));
    }));

    const products: Record<CardKey, ReturnType<typeof emptyAsset>> = {
      standardFull: emptyAsset(),
      standardDemo: emptyAsset(),
      professionalFull: emptyAsset(),
      professionalDemo: emptyAsset(),
    };

    const releaseSummaries: Array<{
      tag: string;
      version: string;
      name: string;
      url: string;
      publishedAt: string;
    }> = [];

    for (const item of mappings) {
      const tag = configuredStableTag(item.product, item.channel);
      const release = releases.get(tag);
      if (!release) throw new Error("A configured product release could not be loaded.");
      const version = normaliseVersion(release.tag_name || tag);
      const asset = findInstallerAsset(release, item.product, version, item.variant);
      if (asset && asset.browser_download_url && asset.size > 0) {
        products[item.key] = {
          available: true,
          url: asset.browser_download_url,
          name: asset.name,
          size: asset.size,
          version,
          publishedAt: release.published_at || "",
          tag: release.tag_name || tag,
        };
      }
      if (!releaseSummaries.some((entry) => entry.tag === tag)) {
        releaseSummaries.push({
          tag: release.tag_name || tag,
          version,
          name: release.name || "LekhaFlow " + version,
          url: release.html_url || "",
          publishedAt: release.published_at || "",
        });
      }
    }

    const availableCount = Object.values(products).filter((item) => item.available).length;
    const latest = [...releaseSummaries].sort((a, b) => compareVersions(b.version, a.version))[0];
    return NextResponse.json(
      {
        success: true,
        enabled: true,
        tag: latest?.tag || "",
        releaseName: latest?.name || "LekhaFlow Releases",
        releaseUrl: latest?.url || "",
        publishedAt: latest?.publishedAt || "",
        latestVersion: latest?.version || "",
        releases: releaseSummaries,
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
    console.error("LekhaFlow Download Center API error:", error);
    return NextResponse.json(
      {
        success: false,
        enabled: false,
        error: "Official LekhaFlow download information is temporarily unavailable.",
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
