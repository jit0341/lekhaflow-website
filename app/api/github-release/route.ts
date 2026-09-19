// app/api/github-release/route.ts

import { NextResponse } from "next/server";

const GITHUB_RELEASES_URL =
  "https://api.github.com/repos/jit0341/lekhaflow-website/releases/latest";

type GitHubAsset = {
  name?: string;
  browser_download_url?: string;
  size?: number;
  content_type?: string;
  state?: string;
};

function findExeAsset(
  assets: GitHubAsset[],
  patterns: RegExp[]
): GitHubAsset | undefined {
  return assets.find((asset) => {
    const name = asset?.name || "";

    if (!/\.exe$/i.test(name)) {
      return false;
    }

    if (asset.state && asset.state !== "uploaded") {
      return false;
    }

    return patterns.some((pattern) => pattern.test(name));
  });
}

function assetInfo(asset?: GitHubAsset) {
  return {
    url: asset?.browser_download_url || "",
    name: asset?.name || "",
    size: asset?.size || 0,
  };
}

export async function GET() {
  try {
    const response = await fetch(GITHUB_RELEASES_URL, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "LekhaFlow-Website",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Unable to fetch latest GitHub release.",
        },
        {
          status: 502,
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }

    const data = await response.json();

    const assets: GitHubAsset[] = Array.isArray(data.assets)
      ? data.assets
      : [];

    /*
     * Production naming support
     *
     * Current Standard:
     *   LekhaFlow_Standard_Suite_Setup_15.1.0.exe
     *
     * Future-compatible names:
     *   LekhaFlow_Standard_Setup_15.1.0.exe
     *   LekhaFlow_Standard_Trial_15.1.0.exe
     *   LekhaFlow_Gold_Setup_15.1.0.exe
     *   LekhaFlow_Gold_Trial_15.1.0.exe
     */

    const standard = findExeAsset(assets, [
      /^LekhaFlow_Standard_Suite_Setup_[^/]+\.exe$/i,
      /^LekhaFlow_Standard_Setup_[^/]+\.exe$/i,
    ]);

    const standardTrial = findExeAsset(assets, [
      /^LekhaFlow_Standard_Trial_[^/]+\.exe$/i,
      /^LekhaFlow_Standard_Suite_Trial_[^/]+\.exe$/i,
    ]);

    const gold = findExeAsset(assets, [
      /^LekhaFlow_Gold_Setup_[^/]+\.exe$/i,
      /^LekhaFlow_Gold_Suite_Setup_[^/]+\.exe$/i,
    ]);

    const goldTrial = findExeAsset(assets, [
      /^LekhaFlow_Gold_Trial_[^/]+\.exe$/i,
      /^LekhaFlow_Gold_Suite_Trial_[^/]+\.exe$/i,
    ]);

    /*
     * Diagnostic information.
     * This makes future release naming problems immediately visible
     * without affecting the website UI.
     */

    return NextResponse.json(
      {
        success: true,

        latestVersion: data.tag_name || "",
        publishedAt: data.published_at || data.created_at || "",
        releaseName: data.name || "",
        releaseUrl: data.html_url || "",

        standard: assetInfo(standard),
        standardTrial: assetInfo(standardTrial),
        gold: assetInfo(gold),
        goldTrial: assetInfo(goldTrial),

        assetCount: assets.length,

        assets: assets
          .filter((asset) => /\.exe$/i.test(asset?.name || ""))
          .map((asset) => ({
            name: asset.name || "",
            size: asset.size || 0,
            url: asset.browser_download_url || "",
          })),
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("GitHub release API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "GitHub release lookup failed.",
      },
      {
        status: 502,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}