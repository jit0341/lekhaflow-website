import { createPrivateKey, sign } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  configuredStableTag,
  fetchReleaseByTag,
  findInstallerAsset,
  normaliseVersion,
  productDisplayName,
  productIdFromQuery,
} from "@/lib/desktop-updates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function canonicalise(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalise);
  if (value && typeof value === "object") {
    const source = value as Record<string, unknown>;
    return Object.keys(source)
      .sort()
      .reduce<Record<string, unknown>>((out, key) => {
        out[key] = canonicalise(source[key]);
        return out;
      }, {});
  }
  return value;
}

function signManifest(unsignedManifest: Record<string, unknown>) {
  const pem = String(process.env.LEKHAFLOW_UPDATE_SIGNING_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!pem.trim()) throw new Error("Signing key missing.");

  const privateKey = createPrivateKey(pem);
  if (privateKey.asymmetricKeyType !== "ed25519") {
    throw new Error("Signing key must be Ed25519.");
  }

  const canonical = JSON.stringify(canonicalise(unsignedManifest));
  const signature = sign(null, Buffer.from(canonical, "utf8"), privateKey).toString("base64");

  return {
    ...unsignedManifest,
    signature: {
      algorithm: "Ed25519",
      key_id: process.env.LEKHAFLOW_UPDATE_SIGNING_KEY_ID || "lekhaflow-update-2026-01",
      value: signature,
    },
  };
}

function errorResponse(message: string, status: number, code: string) {
  return NextResponse.json(
    { success: false, code, error: message },
    { status, headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const product = productIdFromQuery(params.get("product"));
  const current = String(params.get("current") || "").trim();
  const platform = String(params.get("platform") || "").trim().toLowerCase();
  const architecture = String(params.get("architecture") || "").trim().toLowerCase();
  const channel = String(params.get("channel") || "stable").trim().toLowerCase();

  if (!product || !current || platform !== "windows" || architecture !== "x64" || channel !== "stable") {
    return errorResponse("This product update request is not supported.", 400, "INVALID_UPDATE_REQUEST");
  }

  if (!/^\d+\.\d+\.\d+$/.test(current)) {
    return errorResponse("The installed product version is invalid.", 400, "INVALID_CURRENT_VERSION");
  }

  try {
    const tag = configuredStableTag(product);
    if (!tag) {
      return errorResponse("No approved update is published for this product yet.", 404, "NO_RELEASE_CONFIGURED");
    }

    const release = await fetchReleaseByTag(tag);
    const version = normaliseVersion(release.tag_name || tag);
    const asset = findInstallerAsset(release, product, version, "full");

    if (!asset || !asset.digest || !/^sha256:[0-9a-f]{64}$/i.test(asset.digest)) {
      return errorResponse("The approved installer is not ready for secure delivery.", 503, "INSTALLER_NOT_READY");
    }

    const unsignedManifest: Record<string, unknown> = {
      schema_version: 1,
      product_id: product,
      product_name: productDisplayName(product),
      version,
      channel: "stable",
      platform: "windows",
      architecture: "x64",
      published_at: release.published_at || new Date(0).toISOString(),
      release_name: release.name || (productDisplayName(product) + " " + version),
      release_notes: "Product improvements, compatibility updates and reliability enhancements.",
      installer: {
        file_name: asset.name,
        url: (() => { const downloadUrl = new URL("/api/desktop-updates/v1/download", request.nextUrl.origin); downloadUrl.searchParams.set("product", product); downloadUrl.searchParams.set("version", version); return downloadUrl.toString(); })(),
        size_bytes: asset.size,
        sha256: asset.digest.slice("sha256:".length).toLowerCase(),
      },
    };

    return NextResponse.json(signManifest(unsignedManifest), {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Desktop update manifest error:", error);
    const message = error instanceof Error ? error.message : "";
    const keyMissing = message.includes("Signing key") || message.includes("Ed25519");
    return errorResponse(
      keyMissing ? "The update service is not configured yet." : "The official update service is temporarily unavailable.",
      503,
      keyMissing ? "UPDATE_SIGNING_NOT_CONFIGURED" : "UPDATE_SERVICE_UNAVAILABLE",
    );
  }
}
