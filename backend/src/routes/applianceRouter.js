import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validations.js";
import { AppliancesController } from "../controllers/ApplianceController.js";
import multer from "multer";

// Configuración de multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Asegúrate de que esta carpeta exista
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Nombre único para el archivo
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/", AppliancesController.getAll);

router.post(
  "/",
  upload.single("image"), // Multer debe ir primero
  body("name").notEmpty().withMessage("El name no puede ir vacío"),
  body("brand").notEmpty().withMessage("El campo brand no puede ir vacío"),
  body("model").notEmpty().withMessage("El campo model no puede ir vacío"),
  body("type").notEmpty().withMessage("El campo type no puede ir vacío"),
  body("energy_rating")
    .notEmpty()
    .withMessage("El campo energy_rating no puede ir vacío"),
  handleInputErrors,
  AppliancesController.create
);

router.get(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id no válido")
    .custom((value) => value > 0)
    .withMessage("Id no válido"),
  handleInputErrors,
  AppliancesController.getById
);

router.put(
  "/:id",
  upload.single("image"), // Multer debe ir primero
  param("id")
    .isInt()
    .withMessage("Id no válido")
    .custom((value) => value > 0)
    .withMessage("Id no válido"),
  body("name").optional().notEmpty().withMessage("El name no puede ir vacío"),
  body("brand")
    .optional()
    .notEmpty()
    .withMessage("El campo brand no puede ir vacío"),
  body("model")
    .optional()
    .notEmpty()
    .withMessage("El campo model no puede ir vacío"),
  body("type")
    .optional()
    .notEmpty()
    .withMessage("El campo type no puede ir vacío"),
  body("energy_rating")
    .optional()
    .notEmpty()
    .withMessage("El campo energy_rating no puede ir vacío"),
  handleInputErrors,
  AppliancesController.updateById
);

router.delete(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id no válido")
    .custom((value) => value > 0)
    .withMessage("Id no válido"),
  handleInputErrors,
  AppliancesController.deleteById
);

export default router;
