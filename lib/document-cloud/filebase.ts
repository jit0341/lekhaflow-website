import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";

const required = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
};

let client: S3Client | null = null;

export function filebaseConfig() {
  return {
    endpoint: process.env.FILEBASE_ENDPOINT || process.env.FILEBASE_S3_ENDPOINT || "https://s3.filebase.io",
    region: process.env.FILEBASE_REGION || "auto",
    bucket: process.env.FILEBASE_BUCKET || process.env.FILEBASE_BUCKET_NAME || required("FILEBASE_BUCKET"),
  };
}

export function filebaseClient() {
  if (!client) {
    const config = filebaseConfig();
    client = new S3Client({
      endpoint: config.endpoint,
      region: config.region,
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.FILEBASE_ACCESS_KEY || process.env.FILEBASE_ACCESS_KEY_ID || required("FILEBASE_ACCESS_KEY"),
        secretAccessKey: process.env.FILEBASE_SECRET_KEY || process.env.FILEBASE_SECRET_ACCESS_KEY || required("FILEBASE_SECRET_KEY"),
      },
    });
  }
  return client;
}

export function newStorageKey(userId: string, fileName: string) {
  const extension = fileName.toLowerCase().split(".").pop() || "bin";
  const safeExtension = /^[a-z0-9]{1,8}$/.test(extension) ? extension : "bin";
  return `${userId}/${randomUUID()}.${safeExtension}`;
}

export async function filebasePresignedUpload(key: string, contentType: string) {
  const { bucket } = filebaseConfig();
  return getSignedUrl(
    filebaseClient(),
    new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType }),
    { expiresIn: 300, signableHeaders: new Set(["content-type"]) },
  );
}

export async function filebasePresignedDownload(key: string, disposition: "inline" | "attachment" = "attachment") {
  const { bucket } = filebaseConfig();
  return getSignedUrl(filebaseClient(), new GetObjectCommand({ Bucket: bucket, Key: key, ResponseContentDisposition: disposition }), { expiresIn: 180 });
}

export async function filebaseHeadObject(key: string) {
  const { bucket } = filebaseConfig();
  return filebaseClient().send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
}

export async function filebaseReadObject(key: string) {
  const { bucket } = filebaseConfig();
  const result = await filebaseClient().send(new GetObjectCommand({ Bucket: bucket, Key: key }));
  if (!result.Body) throw new Error("Filebase returned an empty object body.");
  return new Uint8Array(await result.Body.transformToByteArray());
}

export async function filebaseDeleteObject(key: string) {
  const { bucket } = filebaseConfig();
  await filebaseClient().send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

export async function filebaseCheckBucket() {
  const { bucket } = filebaseConfig();
  await filebaseClient().send(new HeadBucketCommand({ Bucket: bucket }));
  return { bucket, endpoint: filebaseConfig().endpoint, region: filebaseConfig().region };
}

export function validFileSignature(bytes: Uint8Array, contentType: string) {
  const starts = (...values: number[]) => values.every((v, i) => bytes[i] === v);
  if (contentType === "application/pdf") return starts(0x25, 0x50, 0x44, 0x46, 0x2d);
  if (contentType === "image/jpeg") return starts(0xff, 0xd8, 0xff);
  if (contentType === "image/png") return starts(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
  if (contentType === "image/webp") return starts(0x52, 0x49, 0x46, 0x46) && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;
  return false;
}
