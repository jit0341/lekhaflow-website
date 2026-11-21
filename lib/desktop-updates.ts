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

export function normaliseVersion(tag: string): string {
  const value = String(tag || "").trim().replace(/^[vV]/, "");
  if (!/^\d+\.\d+\.\d+$/.test(value)) {
    throw new Error("The configured release tag is not a semantic version.");
  }
  return value;
}

export function versionFromReleaseName(release: GitHubRelease): string {
  const text = String(release.name || "") + " " + String(release.tag_name || "");
  const match = text.match(/(?:^|[^0-9])(\d+\.\d+\.\d+)(?:$|[^0-9])/);
  return match ? match[1] : "";
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
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error("Configured GitHub release could not be loaded (HTTP " + response.status + ").");
  }

  const release = (await response.json()) as GitHubRelease;
  if (release.draft || release.prerelease) {
    throw new Error("Draft or prerelease builds cannot be served on the stable channel.");
  }
  return release;
}

export function configuredStableTag(product: ProductId): string {
  const envKey = {
    standard: "LEKHAFLOW_STANDARD_STABLE_TAG",
    professional: "LEKHAFLOW_PROFESSIONAL_STABLE_TAG",
    gold: "LEKHAFLOW_GOLD_STABLE_TAG",
  }[product];

  // Existing Standard 15.1.0 is a baseline. Activate a newer NEXT release
  // only after its installer has passed clean-install and upgrade QA.
  const fallback = product === "standard" ? "V15.1.0" : "";
  return String(process.env[envKey] || fallback).trim();
}

export function findInstallerAsset(
  release: GitHubRelease,
  product: ProductId,
  version: string,
  variant: "full" | "trial" = "full",
): GitHubAsset | undefined {
  const assets = Array.isArray(release.assets) ? release.assets : [];
  const expected = new Set<string>();

  if (product === "standard" && variant === "full") {
    expected.add(("LekhaFlow_Standard_Setup_" + version + ".exe").toLowerCase());
    expected.add(("LekhaFlow_Standard_Suite_Setup_" + version + ".exe").toLowerCase());
    if (version === "15.1.0") expected.add("lekhaflow_standard_setup.exe");
  } else if (product === "standard" && variant === "trial") {
    expected.add(("LekhaFlow_Standard_Trial_Setup_" + version + ".exe").toLowerCase());
    expected.add("lekhaflow-standard-trial-setup.exe");
  } else {
    expected.add(("LekhaFlow_" + product + "_Setup_" + version + ".exe").toLowerCase());
    expected.add(("LekhaFlow_" + product + "_Suite_Setup_" + version + ".exe").toLowerCase());
  }

  return assets.find((asset) => {
    const name = String(asset?.name || "").toLowerCase();
    return (
      name.endsWith(".exe") &&
      (!asset.state || asset.state === "uploaded") &&
      expected.has(name) &&
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
