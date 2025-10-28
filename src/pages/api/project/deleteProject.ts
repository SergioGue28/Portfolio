import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Project from "../../../models/ProjectModel";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: `Método ${req.method} no permitido` });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Se requiere el ID del proyecto" });
    }

    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.status(200).json({ message: "Proyecto eliminado correctamente" });
  } catch (error: any) {
    res.status(500).json({
      message: "Error al eliminar el proyecto",
      error: error.message,
    });
  }
}
