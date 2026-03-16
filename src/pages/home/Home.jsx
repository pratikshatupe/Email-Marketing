import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen font-sans bg-white">

      {/* ── NAVBAR ── */}
      <nav className="flex items-center justify-between px-10 py-4 bg-[#1a9bff] sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow"
            style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
            <span className="text-white font-black text-lg">M</span>
          </div>
          <span className="text-white font-bold text-xl tracking-wide">MailDoll</span>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-white font-medium text-sm">
          <li>
            <NavLink to="/" className={({ isActive }) =>
              isActive ? 'underline underline-offset-4 cursor-pointer' : 'hover:underline underline-offset-4 cursor-pointer transition'}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) =>
              isActive ? 'underline underline-offset-4 cursor-pointer' : 'hover:underline underline-offset-4 cursor-pointer transition'}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/features" className={({ isActive }) =>
              isActive ? 'underline underline-offset-4 cursor-pointer' : 'hover:underline underline-offset-4 cursor-pointer transition'}>
              Features
            </NavLink>
          </li>
          {['Pricing', 'Newsletter', 'Marketplace'].map((item) => (
            <li key={item} className="cursor-pointer hover:underline underline-offset-4 transition">
              {item}
            </li>
          ))}
        </ul>

        <button className="bg-white text-[#1a9bff] font-semibold text-sm px-6 py-2.5 rounded-full flex items-center gap-1 hover:bg-blue-50 transition shadow">
          Login ›
        </button>
      </nav>

      {/* ── HERO SECTION ── */}
      <section
        className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 gap-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f0f8ff 0%, #e8f4ff 50%, #dbeeff 100%)' }}>

        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #1a9bff 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

        <div className="flex-1 max-w-lg z-10">
          <p className="text-sm font-semibold text-[#1a9bff] uppercase tracking-widest mb-3">
            Software Landing
          </p>
          <h1 className="text-5xl font-extrabold leading-tight mb-5 text-gray-800">
            Email Marketing<br />Software
          </h1>
          <p className="text-base text-gray-500 mb-8 leading-relaxed">
            Maildoll Is #1 Email & SMS Marketing Tool For Your Business.
          </p>

          <button
            className="font-semibold px-8 py-3.5 rounded-full text-base shadow-lg transition-all duration-300 text-white border-2 border-[#22c55e] bg-[#22c55e]"
            onMouseEnter={e => {
              e.currentTarget.style.background = '#ffffff'
              e.currentTarget.style.color = '#22c55e'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#22c55e'
              e.currentTarget.style.color = '#ffffff'
            }}>
            Try Free Trail
          </button>
        </div>

        <div className="flex-1 flex justify-center md:justify-end relative z-10">
          <div className="relative w-full max-w-[540px]">
            <div className="bg-white rounded-2xl shadow-2xl p-5 w-full">
              <div className="flex gap-1.5 mb-4">
                <span className="w-3 h-3 rounded-full bg-gray-800" />
                <span className="w-3 h-3 rounded-full bg-gray-800" />
                <span className="w-3 h-3 rounded-full bg-gray-800" />
              </div>

              <div className="flex gap-3 mb-4">
                <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 shadow-sm text-center">
                  <p className="text-gray-400 text-xs mb-2">all tickets</p>
                  <div className="flex justify-center mb-1">
                    <svg width="70" height="70" viewBox="0 0 70 70">
                      <circle cx="35" cy="35" r="28" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                      <circle cx="35" cy="35" r="28" fill="none" stroke="#1a9bff" strokeWidth="10"
                        strokeDasharray="105 70" strokeLinecap="round"
                        strokeDashoffset="44" transform="rotate(-90 35 35)" />
                      <text x="35" y="40" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1e293b">569</text>
                    </svg>
                  </div>
                  <p className="text-gray-400 text-xs">completed</p>
                </div>

                <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 shadow-sm text-center">
                  <p className="text-gray-400 text-xs mb-2">CTR</p>
                  <div className="flex justify-center">
                    <svg width="70" height="70" viewBox="0 0 70 70">
                      <circle cx="35" cy="35" r="28" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                      <circle cx="35" cy="35" r="28" fill="none" stroke="#1a9bff" strokeWidth="10"
                        strokeDasharray="88 88" strokeLinecap="round"
                        strokeDashoffset="44" transform="rotate(-90 35 35)" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Overview</span>
                  <span className="text-xs text-[#1a9bff] font-medium">Last 30 days</span>
                </div>
                <svg viewBox="0 0 400 100" className="w-full" height="75">
                  <defs>
                    <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1a9bff" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#1a9bff" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <path d="M0,80 C40,75 60,60 90,55 C120,50 140,70 170,60 C200,50 220,30 260,25 C290,20 320,40 350,35 C370,32 390,45 400,40 L400,100 L0,100 Z"
                    fill="url(#heroGrad)" />
                  <path d="M0,80 C40,75 60,60 90,55 C120,50 140,70 170,60 C200,50 220,30 260,25 C290,20 320,40 350,35 C370,32 390,45 400,40"
                    fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="260" cy="25" r="5" fill="#22c55e" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-[#1a6bff] text-white rounded-2xl px-5 py-4 shadow-xl min-w-[115px]">
              <p className="text-xs opacity-70 mb-1">active users</p>
              <p className="text-3xl font-extrabold tracking-tight">1243</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home