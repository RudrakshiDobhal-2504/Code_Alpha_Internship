const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

// --------------------------------------------------
// Load environment variables
// --------------------------------------------------
dotenv.config();

// --------------------------------------------------
// Connect MongoDB
// --------------------------------------------------
connectDB();

// --------------------------------------------------
// Create Express app
// --------------------------------------------------
const app = express();

// --------------------------------------------------
// Middleware
// --------------------------------------------------
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// --------------------------------------------------
// Health check
// --------------------------------------------------
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CodeCart API is running successfully.",
  });
});

// --------------------------------------------------
// API Routes
// --------------------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// --------------------------------------------------
// 404 Handler
// --------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// --------------------------------------------------
// Global error handler
// --------------------------------------------------
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// --------------------------------------------------
// Start Server
// --------------------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 CodeCart backend running on port ${PORT}`);
});