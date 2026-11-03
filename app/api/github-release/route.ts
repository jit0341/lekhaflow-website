import { NextResponse } from "next/server";

const GITHUB_RELEASES_URL =
  "https://api.github.com/repos/jit0341/lekhaflow-website/releases?per_page=30";

type GitHubAsset = {
  name?: string;
  browser_download_url?: string;
  size?: number;
  state?: string;
};

type GitHubRelease = {
  tag_name?: string;
  name?: string;
  published_at?: string;
  created_at?: string;
  html_url?: string;
  assets?: GitHubAsset[];
};

function findExeAsset(assets: GitHubAsset[], patterns: RegExp[]) {
  return assets.find((asset) => {
    const name = asset?.name || "";
    return (
      /\.exe$/i.test(name) &&
      (!asset.state || asset.state === "uploaded") &&
      patterns.some((pattern) => pattern.test(name))
    );
  });
}

function assetInfo(asset?: GitHubAsset) {
  return {
    url: asset?.browser_download_url || "",
    name: asset?.name || "",
    size: asset?.size || 0,
  };
}

const standardPatterns = [
  /^LekhaFlow_Standard_Suite_Setup_[^/]+\.exe$/i,
  /^LekhaFlow_Standard_Setup_[^/]+\.exe$/i,
  /^Lekhaflow_Standard_setup\.exe$/i,
];
const trialPatterns = [
  /^LekhaFlow_Standard_Trial_[^/]+\.exe$/i,
  /^LekhaFlow_Standard_Suite_Trial_[^/]+\.exe$/i,
  /^lekhaflow-standard-trial-setup\.exe$/i,
];

export async function GET() {
  try {
    const response = await fetch(GITHUB_RELEASES_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "LekhaFlow-Website",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Unable to fetch GitHub releases." },
        { status: 502, headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }

    const releases = (await response.json()) as GitHubRelease[];
    if (!Array.isArray(releases)) {
      return NextResponse.json(
        { success: false, error: "Unexpected GitHub releases response." },
        { status: 502 }
      );
    }

    // Full and trial installers may be published in separate GitHub releases.
    const standardRelease = releases.find((release) =>
      findExeAsset(release.assets || [], standardPatterns)
    );
    const trialRelease = releases.find((release) =>
      findExeAsset(release.assets || [], trialPatterns)
    );

    const standardAsset = standardRelease
      ? findExeAsset(standardRelease.assets || [], standardPatterns)
      : undefined;
    const trialAsset = trialRelease
      ? findExeAsset(trialRelease.assets || [], trialPatterns)
      : undefined;

    return NextResponse.json(
      {
        success: true,
        latestVersion: standardRelease?.tag_name || "",
        publishedAt: standardRelease?.published_at || standardRelease?.created_at || "",
        releaseName: standardRelease?.name || "",
        releaseUrl: standardRelease?.html_url || "",
        standard: assetInfo(standardAsset),
        standardTrial: assetInfo(trialAsset),
        gold: assetInfo(undefined),
        goldTrial: assetInfo(undefined),
        releasesChecked: releases.length,
        assets: [
          ...(standardRelease?.assets || []),
          ...(trialRelease?.assets || []),
        ]
          .filter((asset) => /\.exe$/i.test(asset?.name || ""))
          .map((asset) => ({
            name: asset.name || "",
            size: asset.size || 0,
            url: asset.browser_download_url || "",
          })),
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("GitHub release API error:", error);
    return NextResponse.json(
      { success: false, error: "GitHub release lookup failed." },
      { status: 502, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
