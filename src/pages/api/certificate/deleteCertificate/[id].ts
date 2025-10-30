// pages/api/certificate/deleteCertificate/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Certificate from "../../../../models/CertificateModel";
import { deleteImageFromS3 } from "../../../../lib/s3";
import { withAuth } from "../../../../lib/auth";

async function connectMongo() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query; // 🔹 viene desde la URL
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid certificate ID" });
    }

    const certificate = await Certificate.findById(id);
    if (!certificate)
      return res.status(404).json({ message: "Certificate not found" });

    await deleteImageFromS3(certificate.imageUrl);
    await certificate.deleteOne();

    return res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (error) {
    console.error("❌ DELETE Certificate error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
}

export default withAuth(handler);
