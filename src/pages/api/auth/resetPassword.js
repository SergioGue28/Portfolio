import dbConnect from "../../../lib/mongodb";
import UserAdmin from "../../../models/UserAdmin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  await dbConnect();

  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatedUser = await UserAdmin.findByIdAndUpdate(
      decoded.id,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ message: "Contraseña restablecida correctamente" });
  } catch (error) {
    console.error("Error en resetPassword:", error);
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
}
