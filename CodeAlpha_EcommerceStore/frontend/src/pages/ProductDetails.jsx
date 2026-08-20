import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getProductById,
} from "../services/api";


const CATEGORY_FALLBACKS = {
  Fashion:
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90",

  Electronics:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=90",

  Beauty:
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=90",

  Home:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=90",

  Accessories:
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=90",

  Sports:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=90",
};


function getFallbackImage(product) {
  return (
    CATEGORY_FALLBACKS[
      product?.category
    ] ||
    CATEGORY_FALLBACKS.Fashion
  );
}


function ProductDetails({
  onAddToCart,
  onWishlist,
  wishlistItems = [],
}) {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);


  useEffect(() => {
    let mounted = true;

    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getProductById(id);

        const found =
          data?.product ||
          data?.data ||
          data;

        if (
          !found ||
          !found.name
        ) {
          throw new Error(
            "Product information was not found."
          );
        }

        if (mounted) {
          setProduct(found);
        }

      } catch (err) {
        if (mounted) {
          setError(
            err.message ||
              "Unable to load product."
          );
        }

      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      mounted = false;
    };
  }, [id]);


  if (loading) {
    return (
      <main className="page">

        <div className="premium-loading large">

          <div className="loading-orbit" />

          <p>
            Preparing product details...
          </p>

        </div>

      </main>
    );
  }


  if (error || !product) {
    return (
      <main className="page">

        <div className="state-card">

          <div className="state-icon">
            !
          </div>

          <h2>
            Product not found.
          </h2>

          <p>
            {error ||
              "This product may have been removed."}
          </p>

          <Link
            to="/shop"
            className="button button-dark"
          >
            Back to shop
          </Link>

        </div>

      </main>
    );
  }


  const stock =
    Math.max(
      0,
      Number(
        product.stock ?? 1
      )
    );


  const productId =
    product._id ||
    product.id;


  const isWishlisted =
    wishlistItems.some(
      (item) =>
        (item._id ||
          item.id) ===
        productId
    );


  const price =
    Number(
      product.price || 0
    );


  const originalPrice =
    Number(
      product.originalPrice ||
        price
    );


  const discount =
    originalPrice > price
      ? Math.round(
          ((originalPrice -
            price) /
            originalPrice) *
            100
        )
      : 0;


  const fallbackImage =
    getFallbackImage(
      product
    );


  const productImage =
    product.image ||
    product.imageUrl ||
    fallbackImage;


  const decreaseQuantity =
    () => {
      setQuantity(
        (current) =>
          Math.max(
            1,
            current - 1
          )
      );
    };


  const increaseQuantity =
    () => {
      setQuantity(
        (current) =>
          Math.min(
            stock,
            current + 1
          )
      );
    };


  return (
    <main className="product-page">

      <div className="page-container">

        <button
          className="back-link"
          onClick={() =>
            navigate(-1)
          }
        >
          <ArrowLeft size={17} />
          Back
        </button>


        <div className="product-detail-layout">


          <div className="product-detail-visual">

            {discount > 0 && (
              <span className="product-sale-badge">
                -{discount}%
              </span>
            )}


            <button
              type="button"
              className={
                isWishlisted
                  ? "detail-heart active"
                  : "detail-heart"
              }
              onClick={() =>
                onWishlist?.(
                  product
                )
              }
              aria-label={
                isWishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >
              <Heart
                size={21}
                fill={
                  isWishlisted
                    ? "currentColor"
                    : "none"
                }
              />
            </button>


            <img
              src={productImage}
              alt={
                product.name
              }
              onError={(
                event
              ) => {
                if (
                  event.currentTarget.src !==
                  fallbackImage
                ) {
                  event.currentTarget.src =
                    fallbackImage;
                }
              }}
            />

          </div>


          <div className="product-detail-info">

            <span className="product-category">
              {product.category ||
                "Collection"}
            </span>


            <h1>
              {product.name}
            </h1>


            <div className="detail-rating">

              <div>
                <Star
                  size={17}
                  fill="currentColor"
                />

                <strong>
                  {Number(
                    product.rating ||
                      0
                  ).toFixed(1)}
                </strong>
              </div>

              <span>
                {product.numReviews ||
                  0}{" "}
                reviews
              </span>

            </div>


            <div className="detail-price-row">

              <strong>
                ₹
                {price.toLocaleString(
                  "en-IN"
                )}
              </strong>


              {originalPrice >
                price && (
                <del>
                  ₹
                  {originalPrice.toLocaleString(
                    "en-IN"
                  )}
                </del>
              )}


              {discount > 0 && (
                <span>
                  Save {discount}%
                </span>
              )}

            </div>


            <p className="detail-description">
              {product.description ||
                "A thoughtfully selected CodeCart product designed for everyday use."}
            </p>


            <div
              className={
                stock > 0
                  ? "stock-status available"
                  : "stock-status unavailable"
              }
            >
              <span />

              {stock > 0
                ? `${stock} available`
                : "Currently out of stock"}
            </div>


            {stock > 0 && (
              <div className="detail-purchase">

                <div className="quantity-control large">

                  <button
                    type="button"
                    onClick={
                      decreaseQuantity
                    }
                    disabled={
                      quantity <= 1
                    }
                  >
                    <Minus
                      size={16}
                    />
                  </button>

                  <span>
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={
                      increaseQuantity
                    }
                    disabled={
                      quantity >=
                      stock
                    }
                  >
                    <Plus
                      size={16}
                    />
                  </button>

                </div>


                <button
                  type="button"
                  className="button button-dark detail-cart-button"
                  onClick={() =>
                    onAddToCart?.(
                      product,
                      quantity
                    )
                  }
                >
                  <ShoppingBag
                    size={18}
                  />

                  Add to cart
                </button>

              </div>
            )}


            <div className="detail-benefits">

              <div>
                <Truck size={21} />

                <div>
                  <strong>
                    Free shipping
                  </strong>

                  <span>
                    On orders above ₹999
                  </span>
                </div>
              </div>


              <div>
                <RotateCcw
                  size={21}
                />

                <div>
                  <strong>
                    Easy returns
                  </strong>

                  <span>
                    Simple return process
                  </span>
                </div>
              </div>


              <div>
                <ShieldCheck
                  size={21}
                />

                <div>
                  <strong>
                    Secure checkout
                  </strong>

                  <span>
                    Protected shopping
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}


export default ProductDetails;