import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validations.js";
import { ApplianceFeatureController } from "../controllers/ApplianceFeatureController.js";

const router = Router();

router.get("/", ApplianceFeatureController.getAll);

router.post(
  "/",
  body("appliance_id")
    .notEmpty()
    .withMessage("El campo appliance_id no puede ir vacío"),
  body("feature_name")
    .notEmpty()
    .withMessage("El campo feature_name no puede ir vacío"),
  body("  ").notEmpty().withMessage("El campo feature_value no puede ir vacío"),
  handleInputErrors,
  ApplianceFeatureController.create
);

router.get("/:id", ApplianceFeatureController.getById);
router.put("/:id", ApplianceFeatureController.updateById);
router.delete("/:id", ApplianceFeatureController.deleteById);

export default router;
