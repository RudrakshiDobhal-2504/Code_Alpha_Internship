import {
  useEffect,
  useState,
} from "react";

import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";


import Navbar from "./components/Navbar";

import CategorySection from "./components/CategorySection";
import ProductSection from "./components/ProductSection";


import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Deals from "./pages/Deals";


import {
  ThemeProvider,
} from "./context/ThemeContext";

import {
  AuthProvider,
} from "./context/AuthContext";


function Home({
  cartItems,
  wishlistItems,
  onAddToCart,
  onWishlist,
}) {
  return (
    <main className="home-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="hero-section">

        <div className="hero-background-orb hero-orb-one" />

        <div className="hero-background-orb hero-orb-two" />


        <div className="hero-content">

          <span className="eyebrow">
            CURATED FOR EVERYDAY
          </span>


          <h1>
            Shop without
            <br />
            <em>
              the noise.
            </em>
          </h1>


          <p>
            Thoughtfully selected products for
            modern everyday life. Discover
            pieces worth keeping.
          </p>


          <div className="hero-actions">

            <Link
              to="/shop"
              className="button button-dark"
            >
              Explore collection

              <span>
                →
              </span>
            </Link>


            <Link
              to="/deals"
              className="button button-outline"
            >
              View today's deals
            </Link>

          </div>


          <div className="hero-trust">

            <span>
              36+ curated products
            </span>

            <span>
              •
            </span>

            <span>
              6 collections
            </span>

            <span>
              •
            </span>

            <span>
              Secure shopping
            </span>

          </div>

        </div>


        <div className="hero-product-card">

          <div className="hero-product-image">

            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1100&q=90"
              alt="Studio wireless headphones"
              loading="eager"
            />

          </div>


          <div className="hero-product-info">

            <div>

              <span>
                FEATURED PICK
              </span>

              <h3>
                Studio Wireless
                Headphones
              </h3>

            </div>


            <strong>
              ₹2,999
            </strong>

          </div>

        </div>

      </section>


      {/* =================================================
          CATEGORIES
      ================================================= */}

      <CategorySection />


      {/* =================================================
          TRENDING PRODUCTS
      ================================================= */}

      <ProductSection
        title="Trending now."
        subtitle="THE EDIT"
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        onAddToCart={
          onAddToCart
        }
        onWishlist={
          onWishlist
        }
      />


      {/* =================================================
          DEAL BANNER
      ================================================= */}

      <section className="home-deal-banner">

        <div>

          <span className="eyebrow">
            CODECART DEALS
          </span>


          <h2>
            Better products.
            <br />
            Better prices.
          </h2>


          <p>
            Discover selected products with
            special pricing while they last.
          </p>


          <Link
            to="/deals"
            className="button button-light"
          >
            Explore deals →
          </Link>

        </div>


        <div className="deal-banner-number">

          <span>
            UP TO
          </span>

          <strong>
            40%
          </strong>

          <span>
            OFF
          </span>

        </div>

      </section>


      {/* =================================================
          VALUES
      ================================================= */}

      <section className="home-values">

        <div className="section-heading centered">

          <span className="eyebrow">
            WHY CODECART
          </span>

          <h2>
            Simple shopping,
            thoughtfully designed.
          </h2>

        </div>


        <div className="value-grid">

          <div className="value-card">

            <span>
              01
            </span>

            <h3>
              Curated
            </h3>

            <p>
              Products selected with quality,
              usefulness and everyday life in mind.
            </p>

          </div>


          <div className="value-card">

            <span>
              02
            </span>

            <h3>
              Secure
            </h3>

            <p>
              Your account and shopping experience
              are built around secure authentication.
            </p>

          </div>


          <div className="value-card">

            <span>
              03
            </span>

            <h3>
              Simple
            </h3>

            <p>
              Search, discover, save and shop
              without unnecessary complexity.
            </p>

          </div>


          <div className="value-card">

            <span>
              04
            </span>

            <h3>
              Personal
            </h3>

            <p>
              Keep your favourites close with
              wishlist and account features.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   MAIN APPLICATION
========================================================= */

function AppContent() {

  const [cartItems, setCartItems] =
    useState(() => {
      try {
        return JSON.parse(
          localStorage.getItem(
            "codecart_cart"
          ) || "[]"
        );
      } catch {
        return [];
      }
    });


  const [
    wishlistItems,
    setWishlistItems,
  ] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(
          "codecart_wishlist"
        ) || "[]"
      );
    } catch {
      return [];
    }
  });


  /* =======================================================
     PERSIST CART
  ======================================================= */

  useEffect(() => {
    localStorage.setItem(
      "codecart_cart",
      JSON.stringify(
        cartItems
      )
    );
  }, [cartItems]);


  /* =======================================================
     PERSIST WISHLIST
  ======================================================= */

  useEffect(() => {
    localStorage.setItem(
      "codecart_wishlist",
      JSON.stringify(
        wishlistItems
      )
    );
  }, [wishlistItems]);


  /* =======================================================
     GET PRODUCT ID
  ======================================================= */

  const getId =
    (product) =>
      product?._id ||
      product?.id;


  /* =======================================================
     ADD TO CART
  ======================================================= */

  const onAddToCart = (
    product,
    quantity = 1
  ) => {

    const productId =
      getId(product);

    if (!productId) {
      return;
    }


    setCartItems(
      (current) => {

        const existing =
          current.find(
            (item) =>
              getId(item) ===
              productId
          );


        if (existing) {

          return current.map(
            (item) =>
              getId(item) ===
              productId
                ? {
                    ...item,

                    quantity:
                      Number(
                        item.quantity ||
                          1
                      ) +
                      Number(
                        quantity ||
                          1
                      ),
                  }
                : item
          );

        }


        return [
          ...current,

          {
            ...product,

            quantity:
              Number(
                quantity
              ) || 1,
          },
        ];
      }
    );
  };


  /* =======================================================
     UPDATE CART QUANTITY
  ======================================================= */

  const onUpdateQuantity = (
    productId,
    quantity
  ) => {

    if (
      quantity <= 0
    ) {

      setCartItems(
        (current) =>
          current.filter(
            (item) =>
              getId(item) !==
              productId
          )
      );

      return;
    }


    setCartItems(
      (current) =>
        current.map(
          (item) =>
            getId(item) ===
            productId
              ? {
                  ...item,
                  quantity,
                }
              : item
        )
    );
  };


  /* =======================================================
     REMOVE FROM CART
  ======================================================= */

  const onRemoveFromCart =
    (productId) => {

      setCartItems(
        (current) =>
          current.filter(
            (item) =>
              getId(item) !==
              productId
          )
      );

    };


  /* =======================================================
     WISHLIST
  ======================================================= */

  const onWishlist = (
    product
  ) => {

    const productId =
      getId(product);

    if (!productId) {
      return;
    }


    setWishlistItems(
      (current) => {

        const exists =
          current.some(
            (item) =>
              getId(item) ===
              productId
          );


        if (exists) {

          return current.filter(
            (item) =>
              getId(item) !==
              productId
          );

        }


        return [
          ...current,
          product,
        ];

      }
    );
  };


  return (
    <>

      <Navbar
        cartItems={
          cartItems
        }
        wishlistItems={
          wishlistItems
        }
      />


      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={
            <Home
              cartItems={
                cartItems
              }
              wishlistItems={
                wishlistItems
              }
              onAddToCart={
                onAddToCart
              }
              onWishlist={
                onWishlist
              }
            />
          }
        />


        {/* SHOP */}

        <Route
          path="/shop"
          element={
            <Shop
              onAddToCart={
                onAddToCart
              }
              onWishlist={
                onWishlist
              }
              wishlistItems={
                wishlistItems
              }
            />
          }
        />


        {/* CATEGORIES */}

        <Route
          path="/categories"
          element={
            <Categories />
          }
        />


        {/* PRODUCT DETAILS */}

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              onAddToCart={
                onAddToCart
              }
              onWishlist={
                onWishlist
              }
              wishlistItems={
                wishlistItems
              }
            />
          }
        />


        {/* PROFILE */}

        <Route
          path="/profile"
          element={
            <Profile />
          }
        />


        {/* CART */}

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={
                cartItems
              }
              onUpdateQuantity={
                onUpdateQuantity
              }
              onRemoveFromCart={
                onRemoveFromCart
              }
            />
          }
        />


        {/* WISHLIST */}

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlistItems={
                wishlistItems
              }
              onAddToCart={
                onAddToCart
              }
              onWishlist={
                onWishlist
              }
            />
          }
        />


        {/* DEALS */}

        <Route
          path="/deals"
          element={
            <Deals
              onAddToCart={
                onAddToCart
              }
              onWishlist={
                onWishlist
              }
              wishlistItems={
                wishlistItems
              }
            />
          }
        />


        {/* 404 */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="site-footer">

        <div className="footer-inner">

          <div>

            <strong>
              CODECART.
            </strong>

            <p>
              Thoughtfully designed shopping
              for everyday life.
            </p>

          </div>


          <div className="footer-links">

            <Link to="/shop">
              Shop
            </Link>

            <Link to="/categories">
              Categories
            </Link>

            <Link to="/deals">
              Deals
            </Link>

            <Link to="/profile">
              Account
            </Link>

          </div>


          <span className="footer-copy">
            ♡ Rudrakshi Dobhal · All rights reserved.
          </span>

        </div>

      </footer>

    </>
  );
}


/* =========================================================
   ROOT APP
========================================================= */

function App() {

  return (
    <ThemeProvider>

      <AuthProvider>

        <BrowserRouter>

          <AppContent />

        </BrowserRouter>

      </AuthProvider>

    </ThemeProvider>
  );
}


export default App;