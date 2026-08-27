// app/api/github-release/route.ts
import { NextResponse } from "next/server";

const GITHUB_RELEASES_URL =
  "https://api.github.com/repos/jit0341/lekhaflow-website/releases/latest";

function findAsset(
  assets: any[],
  pattern: RegExp
) {
  return assets.find((asset) => pattern.test(asset?.name || ""));
}

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
    const assets = Array.isArray(data.assets) ? data.assets : [];

    // Production naming convention:
    // LekhaFlow_Standard_Setup_<version>.exe
    // LekhaFlow_Standard_Trial_<version>.exe
    // LekhaFlow_Gold_Setup_<version>.exe
    // LekhaFlow_Gold_Trial_<version>.exe
    const standard = findAsset(
      assets,
      /^LekhaFlow_Standard_Setup_[^/]+\.exe$/i
    );

    const standardTrial = findAsset(
      assets,
      /^LekhaFlow_Standard_Trial_[^/]+\.exe$/i
    );

    const gold = findAsset(
      assets,
      /^LekhaFlow_Gold_Setup_[^/]+\.exe$/i
    );

    const goldTrial = findAsset(
      assets,
      /^LekhaFlow_Gold_Trial_[^/]+\.exe$/i
    );

    return NextResponse.json(
      {
        success: true,
        latestVersion: data.tag_name || "",
        publishedAt: data.published_at || data.created_at || "",
        releaseName: data.name || "",
        releaseUrl: data.html_url || "",

        standard: {
          url: standard?.browser_download_url || "",
          name: standard?.name || "",
          size: standard?.size || 0,
        },

        standardTrial: {
          url: standardTrial?.browser_download_url || "",
          name: standardTrial?.name || "",
          size: standardTrial?.size || 0,
        },

        gold: {
          url: gold?.browser_download_url || "",
          name: gold?.name || "",
          size: gold?.size || 0,
        },

        goldTrial: {
          url: goldTrial?.browser_download_url || "",
          name: goldTrial?.name || "",
          size: goldTrial?.size || 0,
        },
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
