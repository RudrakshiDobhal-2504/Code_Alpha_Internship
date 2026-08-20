require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Connectify API is running.",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));

app.use(express.static(path.join(__dirname, "../client")));

app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ success: false, message: "API route not found." });
  }
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Unexpected server error." });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
