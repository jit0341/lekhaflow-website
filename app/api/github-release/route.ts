import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RELEASE_URL =
  "https://api.github.com/repos/jit0341/lekhaflow-website/releases/tags/V15.2.1";

type ProductKey =
  | "standardFull"
  | "standardDemo"
  | "professionalFull"
  | "professionalDemo";

type Asset = {
  name?: string;
  browser_download_url?: string;
  size?: number;
  state?: string;
  digest?: string | null;
};

type Release = {
  tag_name?: string;
  name?: string;
  html_url?: string;
  published_at?: string;
  draft?: boolean;
  prerelease?: boolean;
  assets?: Asset[];
};

const expectedAssets: Record<ProductKey, string> = {
  standardFull: "LekhaFlow_Standard_Setup_15.2.1.exe",
  standardDemo: "LekhaFlow_Standard_Demo_Setup_15.2.1.exe",
  professionalFull: "LekhaFlow_Professional_Setup_15.2.1.exe",
  professionalDemo: "LekhaFlow_Professional_Demo_Setup_15.2.1.exe",
};

function emptyAsset() {
  return {
    available: false,
    url: "",
    name: "",
    size: 0,
    sha256: "",
    version: "15.2.1",
  };
}

export async function GET() {
  try {
    const response = await fetch(RELEASE_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "LekhaFlow-Download-Center",
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error("GitHub release lookup failed with HTTP " + response.status);
    }

    const release = (await response.json()) as Release;
    if (release.tag_name !== "V15.2.1" || release.draft || release.prerelease) {
      throw new Error("The approved LekhaFlow V15.2.1 release is not publicly available.");
    }

    const assets = Array.isArray(release.assets) ? release.assets : [];
    const products = {} as Record<ProductKey, ReturnType<typeof emptyAsset>>;

    for (const [key, expectedName] of Object.entries(expectedAssets) as Array<[ProductKey, string]>) {
      const asset = assets.find((item) =>
        item.name === expectedName &&
        (!item.state || item.state === "uploaded") &&
        /^https:\/\//i.test(String(item.browser_download_url || "")) &&
        Number(item.size) > 0
      );

      products[key] = asset
        ? {
            available: true,
            url: asset.browser_download_url || "",
            name: asset.name || "",
            size: asset.size || 0,
            sha256: String(asset.digest || "").replace(/^sha256:/i, ""),
            version: "15.2.1",
          }
        : emptyAsset();
    }

    const availableCount = Object.values(products).filter((item) => item.available).length;

    return NextResponse.json(
      {
        success: true,
        tag: release.tag_name,
        releaseName: release.name || "LekhaFlow 15.2.1",
        releaseUrl: release.html_url || "",
        publishedAt: release.published_at || "",
        latestVersion: "15.2.1",
        availableCount,
        products,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (error) {
    console.error("LekhaFlow V15.2.1 Download Center API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Official download information is temporarily unavailable.",
        products: {
          standardFull: emptyAsset(),
          standardDemo: emptyAsset(),
          professionalFull: emptyAsset(),
          professionalDemo: emptyAsset(),
        },
      },
      {
        status: 502,
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  }
}
