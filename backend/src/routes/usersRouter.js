import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../mddleware/validations.js";
import { UsersControllers } from "../controllers/UsersController.js";
import User from "../models/users.js";

const router = Router();

router.get("/", UsersControllers.getAll);

router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El username no puede ir vacío")
    .toUpperCase(),
  body("email")
    .notEmpty()
    .withMessage("El email no puede ir vacío")
    .isEmail()
    .withMessage("El valor ingresado no es un email")
    .toLowerCase()
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } }); // Usamos el modelo 'User'
      if (user) {
        throw new Error("El correo electrónico ya está registrado");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("La contraseña no puede ir vacía")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 dígitos"),

  handleInputErrors,
  UsersControllers.create
);

router.get("/:id", UsersControllers.getById);
router.put("/:id", UsersControllers.updateById);
router.delete("/:id", UsersControllers.deleteById);

export default router;
