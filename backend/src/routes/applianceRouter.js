import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validations.js";
import { AppliancesController } from "../controllers/ApplianceController.js";

const router = Router();

router.get("/", AppliancesController.getAll);

router.post(
  "/",
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
    .withMessage("Id no valido")
    .custom((value) => value > 0)
    .withMessage("Id no valido"),
  handleInputErrors,
  AppliancesController.getById
);

router.put("/:id", AppliancesController.updateById);
router.delete("/:id", AppliancesController.deleteById);

export default router;
