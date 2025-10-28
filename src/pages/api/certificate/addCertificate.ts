// pages/api/certificate/addCertificate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Certificate from "../../../models/CertificateModel";
import formidable, { Fields, Files, File } from "formidable";
import { uploadImageToS3 } from "../../../lib/s3";
import { withAuth } from "../../../lib/auth";

export const config = { api: { bodyParser: false } };

async function connectMongo() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
}

const parseForm = (req: NextApiRequest) =>
  new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
    const form = formidable({ keepExtensions: true });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { fields, files } = await parseForm(req);
    const name = String(fields.name);
    const image = files.image ? (Array.isArray(files.image) ? files.image[0] : files.image) : null;

    if (!name || !image) return res.status(400).json({ message: "Name and image are required" });

    const file = image as File;
    const imageUrl = await uploadImageToS3(
      file.filepath,
      file.originalFilename ?? `file_${Date.now()}`,
      file.mimetype ?? "image/jpeg"
    );

    const certificate = new Certificate({ name, imageUrl });
    await certificate.save();

    return res.status(201).json({ message: "Certificate added", imageUrl });
  } catch (error) {
    console.error("❌ POST Add Certificate error:", error);
    return res.status(500).json({ message: "Internal server error", error: (error as Error).message });
  }
}

export default withAuth(handler);
