"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import LocalStorageKit from "@/utils/localStorageKit";

const defaultValue = {
  user: {
    id: "",
    email: "",
    name: "",
    createdAt: "",
    updatedAt: "",
  },
  token: "",
  isLoggedIn: false,

  actions: {
    login: (email, password) => {},
    register: (email, password, name) => {},
    logout: () => {},
  },
};

const AuthContext = createContext(defaultValue);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultValue.user);
  const [token, setToken] = useState(defaultValue.token);
  const [isLoggedIn, setIsLoggedIn] = useState(defaultValue.isLoggedIn);

  useEffect(() => {
    const token = LocalStorageKit.getToken();
    if (token) {
      setToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (token) {
      _getUser();
    }
  }, [token]);

  const _getUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to get user");
      }

      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to login");
      }

      const data = await res.json();
      setToken(data.token);
      setUser(data.user);
      LocalStorageKit.setToken(data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login errors (e.g., show error message to the user)
    }
  };

  const register = async (email, password, name) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to register");
      }

      const data = await res.json();
      setToken(data.token);
      setUser(data.user);
      LocalStorageKit.setToken(data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle registration errors
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(defaultValue.user);
    setToken(defaultValue.token);
    LocalStorageKit.removeToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn,
        actions: {
          login,
          register,
          logout,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return React.useContext(AuthContext);
};

// const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
