// src/pages/api/portfolio/updatePortfolio.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Portfolio from "../../../models/PortfolioModel";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import formidable, { Fields, Files, File } from "formidable";
import fs from "fs";
import bcrypt from "bcryptjs";

// Desactivar bodyParser de Next
export const config = { api: { bodyParser: false } };

// Configuración AWS S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Conexión a MongoDB
async function connectMongo() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
}

// Subir imagen a S3
const uploadImageToS3 = async (filePath: string, fileName: string, contentType?: string) => {
  const fileContent = fs.readFileSync(filePath);
  const key = `portfolio/${Date.now()}_${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: fileContent,
    ContentType: contentType ?? "image/jpeg",
  });

  await s3.send(command);

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

// Parse form con formidable
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

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { fields, files } = await parseForm(req);

    const { fullName, position, description, email, phone, password } = fields;
    const photo = files.photo ? (Array.isArray(files.photo) ? files.photo[0] : files.photo) : null;

    let portfolio = await Portfolio.findOne();
    if (!portfolio) portfolio = new Portfolio();

    // Actualizar campos
    if (fullName) portfolio.fullName = String(fullName);
    if (position) portfolio.position = String(position);
    if (description) portfolio.description = String(description);
    if (email) portfolio.email = String(email);
    if (phone) portfolio.phone = String(phone);
    if (password) portfolio.password = await bcrypt.hash(String(password), 10);

    // Subida de imagen a S3
    if (photo) {
      // Eliminar imagen anterior si existe
      if (portfolio.photo) {
        try {
          const url = new URL(portfolio.photo);
          const key = url.pathname.substring(1);
          await s3.send(new DeleteObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME!, Key: key }));
        } catch (err) {
          console.warn("⚠️ Error eliminando imagen anterior:", err);
        }
      }

      const file = photo as File;
      portfolio.photo = await uploadImageToS3(
        file.filepath,
        file.originalFilename ?? `file_${Date.now()}`,
        file.mimetype ?? "image/jpeg"
      );
    }

    await portfolio.save();
    return res.status(200).json({ message: "Portfolio updated successfully", portfolio });
  } catch (error) {
    console.error("❌ Error updating portfolio:", error);
    return res.status(500).json({ message: "Internal server error", error: (error as Error).message });
  }
}
