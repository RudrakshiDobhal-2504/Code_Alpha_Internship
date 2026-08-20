import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";

import { getProducts } from "../services/api";

function ProductSection({
  title = "Trending now.",
  subtitle = "THE EDIT",
  onAddToCart,
  onWishlist,
  wishlistItems = [],
}) {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data =
          await getProducts({
            page: 1,
            limit: 8,
            sort: "rating",
          });

        if (mounted) {
          setProducts(
            data.products || []
          );
        }
      } catch (error) {
        console.error(
          "Unable to load products:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="product-section page-container">

      <div className="section-heading-row">
        <div>
          <span className="eyebrow">
            <Sparkles
              size={14}
            />
            {subtitle}
          </span>

          <h2>{title}</h2>

          <p>
            Products people are loving
            right now.
          </p>
        </div>

        <Link
          to="/shop"
          className="text-link"
        >
          Explore collection
          <ArrowRight size={17} />
        </Link>
      </div>

      {loading ? (
        <div className="premium-loading">
          <div className="loading-orbit" />
          <p>
            Curating your selection...
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(
            (product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={
                  onAddToCart
                }
                onWishlist={
                  onWishlist
                }
                wishlist={wishlistItems.some(
                  (item) =>
                    (item._id ||
                      item.id) ===
                    product._id
                )}
              />
            )
          )}
        </div>
      )}
    </section>
  );
}

export default ProductSection;