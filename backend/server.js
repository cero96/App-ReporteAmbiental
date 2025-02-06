// backend/server.js

import express from "express";
/*import pkg from 'pg'; 
const { Client } = pkg;*/
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";
import cors from "cors";
import { db } from "./src/config/db.js";
import colors from "colors";
import User from "./src/models/users.js";
import UserComparisons from "./src/models/usersComparisons.js";
import usersRouter from "./src/routes/usersRouter.js";
import UserComparisonsRouter from "./src/routes/userComparisonsRouter.js";
import ComparisonRouter from "./src/routes/comparisonsRouter.js";

const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones a JSON
app.use(express.json());

// Configuración PostgreSQL
async function connectDatabase() {
  try {
    await db.authenticate();
    db.sync(); // Asegúrate de esperar la sincronización
    console.log(colors.blue.bold("Conexión existosa a postgress"));
  } catch (error) {
    console.log(
      colors.red.bold("Conexión Fallo a la base de datos", { error })
    );
  }
}

connectDatabase();

app.use("/api/users", usersRouter);
// Ruta para registrar usuarios
app.use("/api/userscomparisons", UserComparisonsRouter);
app.use("/api/comparisons", ComparisonRouter);

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const query =
    "INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *";
  const values = [name, email, hashedPassword];

  try {
    const result = await client.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al registrar el usuario:", err);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
});

// Ruta para iniciar sesión
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = $1";
  try {
    const result = await client.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const user = result.rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Enviar el token y el usuario
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

// Puerto y servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
