import { BrowserRouter, Routes, Route } from 'react-router-dom'

// ── Home / Public Pages ──
import Home        from './pages/home/Home'
import About       from './pages/home/About'
import Features    from './pages/home/Features'
import Pricing     from './pages/home/Pricing'
import Newsletter  from './pages/home/Newsletter'
import Marketplace from './pages/home/Marketplace'

// ── Auth Pages ──
import Login          from './pages/auth/Login'
import Register       from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerifyEmail    from './pages/auth/VerifyMail'

// ── Admin Pages ──
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers     from './pages/admin/AdminUsers'

// 🔥 Dummy dashboards (create later properly)
const ManagerDashboard = () => <h1>Manager Dashboard</h1>
const ViewerDashboard  = () => <h1>Viewer Dashboard</h1>

import './App.css'

function App() {
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

        {/* ── Role आधारित Dashboards ── */}
        <Route path="/super-admin"      element={<AdminDashboard />} />   {/* ✅ FIX */}
        <Route path="/admin-dashboard"  element={<AdminDashboard />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/viewer-dashboard"  element={<ViewerDashboard />} />

        {/* ── Other ── */}
        <Route path="/customer-dashboard" element={<AdminUsers />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App