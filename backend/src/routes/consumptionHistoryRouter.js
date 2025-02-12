import { Router } from "express";
import { body } from "express-validator";
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

router.get("/:id", ConsumptionHistoryController.getById);
router.put("/:id", ConsumptionHistoryController.updateById);
router.delete("/:id", ConsumptionHistoryController.deleteById);

export default router;
