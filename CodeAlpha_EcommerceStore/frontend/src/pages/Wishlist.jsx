import {
  ArrowRight,
  Heart,
} from "lucide-react";

import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";

function Wishlist({
  wishlistItems = [],
  onAddToCart,
  onWishlist,
}) {
  return (
    <main className="wishlist-page">
      <div className="page-container">

        <div className="page-title">
          <span className="eyebrow">
            SAVED FOR LATER ·{" "}
            {wishlistItems.length}
          </span>

          <h1>
            Your wishlist.
          </h1>

          <p>
            The products you want to
            remember.
          </p>
        </div>

        {wishlistItems.length ===
        0 ? (
          <div className="empty-page">
            <div className="empty-page-icon">
              <Heart size={38} />
            </div>

            <span className="eyebrow">
              NOTHING SAVED
            </span>

            <h2>
              Your wishlist is empty.
            </h2>

            <p>
              Save something you love
              and it'll stay here for
              later.
            </p>

            <Link
              to="/shop"
              className="button button-dark"
            >
              Explore products
              <ArrowRight
                size={17}
              />
            </Link>
          </div>
        ) : (
          <>
            <div className="wishlist-topline">
              <span>
                {wishlistItems.length}{" "}
                saved{" "}
                {wishlistItems.length ===
                1
                  ? "product"
                  : "products"}
              </span>

              <Link to="/shop">
                Discover more
                <ArrowRight
                  size={16}
                />
              </Link>
            </div>

            <div className="product-grid">
              {wishlistItems.map(
                (product) => (
                  <ProductCard
                    key={
                      product._id ||
                      product.id
                    }
                    product={
                      product
                    }
                    onAddToCart={
                      onAddToCart
                    }
                    onWishlist={
                      onWishlist
                    }
                    wishlist
                  />
                )
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default Wishlist;