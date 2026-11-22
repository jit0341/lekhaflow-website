import "server-only";

export type GitHubAsset = {
  name: string;
  browser_download_url: string;
  size: number;
  state?: string;
  digest?: string | null;
};

export type GitHubRelease = {
  tag_name: string;
  name?: string;
  body?: string;
  html_url?: string;
  published_at?: string;
  draft?: boolean;
  prerelease?: boolean;
  assets?: GitHubAsset[];
};

const REPO = "jit0341/lekhaflow-website";
const API_ROOT = "https://api.github.com";

export type ProductId = "standard" | "professional" | "gold";
export type UpdateChannel = "stable" | "demo";
export type InstallerVariant = "full" | "demo";

export function normaliseVersion(tag: string): string {
  const value = String(tag || "").trim().replace(/^[vV]/, "");
  if (!/^\d+\.\d+\.\d+$/.test(value)) {
    throw new Error("The configured release tag is not a semantic version.");
  }
  return value;
}

export async function fetchReleaseByTag(tag: string): Promise<GitHubRelease> {
  if (!tag || tag.length > 80 || !/^[A-Za-z0-9._-]+$/.test(tag)) {
    throw new Error("No valid release tag is configured for this product.");
  }

  const response = await fetch(
    API_ROOT + "/repos/" + REPO + "/releases/tags/" + encodeURIComponent(tag),
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "LekhaFlow-Website-Update-Service",
      },
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error("Configured GitHub release could not be loaded (HTTP " + response.status + ").");
  }

  const release = (await response.json()) as GitHubRelease;
  if (release.draft || release.prerelease) {
    throw new Error("Draft or prerelease builds cannot be served on a public channel.");
  }
  return release;
}

export function configuredStableTag(product: ProductId, channel: UpdateChannel = "stable"): string {
  const envKey = {
    standard: {
      stable: "LEKHAFLOW_STANDARD_STABLE_TAG",
      demo: "LEKHAFLOW_STANDARD_DEMO_TAG",
    },
    professional: {
      stable: "LEKHAFLOW_PROFESSIONAL_STABLE_TAG",
      demo: "LEKHAFLOW_PROFESSIONAL_DEMO_TAG",
    },
    gold: {
      stable: "LEKHAFLOW_GOLD_STABLE_TAG",
      demo: "LEKHAFLOW_GOLD_DEMO_TAG",
    },
  }[product][channel];

  // All four 15.2.0 packages are published together in one immutable release.
  // Product-specific env vars can pin a channel to a later tag independently.
  return String(process.env[envKey] || "V15.2.0").trim();
}

export function findInstallerAsset(
  release: GitHubRelease,
  product: ProductId,
  version: string,
  variant: InstallerVariant = "full",
): GitHubAsset | undefined {
  const assets = Array.isArray(release.assets) ? release.assets : [];
  const productLabel = product.charAt(0).toUpperCase() + product.slice(1);
  const suffix = variant === "demo" ? "_Demo_Setup_" : "_Setup_";
  const expected = ( "LekhaFlow_" + productLabel + suffix + version + ".exe" ).toLowerCase();

  // The exact name is intentional: never select an arbitrary EXE or another edition.
  return assets.find((asset) => {
    const name = String(asset?.name || "").toLowerCase();
    return (
      name === expected &&
      (!asset.state || asset.state === "uploaded") &&
      /^https:\/\//i.test(String(asset.browser_download_url || "")) &&
      Number(asset.size) > 0
    );
  });
}

export function productDisplayName(product: ProductId): string {
  return {
    standard: "LekhaFlow Standard",
    professional: "LekhaFlow Professional",
    gold: "LekhaFlow Gold",
  }[product];
}

export function productIdFromQuery(value: string | null): ProductId | null {
  const v = String(value || "").trim().toLowerCase();
  return v === "standard" || v === "professional" || v === "gold" ? v : null;
}

export function channelFromQuery(value: string | null): UpdateChannel | null {
  const v = String(value || "stable").trim().toLowerCase();
  return v === "stable" || v === "demo" ? v : null;
}
