import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const route = express.Router();

// * READ * //
route.get("/", verifyToken, getFeedPosts);
route.get("/:userId/posts", verifyToken, getUserPosts);

// * UPDATE * //
route.patch("/:id/like", verifyToken, likePost);

export default route;