import { createHash, createHmac, randomUUID } from "node:crypto";

const required = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
};

function hmac(key: Buffer | string, value: string) {
  return createHmac("sha256", key).update(value).digest();
}

function signingKey(secret: string, date: string) {
  const dateKey = hmac(`AWS4${secret}`, date);
  const regionKey = hmac(dateKey, "auto");
  const serviceKey = hmac(regionKey, "s3");
  return hmac(serviceKey, "aws4_request");
}

function encodedPath(value: string) {
  return value.split("/").map(encodeURIComponent).join("/");
}

export function r2ObjectUrl(key: string) {
  const account = required("R2_ACCOUNT_ID");
  const bucket = required("R2_BUCKET_NAME");
  return `https://${account}.r2.cloudflarestorage.com/${encodedPath(bucket)}/${encodedPath(key)}`;
}

export function r2SignedUrl(method: "GET" | "PUT" | "HEAD" | "DELETE", key: string, expiresSeconds = 300) {
  const account = required("R2_ACCOUNT_ID");
  const accessKey = required("R2_ACCESS_KEY_ID");
  const secret = required("R2_SECRET_ACCESS_KEY");
  const bucket = required("R2_BUCKET_NAME");
  const host = `${account}.r2.cloudflarestorage.com`;
  const path = `/${encodedPath(bucket)}/${encodedPath(key)}`;
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const date = amzDate.slice(0, 8);
  const scope = `${date}/auto/s3/aws4_request`;
  const params: Record<string, string> = {
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": `${accessKey}/${scope}`,
    "X-Amz-Date": amzDate,
    "X-Amz-Expires": String(expiresSeconds),
    "X-Amz-SignedHeaders": "host",
  };
  const canonicalQuery = Object.keys(params).sort().map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join("&");
  const canonicalRequest = [method, path, canonicalQuery, `host:${host}\n`, "host", "UNSIGNED-PAYLOAD"].join("\n");
  const stringToSign = ["AWS4-HMAC-SHA256", amzDate, scope, createHash("sha256").update(canonicalRequest).digest("hex")].join("\n");
  const signature = createHmac("sha256", signingKey(secret, date)).update(stringToSign).digest("hex");
  return `https://${host}${path}?${canonicalQuery}&X-Amz-Signature=${signature}`;
}

export function newStorageKey(userId: string, fileName: string) {
  const extension = fileName.toLowerCase().split(".").pop() || "bin";
  const safeExtension = /^[a-z0-9]{1,8}$/.test(extension) ? extension : "bin";
  return `${userId}/${randomUUID()}.${safeExtension}`;
}

export function validFileSignature(bytes: Uint8Array, contentType: string) {
  const starts = (...values: number[]) => values.every((v, i) => bytes[i] === v);
  if (contentType === "application/pdf") return starts(0x25, 0x50, 0x44, 0x46, 0x2d);
  if (contentType === "image/jpeg") return starts(0xff, 0xd8, 0xff);
  if (contentType === "image/png") return starts(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
  if (contentType === "image/webp") return starts(0x52, 0x49, 0x46, 0x46) && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;
  return false;
}
