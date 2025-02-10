import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../mddleware/validations.js";
import { ComparisonsControllers } from "../controllers/ComparisonsController.js";

const router = Router();

router.get("/", ComparisonsControllers.getAll);

router.post(
  "/",
  body("name").notEmpty().withMessage("El name no puede ir vacío"),
  body("description")
    .notEmpty()
    .withMessage("El description no puede ir vacío"),
  handleInputErrors,
  ComparisonsControllers.create
);

router.get("/:id", ComparisonsControllers.getById);
router.put("/:id", ComparisonsControllers.updateById);
router.delete("/:id", ComparisonsControllers.deleteById);

export default router;
