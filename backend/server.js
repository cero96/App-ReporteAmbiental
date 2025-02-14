import express from "express";
import mongoose from "mongoose"; // Importar mongoose
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "./src/config/db.js";
import colors from "colors";
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

// Cargar variables de entorno
dotenv.config();

const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones a JSON
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB", err));

// Esquema y modelo para los comentarios
const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

// Ruta para guardar comentarios
app.post("/api/comments", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newComment = new Comment({ name, email, message });
    await newComment.save();
    res
      .status(201)
      .json({ message: "Comentario guardado con éxito", comment: newComment });
  } catch (err) {
    console.error("Error al guardar el comentario:", err);
    res.status(500).json({ error: "Error al guardar el comentario" });
  }
});

//Conexion a postegress

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

//Llamar al metodo conectar a la bdd
connectToDb();

// Rutas adicionales para manejar usuarios y comparaciones
app.use("/api/users", usersRouter);
app.use("/api/usercomparisons", UserComparisonsRouter);
app.use("/api/comparisons", ComparisonRouter);
app.use("/api/appliance", applianceRouter);
app.use("/api/appliancefeature", applianceFeatureRouter);
app.use("/api/consumptionhistory", ConsumptionHistoryRouter);

// Puerto y servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
