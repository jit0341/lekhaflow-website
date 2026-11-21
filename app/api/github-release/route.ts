import { NextResponse } from "next/server";
import {
  fetchReleaseByTag,
  findInstallerAsset,
  normaliseVersion,
  versionFromReleaseName,
} from "@/lib/desktop-updates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function assetInfo(asset?: { browser_download_url?: string; name?: string; size?: number }) {
  return {
    url: asset?.browser_download_url || "",
    name: asset?.name || "",
    size: asset?.size || 0,
  };
}

async function safeRelease(tag: string) {
  if (!tag) return null;
  try {
    return await fetchReleaseByTag(tag);
  } catch (error) {
    console.error("Download Center release lookup failed:", error);
    return null;
  }
}

export async function GET() {
  try {
    // Resolve each channel from its own explicit release. Do not use
    // /releases/latest: the latest tag can be a Trial release.
    const fullTag = process.env.LEKHAFLOW_STANDARD_FULL_TAG || "V15.1.0";
    const trialTag = process.env.LEKHAFLOW_STANDARD_TRIAL_TAG || "v1.0";
    const goldTag = process.env.LEKHAFLOW_GOLD_FULL_TAG || "";

    const [fullRelease, trialRelease, goldRelease] = await Promise.all([
      safeRelease(fullTag),
      safeRelease(trialTag),
      safeRelease(goldTag),
    ]);

    const fullVersion = fullRelease ? normaliseVersion(fullRelease.tag_name) : "";
    const trialVersion = trialRelease
      ? (versionFromReleaseName(trialRelease) || "1.0.0")
      : "";
    const goldVersion = goldRelease ? normaliseVersion(goldRelease.tag_name) : "";

    const standard = fullRelease
      ? findInstallerAsset(fullRelease, "standard", fullVersion, "full")
      : undefined;
    const standardTrial = trialRelease
      ? findInstallerAsset(trialRelease, "standard", trialVersion, "trial")
      : undefined;
    const gold = goldRelease
      ? findInstallerAsset(goldRelease, "gold", goldVersion, "full")
      : undefined;

    const success = Boolean(standard || standardTrial || gold);
    return NextResponse.json(
      {
        success,
        latestVersion: fullVersion,
        publishedAt: fullRelease?.published_at || "",
        releaseName: fullRelease?.name || "",
        releaseUrl: fullRelease?.html_url || "",
        standard: assetInfo(standard),
        standardTrial: assetInfo(standardTrial),
        gold: assetInfo(gold),
        goldTrial: { url: "", name: "", size: 0 },
      },
      {
        status: success ? 200 : 502,
        headers: { "Cache-Control": "no-store, max-age=0" },
      },
    );
  } catch (error) {
    console.error("GitHub Download Center API error:", error);
    return NextResponse.json(
      { success: false, error: "Download information is temporarily unavailable." },
      { status: 502, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }
}
