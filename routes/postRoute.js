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


// CREATE POST
router.post("/", protect, fileUpload, postCreate);


// UPDATE POST
router.put("/:id", protect, fileUpload, updatePost);


// DELETE POST
router.delete("/:id", protect, deletePost);


// GET ALL POSTS
router.get("/", getAllPsot);


// TOP POSTS
router.get("/top", getTopRecentPosts);


// SINGLE POST
router.get("/:id", getPostbyId
);


export default router;
