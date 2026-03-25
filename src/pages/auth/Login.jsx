import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// 🗺️ EMAIL → ROLE MAP
const USER_ROLE_MAP = {
  "superadmin@test.com": "SUPER_ADMIN",
  "admin@test.com":      "BUSINESS_ADMIN",
  "manager@test.com":    "MARKETING_MANAGER",
  "viewer@test.com":     "VIEWER",
};

// Demo password
const DEMO_PASSWORD = "123456";

export default function Login() {
  const navigate  = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔄 Handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  // 🚀 Handle Login
  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email आणि Password भरा.");
      return;
    }

    if (form.password !== DEMO_PASSWORD) {
      setError("Password चुकीचा आहे.");
      return;
    }

    const role = USER_ROLE_MAP[form.email.toLowerCase().trim()];
    if (!role) {
      setError("हा Email registered नाही.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // ✅ Save in localStorage (IMPORTANT)
      const userData = { email: form.email, role };
      localStorage.setItem("user", JSON.stringify(userData));

      // ✅ Save in Context
      login(form.email, role);

      // ✅ Navigate to Admin Layout
      navigate("/admin");

      setLoading(false);
    }, 800);
  }

  const inputCls =
    "w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-400 transition-all placeholder-slate-400";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 bg-indigo-300" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-20 bg-purple-200" />
      </div>

      <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md mx-4">

        {/* Logo */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white text-2xl mb-3 shadow-lg">
            ✉️
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">
            Admin Login
          </h2>
          <p className="text-xs text-slate-400">Role-based Access System</p>
        </div>

        {/* Demo Credentials */}
        <div className="mb-5 p-3 rounded-xl text-[11px] bg-indigo-50 border border-indigo-100 text-indigo-600 space-y-1">
          <div className="font-bold mb-1">Demo (password: 123456)</div>
          {Object.entries(USER_ROLE_MAP).map(([email, role]) => (
            <div key={email} className="flex justify-between">
              <span>{email}</span>
              <span className="opacity-70 font-medium">{role}</span>
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-red-500 text-xs bg-red-50 border border-red-200 rounded-xl px-3 py-2">
            ❌ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@test.com"
              value={form.email}
              onChange={handleChange}
              className={inputCls}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="123456"
                value={form.password}
                onChange={handleChange}
                className={inputCls}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-sm text-white transition-all
              ${loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-lg cursor-pointer"
              }`}
          >
            {loading ? "Checking..." : "Login →"}
          </button>
        </form>

        {/* Register */}
        <p className="text-sm mt-5 text-center text-slate-400">
          Account?{" "}
          <Link to="/register" className="text-indigo-500 font-semibold hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}