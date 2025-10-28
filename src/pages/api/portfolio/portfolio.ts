// src/pages/api/portfolio/portfolio.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Portfolio from "../../../models/PortfolioModel";
import AWS from "aws-sdk";
import formidable, { Fields, Files, File } from "formidable";
import fs from "fs";
import bcrypt from "bcryptjs";

// Desactivar bodyParser de Next (necesario para recibir archivos)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Configuración AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
});

// Conexión a MongoDB
async function connectMongo() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  // --- GET: obtener portfolio ---
  if (req.method === "GET") {
    try {
      const portfolio = await Portfolio.findOne(); // único documento
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }

      return res.status(200).json({
        fullName: portfolio.fullName,
        position: portfolio.position,
        description: portfolio.description,
        email: portfolio.email,
        phone: portfolio.phone,
        photo: portfolio.photo,
      });
    } catch (error: any) {
      console.error("❌ Error fetching portfolio:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  // --- PUT: actualizar portfolio ---
  if (req.method === "PUT") {
    try {
      const form = formidable({ multiples: false });

      form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
        if (err) {
          return res.status(400).json({ message: "Error parsing form data" });
        }

        const { fullName, position, description, email, phone, password } = fields;
        const photo = files.photo
          ? Array.isArray(files.photo)
            ? files.photo[0]
            : files.photo
          : null;

        let portfolio = await Portfolio.findOne();
        if (!portfolio) {
          // Crear si no existe
          portfolio = new Portfolio();
        }

        // Actualizar solo si hay datos
        if (fullName) portfolio.fullName = String(fullName);
        if (position) portfolio.position = String(position);
        if (description) portfolio.description = String(description);
        if (email) portfolio.email = String(email);
        if (phone) portfolio.phone = String(phone);
        if (password) portfolio.password = await bcrypt.hash(String(password), 10);

        // Subida de imagen a S3
        if (photo) {
          const fileData = fs.readFileSync((photo as File).filepath);
          const fileName = `portfolio/${Date.now()}_${(photo as File).originalFilename}`;

          // Eliminar imagen anterior
          if (portfolio.photo) {
            try {
              const oldKey = portfolio.photo.split(".com/")[1];
              if (oldKey) {
                await s3
                  .deleteObject({ Bucket: process.env.AWS_BUCKET_NAME!, Key: oldKey })
                  .promise();
              }
            } catch (deleteErr) {
              console.warn("⚠️ Error deleting old image:", deleteErr);
            }
          }

          // Subir nueva imagen
          const upload = await s3
            .upload({
              Bucket: process.env.AWS_BUCKET_NAME!,
              Key: fileName,
              Body: fileData,
              ContentType: (photo as File).mimetype || "image/jpeg",
              ACL: "public-read",
            })
            .promise();

          portfolio.photo = upload.Location;
        }

        await portfolio.save();

        return res.status(200).json({ message: "Portfolio updated successfully", portfolio });
      });
    } catch (error: any) {
      console.error("❌ Error updating portfolio:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
