import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Portfolio from "../../../models/PortfolioModel";

// Conexión a MongoDB
async function connectMongo() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

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
