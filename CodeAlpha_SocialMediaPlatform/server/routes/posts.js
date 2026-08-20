const express = require("express");
const protect = require("../middleware/auth");
const {
  createPost, getFeed, getUserPosts, deletePost, toggleLike, getComments, addComment
} = require("../controllers/postController");

const router = express.Router();

router.get("/feed", protect, getFeed);
router.get("/user/:username", protect, getUserPosts);
router.post("/", protect, createPost);
router.delete("/:id", protect, deletePost);
router.post("/:id/like", protect, toggleLike);
router.get("/:id/comments", protect, getComments);
router.post("/:id/comments", protect, addComment);

module.exports = router;
