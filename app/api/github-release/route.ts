import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

export async function GET(req: NextRequest) {
  try {
    // Fetch latest release from GitHub
    const response = await fetch('https://api.github.com/repos/jito341/lekhalfow-website/releases/latest');
    const data = await response.json();

    if (data.tag_name) {
      return NextResponse.json({
        success: true,
        latestVersion: data.tag_name,
        publishedAt: data.published_at,
        gold: {
          url: data.assets.find((a: any) => a.name.includes('gold') && !a.name.includes('trial'))?.https://github.com/jit0341/lekhaflow-website/releases/download/v2.0/Lekhaflow_setup.exe || '',
        },
        goldTrial: {
          url: data.assets.find((a: any) => a.name.includes('gold') && a.name.includes('trial'))?.https://github.com/jit0341/lekhaflow-website/releases/download/v1.0/Trial_setup.exe|| '',
        },
        standard: {
          url: data.assets.find((a: any) => a.name.includes('standard'))?.browser_download_url || '',
        },
        changelog: data.body || '',
      });
    }

    return NextResponse.json({ success: false, error: 'No release found' });
  } catch (error) {
    console.error('GitHub release fetch error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch releases' });
  }
}

// New: Handle updates
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, version } = body;

    if (action === 'update') {
      // Trigger update process
      await execAsync(`python3 update_software.py ${version || 'latest'}`);
      
      return NextResponse.json({
        success: true,
        message: 'Update triggered successfully',
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ success: false, error: 'Update failed' });
  }
}