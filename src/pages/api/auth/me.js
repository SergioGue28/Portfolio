import { parse } from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const token = cookies.token;

  if (!token) return res.status(200).json({ authenticated: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ authenticated: true, user: { id: decoded.id, email: decoded.email } });
  } catch (err) {
    return res.status(200).json({ authenticated: false });
  }
}
