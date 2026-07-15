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

    return NextResponse.json({
      success: true,
      tag: release.tag_name,
      releaseName: release.name,
      assets: release.assets,
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