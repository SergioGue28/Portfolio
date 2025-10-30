// pages/api/certificate/getCertificates.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Certificate from "../../../models/CertificateModel";

async function connectMongo() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    return res.status(200).json(certificates);
  } catch (error) {
    console.error("❌ GET Certificates error:", error);
    return res
      .status(500)
      .json({
        message: "Internal server error",
        error: (error as Error).message,
      });
  }
}
