import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import {
  getProducts,
} from "../services/api";

import ProductCard from "../components/ProductCard";

const categories = [
  "All",
  "Fashion",
  "Electronics",
  "Beauty",
  "Home",
  "Accessories",
  "Sports",
];

function Shop({
  onAddToCart,
  onWishlist,
  wishlistItems = [],
}) {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const [
    products,
    setProducts,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [totalPages, setTotalPages] =
    useState(1);

  const category =
    searchParams.get(
      "category"
    ) || "All";

  const search =
    searchParams.get(
      "search"
    ) || "";

  const sort =
    searchParams.get(
      "sort"
    ) || "newest";

  const page = Math.max(
    1,
    Number(
      searchParams.get(
        "page"
      ) || 1
    )
  );

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getProducts({
            page,
            limit: 8,
            category,
            search,
            sort,
          });

        if (!mounted) {
          return;
        }

        setProducts(
          data.products || []
        );

        setTotalPages(
          data.pagination
            ?.totalPages || 1
        );
      } catch (err) {
        if (mounted) {
          setError(
            err.message ||
              "Unable to load products."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, [
    category,
    search,
    sort,
    page,
  ]);

  const updateParams = (
    updates
  ) => {
    const params =
      new URLSearchParams(
        searchParams
      );

    Object.entries(
      updates
    ).forEach(
      ([key, value]) => {
        if (
          value === null ||
          value === "" ||
          value === "All" ||
          (key === "sort" &&
            value === "newest")
        ) {
          params.delete(key);
        } else {
          params.set(
            key,
            String(value)
          );
        }
      }
    );

    setSearchParams(params);
  };

  const changeCategory = (
    value
  ) => {
    updateParams({
      category:
        value === "All"
          ? null
          : value,
      page: 1,
    });
  };

  const changeSort = (
    value
  ) => {
    updateParams({
      sort: value,
      page: 1,
    });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const changePage = (
    nextPage
  ) => {
    if (
      nextPage < 1 ||
      nextPage > totalPages
    ) {
      return;
    }

    updateParams({
      page: nextPage,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const heading =
    search
      ? `Results for "${search}"`
      : category === "All"
      ? "Shop everything."
      : `${category}.`;

  return (
    <main className="shop-page">
      <div className="page-container">

        <div className="shop-header">
          <div>
            <span className="eyebrow">
              CODECART COLLECTION
            </span>

            <h1>{heading}</h1>

            <p>
              Discover products selected
              for everyday life.
            </p>
          </div>

          <div className="shop-toolbar">
            <span>
              {products.length} shown
            </span>

            <div className="shop-sort">
              <SlidersHorizontal
                size={17}
              />

              <select
                value={sort}
                onChange={(event) =>
                  changeSort(
                    event.target
                      .value
                  )
                }
              >
                <option value="newest">
                  Featured
                </option>

                <option value="price-low">
                  Price: Low to high
                </option>

                <option value="price-high">
                  Price: High to low
                </option>

                <option value="rating">
                  Top rated
                </option>

                <option value="discount">
                  Biggest discount
                </option>
              </select>

              <ChevronDown
                size={15}
              />
            </div>
          </div>
        </div>

        <div className="shop-filter-wrapper">
          <div className="shop-filters">
            {categories.map(
              (item) => (
                <button
                  key={item}
                  className={
                    category === item
                      ? "filter-chip active"
                      : "filter-chip"
                  }
                  onClick={() =>
                    changeCategory(
                      item
                    )
                  }
                >
                  {item}
                </button>
              )
            )}
          </div>

          {(category !==
            "All" ||
            search ||
            sort !==
              "newest") && (
            <button
              className="clear-filters"
              onClick={
                clearFilters
              }
            >
              Clear filters
              <X size={15} />
            </button>
          )}
        </div>

        {loading && (
          <div className="premium-loading large">
            <LoaderCircle
              className="loading-icon"
              size={35}
            />

            <p>
              Finding something
              you'll love...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="state-card error-state">
            <div className="state-icon">
              !
            </div>

            <h2>
              Something went wrong.
            </h2>

            <p>{error}</p>

            <button
              className="button button-dark"
              onClick={() =>
                window.location.reload()
              }
            >
              Try again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          products.length ===
            0 && (
            <div className="state-card">
              <div className="state-icon">
                ∅
              </div>

              <h2>
                Nothing matched your search.
              </h2>

              <p>
                Try another category,
                keyword or filter.
              </p>

              <button
                className="button button-dark"
                onClick={
                  clearFilters
                }
              >
                View all products
              </button>
            </div>
          )}

        {!loading &&
          !error &&
          products.length >
            0 && (
            <>
              <div className="product-grid">
                {products.map(
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

              {totalPages >
                1 && (
                <div className="pagination">
                  <button
                    disabled={
                      page <= 1
                    }
                    onClick={() =>
                      changePage(
                        page - 1
                      )
                    }
                  >
                    <ChevronLeft
                      size={17}
                    />
                  </button>

                  <div>
                    <strong>
                      {page}
                    </strong>

                    <span>
                      /{" "}
                      {totalPages}
                    </span>
                  </div>

                  <button
                    disabled={
                      page >=
                      totalPages
                    }
                    onClick={() =>
                      changePage(
                        page + 1
                      )
                    }
                  >
                    <ChevronRight
                      size={17}
                    />
                  </button>
                </div>
              )}
            </>
          )}
      </div>
    </main>
  );
}

export default Shop;