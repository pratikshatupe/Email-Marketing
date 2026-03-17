import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/home/About'
import Features from './pages/home/Features'
import Pricing from './pages/home/Pricing'
import Newsletter from './pages/home/Newsletter'
import Marketplace from './pages/home/Marketplace'
import Login from './pages/auth/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'   // ✅ add
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/marketplace" element={<Marketplace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Dashboards */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/customer-dashboard" element={<AdminUsers />} /> {/* ✅ */}

      </Routes>
    </BrowserRouter>
  )
}

export default App;