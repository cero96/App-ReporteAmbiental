import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validations.js";
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

router.get(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id no valido")
    .custom((value) => value > 0)
    .withMessage("Id no valido"),
  handleInputErrors,
  ComparisonsControllers.getById
);

router.put("/:id", ComparisonsControllers.updateById);
router.delete("/:id", ComparisonsControllers.deleteById);

export default router;
