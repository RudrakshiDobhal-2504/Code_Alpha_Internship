# CodeAlpha Ecommerce Store

A modern full-stack e-commerce web application developed as **Task 1** of my CodeAlpha Full Stack Development Internship.

The project provides a complete online shopping experience with product browsing, categories, deals, cart management, wishlist functionality, authentication, user profiles, and backend API integration.

---

## ✨ Features

### 🏠 Home Page

- Modern and responsive landing page
- Hero section
- Featured products
- Product categories
- Deals and offers
- Navigation system

### 🛍️ Shopping

- Browse products
- Product categories
- Product details
- Search and product discovery
- Deals section
- Add products to cart
- Wishlist functionality

### 🛒 Cart

- Add products to cart
- View cart items
- Manage shopping cart
- Order-related functionality

### 👤 User

- User registration
- User authentication
- User profile
- Protected user functionality

### 🎨 UI / UX

- Responsive design
- Modern interface
- Reusable React components
- Dark/light theme support
- Interactive UI elements
- Smooth navigation

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Development Tools

- Git
- GitHub
- VS Code
- Git Bash
- MongoDB

---

## 📂 Project Structure

```text
CodeAlpha_EcommerceStore/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── productController.js
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   │
│   ├── package.json
│   ├── seedProducts.js
│   └── server.js
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
