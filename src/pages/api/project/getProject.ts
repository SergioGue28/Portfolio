import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Project from "../../../models/ProjectModel";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: `Método ${req.method} no permitido` });
  }

  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error: any) {
    res.status(500).json({
      message: "Error al obtener los proyectos",
      error: error.message,
    });
  }
}
