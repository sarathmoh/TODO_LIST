import React, { createContext, useContext, useState } from "react";
import apiClient from "../api";

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: { username: string } | null;
  login: (
    username: string,
    password: string
  ) => Promise<{ message: string; statusCode: number }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );
  const [user, setUser] = useState<{ username: string } | null>(() =>
    JSON.parse(localStorage.getItem("currentUser") || "null")
  );

  const login = async (
    username: string,
    password: string
  ): Promise<{ message: string; statusCode: number }> => {
    try {
      const { data } = await apiClient.get("/auth");
      if (data.username === username && data.password === password) {
        setIsAuthenticated(true);
        setUser({ username });
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("currentUser", JSON.stringify({ username }));
        return {
          message: "Login successful",
          statusCode: 200,
        };
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser: user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("An unexpected error occurred. Please try again.");
  }
  return context;
};
