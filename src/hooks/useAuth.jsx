import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();

  const login = useCallback(
    (token, redirectTo = "/") => {
      if (!token) return;
      localStorage.setItem("token", token);
      navigate(redirectTo);
    },
    [navigate],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  const isAuthenticated = useCallback(() => {
    return Boolean(localStorage.getItem("token"));
  }, []);

  const requireAuth = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return null;
    }
    return token;
  }, [navigate]);

  const authFetch = useCallback(
    async (url, options = {}) => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return null;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        navigate("/login");
      }

      return response;
    },
    [navigate],
  );

  return { authFetch, requireAuth, login, logout, isAuthenticated };
}
