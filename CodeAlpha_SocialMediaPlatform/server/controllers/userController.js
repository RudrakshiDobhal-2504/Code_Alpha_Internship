const User = require("../models/User");

const shape = (u, currentId) => ({
  id: u._id,
  name: u.name,
  username: u.username,
  bio: u.bio,
  avatar: u.avatar,
  followersCount: u.followers.length,
  followingCount: u.following.length,
  isFollowing: currentId ? u.followers.some(id => id.toString() === currentId.toString()) : false
});

exports.searchUsers = async (req, res) => {
  const q = String(req.query.q || "").trim();
  if (!q) return res.json({ success: true, users: [] });

  const users = await User.find({
    $or: [
      { username: { $regex: q, $options: "i" } },
      { name: { $regex: q, $options: "i" } }
    ]
  }).limit(10);

  res.json({ success: true, users: users.map(u => shape(u, req.user._id)) });
};

exports.getProfile = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).json({ success: false, message: "User not found." });
  res.json({ success: true, user: shape(user, req.user._id) });
};

exports.getFollowers = async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).populate("followers", "name username bio avatar followers following");
  if (!user) return res.status(404).json({ success: false, message: "User not found." });

  res.json({
    success: true,
    users: user.followers.map(u => shape(u, req.user._id))
  });
};

exports.getFollowing = async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).populate("following", "name username bio avatar followers following");
  if (!user) return res.status(404).json({ success: false, message: "User not found." });

  res.json({
    success: true,
    users: user.following.map(u => shape(u, req.user._id))
  });
};

exports.updateProfile = async (req, res) => {
  const { name, bio, avatar } = req.body;
  const user = await User.findById(req.user._id);

  if (name !== undefined) user.name = String(name).trim().slice(0, 60);
  if (bio !== undefined) user.bio = String(bio).trim().slice(0, 160);
  if (avatar !== undefined) user.avatar = String(avatar).trim();

  await user.save();
  res.json({ success: true, message: "Profile updated.", user: shape(user, req.user._id) });
};

exports.toggleFollow = async (req, res) => {
  const target = await User.findById(req.params.id);
  const current = await User.findById(req.user._id);

  if (!target) return res.status(404).json({ success: false, message: "User not found." });
  if (target._id.equals(current._id)) return res.status(400).json({ success: false, message: "You cannot follow yourself." });

  const isFollowing = current.following.some(id => id.equals(target._id));

  if (isFollowing) {
    current.following.pull(target._id);
    target.followers.pull(current._id);
  } else {
    current.following.addToSet(target._id);
    target.followers.addToSet(current._id);
  }

  await Promise.all([current.save(), target.save()]);

  res.json({
    success: true,
    following: !isFollowing,
    followersCount: target.followers.length
  });
};
