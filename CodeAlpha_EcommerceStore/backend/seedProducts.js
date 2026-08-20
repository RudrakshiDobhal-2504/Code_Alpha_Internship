const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Product = require("./models/Product");
const products = require("./data/products");

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();

    console.log("🌱 Starting product seeding...");

    // Remove existing products
    await Product.deleteMany({});

    console.log("🗑️ Existing products removed.");

    // Insert new products
    const createdProducts = await Product.insertMany(products);

    console.log(
      `✅ ${createdProducts.length} products added successfully.`
    );

    console.log("🛍️ CodeCart product catalog is ready!");

    await mongoose.connection.close();

    console.log("🔌 MongoDB connection closed.");

    process.exit(0);
  } catch (error) {
    console.error("❌ Product seeding failed:");
    console.error(error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedProducts();