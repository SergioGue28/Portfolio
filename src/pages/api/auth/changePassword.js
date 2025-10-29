import dbConnect from "../../../lib/mongodb";
import UserAdmin from "../../../models/PortfolioModel";
import bcrypt from "bcryptjs";
import { withAuth } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Método no permitido" });

  await dbConnect();

  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "La nueva contraseña debe tener al menos 6 caracteres" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    const user = await UserAdmin.findById(req.user.id).select("+password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Contraseña actual incorrecta" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Contraseña cambiada correctamente" });
  } catch (error) {
    console.error("Error en changePassword:", error);
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
}

export default withAuth(handler);
