import { useEffect, useState } from "react";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { API_ENDPOINTS } from "../config/api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  async function handleLogin() {
    // Clear previous errors
    setError("");

    // Frontend validation
    if (!form.username.trim()) {
      setError("Username is required");
      return;
    }
    if (!form.password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username.trim(),
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      if (data.token) {
        login(data.token, "/");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form title="Log In">
      <Input
        label="Username"
        value={form.username}
        onChange={set("username")}
        placeholder="Enter username"
      />
      <Input
        label="Password"
        type="password"
        value={form.password}
        onChange={set("password")}
        placeholder="Enter password"
      />
      <div className="flex flex-col gap-2 pt-1">
        {error && (
          <div className="p-2 rounded-lg bg-red-100 text-red-700 text-xs">
            {error}
          </div>
        )}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-semibold transition"
        >
          {loading ? "Logging In..." : "Log In"}
        </button>
        <p className="text-center text-xs text-gray-500 pt-1">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </Form>
  );
}
