// frontend/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import { AuthProvider, useAuth } from "./pages/auth/AuthContext";
import { LanguageProvider }      from "./pages/admin/Languagecontext";
import AdminLayout               from "./pages/admin/AdminLayout";
import Home                      from "./pages/home/Home";

import Login       from "./pages/auth/Login";
import Register    from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyMail";
import AdminUsers  from "./pages/admin/AdminUsers";

import WhatsAppCampaigns from "./pages/campagins/WhatsappCampagins";
import EmailCampaigns    from "./pages/campagins/EmailCampagins";

import "./App.css";

// ── Lightweight role dashboards (placeholder) ──
const ManagerDashboard = () => <h1>Manager Dashboard</h1>;
const ViewerDashboard  = () => <h1>Viewer Dashboard</h1>;

// ── Protected route wrapper ──
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// ── Restore session from localStorage on first load ──
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

        {/* ── Public home ── */}
        <Route path="/" element={<Home />} />

        {/* ── Anchor section redirects ── */}
        <Route path="/about"       element={<Navigate to="/#about"       replace />} />
        <Route path="/features"    element={<Navigate to="/#features"    replace />} />
        <Route path="/pricing"     element={<Navigate to="/#pricing"     replace />} />
        <Route path="/newsletter"  element={<Navigate to="/#newsletter"  replace />} />
        <Route path="/marketplace" element={<Navigate to="/#marketplace" replace />} />

        {/* ── Auth pages ── */}
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/forgot-password" element={<Navigate to="/login?mode=forgot" replace />} />
        <Route path="/verify-email"    element={<VerifyEmail />} />

        {/* ── Admin panel — ALL /admin/* routes handled inside AdminLayout ──
             AdminLayout internally renders:
               /admin                → Dashboard
               /admin/campaigns/email    → Email Campaigns
               /admin/campaigns/whatsapp → WhatsApp Campaigns
               /admin/templates/email    → Email Templates
               /admin/templates/whatsapp → WhatsApp Templates
               /admin/contacts       → Contacts
               /admin/segments       → Segments  ✅ NEW
               /admin/automation     → Automation
               /admin/reports        → Analytics Dashboard  ✅ NEW
               /admin/subscription   → Subscription Plans  ✅ NEW
               /admin/users          → User Management
               /admin/roles          → Roles & Permissions
               /admin/settings       → Settings
        ── */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        {/* ── Standalone campaign pages (outside admin shell) ── */}
        <Route path="/campaigns/whatsapp" element={<ProtectedRoute><WhatsAppCampaigns /></ProtectedRoute>} />
        <Route path="/campaigns/email"    element={<ProtectedRoute><EmailCampaigns /></ProtectedRoute>} />
        <Route path="/campaigns"          element={<Navigate to="/campaigns/email" replace />} />

        {/* ── Role-specific dashboards ── */}
        <Route path="/manager-dashboard"  element={<ProtectedRoute><ManagerDashboard /></ProtectedRoute>} />
        <Route path="/viewer-dashboard"   element={<ProtectedRoute><ViewerDashboard /></ProtectedRoute>} />
        <Route path="/customer-dashboard" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />

        {/* ── 404 → home ── */}
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