import express from "express";
import {
  loginController,
  logoutController,
  getCurrentUserProfile,
  registerController,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getCurrentUserProfile);
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;
