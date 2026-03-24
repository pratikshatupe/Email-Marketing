import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔥 Role Logic
  const getUserRole = (email) => {
    if (email === "superadmin@test.com") return "SUPER_ADMIN";
    if (email === "admin@test.com") return "BUSINESS_ADMIN";
    if (email === "manager@test.com") return "MARKETING_MANAGER";
    if (email === "viewer@test.com") return "VIEWER";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email आणि Password भरा.");
      return;
    }

    // 🔥 Password check
    if (form.password !== "123456") {
      setError("Wrong password");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const role = getUserRole(form.email);

      if (!role) {
        setError("User not found");
        setLoading(false);
        return;
      }

      // ✅ Save user
      localStorage.setItem("user", JSON.stringify({
        email: form.email,
        role: role
      }));

      // 🔥 Role-based redirect
      if (role === "SUPER_ADMIN") {
        navigate("/super-admin");
      } else if (role === "BUSINESS_ADMIN") {
        navigate("/admin-dashboard");
      } else if (role === "MARKETING_MANAGER") {
        navigate("/manager-dashboard");
      } else {
        navigate("/viewer-dashboard");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-blue-500"
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>

        <p className="text-sm mt-4 text-center">
          Don't have account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}