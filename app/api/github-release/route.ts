// app/api/github-release/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Fetch latest release from GitHub
    const response = await fetch(
      'https://api.github.com/repos/jit0341/lekhaflow-website/releases/latest',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Optional: Add GitHub token for higher rate limit
          // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      console.error('GitHub API error:', response.status, response.statusText);
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch release',
        status: response.status,
      });
    }

    const data = await response.json();

    if (!data.tag_name) {
      return NextResponse.json({
        success: false,
        error: 'No release found',
      });
    }

    // Find assets with proper filtering
    const goldAsset = data.assets?.find((a: any) => 
      a.name?.includes('gold') && !a.name?.includes('trial')
    );

    const goldTrialAsset = data.assets?.find((a: any) => 
      a.name?.includes('gold') && a.name?.includes('trial')
    );

    const standardAsset = data.assets?.find((a: any) => 
      a.name?.includes('standard')
    );

    return NextResponse.json({
      success: true,
      latestVersion: data.tag_name,
      publishedAt: data.published_at,
      changelog: data.body || '',
      gold: {
        url: goldAsset?.browser_download_url || '',
        name: goldAsset?.name || '',
      },
      goldTrial: {
        url: goldTrialAsset?.browser_download_url || '',
        name: goldTrialAsset?.name || '',
      },
      standard: {
        url: standardAsset?.browser_download_url || '',
        name: standardAsset?.name || '',
      },
    });
  } catch (error) {
    console.error('GitHub release fetch error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch releases',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}