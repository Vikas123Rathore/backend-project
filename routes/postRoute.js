import express from "express";
import { deletePost, getAllPsot, getPostbyId, postCreate, updatePost } from "../controllers/postController.js";
const router = express.Router();
router.post("/create", postCreate);
router.get("/getPosts",getAllPsot)
router.get("/:id", getPostbyId);
router.put("/:id", updatePost);
router.delete("/:id",deletePost)
export default router;
