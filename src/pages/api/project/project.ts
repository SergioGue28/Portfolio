import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Project from "../../../models/ProjectModel";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    // 📥 Obtener todos los proyectos
    case "GET":
      try {
        const projects = await Project.find();
        res.status(200).json(projects);
      } catch (error: any) {
        res.status(500).json({ message: "Error fetching projects", error: error.message });
      }
      break;

    // ➕ Crear un nuevo proyecto
    case "POST":
      try {
        const { name, description, url } = req.body;

        if (!name || !description || !url) {
          return res.status(400).json({ message: "All fields are required" });
        }

        const newProject = await Project.create({ name, description, url });
        res.status(201).json(newProject);
      } catch (error: any) {
        res.status(500).json({ message: "Error creating project", error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
