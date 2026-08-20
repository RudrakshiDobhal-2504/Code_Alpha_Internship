import {
  Heart,
  ShoppingBag,
  Star,
  Eye,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";


const CATEGORY_FALLBACKS = {
  Fashion:
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",

  Electronics:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",

  Beauty:
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=85",

  Home:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",

  Accessories:
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=85",

  Sports:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
};


function getProductImage(product) {
  return (
    product?.image ||
    product?.imageUrl ||
    CATEGORY_FALLBACKS[
      product?.category
    ] ||
    CATEGORY_FALLBACKS.Fashion
  );
}


function ProductCard({
  product,
  onAddToCart,
  onWishlist,
  wishlist = false,
}) {
  const id =
    product?._id ||
    product?.id;

  const price =
    Number(
      product?.price || 0
    );

  const originalPrice =
    Number(
      product?.originalPrice ||
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
      : Number(
          product?.discount || 0
        );

  const rating =
    Number(
      product?.rating || 0
    );

  const image =
    getProductImage(product);


  return (
    <article className="product-card">

      <div className="product-card-image">

        <Link
          to={`/product/${id}`}
          className="product-card-image-link"
        >
          <img
            src={image}
            alt={
              product?.name ||
              "CodeCart product"
            }
            loading="lazy"
            onError={(event) => {
              const fallback =
                CATEGORY_FALLBACKS[
                  product?.category
                ] ||
                CATEGORY_FALLBACKS.Fashion;

              if (
                event.currentTarget.src !==
                fallback
              ) {
                event.currentTarget.src =
                  fallback;
              }
            }}
          />

          <div className="product-card-image-overlay">
            <span>
              <Eye size={15} />
              Quick view
            </span>
          </div>
        </Link>


        {discount > 0 && (
          <span className="product-card-sale">
            -{discount}%
          </span>
        )}


        {product?.featured && (
          <span className="product-card-featured">
            FEATURED
          </span>
        )}


        <button
          type="button"
          className={
            wishlist
              ? "product-card-wishlist active"
              : "product-card-wishlist"
          }
          onClick={() =>
            onWishlist?.(product)
          }
          aria-label={
            wishlist
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <Heart
            size={17}
            fill={
              wishlist
                ? "currentColor"
                : "none"
            }
          />
        </button>

      </div>


      <div className="product-card-info">

        <span className="product-card-category">
          {product?.category ||
            "Collection"}
        </span>


        <Link
          to={`/product/${id}`}
        >
          <h3>
            {product?.name ||
              "Untitled Product"}
          </h3>
        </Link>


        <div className="product-card-rating">

          <Star
            size={12}
            fill="currentColor"
          />

          <span>
            {rating.toFixed(1)}
          </span>

          <span>
            ({product?.numReviews || 0})
          </span>

        </div>


        <div className="product-card-price">

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

        </div>


        <button
          type="button"
          className="product-card-button"
          onClick={() =>
            onAddToCart?.(
              product,
              1
            )
          }
        >
          <ShoppingBag
            size={14}
          />

          Add to cart
        </button>

      </div>

    </article>
  );
}


export default ProductCard;