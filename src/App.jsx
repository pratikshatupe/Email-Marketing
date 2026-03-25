import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

// ── Auth Context ──
import { AuthProvider, useAuth } from "./pages/auth/AuthContext";

// ── Home / Public Pages ──
import Home        from "./pages/home/Home";
import About       from "./pages/home/About";
import Features    from "./pages/home/Features";
import Pricing     from "./pages/home/Pricing";
import Newsletter  from "./pages/home/Newsletter";
import Marketplace from "./pages/home/Marketplace";

// ── Auth Pages ──
import Login          from "./pages/auth/Login";
import Register       from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail    from "./pages/auth/VerifyMail";

// ── Admin Pages ──
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers     from "./pages/admin/AdminUsers";

// Dummy dashboards
const ManagerDashboard = () => <h1>Manager Dashboard</h1>;
const ViewerDashboard  = () => <h1>Viewer Dashboard</h1>;

import "./App.css";

// 🔐 Protected Route
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// 🔁 Auto Login from localStorage (IMPORTANT FIX)
function AppWrapper() {
  const { login } = useAuth();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      login(parsed.email, parsed.role);
    }
  }, []);

  return <AppRoutes />;
}

// 🎯 All Routes
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public Pages ── */}
        <Route path="/"            element={<Home />} />
        <Route path="/about"       element={<About />} />
        <Route path="/features"    element={<Features />} />
        <Route path="/pricing"     element={<Pricing />} />
        <Route path="/newsletter"  element={<Newsletter />} />
        <Route path="/marketplace" element={<Marketplace />} />

        {/* ── Auth Pages ── */}
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email"    element={<VerifyEmail />} />

        {/* ── Protected Pages ── */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/super-admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/viewer-dashboard"
          element={
            <ProtectedRoute>
              <ViewerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        {/* ❌ Wrong URL → Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

// 🧠 Main App
function App() {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
}

export default App;