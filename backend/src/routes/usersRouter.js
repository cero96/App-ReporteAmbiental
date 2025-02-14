import { Router } from "express";
import { UsersController } from "../controllers/UsersController.js";
import { authenticateToken } from "../middleware/authMiddleware.js"; // Importa el middleware

const router = Router();

// Rutas sin protección
router.post("/login", UsersController.login);
router.post("/", UsersController.create);


// Rutas protegidas
router.get("/", authenticateToken, UsersController.getAll);
router.get("/:id", authenticateToken, UsersController.getById);
router.put("/:id", authenticateToken, UsersController.updateById);
router.delete("/:id", authenticateToken, UsersController.deleteById);


export default router;
