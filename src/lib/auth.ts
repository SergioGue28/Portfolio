// lib/auth.ts
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export function withAuth(handler: any) {
  return async (req: NextApiRequest & { user?: any }, res: NextApiResponse) => {
    try {
      const token = req.cookies?.token;

      if (!token) {
        return res.status(401).json({ success: false, message: "Acceso denegado. No se encontró token." });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
      } catch {
        return res.status(403).json({ success: false, message: "Token inválido o expirado." });
      }

      return handler(req, res);
    } catch (error) {
      console.error("❌ Error de autenticación:", error);
      return res.status(500).json({ success: false, message: "Error de autenticación." });
    }
  };
}
