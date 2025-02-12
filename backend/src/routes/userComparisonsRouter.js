import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validations.js";
import { UsersComparionsControllers } from "../controllers/UsersComparisonsController.js";

const router = Router();

router.get("/", UsersComparionsControllers.getAll);

router.post(
  "/",
  body("user_id")
    .notEmpty()
    .withMessage("El user_id no puede ir vacío")
    .isInt()
    .withMessage("El id ingresado no es un integer"),
  /*     .custom(async (value) => {
      const userId = await UserComparisons.findOne({
        where: { user_id: value },
      });
      if (!userId) {
        throw new Error("El correo electrónico no está registrado");
      }
      return true;
    }) */ body("comparison_id")
    .notEmpty()
    .withMessage("El comparison_id no puede ir vacío")
    .isInt()
    .withMessage("El id ingresado no es un integer"),
  /*    .custom(async (value) => {
       const comparisonId = await UserComparisons.findOne({
        where: { comparison_id: value },
      });
      if (!comparisonId) {
        throw new Error("El correo electrónico no está registrado");
      }
      return true;
    }) */ body("appliance_ids")
    .notEmpty()
    .withMessage("El appliance_id no puede ir vacío")
    .isInt()
    .withMessage("El id ingresado no es un integer"),
  /*     .custom(async (value) => {
      const applianceId = await UserComparisons.findOne({
        where: { appliance_ids: value },
      });
      if (!applianceId) {
        throw new Error("El correo electrónico no está registrado");
      }
      return true;
    }) */ handleInputErrors,
  UsersComparionsControllers.create
);

router.get("/:id", UsersComparionsControllers.getById);
router.put("/:id", UsersComparionsControllers.updateById);
router.delete("/:id", UsersComparionsControllers.deleteById);

export default router;
