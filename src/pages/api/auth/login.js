import dbConnect from "../../../lib/mongodb";
import UserAdmin from "../../../models/UserAdmin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    console.log("➡️ METHOD:", req.method);
    console.log("➡️ HEADERS:", req.headers);
    
    if (!process.env.JWT_SECRET) {
      console.error("❌ ERROR CRÍTICO: JWT_SECRET no está definido.");
      return res.status(500).json({ message: "Error en el servidor", error: "JWT_SECRET no configurado" });
    }

    if (req.method !== "POST") {
      console.warn("⚠️ Método no permitido:", req.method);
      return res
        .status(405)
        .json({ message: `Método ${req.method} no permitido` });
    }

    await dbConnect();

    console.log("📩 BODY recibido:", req.body);
    if (!req.body) {
      console.error("❌ req.body está vacío");
      return res.status(400).json({ message: "Body vacío" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      console.warn("⚠️ Faltan credenciales");
      return res
        .status(400)
        .json({ message: "Correo y contraseña obligatorios" });
    }

    const user = await UserAdmin.findOne({ email }).select("+password");
    if (!user) {
      console.warn("⚠️ Usuario no encontrado:", email);
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn("⚠️ Contraseña incorrecta para usuario:", email);
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Token generado:", token);

    const cookie = [
      `token=${token}`,
      "HttpOnly",
      "Path=/",
      "Max-Age=3600",
      "SameSite=Lax",
      process.env.NODE_ENV === "production" ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; ");

    res.setHeader("Set-Cookie", cookie);
    console.log("✅ Cookie enviada");

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("❌ ERROR EN HANDLER:", err);
    return res
      .status(500)
      .json({ message: "Error en el servidor", error: err.message });
  }
}
