import express from 'express';
import mongoose from 'mongoose';  // Importar mongoose
import cors from 'cors';
import dotenv from 'dotenv';

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

// Puerto y servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
