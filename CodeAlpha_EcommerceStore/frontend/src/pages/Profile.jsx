import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LogOut,
  Package,
  ShieldCheck,
  User,
  Heart,
  ShoppingBag,
  Copy,
  Check,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

function Profile() {
  const {
    user,
    loading: authLoading,
    isAuthenticated,
    login,
    register,
    logout,
  } = useAuth();

  const [mode, setMode] =
    useState("login");

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  const switchMode = (
    newMode
  ) => {
    setMode(newMode);
    setError("");
    setSuccess("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = async (
    event
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !email.trim() ||
      !password
    ) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      await login(
        email
          .trim()
          .toLowerCase(),
        password
      );

      setSuccess(
        "Welcome back. You are now signed in."
      );

      setPassword("");
    } catch (err) {
      setError(
        err.message ||
          "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister =
    async (event) => {
      event.preventDefault();

      setError("");
      setSuccess("");

      if (!name.trim()) {
        setError(
          "Please enter your name."
        );
        return;
      }

      if (
        name.trim().length <
        2
      ) {
        setError(
          "Name must contain at least 2 characters."
        );
        return;
      }

      if (!email.trim()) {
        setError(
          "Please enter your email."
        );
        return;
      }

      if (!password) {
        setError(
          "Please create a password."
        );
        return;
      }

      if (
        password.length < 6
      ) {
        setError(
          "Password must contain at least 6 characters."
        );
        return;
      }

      if (
        password !==
        confirmPassword
      ) {
        setError(
          "Passwords do not match."
        );
        return;
      }

      try {
        setLoading(true);

        await register(
          name.trim(),
          email
            .trim()
            .toLowerCase(),
          password
        );

        setSuccess(
          "Account created successfully."
        );

        setPassword("");
        setConfirmPassword("");
      } catch (err) {
        setError(
          err.message ||
            "Unable to create your account."
        );
      } finally {
        setLoading(false);
      }
    };

  const userId =
    user?._id ||
    user?.id ||
    user?.userId ||
    "Not available";

  const displayName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    "CodeCart User";

  const displayEmail =
    user?.email ||
    "Email unavailable";

  const copyUserId = async () => {
    if (
      !userId ||
      userId ===
        "Not available"
    ) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        userId
      );

      setCopied(true);

      setTimeout(
        () =>
          setCopied(false),
        1600
      );
    } catch {
      // Clipboard may be unavailable.
    }
  };

  if (authLoading) {
    return (
      <main className="profile-page">
        <div className="page-container">
          <div className="premium-loading large">
            <div className="loading-orbit" />
            <p>
              Loading your account...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (
    isAuthenticated &&
    user
  ) {
    return (
      <main className="profile-page">
        <div className="page-container">

          <div className="profile-hero">
            <div>
              <span className="eyebrow">
                MY ACCOUNT
              </span>

              <h1>
                Welcome back,
                <br />
                <em>
                  {displayName}.
                </em>
              </h1>

              <p>
                Manage your account,
                preferences and shopping
                activity.
              </p>
            </div>

            <div className="profile-avatar-large">
              <User size={34} />
            </div>
          </div>

          <div className="account-overview">

            <div className="account-info-card">
              <span>
                ACCOUNT
              </span>

              <h2>
                {displayName}
              </h2>

              <p>
                {displayEmail}
              </p>

              <div className="account-active">
                <CheckCircle2
                  size={16}
                />
                Account active
              </div>
            </div>

            <div className="account-info-card">
              <span>
                CUSTOMER ID
              </span>

              <div className="customer-id">
                <strong>
                  {userId}
                </strong>

                <button
                  onClick={
                    copyUserId
                  }
                  aria-label="Copy customer ID"
                >
                  {copied ? (
                    <Check
                      size={16}
                    />
                  ) : (
                    <Copy
                      size={16}
                    />
                  )}
                </button>
              </div>

              <p>
                Your unique CodeCart
                account identifier.
              </p>
            </div>

          </div>

          <div className="profile-grid">

            <div className="profile-card">
              <div className="profile-card-icon">
                <Package size={22} />
              </div>

              <span className="profile-card-label">
                ORDERS
              </span>

              <h3>
                Your purchases
              </h3>

              <p>
                Track your purchases and
                view your order history.
              </p>

              <span className="coming-soon">
                Coming soon
              </span>
            </div>

            <div className="profile-card">
              <div className="profile-card-icon">
                <Heart size={22} />
              </div>

              <span className="profile-card-label">
                SAVED
              </span>

              <h3>
                Your wishlist
              </h3>

              <p>
                Keep your favourite
                products close.
              </p>

              <Link
                to="/wishlist"
                className="profile-card-link"
              >
                View wishlist
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="profile-card">
              <div className="profile-card-icon">
                <ShieldCheck size={22} />
              </div>

              <span className="profile-card-label">
                SECURITY
              </span>

              <h3>
                Protected account
              </h3>

              <p>
                Your authentication is
                securely managed.
              </p>

              <span className="coming-soon">
                Protected
              </span>
            </div>

          </div>

          <div className="profile-links">

            <Link to="/wishlist">
              <div>
                <Heart size={18} />
                <span>
                  Wishlist
                </span>
              </div>
              <ArrowRight size={17} />
            </Link>

            <Link to="/cart">
              <div>
                <ShoppingBag size={18} />
                <span>
                  Shopping cart
                </span>
              </div>
              <ArrowRight size={17} />
            </Link>

            <Link to="/shop">
              <div>
                <ShoppingBag size={18} />
                <span>
                  Continue shopping
                </span>
              </div>
              <ArrowRight size={17} />
            </Link>

          </div>

          <button
            className="signout-button"
            onClick={logout}
          >
            <LogOut size={17} />
            Sign out of CodeCart
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="page-container">

        <div className="page-title auth-page-title">
          <span className="eyebrow">
            MY ACCOUNT
          </span>

          <h1>
            Welcome to
            <br />
            <em>CodeCart.</em>
          </h1>

          <p>
            Sign in or create your account
            to make your shopping experience
            personal.
          </p>
        </div>

        <div className="auth-layout">

          <div className="profile-card auth-card">

            <div className="auth-header">
              <div className="profile-avatar">
                <User size={28} />
              </div>

              <div>
                <span>
                  {mode === "login"
                    ? "WELCOME BACK"
                    : "GET STARTED"}
                </span>

                <h2>
                  {mode === "login"
                    ? "Sign in to your account"
                    : "Create your account"}
                </h2>
              </div>
            </div>

            <div className="auth-tabs">
              <button
                className={
                  mode === "login"
                    ? "auth-tab active"
                    : "auth-tab"
                }
                onClick={() =>
                  switchMode(
                    "login"
                  )
                }
              >
                Sign in
              </button>

              <button
                className={
                  mode ===
                  "register"
                    ? "auth-tab active"
                    : "auth-tab"
                }
                onClick={() =>
                  switchMode(
                    "register"
                  )
                }
              >
                Create account
              </button>
            </div>

            {error && (
              <div className="auth-message auth-error">
                {error}
              </div>
            )}

            {success && (
              <div className="auth-message auth-success">
                {success}
              </div>
            )}

            {mode ===
            "login" ? (
              <form
                className="auth-form"
                onSubmit={
                  handleLogin
                }
              >
                <div className="form-field">
                  <label>
                    Email address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(
                      event
                    ) =>
                      setEmail(
                        event
                          .target
                          .value
                      )
                    }
                    autoComplete="email"
                  />
                </div>

                <div className="form-field">
                  <label>
                    Password
                  </label>

                  <div className="password-wrapper">
                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={password}
                      onChange={(
                        event
                      ) =>
                        setPassword(
                          event
                            .target
                            .value
                        )
                      }
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <EyeOff
                          size={18}
                        />
                      ) : (
                        <Eye
                          size={18}
                        />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  className="button button-dark auth-submit"
                  disabled={
                    loading
                  }
                >
                  {loading
                    ? "Signing in..."
                    : "Sign in"}

                  {!loading && (
                    <ArrowRight
                      size={17}
                    />
                  )}
                </button>
              </form>
            ) : (
              <form
                className="auth-form"
                onSubmit={
                  handleRegister
                }
              >
                <div className="form-field">
                  <label>
                    Full name
                  </label>

                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(
                      event
                    ) =>
                      setName(
                        event
                          .target
                          .value
                      )
                    }
                    autoComplete="name"
                  />
                </div>

                <div className="form-field">
                  <label>
                    Email address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(
                      event
                    ) =>
                      setEmail(
                        event
                          .target
                          .value
                      )
                    }
                    autoComplete="email"
                  />
                </div>

                <div className="form-field">
                  <label>
                    Password
                  </label>

                  <div className="password-wrapper">
                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Minimum 6 characters"
                      value={password}
                      onChange={(
                        event
                      ) =>
                        setPassword(
                          event
                            .target
                            .value
                        )
                      }
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <EyeOff
                          size={18}
                        />
                      ) : (
                        <Eye
                          size={18}
                        />
                      )}
                    </button>
                  </div>
                </div>

                <div className="form-field">
                  <label>
                    Confirm password
                  </label>

                  <div className="password-wrapper">
                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Repeat your password"
                      value={
                        confirmPassword
                      }
                      onChange={(
                        event
                      ) =>
                        setConfirmPassword(
                          event
                            .target
                            .value
                        )
                      }
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff
                          size={18}
                        />
                      ) : (
                        <Eye
                          size={18}
                        />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  className="button button-dark auth-submit"
                  disabled={
                    loading
                  }
                >
                  {loading
                    ? "Creating account..."
                    : "Create account"}

                  {!loading && (
                    <ArrowRight
                      size={17}
                    />
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="auth-benefits">

            <div>
              <ShieldCheck size={24} />
              <h3>
                Secure account
              </h3>
              <p>
                Your authentication
                is protected by your
                backend security layer.
              </p>
            </div>

            <div>
              <Package size={24} />
              <h3>
                Shopping history
              </h3>
              <p>
                Your account is
                designed to become
                your personal shopping
                space.
              </p>
            </div>

            <div>
              <Heart size={24} />
              <h3>
                Save favourites
              </h3>
              <p>
                Keep the products you
                love close with your
                wishlist.
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;