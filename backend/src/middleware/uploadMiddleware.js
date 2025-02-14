import multer from "multer";

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Asegúrate de que la carpeta "uploads" exista
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Nombre único para el archivo
  },
});

// Crear el middleware de multer
const upload = multer({ storage: storage });

// Exportar el middleware
export { upload };
