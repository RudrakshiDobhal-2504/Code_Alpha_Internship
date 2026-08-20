import {
  ArrowRight,
  Percent,
  Sparkles,
  Tag,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";

import {
  getProducts,
} from "../services/api";

function Deals({
  onAddToCart,
  onWishlist,
  wishlistItems = [],
}) {
  const [
    products,
    setProducts,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadDeals() {
      try {
        const data =
          await getProducts({
            page: 1,
            limit: 100,
            deals: true,
            sort: "discount",
          });

        if (mounted) {
          setProducts(
            data.products || []
          );
        }
      } catch (error) {
        console.error(
          "Deals error:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDeals();

    return () => {
      mounted = false;
    };
  }, []);

  const topDeals =
    products.slice(0, 8);

  const under999 =
    products
      .filter(
        (product) =>
          Number(
            product.price
          ) <= 999
      )
      .slice(0, 4);

  return (
    <main className="deals-page">

      <section className="deals-hero">
        <div className="page-container deals-hero-inner">

          <div className="deals-hero-content">

            <span className="deal-pill">
              <Tag size={15} />
              CODECART DEALS
            </span>

            <h1>
              Great products.
              <br />
              <em>
                Better prices.
              </em>
            </h1>

            <p>
              Discover limited-time
              selections, featured picks
              and everyday essentials
              worth checking out.
            </p>

            <div className="hero-actions">
              <Link
                to="/shop"
                className="button button-light"
              >
                Shop everything
                <ArrowRight
                  size={17}
                />
              </Link>
            </div>
          </div>

          <div className="deal-hero-stat">
            <Sparkles size={22} />
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

        </div>
      </section>

      <section className="deals-section page-container">

        <div className="section-heading-row">
          <div>
            <span className="eyebrow">
              <Percent size={14} />
              FEATURED DEALS
            </span>

            <h2>
              Worth a closer look.
            </h2>

            <p>
              Hand-picked products with
              special pricing.
            </p>
          </div>

          <Link
            to="/shop"
            className="text-link"
          >
            View all
            <ArrowRight
              size={17}
            />
          </Link>
        </div>

        {loading ? (
          <div className="premium-loading large">
            <div className="loading-orbit" />
            <p>
              Finding the best prices...
            </p>
          </div>
        ) : topDeals.length ===
          0 ? (
          <div className="state-card">
            <h2>
              No deals right now.
            </h2>
            <p>
              Check back soon for
              new offers.
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {topDeals.map(
              (product) => (
                <ProductCard
                  key={
                    product._id
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

      {!loading &&
        under999.length >
          0 && (
          <section className="deals-under-section">
            <div className="page-container">

              <div className="section-heading-row light">
                <div>
                  <span className="eyebrow">
                    UNDER ₹999
                  </span>

                  <h2>
                    Small price.
                    <br />
                    Easy choice.
                  </h2>
                </div>

                <Link
                  to="/shop?sort=price-low"
                  className="text-link light-link"
                >
                  Shop affordable picks
                  <ArrowRight
                    size={17}
                  />
                </Link>
              </div>

              <div className="product-grid">
                {under999.map(
                  (product) => (
                    <ProductCard
                      key={
                        product._id
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
            </div>
          </section>
        )}

    </main>
  );
}

export default Deals;