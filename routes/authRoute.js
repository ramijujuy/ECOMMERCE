import express from "express";
import {
  registerController,
  loginController,
  registerPrueba,
  testController,
  listado,
} from "../controllers/authControllers.js";
import { isAdmin, requiereSignIn } from "../middlewares/authMiddleware.js";
//router

const router = express.Router();

// Routing
// Registro y post
router.post("/register", registerController);
router.post("/prueba", registerPrueba);

// LOGIN OR POST
router.post("/login", loginController);

// test router

router.get("/test", requiereSignIn, isAdmin, testController);
router.get("/lista", listado);

export default router;
