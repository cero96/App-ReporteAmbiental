import express from 'express';
import mongoose from 'mongoose';  // Importar mongoose
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './src/config/db.js';  // Asegúrate de que esta ruta sea correcta
import colors from 'colors';
import User from './src/models/users.js';
import UserComparisons from './src/models/usersComparisons.js';
import usersRouter from './src/routes/usersRouter.js';
import UserComparisonsRouter from './src/routes/userComparisonsRouter.js';
import ComparisonRouter from './src/routes/comparisonsRouter.js';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones a JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB', err));

// Esquema y modelo para los comentarios
const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

// Ruta para guardar comentarios
app.post('/api/comments', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newComment = new Comment({ name, email, message });
    await newComment.save();
    res.status(201).json({ message: 'Comentario guardado con éxito', comment: newComment });
  } catch (err) {
    console.error('Error al guardar el comentario:', err);
    res.status(500).json({ error: 'Error al guardar el comentario' });
  }
});

// Rutas adicionales para manejar usuarios y comparaciones
app.use('/api/users', usersRouter);
app.use('/api/usercomparisons', UserComparisonsRouter);
app.use('/api/comparisons', ComparisonRouter);

// Puerto y servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});