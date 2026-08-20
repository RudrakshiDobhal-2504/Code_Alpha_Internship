const express = require("express");
const protect = require("../middleware/auth");
const { searchUsers, getProfile, getFollowers, getFollowing, updateProfile, toggleFollow } = require("../controllers/userController");

const router = express.Router();

router.get("/search", protect, searchUsers);
router.get("/:username/followers", protect, getFollowers);
router.get("/:username/following", protect, getFollowing);
router.get("/:username", protect, getProfile);
router.put("/me", protect, updateProfile);
router.post("/:id/follow", protect, toggleFollow);

module.exports = router;
