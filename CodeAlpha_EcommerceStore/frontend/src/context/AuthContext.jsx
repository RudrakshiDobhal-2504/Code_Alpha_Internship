import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const TOKEN_KEY = "codecart_token";
const USER_KEY = "codecart_user";

function normalizeUser(user) {
  if (!user) {
    return null;
  }

  const id =
    user._id ||
    user.id ||
    user.userId ||
    user.userID ||
    "";

  const name =
    user.name ||
    user.fullName ||
    user.username ||
    user.displayName ||
    "CodeCart User";

  const email =
    user.email ||
    user.emailAddress ||
    "";

  return {
    ...user,
    _id: id,
    id,
    userId: id,
    name,
    email,
  };
}

function extractAuthPayload(data) {
  const payload =
    data?.data || data;

  return {
    token:
      payload?.token ||
      payload?.accessToken ||
      data?.token ||
      data?.accessToken ||
      null,

    user: normalizeUser(
      payload?.user ||
        payload?.account ||
        data?.user ||
        null
    ),
  };
}

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    try {
      const savedToken =
        localStorage.getItem(
          TOKEN_KEY
        );

      const savedUser =
        localStorage.getItem(
          USER_KEY
        );

      if (
        savedToken &&
        savedUser
      ) {
        const parsedUser =
          normalizeUser(
            JSON.parse(savedUser)
          );

        setToken(savedToken);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error(
        "Unable to restore authentication:",
        error
      );

      localStorage.removeItem(
        TOKEN_KEY
      );

      localStorage.removeItem(
        USER_KEY
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const saveAuth = (authData) => {
    const { token, user } =
      extractAuthPayload(
        authData
      );

    if (!token) {
      throw new Error(
        "The server did not return an authentication token."
      );
    }

    const safeUser =
      user ||
      normalizeUser({
        name: "CodeCart User",
      });

    localStorage.setItem(
      TOKEN_KEY,
      token
    );

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(safeUser)
    );

    setToken(token);
    setUser(safeUser);

    return safeUser;
  };

  const login = async (
    email,
    password
  ) => {
    const response =
      await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

    let data;

    try {
      data =
        await response.json();
    } catch {
      throw new Error(
        "Invalid server response."
      );
    }

    if (!response.ok) {
      throw new Error(
        data?.message ||
          data?.error ||
          "Unable to login."
      );
    }

    saveAuth(data);

    return data;
  };

  const register = async (
    name,
    email,
    password
  ) => {
    const response =
      await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

    let data;

    try {
      data =
        await response.json();
    } catch {
      throw new Error(
        "Invalid server response."
      );
    }

    if (!response.ok) {
      throw new Error(
        data?.message ||
          data?.error ||
          "Unable to create account."
      );
    }

    saveAuth(data);

    return data;
  };

  const logout = () => {
    localStorage.removeItem(
      TOKEN_KEY
    );

    localStorage.removeItem(
      USER_KEY
    );

    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated:
      Boolean(token && user),
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}