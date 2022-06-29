import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//http://localhost:5000/posts

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost); //: -> dynamic
router.delete("/:id", auth, deletePost); //: -> dynamic
router.patch("/:id/likePost", auth, likePost); //: -> dynamic

export default router;
