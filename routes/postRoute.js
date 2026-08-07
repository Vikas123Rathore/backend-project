import express from "express";

import {
  postCreate,
  getAllPsot,
  getPostbyId,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

import { protect } from "../middleware/authMiddleware.js";
import fileUpload from "../middleware/upload.js";

const router = express.Router();

// Create a new post
router.post(
  "/",
  protect,
  fileUpload,
  postCreate
);

// Update an existing post
router.put(
  "/:id",
  protect,
  fileUpload,
  updatePost
);

// Delete a post
router.delete(
  "/:id",
  protect,
  deletePost
);

// Get all posts
router.get(
  "/",
  getAllPsot
);

// Get a single post by id
router.get(
  "/:id",
  getPostbyId
);

export default router;
