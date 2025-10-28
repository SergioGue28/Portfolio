import dbConnect from "../../../lib/mongodb";
import UserAdmin from "../../../models/UserAdmin";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  await dbConnect();

  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "El correo es obligatorio" });
    }

    const user = await UserAdmin.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Token de recuperación con vencimiento en 15 minutos
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Soporte GoldPlus" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Recuperación de contraseña",
      html: `
        <p>Hola ${user.name},</p>
        <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace (válido por 15 minutos):</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
      `,
    });

    return res.status(200).json({ message: "Correo de recuperación enviado correctamente" });
  } catch (error) {
    console.error("Error en forgotPassword:", error);
    return res.status(500).json({
      message: "Error en el servidor al enviar correo",
      error: error.message,
    });
  }
}
