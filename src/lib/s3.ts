// src/lib/s3.ts
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadImageToS3 = async (filePath: string, fileName: string, contentType?: string) => {
  const fileContent = fs.readFileSync(filePath);
  const key = `certificate/${Date.now()}_${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: fileContent,
    ContentType: contentType ?? "image/jpeg",
  });

  await s3.send(command);

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

export const deleteImageFromS3 = async (url: string) => {
  try {
    const s3Url = new URL(url);
    const key = s3Url.pathname.substring(1);
    await s3.send(new DeleteObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME!, Key: key }));
  } catch (err) {
    console.warn("⚠️ Error eliminando imagen de S3:", err);
  }
};
