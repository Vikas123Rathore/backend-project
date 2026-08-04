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
import fileUpload from "../middleware/upload.js";

const router = express.Router();

// Protected Routes
router.post("/", protect, fileUpload, postCreate);

router.put("/:id", protect, fileUpload, updatePost);

router.delete("/:id", protect, deletePost);

// Public Routes
router.get("/", getAllPsot);

router.get("/top", getTopRecentPosts);

router.get("/:id", getPostbyId);

export default router;
