import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

// ── Auth Context ──
import { AuthProvider, useAuth } from "./pages/auth/AuthContext";

// ── Language Context ──
import { LanguageProvider } from "./pages/admin/Languagecontext";

// ── Layout ──
import AdminLayout from "./pages/admin/AdminLayout";

import Home from "./pages/home/Home";

// ── Auth Pages ──
import Login       from "./pages/auth/Login";
import Register    from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyMail";

// ── Admin Pages ──
import AdminUsers from "./pages/admin/AdminUsers";

// ── Campaign Pages ──
import WhatsAppCampaigns from "./pages/campagins/WhatsappCampagins";
import EmailCampaigns    from "./pages/campagins/EmailCampagins";

// ── Dummy Role Dashboards ──
const ManagerDashboard = () => <h1>Manager Dashboard</h1>;
const ViewerDashboard  = () => <h1>Viewer Dashboard</h1>;

import "./App.css";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function AppWrapper() {
  const { login } = useAuth();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        login(parsed.email, parsed.role);
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  return <AppRoutes />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        {/* ── Anchor Redirects ──────────────────────────── */}
        <Route path="/about"       element={<Navigate to="/#about"       replace />} />
        <Route path="/features"    element={<Navigate to="/#features"    replace />} />
        <Route path="/pricing"     element={<Navigate to="/#pricing"     replace />} />
        <Route path="/newsletter"  element={<Navigate to="/#newsletter"  replace />} />
        <Route path="/marketplace" element={<Navigate to="/#marketplace" replace />} />

        {/* ── Auth Pages ─────────────────────────────────── */}
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Forgot Password → Login inline mode */}
        <Route path="/forgot-password" element={<Navigate to="/login?mode=forgot" replace />} />

        {/* Email Verify */}
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* ── Protected: Admin ──────────────────────────── */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        {/* ── Protected: Campaign Pages ─────────────────── */}
        <Route
          path="/campaigns/whatsapp"
          element={
            <ProtectedRoute>
              <WhatsAppCampaigns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaigns/email"
          element={
            <ProtectedRoute>
              <EmailCampaigns />
            </ProtectedRoute>
          }
        />
        {/* Default campaigns redirect */}
        <Route
          path="/campaigns"
          element={<Navigate to="/campaigns/email" replace />}
        />

        {/* ── Protected: Role Dashboards ────────────────── */}
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

        {/* ── 404 → Home ────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppWrapper />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;