import express from "express";
import { postCreate } from "../controllers/postController.js";
const router = express.Router();
router.post("/create", postCreate);
export default router;
