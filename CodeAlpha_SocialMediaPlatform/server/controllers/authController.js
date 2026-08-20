const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  username: user.username,
  email: user.email,
  bio: user.bio,
  avatar: user.avatar,
  followersCount: user.followers?.length || 0,
  followingCount: user.following?.length || 0
});

exports.register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, username, email and password are required"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
    }

    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
    });

    if (existing) {
      const field = existing.email === email.toLowerCase() ? "email" : "username";
      return res.status(409).json({ success: false, message: `An account with this ${field} already exists.` });
    }

    const user = await User.create({ name, username, email, password });
    const token = signToken(user._id);

    res.status(201).json({ success: true, message: "Account created successfully.", token, user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Registration failed.", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const token = signToken(user._id);
    const safeUser = await User.findById(user._id);
    res.json({ success: true, message: "Login successful.", token, user: publicUser(safeUser) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed.", error: error.message });
  }
};

exports.me = async (req, res) => {
  res.json({ success: true, user: publicUser(req.user) });
};
