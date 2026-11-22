import { createPublicKey, verify } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  channelFromQuery,
  configuredStableTag,
  fetchReleaseByTag,
  findInstallerAsset,
  normaliseVersion,
  productDisplayName,
  productIdFromQuery,
} from "@/lib/desktop-updates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// This public key is the same verification key embedded in the released
// Desktop clients. The matching private key remains offline; it is never
// stored in Vercel, GitHub source, or the client installer.
const UPDATE_KEY_ID = "lekhaflow-update-2026-01";
const UPDATE_PUBLIC_KEY_B64 = "gMg86jsnYGsvuEzdup5zQuFJ+o3wztoqGjMtXznzwvo=";
const UPDATE_PUBLIC_KEY_SPKI_PREFIX = Buffer.from("302a300506032b6570032100", "hex");
const RELEASE_MANIFEST_BASE = "LekhaFlow_";

type SignedManifest = {
  schema_version: number;
  product_id: string;
  product_name: string;
  version: string;
  channel: string;
  platform: string;
  architecture: string;
  published_at: string;
  release_name?: string;
  release_notes?: string;
  installer: {
    file_name: string;
    url: string;
    size_bytes: number;
    sha256: string;
  };
  signature: {
    algorithm: string;
    key_id: string;
    value: string;
  };
  [key: string]: unknown;
};

function canonicalise(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalise);
  if (value && typeof value === "object") {
    const source = value as Record<string, unknown>;
    return Object.keys(source).sort().reduce<Record<string, unknown>>((out, key) => {
      out[key] = canonicalise(source[key]);
      return out;
    }, {});
  }
  return value;
}

function verifyOfflineSignature(manifest: SignedManifest): boolean {
  const signature = manifest.signature;
  if (
    !signature ||
    signature.algorithm !== "Ed25519" ||
    signature.key_id !== UPDATE_KEY_ID ||
    typeof signature.value !== "string"
  ) return false;

  const publicBytes = Buffer.from(UPDATE_PUBLIC_KEY_B64, "base64");
  if (publicBytes.length !== 32) return false;
  const publicKey = createPublicKey({
    key: Buffer.concat([UPDATE_PUBLIC_KEY_SPKI_PREFIX, publicBytes]),
    format: "der",
    type: "spki",
  });
  const unsigned = { ...manifest } as Record<string, unknown>;
  delete unsigned.signature;
  const canonical = JSON.stringify(canonicalise(unsigned));
  try {
    return verify(
      null,
      Buffer.from(canonical, "utf8"),
      publicKey,
      Buffer.from(signature.value, "base64"),
    );
  } catch {
    return false;
  }
}

function errorResponse(message: string, status: number, code: string) {
  return NextResponse.json(
    { success: false, code, error: message },
    { status, headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

function manifestAssetName(
  product: "standard" | "professional" | "gold",
  channel: "stable" | "demo",
  version: string,
) {
  const label = product.charAt(0).toUpperCase() + product.slice(1);
  const channelLabel = channel === "demo" ? "Demo" : "Stable";
  return RELEASE_MANIFEST_BASE + label + "_" + channelLabel + "_Manifest_" + version + ".json";
}

async function loadReleaseManifest(release: Awaited<ReturnType<typeof fetchReleaseByTag>>, assetName: string) {
  const asset = (release.assets || []).find((item) =>
    String(item.name || "").toLowerCase() === assetName.toLowerCase() &&
    Number(item.size) > 0 &&
    /^https:\/\/github\.com\//i.test(String(item.browser_download_url || "")),
  );
  if (!asset) throw new Error("The signed manifest asset has not been published.");

  const response = await fetch(asset.browser_download_url, {
    headers: {
      Accept: "application/octet-stream",
      "User-Agent": "LekhaFlow-Offline-Signed-Update-Service",
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("The signed manifest asset could not be downloaded.");
  const text = await response.text();
  if (!text || text.length > 256 * 1024) throw new Error("The signed manifest asset has an invalid size.");
  return JSON.parse(text) as SignedManifest;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const product = productIdFromQuery(params.get("product"));
  const current = String(params.get("current") || "").trim();
  const platform = String(params.get("platform") || "").trim().toLowerCase();
  const architecture = String(params.get("architecture") || "").trim().toLowerCase();
  const channel = channelFromQuery(params.get("channel"));

  if (!product || !current || platform !== "windows" || architecture !== "x64" || !channel) {
    return errorResponse("This product update request is not supported.", 400, "INVALID_UPDATE_REQUEST");
  }
  if (!/^\d+\.\d+\.\d+$/.test(current)) {
    return errorResponse("The installed product version is invalid.", 400, "INVALID_CURRENT_VERSION");
  }

  try {
    const tag = configuredStableTag(product, channel);
    const release = await fetchReleaseByTag(tag);
    const version = normaliseVersion(release.tag_name || tag);
    const variant = channel === "demo" ? "demo" : "full";
    const installerAsset = findInstallerAsset(release, product, version, variant);
    if (!installerAsset) {
      return errorResponse("The approved installer has not been published.", 503, "INSTALLER_NOT_READY");
    }

    const manifestName = manifestAssetName(product, channel, version);
    const manifest = await loadReleaseManifest(release, manifestName);

    if (
      manifest.schema_version !== 1 ||
      manifest.product_id !== product ||
      manifest.channel !== channel ||
      manifest.version !== version ||
      manifest.platform !== "windows" ||
      manifest.architecture !== "x64"
    ) {
      return errorResponse("The signed manifest does not match this product release.", 503, "MANIFEST_IDENTITY_MISMATCH");
    }

    const installer = manifest.installer;
    const expectedDownload = new URL("/api/desktop-updates/v1/download", "https://lekhaflow.in");
    expectedDownload.searchParams.set("product", product);
    expectedDownload.searchParams.set("version", version);
    expectedDownload.searchParams.set("channel", channel);
    if (
      !installer ||
      installer.file_name !== installerAsset.name ||
      Number(installer.size_bytes) !== Number(installerAsset.size) ||
      !/^sha256:[0-9a-f]{64}$/i.test(String(installerAsset.digest || "")) ||
      String(installer.sha256 || "").toLowerCase() !== String(installerAsset.digest).slice("sha256:".length).toLowerCase() ||
      installer.url !== expectedDownload.toString()
    ) {
      return errorResponse("The signed installer metadata does not match the published setup file.", 503, "INSTALLER_METADATA_MISMATCH");
    }

    if (!verifyOfflineSignature(manifest)) {
      return errorResponse("The published manifest failed its Ed25519 signature check.", 503, "MANIFEST_SIGNATURE_INVALID");
    }

    return NextResponse.json(manifest, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Desktop update manifest error:", error);
    const message = error instanceof Error ? error.message : "";
    const noManifest = message.includes("signed manifest");
    return errorResponse(
      noManifest ? "The offline-signed update manifest is not published yet." : "The official update service is temporarily unavailable.",
      503,
      noManifest ? "SIGNED_MANIFEST_NOT_PUBLISHED" : "UPDATE_SERVICE_UNAVAILABLE",
    );
  }
}
