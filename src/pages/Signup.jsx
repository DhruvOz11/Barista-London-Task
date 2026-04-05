import { useEffect, useState } from "react";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  async function handleSignup() {
    // Clear previous errors
    setError("");

    // Frontend validation
    if (!form.username.trim()) {
      setError("Username is required");
      return;
    }
    if (form.username.trim().length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }
    if (!form.password) {
      setError("Password is required");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/user/signup", {
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
        setError(data.message || "Signup failed");
        return;
      }

      // Success - redirect to login
      navigate("/login");
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form title="Create Account">
      <Input
        label="Username"
        value={form.username}
        onChange={set("username")}
        placeholder="Choose a username"
      />
      <Input
        label="Password"
        type="password"
        value={form.password}
        onChange={set("password")}
        placeholder="Create a password"
      />
      <Input
        label="Confirm Password"
        type="password"
        value={form.confirm}
        onChange={set("confirm")}
        placeholder="Repeat your password"
      />
      <div className="flex flex-col gap-2 pt-1">
        {error && (
          <div className="p-2 rounded-lg bg-red-100 text-red-700 text-xs">
            {error}
          </div>
        )}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-semibold transition"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
        <p className="text-center text-xs text-gray-500 pt-1">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </Form>
  );
}
