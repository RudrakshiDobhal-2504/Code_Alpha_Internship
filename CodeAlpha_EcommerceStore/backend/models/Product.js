const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [120, "Product name cannot exceed 120 characters"],
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },

    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },

    image: {
      type: String,
      required: [true, "Product image is required"],
    },

    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    numReviews: {
      type: Number,
      min: 0,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// --------------------------------------------------
// Product Indexes
// --------------------------------------------------

productSchema.index({
  name: "text",
  description: "text",
});

productSchema.index({
  category: 1,
});

productSchema.index({
  price: 1,
});

productSchema.index({
  rating: -1,
});

productSchema.index({
  featured: 1,
});

productSchema.index({
  createdAt: -1,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;