import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ShieldCheck,
  Truck,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";


const CATEGORY_FALLBACKS = {
  Fashion:
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85",

  Electronics:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85",

  Beauty:
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=700&q=85",

  Home:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=85",

  Accessories:
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=700&q=85",

  Sports:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=85",
};


function getImage(item) {
  return (
    item?.image ||
    item?.imageUrl ||
    CATEGORY_FALLBACKS[
      item?.category
    ] ||
    CATEGORY_FALLBACKS.Fashion
  );
}


function Cart({
  cartItems = [],
  onUpdateQuantity,
  onRemoveFromCart,
}) {

  const subtotal =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(
          item.price || 0
        ) *
          Number(
            item.quantity || 1
          ),
      0
    );


  const shipping =
    subtotal === 0
      ? 0
      : subtotal >= 999
      ? 0
      : 99;


  const total =
    subtotal + shipping;


  const remainingForFreeShipping =
    Math.max(
      0,
      999 - subtotal
    );


  if (
    cartItems.length ===
    0
  ) {
    return (
      <main className="empty-page-wrapper">

        <div className="empty-page">

          <div className="empty-page-icon">
            <ShoppingBag
              size={38}
            />
          </div>

          <span className="eyebrow">
            YOUR BAG
          </span>

          <h1>
            Nothing here yet.
          </h1>

          <p>
            Your favourite products
            are waiting to be discovered.
          </p>

          <Link
            to="/shop"
            className="button button-dark"
          >
            Start shopping

            <ArrowLeft
              size={17}
              className="rotate-right"
            />
          </Link>

        </div>

      </main>
    );
  }


  return (
    <main className="cart-page">

      <div className="page-container">

        <Link
          to="/shop"
          className="back-link"
        >
          <ArrowLeft size={17} />
          Continue shopping
        </Link>


        <div className="page-title">

          <span className="eyebrow">
            YOUR BAG ·{" "}
            {cartItems.length}{" "}
            {cartItems.length === 1
              ? "ITEM"
              : "ITEMS"}
          </span>

          <h1>
            Shopping cart.
          </h1>

        </div>


        <div className="cart-layout">


          <div className="cart-items">

            {cartItems.map(
              (item) => {

                const id =
                  item._id ||
                  item.id;

                const quantity =
                  Number(
                    item.quantity ||
                      1
                  );

                const image =
                  getImage(item);


                return (
                  <article
                    className="cart-item"
                    key={id}
                  >

                    <Link
                      to={`/product/${id}`}
                      className="cart-image"
                    >
                      <img
                        src={image}
                        alt={
                          item.name
                        }
                        loading="lazy"
                        onError={(
                          event
                        ) => {
                          const fallback =
                            CATEGORY_FALLBACKS[
                              item.category
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
                    </Link>


                    <div className="cart-item-info">

                      <span>
                        {
                          item.category
                        }
                      </span>


                      <Link
                        to={`/product/${id}`}
                      >
                        <h3>
                          {
                            item.name
                          }
                        </h3>
                      </Link>


                      <strong>
                        ₹
                        {Number(
                          item.price ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </strong>


                      <div className="cart-item-controls">

                        <div className="quantity-control">

                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(
                                id,
                                quantity - 1
                              )
                            }
                            disabled={
                              quantity <=
                              1
                            }
                          >
                            <Minus
                              size={14}
                            />
                          </button>


                          <span>
                            {quantity}
                          </span>


                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(
                                id,
                                quantity + 1
                              )
                            }
                          >
                            <Plus
                              size={14}
                            />
                          </button>

                        </div>


                        <button
                          type="button"
                          className="remove-button"
                          onClick={() =>
                            onRemoveFromCart(
                              id
                            )
                          }
                        >
                          <Trash2
                            size={15}
                          />

                          Remove
                        </button>

                      </div>

                    </div>


                    <strong className="cart-line-total">
                      ₹
                      {(
                        Number(
                          item.price ||
                            0
                        ) *
                        quantity
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </article>
                );
              }
            )}

          </div>


          <aside className="cart-summary">

            <span className="eyebrow">
              SUMMARY
            </span>

            <h2>
              Order summary
            </h2>


            {remainingForFreeShipping >
            0 ? (
              <div className="shipping-progress">

                <div className="shipping-progress-top">

                  <span>
                    Add ₹
                    {remainingForFreeShipping.toLocaleString(
                      "en-IN"
                    )}{" "}
                    for free shipping
                  </span>

                  <Truck
                    size={16}
                  />

                </div>


                <div className="shipping-progress-track">

                  <span
                    style={{
                      width: `${Math.min(
                        100,
                        (subtotal /
                          999) *
                          100
                      )}%`,
                    }}
                  />

                </div>

              </div>
            ) : (
              <div className="free-shipping-message">

                <Truck
                  size={17}
                />

                You unlocked free shipping.

              </div>
            )}


            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹
                {subtotal.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            <div className="summary-row">

              <span>
                Shipping
              </span>

              <strong>
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping}`}
              </strong>

            </div>


            <div className="summary-divider" />


            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹
                {total.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            <button
              type="button"
              className="button button-dark checkout-button"
              onClick={() =>
                alert(
                  "Checkout functionality will be connected next."
                )
              }
            >
              Proceed to checkout

              <ArrowLeft
                size={17}
                className="rotate-right"
              />

            </button>


            <div className="checkout-trust">

              <ShieldCheck
                size={16}
              />

              Secure checkout

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}


export default Cart;