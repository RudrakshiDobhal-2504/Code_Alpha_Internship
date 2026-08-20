import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sun,
  Moon,
  User,
  X,
  ArrowRight,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function Navbar({
  cartItems = [],
  wishlistItems = [],
}) {
  const {
    isDark,
    toggleTheme,
  } = useTheme();

  const {
    user,
    isAuthenticated,
  } = useAuth();

  const navigate =
    useNavigate();

  const [
    searchParams,
  ] = useSearchParams();

  const [search, setSearch] =
    useState(
      searchParams.get(
        "search"
      ) || ""
    );

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  useEffect(() => {
    setSearch(
      searchParams.get(
        "search"
      ) || ""
    );
  }, [searchParams]);

  const cartCount =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(
          item.quantity || 1
        ),
      0
    );

  const submitSearch = (event) => {
    event.preventDefault();

    const query =
      search.trim();

    if (!query) {
      navigate("/shop");
      return;
    }

    navigate(
      `/shop?search=${encodeURIComponent(
        query
      )}`
    );

    setSearchOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">

          <button
            className="mobile-menu-button"
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>

          <Link
            to="/"
            className="brand"
          >
            <span className="brand-mark">
              C
            </span>

            <span>
              CODECART
            </span>
          </Link>

          <nav className="desktop-nav">
            <Link to="/">
              Home
            </Link>

            <Link to="/shop">
              Shop
            </Link>

            <Link to="/categories">
              Categories
            </Link>

            <Link
              to="/deals"
              className="nav-deal-link"
            >
              Deals
              <span>NEW</span>
            </Link>
          </nav>

          <div className="navbar-actions">

            {searchOpen ? (
              <form
                className="navbar-search-form"
                onSubmit={
                  submitSearch
                }
              >
                <Search size={17} />

                <input
                  autoFocus
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search products..."
                />

                <button
                  type="button"
                  onClick={() =>
                    setSearchOpen(
                      false
                    )
                  }
                >
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button
                className="icon-button"
                onClick={() =>
                  setSearchOpen(
                    true
                  )
                }
                aria-label="Search"
              >
                <Search size={19} />
              </button>
            )}

            <button
              className="icon-button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </button>

            <Link
              to="/wishlist"
              className="icon-button nav-count-button"
              aria-label="Wishlist"
            >
              <Heart size={19} />

              {wishlistItems.length >
                0 && (
                <span>
                  {
                    wishlistItems.length
                  }
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="icon-button nav-count-button"
              aria-label="Cart"
            >
              <ShoppingBag
                size={19}
              />

              {cartCount > 0 && (
                <span>
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              className="navbar-account"
            >
              <div className="navbar-account-icon">
                <User size={17} />
              </div>

              <span>
                {isAuthenticated &&
                user
                  ? user.name?.split(
                      " "
                    )[0]
                  : "Account"}
              </span>
            </Link>
          </div>
        </div>

        {mobileOpen && (
          <div className="mobile-menu">

            <form
              className="mobile-search"
              onSubmit={
                submitSearch
              }
            >
              <Search size={18} />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search CodeCart..."
              />

              <button>
                <ArrowRight
                  size={18}
                />
              </button>
            </form>

            <Link
              to="/"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Home
            </Link>

            <Link
              to="/shop"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Shop
            </Link>

            <Link
              to="/categories"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Categories
            </Link>

            <Link
              to="/deals"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Deals
            </Link>

            <Link
              to="/profile"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              My account
            </Link>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;