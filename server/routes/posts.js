import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

const router = express.Router();

//http://localhost:5000/posts

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost); //: -> dynamic
router.delete("/:id", deletePost); //: -> dynamic
router.patch("/:id/link", likePost); //: -> dynamic

export default router;
