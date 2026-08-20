const mongoose = require("mongoose");
const Product = require("../models/Product");

// ==================================================
// GET ALL PRODUCTS
// ==================================================
// Supports:
// ?search=watch
// ?category=electronics
// ?minPrice=500
// ?maxPrice=5000
// ?minRating=4
// ?featured=true
// ?sort=price-low
// ?sort=price-high
// ?sort=rating
// ?sort=name
// ?sort=newest
// ?sort=oldest
// ?page=1
// ?limit=8
// ==================================================

const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      minRating,
      featured,
      sort = "newest",
      page = 1,
      limit = 8,
    } = req.query;

    // --------------------------------------------------
    // Build MongoDB Filter
    // --------------------------------------------------

    const filter = {};

    // --------------------------------------------------
    // Search
    // --------------------------------------------------

    if (search && search.trim()) {
      const searchRegex = new RegExp(
        search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );

      filter.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
      ];
    }

    // --------------------------------------------------
    // Category Filter
    // --------------------------------------------------

    if (category && category.trim()) {
      filter.category = new RegExp(
        `^${category
          .trim()
          .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
        "i"
      );
    }

    // --------------------------------------------------
    // Price Filter
    // --------------------------------------------------

    if (minPrice !== undefined) {
      const parsedMinPrice = Number(minPrice);

      if (
        Number.isNaN(parsedMinPrice) ||
        parsedMinPrice < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "minPrice must be a valid non-negative number.",
        });
      }

      filter.price = {
        ...filter.price,
        $gte: parsedMinPrice,
      };
    }

    if (maxPrice !== undefined) {
      const parsedMaxPrice = Number(maxPrice);

      if (
        Number.isNaN(parsedMaxPrice) ||
        parsedMaxPrice < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "maxPrice must be a valid non-negative number.",
        });
      }

      filter.price = {
        ...filter.price,
        $lte: parsedMaxPrice,
      };
    }

    // --------------------------------------------------
    // Validate Price Range
    // --------------------------------------------------

    if (
      filter.price &&
      filter.price.$gte !== undefined &&
      filter.price.$lte !== undefined &&
      filter.price.$gte > filter.price.$lte
    ) {
      return res.status(400).json({
        success: false,
        message: "minPrice cannot be greater than maxPrice.",
      });
    }

    // --------------------------------------------------
    // Minimum Rating
    // --------------------------------------------------

    if (minRating !== undefined) {
      const parsedRating = Number(minRating);

      if (
        Number.isNaN(parsedRating) ||
        parsedRating < 0 ||
        parsedRating > 5
      ) {
        return res.status(400).json({
          success: false,
          message: "minRating must be between 0 and 5.",
        });
      }

      filter.rating = {
        $gte: parsedRating,
      };
    }

    // --------------------------------------------------
    // Featured / Deals Filter
    // --------------------------------------------------

    if (featured !== undefined) {
      if (
        featured !== "true" &&
        featured !== "false"
      ) {
        return res.status(400).json({
          success: false,
          message: "featured must be either true or false.",
        });
      }

      filter.featured = featured === "true";
    }

    // --------------------------------------------------
    // Pagination Validation
    // --------------------------------------------------

    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    if (
      Number.isNaN(parsedPage) ||
      parsedPage < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "page must be a positive number.",
      });
    }

    if (
      Number.isNaN(parsedLimit) ||
      parsedLimit < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "limit must be a positive number.",
      });
    }

    const currentPage = Math.floor(parsedPage);

    // Maximum 50 products per request
    const itemsPerPage = Math.min(
      Math.floor(parsedLimit),
      50
    );

    const skip =
      (currentPage - 1) * itemsPerPage;

    // --------------------------------------------------
    // Sorting
    // --------------------------------------------------

    let sortOption = {
      createdAt: -1,
    };

    switch (sort) {
      case "price-low":
        sortOption = {
          price: 1,
        };
        break;

      case "price-high":
        sortOption = {
          price: -1,
        };
        break;

      case "rating":
        sortOption = {
          rating: -1,
          numReviews: -1,
        };
        break;

      case "name":
        sortOption = {
          name: 1,
        };
        break;

      case "oldest":
        sortOption = {
          createdAt: 1,
        };
        break;

      case "newest":
        sortOption = {
          createdAt: -1,
        };
        break;

      default:
        return res.status(400).json({
          success: false,
          message:
            "Invalid sort option. Use price-low, price-high, rating, name, newest or oldest.",
        });
    }

    // --------------------------------------------------
    // Fetch Products + Total Count
    // --------------------------------------------------

    const [products, totalProducts] =
      await Promise.all([
        Product.find(filter)
          .sort(sortOption)
          .skip(skip)
          .limit(itemsPerPage)
          .lean(),

        Product.countDocuments(filter),
      ]);

    // --------------------------------------------------
    // Pagination Information
    // --------------------------------------------------

    const totalPages = Math.ceil(
      totalProducts / itemsPerPage
    );

    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    return res.status(200).json({
      success: true,

      count: products.length,

      pagination: {
        currentPage,
        itemsPerPage,
        totalProducts,
        totalPages,

        hasNextPage:
          currentPage < totalPages,

        hasPreviousPage:
          currentPage > 1,
      },

      filters: {
        search: search?.trim() || null,

        category:
          category?.trim() || null,

        minPrice:
          minPrice !== undefined
            ? Number(minPrice)
            : null,

        maxPrice:
          maxPrice !== undefined
            ? Number(maxPrice)
            : null,

        minRating:
          minRating !== undefined
            ? Number(minRating)
            : null,

        featured:
          featured !== undefined
            ? featured === "true"
            : null,

        sort,
      },

      products,
    });
  } catch (error) {
    console.error(
      "Get Products Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch products.",
    });
  }
};

// ==================================================
// GET SINGLE PRODUCT
// ==================================================

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // --------------------------------------------------
    // Validate MongoDB ObjectId
    // --------------------------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    // --------------------------------------------------
    // Find Product
    // --------------------------------------------------

    const product =
      await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(
      "Get Product Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch product.",
    });
  }
};

// ==================================================
// CREATE PRODUCT
// ==================================================

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
      stock,
      rating,
      numReviews,
      featured,
    } = req.body;

    // --------------------------------------------------
    // Required Fields
    // --------------------------------------------------

    if (
      !name ||
      !description ||
      price === undefined ||
      !category ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, description, price, category and image are required.",
      });
    }

    // --------------------------------------------------
    // Validate Price
    // --------------------------------------------------

    const parsedPrice = Number(price);

    if (
      Number.isNaN(parsedPrice) ||
      parsedPrice < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Price must be a valid non-negative number.",
      });
    }

    // --------------------------------------------------
    // Validate Stock
    // --------------------------------------------------

    const parsedStock = Number(
      stock ?? 0
    );

    if (
      Number.isNaN(parsedStock) ||
      parsedStock < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Stock must be a valid non-negative number.",
      });
    }

    // --------------------------------------------------
    // Validate Rating
    // --------------------------------------------------

    const parsedRating = Number(
      rating ?? 0
    );

    if (
      Number.isNaN(parsedRating) ||
      parsedRating < 0 ||
      parsedRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Rating must be between 0 and 5.",
      });
    }

    // --------------------------------------------------
    // Validate Reviews
    // --------------------------------------------------

    const parsedReviews = Number(
      numReviews ?? 0
    );

    if (
      Number.isNaN(parsedReviews) ||
      parsedReviews < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Number of reviews must be a valid non-negative number.",
      });
    }

    // --------------------------------------------------
    // Create Product
    // --------------------------------------------------

    const product =
      await Product.create({
        name: name.trim(),

        description:
          description.trim(),

        price: parsedPrice,

        category:
          category.trim(),

        image: image.trim(),

        stock: parsedStock,

        rating: parsedRating,

        numReviews: parsedReviews,

        featured:
          featured === true,
      });

    return res.status(201).json({
      success: true,
      message:
        "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error(
      "Create Product Error:",
      error
    );

    // --------------------------------------------------
    // Mongoose Validation Error
    // --------------------------------------------------

    if (
      error.name ===
      "ValidationError"
    ) {
      const messages =
        Object.values(
          error.errors
        ).map(
          (item) => item.message
        );

      return res.status(400).json({
        success: false,
        message:
          "Product validation failed.",
        errors: messages,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Unable to create product.",
    });
  }
};

// ==================================================
// UPDATE PRODUCT
// ==================================================

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // --------------------------------------------------
    // Validate Product ID
    // --------------------------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    // --------------------------------------------------
    // Find Product
    // --------------------------------------------------

    const product =
      await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const {
      name,
      description,
      price,
      category,
      image,
      stock,
      rating,
      numReviews,
      featured,
    } = req.body;

    // --------------------------------------------------
    // Name
    // --------------------------------------------------

    if (name !== undefined) {
      if (
        typeof name !== "string" ||
        !name.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Product name cannot be empty.",
        });
      }

      product.name = name.trim();
    }

    // --------------------------------------------------
    // Description
    // --------------------------------------------------

    if (description !== undefined) {
      if (
        typeof description !==
          "string" ||
        !description.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Product description cannot be empty.",
        });
      }

      product.description =
        description.trim();
    }

    // --------------------------------------------------
    // Price
    // --------------------------------------------------

    if (price !== undefined) {
      const parsedPrice =
        Number(price);

      if (
        Number.isNaN(parsedPrice) ||
        parsedPrice < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Price must be a valid non-negative number.",
        });
      }

      product.price =
        parsedPrice;
    }

    // --------------------------------------------------
    // Category
    // --------------------------------------------------

    if (category !== undefined) {
      if (
        typeof category !==
          "string" ||
        !category.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Product category cannot be empty.",
        });
      }

      product.category =
        category.trim();
    }

    // --------------------------------------------------
    // Image
    // --------------------------------------------------

    if (image !== undefined) {
      if (
        typeof image !==
          "string" ||
        !image.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Product image cannot be empty.",
        });
      }

      product.image =
        image.trim();
    }

    // --------------------------------------------------
    // Stock
    // --------------------------------------------------

    if (stock !== undefined) {
      const parsedStock =
        Number(stock);

      if (
        Number.isNaN(parsedStock) ||
        parsedStock < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Stock must be a valid non-negative number.",
        });
      }

      product.stock =
        parsedStock;
    }

    // --------------------------------------------------
    // Rating
    // --------------------------------------------------

    if (rating !== undefined) {
      const parsedRating =
        Number(rating);

      if (
        Number.isNaN(parsedRating) ||
        parsedRating < 0 ||
        parsedRating > 5
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Rating must be between 0 and 5.",
        });
      }

      product.rating =
        parsedRating;
    }

    // --------------------------------------------------
    // Number of Reviews
    // --------------------------------------------------

    if (
      numReviews !== undefined
    ) {
      const parsedReviews =
        Number(numReviews);

      if (
        Number.isNaN(
          parsedReviews
        ) ||
        parsedReviews < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Number of reviews must be a valid non-negative number.",
        });
      }

      product.numReviews =
        parsedReviews;
    }

    // --------------------------------------------------
    // Featured
    // --------------------------------------------------

    if (
      featured !== undefined
    ) {
      if (
        typeof featured !==
        "boolean"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Featured must be true or false.",
        });
      }

      product.featured =
        featured;
    }

    // --------------------------------------------------
    // Save
    // --------------------------------------------------

    const updatedProduct =
      await product.save();

    return res.status(200).json({
      success: true,
      message:
        "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(
      "Update Product Error:",
      error
    );

    if (
      error.name ===
      "ValidationError"
    ) {
      const messages =
        Object.values(
          error.errors
        ).map(
          (item) => item.message
        );

      return res.status(400).json({
        success: false,
        message:
          "Product validation failed.",
        errors: messages,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Unable to update product.",
    });
  }
};

// ==================================================
// DELETE PRODUCT
// ==================================================

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // --------------------------------------------------
    // Validate ID
    // --------------------------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    // --------------------------------------------------
    // Find Product
    // --------------------------------------------------

    const product =
      await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // --------------------------------------------------
    // Delete
    // --------------------------------------------------

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message:
        "Product deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Product Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to delete product.",
    });
  }
};

// ==================================================
// EXPORT CONTROLLERS
// ==================================================

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};