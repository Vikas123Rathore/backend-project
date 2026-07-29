import express from "express";

import {
  postCreate,
  getAllPsot,
  getPostbyId,
  getTopRecentPosts,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", protect, postCreate);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

// Public routes
router.get("/", getAllPsot);
router.get("/top", getTopRecentPosts);
router.get("/:id", getPostbyId);

export default router;
