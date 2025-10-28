import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Project from "../../../models/ProjectModel";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: `Método ${req.method} no permitido` });
  }

  try {
    const { name, description, url } = req.body;

    if (!name || !description || !url) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const newProject = await Project.create({ name, description, url });
    res.status(201).json(newProject);
  } catch (error: any) {
    res.status(500).json({
      message: "Error al crear el proyecto",
      error: error.message,
    });
  }
}
