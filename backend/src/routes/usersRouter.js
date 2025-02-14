import { Router } from "express";
import { body, param } from "express-validator";
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

router.get(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id no valido")
    .custom((value) => value > 0)
    .withMessage("Id no valido"),
  handleInputErrors,
  UsersControllers.getById
);

router.put(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id no válido")
    .custom((value) => value > 0)
    .withMessage("Id no válido"),

  body("name")
    .optional()
    .notEmpty()
    .withMessage("El username no puede ir vacío")
    .toUpperCase(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("El valor ingresado no es un email")
    .toLowerCase()
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new Error("El correo electrónico ya está registrado");
      }
      return true;
    }),

  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 dígitos"),

  handleInputErrors,
  UsersControllers.updateById
);

router.delete(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id no valido")
    .custom((value) => value > 0)
    .withMessage("Id no valido"),
  handleInputErrors,
  UsersControllers.deleteById
);

export default router;
