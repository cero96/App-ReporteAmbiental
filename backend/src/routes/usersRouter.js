import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validations.js";
import { UsersController } from "../controllers/UsersController.js";
import User from "../models/users.js";

const router = Router();

// Rutas para usuarios
router.get("/", UsersController.getAll);
router.get("/:id", UsersController.getById);
router.post(
  "/",
  body("name").notEmpty().withMessage("El nombre no puede ir vacío").toUpperCase(),
  body("email")
    .notEmpty()
    .withMessage("El correo no puede ir vacío")
    .isEmail()
    .withMessage("El correo ingresado no es válido")
    .toLowerCase()
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new Error("El correo electrónico ya está registrado");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("La contraseña no puede ir vacía")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  handleInputErrors,
  UsersController.create
);
router.put("/:id", UsersController.updateById);
router.delete("/:id", UsersController.deleteById);

// Ruta de login
router.post("/login", UsersController.login);

export default router;
