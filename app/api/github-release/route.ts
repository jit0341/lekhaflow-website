// app/api/github-release/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // GitHub से latest release fetch करें
    const response = await fetch(
      'https://api.github.com/repos/jit0341/lekhaflow-website/releases/latest',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      // Fallback: Static links
      return getStaticLinks();
    }

    const data = await response.json();

    if (!data.tag_name) {
      return getStaticLinks();
    }

    // Find assets
    const goldAsset = data.assets?.find((a: any) => 
      a.name?.includes('setup') && !a.name?.includes('trial')
    );

    const goldTrialAsset = data.assets?.find((a: any) => 
      a.name?.includes('trial')
    );

    return NextResponse.json({
      success: true,
      latestVersion: data.tag_name,
      publishedAt: data.published_at,
      gold: {
        url: goldAsset?.browser_download_url || '',
        name: goldAsset?.name || '',
      },
      goldTrial: {
        url: goldTrialAsset?.browser_download_url || '',
        name: goldTrialAsset?.name || '',
      },
      standard: {
        url: '',
        name: '',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return getStaticLinks();
  }
}

// ✅ Fallback function with your existing links
function getStaticLinks() {
  return NextResponse.json({
    success: true,
    latestVersion: "v2.0",
    publishedAt: new Date().toISOString(),
    gold: {
      url: "https://github.com/jit0341/lekhaflow-website/releases/download/v2.0/Lekhaflow_setup.exe",
      name: "LekhaFlow Gold Full v2.0",
      size: "157 MB",
    },
    goldTrial: {
      url: "https://github.com/jit0341/lekhaflow-website/releases/download/v1.0/Trial_setup.exe",
      name: "LekhaFlow Gold Trial v1.0",
      size: "157 MB",
    },
    standard: {
      url: "",
      name: "",
    },
  });
}