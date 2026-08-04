import { NextResponse } from "next/server";

const OWNER = "jit0341";
const REPO = "lekhaflow-website";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/releases`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "Unable to fetch releases" },
        { status: 500 }
      );
    }

    const releases = await response.json();

    const result = {
      standard: { version: "", publishedAt: "", url: "" },
      demo: { version: "", publishedAt: "", url: "" },
      gold: { version: "", publishedAt: "", url: "" },
      gold_trial: { version: "", publishedAt: "", url: "" }, // For downloads page
    };

    for (const release of releases) {
      const tag = String(release.tag_name).toUpperCase();
      
      if (!release.assets || release.assets.length === 0) {
        continue;
      }

      const asset = release.assets[0];

      if (tag === "V1FULL" || tag === "STANDARD") {
        result.standard = {
          version: release.tag_name,
          publishedAt: release.published_at,
          url: asset.browser_download_url,
        };
        // Also map to gold_trial if needed
        if (!result.gold_trial.url) {
          result.gold_trial = {
            version: release.tag_name,
            publishedAt: release.published_at,
            url: asset.browser_download_url,
          };
        }
      } else if (tag === "V1.0" || tag === "DEMO") {
        result.demo = {
          version: release.tag_name,
          publishedAt: release.published_at,
          url: asset.browser_download_url,
        };
      } else if (tag.includes("GOLD") || tag === "GOLD") {
        result.gold = {
          version: release.tag_name,
          publishedAt: release.published_at,
          url: asset.browser_download_url,
        };
        // Also map to gold_trial
        result.gold_trial = {
          version: release.tag_name,
          publishedAt: release.published_at,
          url: asset.browser_download_url,
        };
      }
    }

    return NextResponse.json({
      success: true,
      standard: result.standard,
      demo: result.demo,
      gold: result.gold,
      gold_trial: result.gold_trial,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}