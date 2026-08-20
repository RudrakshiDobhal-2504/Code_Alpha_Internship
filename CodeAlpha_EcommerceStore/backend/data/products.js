const products = [
  // ==================================================
  // ELECTRONICS
  // ==================================================

  {
    name: "Nova Wireless Headphones",
    description:
      "Premium wireless headphones with active noise cancellation, deep bass and up to 30 hours of battery life.",
    price: 2499,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    stock: 24,
    rating: 4.7,
    numReviews: 128,
    featured: true,
  },

  {
    name: "Pulse Smartwatch Pro",
    description:
      "A modern smartwatch with fitness tracking, heart-rate monitoring, notifications and a bright AMOLED display.",
    price: 3999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    stock: 18,
    rating: 4.6,
    numReviews: 96,
    featured: true,
  },

  {
    name: "Aero Bluetooth Speaker",
    description:
      "Compact portable speaker delivering powerful sound, rich bass and long-lasting battery performance.",
    price: 1799,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
    stock: 31,
    rating: 4.5,
    numReviews: 74,
    featured: false,
  },

  // ==================================================
  // FASHION
  // ==================================================

  {
    name: "Classic Cotton Overshirt",
    description:
      "A versatile everyday cotton overshirt designed with a relaxed fit and clean minimalist styling.",
    price: 1299,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
    stock: 42,
    rating: 4.4,
    numReviews: 63,
    featured: true,
  },

  {
    name: "Minimal Everyday Sneakers",
    description:
      "Clean everyday sneakers combining lightweight comfort with a timeless minimalist silhouette.",
    price: 2299,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    stock: 27,
    rating: 4.8,
    numReviews: 154,
    featured: true,
  },

  {
    name: "Urban Canvas Backpack",
    description:
      "Durable canvas backpack with multiple compartments for laptops, books and everyday essentials.",
    price: 1599,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    stock: 35,
    rating: 4.5,
    numReviews: 81,
    featured: false,
  },

  // ==================================================
  // BEAUTY
  // ==================================================

  {
    name: "Velvet Matte Lip Color",
    description:
      "Smooth long-wear lip color with a comfortable matte finish and rich buildable pigment.",
    price: 699,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
    stock: 56,
    rating: 4.6,
    numReviews: 112,
    featured: true,
  },

  {
    name: "Botanical Face Serum",
    description:
      "Lightweight daily facial serum formulated for a fresh, hydrated and healthy-looking complexion.",
    price: 899,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80",
    stock: 38,
    rating: 4.5,
    numReviews: 87,
    featured: false,
  },

  {
    name: "Daily Glow Skincare Set",
    description:
      "A simple skincare collection designed for an easy morning and evening self-care routine.",
    price: 1499,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
    stock: 21,
    rating: 4.7,
    numReviews: 69,
    featured: true,
  },

  // ==================================================
  // HOME
  // ==================================================

  {
    name: "Nordic Ceramic Vase",
    description:
      "Elegant ceramic vase with a minimalist silhouette designed to complement modern interiors.",
    price: 899,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=80",
    stock: 29,
    rating: 4.6,
    numReviews: 48,
    featured: false,
  },

  {
    name: "Soft Knit Cushion",
    description:
      "Comfortable textured cushion adding warmth and understated style to sofas, beds and reading spaces.",
    price: 599,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80",
    stock: 47,
    rating: 4.4,
    numReviews: 39,
    featured: false,
  },

  {
    name: "Modern Table Lamp",
    description:
      "Warm ambient table lamp with a refined modern design for bedrooms, desks and living spaces.",
    price: 1199,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    stock: 16,
    rating: 4.7,
    numReviews: 55,
    featured: true,
  },

  // ==================================================
  // ACCESSORIES
  // ==================================================

  {
    name: "Classic Leather Watch",
    description:
      "Elegant everyday watch featuring a clean dial and comfortable leather-inspired strap.",
    price: 1899,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
    stock: 19,
    rating: 4.7,
    numReviews: 91,
    featured: true,
  },

  {
    name: "Aster Minimal Sunglasses",
    description:
      "Timeless sunglasses with a lightweight frame and versatile design for everyday wear.",
    price: 999,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    stock: 33,
    rating: 4.3,
    numReviews: 42,
    featured: false,
  },

  {
    name: "Everyday Card Holder",
    description:
      "Slim and practical card holder designed to keep your essential cards organized without bulk.",
    price: 499,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80",
    stock: 61,
    rating: 4.5,
    numReviews: 37,
    featured: false,
  },

  // ==================================================
  // SPORTS
  // ==================================================

  {
    name: "Flex Training Bottle",
    description:
      "Durable reusable sports bottle designed for workouts, running and everyday hydration.",
    price: 499,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
    stock: 72,
    rating: 4.5,
    numReviews: 64,
    featured: false,
  },

  {
    name: "Performance Running Shoes",
    description:
      "Lightweight running shoes designed for comfortable daily training and active lifestyles.",
    price: 2799,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80",
    stock: 23,
    rating: 4.8,
    numReviews: 119,
    featured: true,
  },

  {
    name: "Essential Yoga Mat",
    description:
      "Cushioned non-slip yoga mat designed for stretching, yoga, mobility and home workouts.",
    price: 899,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=900&q=80",
    stock: 41,
    rating: 4.6,
    numReviews: 73,
    featured: false,
  },
];

module.exports = products;