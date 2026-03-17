import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-[#06B6D4] underline underline-offset-4'
      : 'hover:text-[#06B6D4] transition';

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 sticky top-0 z-50"
      style={{ background: '#0F0E2A' }}>

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shadow"
          style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}
        >
          <span className="text-white font-black text-lg">M</span>
        </div>
        <span className="text-white font-bold text-xl tracking-wide">
          MailDoll
        </span>
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-8 text-white font-medium text-sm">
        <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
        <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
        <li><NavLink to="/features" className={navLinkClass}>Features</NavLink></li>
        <li><NavLink to="/pricing" className={navLinkClass}>Pricing</NavLink></li>
        <li><NavLink to="/newsletter" className={navLinkClass}>Newsletter</NavLink></li>
        <li><NavLink to="/marketplace" className={navLinkClass}>Marketplace</NavLink></li>
      </ul>

      {/* Login Button */}
      <button
        onClick={() => navigate("/login")}
        className="font-semibold text-sm px-6 py-2.5 rounded-full flex items-center gap-1 transition shadow border-2 border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white"
      >
        Login ›
      </button>
    </nav>
  )
}

function Home() {
  return (
    <div className="min-h-screen font-sans" style={{ background: '#F8F9FF' }}>
      
      <Navbar />

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 md:py-20 gap-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #F8F9FF 0%, #EEF0FF 60%, #E4E7FF 100%)' }}>

        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[400px] md:w-[500px] h-[400px] md:h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        
        <div className="absolute bottom-0 left-0 w-[250px] md:w-[300px] h-[250px] md:h-[300px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

        {/* LEFT CONTENT */}
        <div className="flex-1 max-w-lg z-10 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-[#4F46E5]">
            Software Landing
          </p>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5 text-[#0F0E2A]">
            Email Marketing <br />
            <span className="text-[#4F46E5]">Software</span>
          </h1>

          <p className="text-base mb-8 leading-relaxed text-gray-500">
            Maildoll Is #1 Email & SMS Marketing Tool For Your Business.
          </p>

          <button
            className="font-semibold px-8 py-3 rounded-full text-white shadow-lg transition-all duration-300"
            style={{ background: '#4F46E5' }}
          >
            Try Free Trial
          </button>
        </div>

        {/* RIGHT CARD */}
        <div className="flex-1 flex justify-center md:justify-end relative z-10">
          <div className="relative w-full max-w-[500px]">
            
            <div className="bg-white rounded-2xl shadow-2xl p-5 w-full border border-[#E0E3FF]">

              {/* Top dots */}
              <div className="flex gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-[#4F46E5]" />
                <span className="w-3 h-3 rounded-full bg-[#06B6D4]" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              </div>

              {/* Overview Graph */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E0E3FF]">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-500">Overview</span>
                  <span className="text-xs text-[#4F46E5]">Last 30 days</span>
                </div>

                <svg viewBox="0 0 400 100" className="w-full h-[70px]">
                  <path d="M0,80 C50,70 100,50 150,60 C200,70 250,20 300,30 C350,40 380,20 400,25"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -top-4 -right-4 text-white rounded-2xl px-5 py-4 shadow-xl"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}>
              <p className="text-xs opacity-70">active users</p>
              <p className="text-2xl font-bold">1243</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Home