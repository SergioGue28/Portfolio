import dbConnect from "../../../lib/mongodb";
import UserAdmin from "../../../models/PortfolioModel";
import bcrypt from "bcryptjs";
import { withAuth } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  await dbConnect();

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const existingUser = await UserAdmin.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await UserAdmin.create({ name, email, password: hashedPassword });

    return res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
}

export default withAuth(handler);
