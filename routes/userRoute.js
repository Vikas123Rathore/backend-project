import express from "express";

import {
  createUser,
  loginUser,
  logoutUser,
  currentUser,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", createUser);
router.post("/login", loginUser);

// Protected Routes
router.post("/logout", protect, logoutUser);
router.get("/current-user", protect, currentUser);

export default router;
