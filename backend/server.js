import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "./src/config/db.js";
import colors from "colors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import usersRouter from "./src/routes/usersRouter.js";
import UserComparisonsRouter from "./src/routes/userComparisonsRouter.js";
import ComparisonRouter from "./src/routes/comparisonsRouter.js";
import applianceRouter from "./src/routes/applianceRouter.js";
import applianceFeatureRouter from "./src/routes/applianceFeatureRouter.js";
import ConsumptionHistoryRouter from "./src/routes/consumptionHistoryRouter.js";
import ApplianceFeature from "./src/models/applianceFeatures.js";
import Appliances from "./src/models/appliances.js";
import Comparisons from "./src/models/comparisons.js";
import ConsumptionHistory from "./src/models/ConsumptionHistory.js";
import User from "./src/models/users.js";
import UserComparisons from "./src/models/usersComparisons.js";
import { upload } from "./src/middleware/uploadMiddleware.js";

// Cargar variables de entorno
dotenv.config();

const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones a JSON
app.use(express.json());

// **Eliminar toda la parte de Mongoose y MongoDB**
// Conexión a MongoDB (eliminada)

// **Eliminar el esquema y modelo para comentarios**
// const commentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   message: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Comment = mongoose.model("Comment", commentSchema);

// Ruta para guardar comentarios (eliminada)
// app.post("/api/comments", async (req, res) => {
//   const { name, email, message } = req.body;
//   try {
//     const newComment = new Comment({ name, email, message });
//     await newComment.save();
//     res.status(201).json({ message: "Comentario guardado con éxito", comment: newComment });
//   } catch (err) {
//     console.error("Error al guardar el comentario:", err);
//     res.status(500).json({ error: "Error al guardar el comentario" });
//   }
// });

// Configuración de Multer para subir imágenes (esto ya está en el archivo importado, no es necesario redefinirlo)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Guardar archivos en la carpeta 'public/assets' dentro del frontend
    cb(null, path.join(__dirname, "../frontend/public/assets"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Guardar con su extensión
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos de imagen"), false);
  }
};

// Ruta para cargar imágenes
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: "No file uploaded." });
  }
  res.send({ imagePath: `/assets/${req.file.filename}` });
});

// Conexion a PostgreSQL
const connectToDb = async () => {
  try {
    await db.authenticate();
    console.log(
      colors.blue.bold(
        "Conexión a la base de datos PostgreSQL establecida con éxito."
      )
    );
  } catch (error) {
    console.error(
      colors.red.bold("Error al conectar a la base de datos PostgreSQL:", error)
    );
    process.exit(1);
  }
};

// Llamar al metodo conectar a la bdd
connectToDb();

// Rutas adicionales para manejar usuarios y comparaciones
app.use("/api/users", usersRouter);
app.use("/api/usercomparisons", UserComparisonsRouter);
app.use("/api/comparisons", ComparisonRouter);
app.use("/api/appliances", applianceRouter);
app.use("/api/appliancefeature", applianceFeatureRouter);
app.use("/api/consumptionhistory", ConsumptionHistoryRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Puerto y servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
