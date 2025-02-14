import jwt from "jsonwebtoken";

const secretKey = "your_secret_key"; // Cambia esto por una clave más segura.

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], secretKey);
    req.user = decoded; // Adjunta el usuario decodificado al request
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};
