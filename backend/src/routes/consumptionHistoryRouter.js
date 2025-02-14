import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validations.js";
import { ConsumptionHistoryController } from "../controllers/ConsumptionHistoryController.js";

const router = Router();

router.get("/", ConsumptionHistoryController.getAll);

router.post(
  "/",
  body("appliance_id")
    .notEmpty()
    .withMessage("El campo appliance_id no puede ir vacío"),
  body("date").notEmpty().withMessage("El campo date no puede ir vacío"),
  body("consumption_KWH")
    .notEmpty()
    .withMessage("El campo consumption_KWH no puede ir vacío"),
  body("CO2_KG").notEmpty().withMessage("El campo CO2_KG no puede ir vacío"),
  handleInputErrors,
  ConsumptionHistoryController.create
);

router.get(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id no valido")
    .custom((value) => value > 0)
    .withMessage("Id no valido"),
  handleInputErrors,
  ConsumptionHistoryController.getById
);
router.put(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id no valido")
    .custom((value) => value > 0)
    .withMessage("Id no valido"),
  body("appliance_id")
    .notEmpty()
    .optional()
    .withMessage("El campo appliance_id no puede ir vacío"),
  body("date")
    .optional()
    .notEmpty()
    .withMessage("El campo date no puede ir vacío"),
  body("consumption_KWH")
    .notEmpty()
    .optional()
    .withMessage("El campo consumption_KWH no puede ir vacío"),
  body("CO2_KG").notEmpty().withMessage("El campo CO2_KG no puede ir vacío"),
  handleInputErrors,
  ConsumptionHistoryController.updateById
);
router.delete(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id no valido")
    .custom((value) => value > 0)
    .withMessage("Id no valido"),
  handleInputErrors,
  ConsumptionHistoryController.deleteById
);

export default router;
