import { NextResponse } from "next/server";

const OWNER = "jit0341";
const REPO = "lekhaflow-website";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to fetch latest release",
        },
        { status: 500 }
      );
    }

    const release = await response.json();

    const assets = release.assets || [];

const standard = assets.find((a: any) =>
    a.name.toLowerCase().includes("standard")
);

const demo = assets.find((a: any) =>
    a.name.toLowerCase().includes("demo")
);

const gold = assets.find((a: any) =>
    a.name.toLowerCase().includes("gold")
);

return NextResponse.json({
    success: true,
    version: release.tag_name,

    standard: standard?.browser_download_url || null,

    demo: demo?.browser_download_url || null,

    gold: gold?.browser_download_url || null
});
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}