const API_BASE_URL = "http://localhost:5000/api";

/* =========================================================
   CODECART PRODUCT CATALOGUE
   36 products = 6 categories × 6 products
========================================================= */

const fallbackProducts = [

  /* =======================================================
     FASHION
  ======================================================= */

  {
    _id: "cc-fashion-001",
    name: "Essential Oversized Tee",
    category: "Fashion",
    description:
      "A premium everyday oversized t-shirt with a clean silhouette and soft cotton feel.",
    price: 899,
    originalPrice: 1199,
    rating: 4.7,
    numReviews: 128,
    stock: 24,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-fashion-002",
    name: "Classic Denim Jacket",
    category: "Fashion",
    description:
      "A timeless denim jacket designed for effortless everyday layering.",
    price: 2299,
    originalPrice: 2999,
    rating: 4.8,
    numReviews: 96,
    stock: 18,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-fashion-003",
    name: "Relaxed Linen Shirt",
    category: "Fashion",
    description:
      "Lightweight linen shirt with a relaxed fit for comfortable everyday dressing.",
    price: 1799,
    originalPrice: 2199,
    rating: 4.6,
    numReviews: 74,
    stock: 21,
    featured: false,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-fashion-004",
    name: "Minimal Everyday Hoodie",
    category: "Fashion",
    description:
      "A clean minimal hoodie made for comfortable casual outfits.",
    price: 1999,
    originalPrice: 2499,
    rating: 4.8,
    numReviews: 141,
    stock: 15,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-fashion-005",
    name: "Straight Fit Trousers",
    category: "Fashion",
    description:
      "Versatile straight-fit trousers with a polished modern finish.",
    price: 1899,
    originalPrice: 2299,
    rating: 4.5,
    numReviews: 61,
    stock: 27,
    featured: false,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-fashion-006",
    name: "Premium Cotton Kurta",
    category: "Fashion",
    description:
      "A refined cotton kurta combining traditional comfort with a contemporary cut.",
    price: 1499,
    originalPrice: 1899,
    rating: 4.7,
    numReviews: 89,
    stock: 20,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93f4?auto=format&fit=crop&w=900&q=85",
  },


  /* =======================================================
     ELECTRONICS
  ======================================================= */

  {
    _id: "cc-electronics-001",
    name: "Studio Wireless Headphones",
    category: "Electronics",
    description:
      "Immersive wireless headphones with balanced audio and all-day comfort.",
    price: 2999,
    originalPrice: 3999,
    rating: 4.9,
    numReviews: 284,
    stock: 16,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-electronics-002",
    name: "Smart Fitness Watch",
    category: "Electronics",
    description:
      "Modern smartwatch with activity tracking, notifications and health-focused features.",
    price: 3499,
    originalPrice: 4499,
    rating: 4.7,
    numReviews: 192,
    stock: 19,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-electronics-003",
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    description:
      "Compact wireless speaker with rich sound for rooms, travel and outdoor use.",
    price: 1799,
    originalPrice: 2299,
    rating: 4.6,
    numReviews: 113,
    stock: 30,
    featured: false,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-electronics-004",
    name: "Mechanical Keyboard",
    category: "Electronics",
    description:
      "Tactile mechanical keyboard designed for focused work and comfortable typing.",
    price: 3299,
    originalPrice: 3999,
    rating: 4.8,
    numReviews: 157,
    stock: 12,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-electronics-005",
    name: "Fast Wireless Charger",
    category: "Electronics",
    description:
      "Minimal wireless charging dock with a compact desk-friendly design.",
    price: 999,
    originalPrice: 1299,
    rating: 4.5,
    numReviews: 82,
    stock: 42,
    featured: false,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1591290619762-c588b2e1a4f1?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-electronics-006",
    name: "Compact Smart Projector",
    category: "Electronics",
    description:
      "Portable projector for movie nights, presentations and compact entertainment spaces.",
    price: 6999,
    originalPrice: 8499,
    rating: 4.6,
    numReviews: 57,
    stock: 8,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=900&q=85",
  },


  /* =======================================================
     BEAUTY
  ======================================================= */

  {
    _id: "cc-beauty-001",
    name: "Hydrating Face Serum",
    category: "Beauty",
    description:
      "Lightweight daily serum designed to leave skin feeling hydrated and refreshed.",
    price: 799,
    originalPrice: 999,
    rating: 4.8,
    numReviews: 214,
    stock: 35,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-beauty-002",
    name: "Daily Glow Moisturizer",
    category: "Beauty",
    description:
      "A lightweight moisturizer created for a comfortable everyday skincare routine.",
    price: 699,
    originalPrice: 899,
    rating: 4.7,
    numReviews: 176,
    stock: 41,
    featured: false,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-beauty-003",
    name: "Gentle Cleansing Foam",
    category: "Beauty",
    description:
      "Gentle daily cleanser with a soft foaming texture for a fresh finish.",
    price: 549,
    originalPrice: 699,
    rating: 4.6,
    numReviews: 133,
    stock: 48,
    featured: false,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-beauty-004",
    name: "Aromatic Body Mist",
    category: "Beauty",
    description:
      "A fresh everyday fragrance mist with a clean, elegant character.",
    price: 899,
    originalPrice: 1199,
    rating: 4.5,
    numReviews: 91,
    stock: 28,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-beauty-005",
    name: "Velvet Lip Collection",
    category: "Beauty",
    description:
      "A curated set of everyday lip shades with a smooth comfortable finish.",
    price: 1199,
    originalPrice: 1599,
    rating: 4.8,
    numReviews: 148,
    stock: 22,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-beauty-006",
    name: "Self Care Gift Set",
    category: "Beauty",
    description:
      "A thoughtful collection of everyday self-care essentials.",
    price: 1599,
    originalPrice: 2099,
    rating: 4.7,
    numReviews: 73,
    stock: 17,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
  },


  /* =======================================================
     HOME
  ======================================================= */

  {
    _id: "cc-home-001",
    name: "Minimal Ceramic Vase",
    category: "Home",
    description:
      "A sculptural ceramic vase designed to add a refined touch to any room.",
    price: 899,
    originalPrice: 1199,
    rating: 4.8,
    numReviews: 67,
    stock: 25,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-home-002",
    name: "Soft Textured Cushion",
    category: "Home",
    description:
      "A soft decorative cushion with a subtle premium texture.",
    price: 699,
    originalPrice: 899,
    rating: 4.6,
    numReviews: 54,
    stock: 34,
    featured: false,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-home-003",
    name: "Warm Ambient Table Lamp",
    category: "Home",
    description:
      "A compact table lamp that creates a warm, calming atmosphere.",
    price: 1399,
    originalPrice: 1799,
    rating: 4.7,
    numReviews: 101,
    stock: 16,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-home-004",
    name: "Modern Ceramic Mug",
    category: "Home",
    description:
      "A clean ceramic mug designed for coffee, tea and everyday rituals.",
    price: 499,
    originalPrice: 699,
    rating: 4.5,
    numReviews: 88,
    stock: 50,
    featured: false,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-home-005",
    name: "Cotton Throw Blanket",
    category: "Home",
    description:
      "A soft cotton throw for comfortable evenings and relaxed interiors.",
    price: 1299,
    originalPrice: 1699,
    rating: 4.8,
    numReviews: 92,
    stock: 20,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1583845112203-454c8f5e0f2f?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-home-006",
    name: "Desk Organizer Set",
    category: "Home",
    description:
      "Minimal organizers for keeping your workspace clean and intentional.",
    price: 799,
    originalPrice: 999,
    rating: 4.6,
    numReviews: 69,
    stock: 31,
    featured: false,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85",
  },


  /* =======================================================
     ACCESSORIES
  ======================================================= */

  {
    _id: "cc-accessories-001",
    name: "Classic Minimal Watch",
    category: "Accessories",
    description:
      "A refined everyday watch with a clean timeless dial.",
    price: 2499,
    originalPrice: 3199,
    rating: 4.8,
    numReviews: 124,
    stock: 14,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-accessories-002",
    name: "Everyday Leather Wallet",
    category: "Accessories",
    description:
      "A slim leather wallet designed for cards and everyday essentials.",
    price: 1199,
    originalPrice: 1499,
    rating: 4.7,
    numReviews: 107,
    stock: 27,
    featured: false,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-accessories-003",
    name: "Structured Everyday Tote",
    category: "Accessories",
    description:
      "A versatile structured tote for work, college and everyday carry.",
    price: 1799,
    originalPrice: 2299,
    rating: 4.8,
    numReviews: 83,
    stock: 19,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-accessories-004",
    name: "Polarized Everyday Sunglasses",
    category: "Accessories",
    description:
      "Classic sunglasses with a clean silhouette for everyday wear.",
    price: 999,
    originalPrice: 1399,
    rating: 4.6,
    numReviews: 95,
    stock: 32,
    featured: false,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-accessories-005",
    name: "Premium Canvas Backpack",
    category: "Accessories",
    description:
      "Durable everyday backpack with a spacious minimal design.",
    price: 2199,
    originalPrice: 2799,
    rating: 4.9,
    numReviews: 138,
    stock: 18,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-accessories-006",
    name: "Minimal Metal Bracelet",
    category: "Accessories",
    description:
      "A subtle metal bracelet designed to complement everyday outfits.",
    price: 799,
    originalPrice: 999,
    rating: 4.5,
    numReviews: 63,
    stock: 40,
    featured: false,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
  },


  /* =======================================================
     SPORTS
  ======================================================= */

  {
    _id: "cc-sports-001",
    name: "Performance Running Shoes",
    category: "Sports",
    description:
      "Lightweight running shoes designed for comfortable daily movement.",
    price: 2999,
    originalPrice: 3999,
    rating: 4.8,
    numReviews: 216,
    stock: 22,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-sports-002",
    name: "Premium Yoga Mat",
    category: "Sports",
    description:
      "Comfortable non-slip yoga mat for home workouts and daily movement.",
    price: 999,
    originalPrice: 1299,
    rating: 4.7,
    numReviews: 173,
    stock: 35,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-sports-003",
    name: "Insulated Sports Bottle",
    category: "Sports",
    description:
      "Insulated reusable bottle designed to keep drinks refreshing during activity.",
    price: 899,
    originalPrice: 1199,
    rating: 4.6,
    numReviews: 84,
    stock: 43,
    featured: false,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-sports-004",
    name: "Training Duffel Bag",
    category: "Sports",
    description:
      "Spacious duffel bag with dedicated room for workout essentials.",
    price: 1599,
    originalPrice: 1999,
    rating: 4.7,
    numReviews: 72,
    stock: 18,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1552916356-7c4e7e8f8c91?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-sports-005",
    name: "Resistance Band Set",
    category: "Sports",
    description:
      "Compact resistance band set suitable for home training and mobility work.",
    price: 599,
    originalPrice: 799,
    rating: 4.5,
    numReviews: 112,
    stock: 60,
    featured: false,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=900&q=85",
  },

  {
    _id: "cc-sports-006",
    name: "Everyday Training Jacket",
    category: "Sports",
    description:
      "Lightweight training jacket designed for warm-ups and outdoor activity.",
    price: 1899,
    originalPrice: 2399,
    rating: 4.7,
    numReviews: 91,
    stock: 24,
    featured: true,
    deal: true,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
  },
];


/* =========================================================
   IMAGE NORMALIZATION
========================================================= */

function normalizeImageUrl(image) {
  if (!image) {
    return "";
  }

  let value = String(image).trim();

  /*
    Fix URLs accidentally stored as:

    [https://example.com/image.jpg](https://example.com/image.jpg)
  */

  const markdownMatch = value.match(
    /^\[.*?\]\((https?:\/\/[^)]+)\)$/
  );

  if (markdownMatch?.[1]) {
    value = markdownMatch[1];
  }

  /*
    Remove accidental quotes.
  */

  value = value.replace(/^["']|["']$/g, "");

  return value;
}


/* =========================================================
   GENERIC API REQUEST
========================================================= */

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("codecart_token");

  const headers = {
    ...(options.body
      ? { "Content-Type": "application/json" }
      : {}),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = {
      success: false,
      message: "Invalid server response.",
    };
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
}


/* =========================================================
   HELPERS
========================================================= */

function normalizeProduct(product) {
  return {
    ...product,

    _id:
      product?._id ||
      product?.id ||
      `product-${Math.random()
        .toString(36)
        .slice(2)}`,

    price: Number(product?.price || 0),

    originalPrice: Number(
      product?.originalPrice ||
        product?.price ||
        0
    ),

    rating: Number(product?.rating || 0),

    numReviews: Number(
      product?.numReviews ||
        product?.reviews?.length ||
        0
    ),

    stock: Number(
      product?.stock ?? 1
    ),

    category:
      product?.category ||
      "General",

    image: normalizeImageUrl(
      product?.image ||
        product?.imageUrl ||
        product?.thumbnail ||
        ""
    ),
  };
}


function getDiscount(product) {
  const original = Number(
    product.originalPrice ||
      product.price ||
      0
  );

  const price = Number(
    product.price || 0
  );

  if (
    original <= price ||
    original === 0
  ) {
    return 0;
  }

  return Math.round(
    ((original - price) /
      original) *
      100
  );
}


function extractProducts(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.products)) {
    return data.products;
  }

  if (
    Array.isArray(
      data?.data?.products
    )
  ) {
    return data.data.products;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}


async function getBackendProducts() {
  try {
    const data =
      await apiRequest("/products");

    return extractProducts(data);
  } catch (error) {
    console.warn(
      "Backend products unavailable. Using CodeCart catalogue.",
      error.message
    );

    return [];
  }
}


/* =========================================================
   PRODUCTS
========================================================= */

export async function getProducts(options = {}) {
  const {
    page = 1,
    limit = 8,
    category = "All",
    search = "",
    sort = "newest",
    featured = false,
    deals = false,
  } = options;

  const backendProducts =
    await getBackendProducts();

  const combined = [
    ...backendProducts,
    ...fallbackProducts,
  ];

  const uniqueProducts =
    Array.from(
      new Map(
        combined.map((product) => {
          const normalized =
            normalizeProduct(product);

          return [
            normalized._id,
            normalized,
          ];
        })
      ).values()
    );

  let products =
    uniqueProducts;

  /* Category */

  if (
    category &&
    category.toLowerCase() !==
      "all"
  ) {
    products =
      products.filter(
        (product) =>
          String(
            product.category
          ).toLowerCase() ===
          String(
            category
          ).toLowerCase()
      );
  }

  /* Search */

  if (search.trim()) {
    const query =
      search
        .trim()
        .toLowerCase();

    products =
      products.filter(
        (product) =>
          String(
            product.name
          )
            .toLowerCase()
            .includes(query) ||

          String(
            product.category
          )
            .toLowerCase()
            .includes(query) ||

          String(
            product.description
          )
            .toLowerCase()
            .includes(query)
      );
  }

  /* Deals */

  if (deals) {
    products =
      products.filter(
        (product) =>
          product.deal ||
          getDiscount(product) >
            0
      );
  }

  /* Featured */

  if (featured) {
    products =
      products.filter(
        (product) =>
          product.featured
      );
  }

  /* Sorting */

  switch (sort) {
    case "price-low":
      products.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );
      break;

    case "price-high":
      products.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );
      break;

    case "rating":
      products.sort(
        (a, b) =>
          Number(
            b.rating || 0
          ) -
          Number(
            a.rating || 0
          )
      );
      break;

    case "discount":
      products.sort(
        (a, b) =>
          getDiscount(b) -
          getDiscount(a)
      );
      break;

    case "newest":
    default:
      products.sort(
        (a, b) => {
          if (
            a.featured &&
            !b.featured
          ) {
            return -1;
          }

          if (
            !a.featured &&
            b.featured
          ) {
            return 1;
          }

          return 0;
        }
      );
      break;
  }

  const totalProducts =
    products.length;

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        totalProducts /
          limit
      )
    );

  const safePage =
    Math.min(
      Math.max(
        Number(page) || 1,
        1
      ),
      totalPages
    );

  const start =
    (safePage - 1) *
    limit;

  const paginatedProducts =
    products
      .slice(
        start,
        start + limit
      )
      .map(
        (product) => ({
          ...product,
          discount:
            getDiscount(
              product
            ),
        })
      );

  return {
    success: true,

    products:
      paginatedProducts,

    pagination: {
      page: safePage,
      limit,
      totalProducts,
      totalPages,
    },
  };
}


/* =========================================================
   PRODUCT BY ID
========================================================= */

export async function getProductById(id) {
  if (!id) {
    throw new Error(
      "Product ID is required."
    );
  }

  try {
    const data =
      await apiRequest(
        `/products/${id}`
      );

    const product =
      data?.product ||
      data?.data?.product ||
      data?.data ||
      data;

    if (product?.name) {
      const normalized =
        normalizeProduct(
          product
        );

      return {
        success: true,
        product: {
          ...normalized,
          discount:
            getDiscount(
              normalized
            ),
        },
      };
    }
  } catch (error) {
    console.warn(
      "Backend product unavailable:",
      error.message
    );
  }

  const fallback =
    fallbackProducts.find(
      (product) =>
        product._id === id
    );

  if (!fallback) {
    throw new Error(
      "Product information was not found."
    );
  }

  return {
    success: true,

    product: {
      ...fallback,
      image:
        normalizeImageUrl(
          fallback.image
        ),
      discount:
        getDiscount(
          fallback
        ),
    },
  };
}


/* =========================================================
   CATEGORY API
========================================================= */

export async function getProductsByCategory(
  category
) {
  const data =
    await getProducts({
      category,
      page: 1,
      limit: 100,
    });

  return data.products;
}


/* =========================================================
   AUTHENTICATION
========================================================= */

export async function registerUser(
  name,
  email,
  password
) {
  return apiRequest(
    "/auth/register",
    {
      method: "POST",

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );
}


export async function loginUser(
  email,
  password
) {
  return apiRequest(
    "/auth/login",
    {
      method: "POST",

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
}


/* =========================================================
   EXPORT CATALOGUE
========================================================= */

export {
  fallbackProducts,
};