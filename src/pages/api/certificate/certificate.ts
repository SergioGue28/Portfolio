import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Certificate from "../../../models/CertificateModel";
import formidable, { Fields, Files, File } from "formidable";
import { uploadImageToS3, deleteImageFromS3 } from "../../../lib/s3";

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  try {
    if (req.method === "GET") {
      const certificates = await Certificate.find().sort({ createdAt: -1 });
      return res.status(200).json(certificates);
    }

    if (req.method === "POST") {
      const { fields, files } = await parseForm(req);
      const name = String(fields.name);
      const image = files.image ? (Array.isArray(files.image) ? files.image[0] : files.image) : null;

      if (!name || !image) return res.status(400).json({ message: "Name and image are required" });

      const file = image as File;
      const imageUrl = await uploadImageToS3(file.filepath, file.originalFilename ?? `file_${Date.now()}`, file.mimetype ?? "image/jpeg");

      const certificate = new Certificate({ name, imageUrl });
      await certificate.save();

      return res.status(201).json({ message: "Certificate added", imageUrl });
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      const certificate = await Certificate.findById(id);
      if (!certificate) return res.status(404).json({ message: "Certificate not found" });

      await deleteImageFromS3(certificate.imageUrl);
      await certificate.deleteOne();

      return res.status(200).json({ message: "Certificate deleted" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("❌ Certificate API error:", error);
    return res.status(500).json({ message: "Internal server error", error: (error as Error).message });
  }
}
