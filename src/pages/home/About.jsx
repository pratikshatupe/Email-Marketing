import React from 'react'
import { NavLink } from 'react-router-dom'

// ── Navbar — same colors as Home.jsx ──
function Navbar() {
  return (
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
  )
}

const BulletList = () => (
  <ul className="space-y-3 mb-8">
    {['Contrary to popular belief', 'There are many variations of passages', 'It is a long established fact'].map((item, i) => (
      <li key={i} className="flex items-center gap-3 text-gray-600 text-base">
        <span className="w-3 h-3 rounded-full bg-[#22c55e] flex-shrink-0" />
        {item}
      </li>
    ))}
  </ul>
)

const FreeTrialBtn = () => (
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
    Free Trial Now
  </button>
)

function About() {
  return (
    <div className="font-sans bg-white">

      <Navbar />

      {/* SECTION 1 */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 gap-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f0f8ff 0%, #e8f4ff 60%, #dbeeff 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a5c8f0 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
        <div className="flex-1 max-w-lg z-10">
          <h2 className="text-4xl font-extrabold text-gray-700 leading-tight mb-4">Drive Sales From Your Email Campaigns</h2>
          <p className="text-gray-500 mb-6 leading-relaxed">Progravida nibh vel velit auctor alinean sollicitu.</p>
          <BulletList />
          <FreeTrialBtn />
        </div>
        <div className="flex-1 flex justify-center md:justify-end relative z-10">
          <div className="relative w-full max-w-[520px]">
            <div className="bg-white rounded-2xl shadow-xl p-5 w-full">
              <div className="flex gap-1.5 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-800" />
              </div>
              <div className="flex gap-3 mb-4">
                <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 shadow-sm text-center">
                  <p className="text-gray-400 text-xs mb-2">all tickets</p>
                  <div className="flex justify-center mb-1">
                    <svg width="70" height="70" viewBox="0 0 70 70">
                      <circle cx="35" cy="35" r="28" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                      <circle cx="35" cy="35" r="28" fill="none" stroke="#1a9bff" strokeWidth="10"
                        strokeDasharray="105 70" strokeLinecap="round" strokeDashoffset="44" transform="rotate(-90 35 35)" />
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
                        strokeDasharray="88 88" strokeLinecap="round" strokeDashoffset="44" transform="rotate(-90 35 35)" />
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
                    <linearGradient id="s1Grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c7e2f7" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#c7e2f7" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <path d="M0,80 C40,75 60,60 90,55 C120,50 140,70 170,60 C200,50 220,30 260,25 C290,20 320,40 350,35 C370,32 390,45 400,40 L400,100 L0,100 Z" fill="url(#s1Grad)" />
                  <path d="M0,80 C40,75 60,60 90,55 C120,50 140,70 170,60 C200,50 220,30 260,25 C290,20 320,40 350,35 C370,32 390,45 400,40" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="260" cy="25" r="5" fill="#22c55e" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-[#1a6bff] text-white rounded-2xl px-5 py-4 shadow-xl min-w-[110px]">
              <p className="text-xs opacity-70 mb-1">active users</p>
              <p className="text-3xl font-extrabold">1243</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 gap-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f5f7ff 0%, #edf2ff 60%, #e4edff 100%)' }}>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a5c8f0 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />
        <div className="flex-1 flex justify-center relative z-10">
          <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gray-900 px-4 py-3 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
            </div>
            <div className="p-6 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #2563eb, #1a9bff)', minHeight: '180px' }}>
              <div className="relative flex items-center justify-center w-full h-36">
                <div className="w-20 h-14 bg-yellow-400 rounded-lg shadow-lg z-10 flex items-center justify-center">
                  <span className="text-2xl">✉️</span>
                </div>
                <div className="absolute top-2 left-14 w-11 h-11 rounded-full bg-blue-400 bg-opacity-90 flex items-center justify-center shadow-md">
                  <span className="text-white text-sm ml-0.5">▶</span>
                </div>
                <div className="absolute top-0 right-14 w-11 h-11 rounded-full bg-yellow-400 flex items-center justify-center shadow-md">
                  <span className="text-white text-base">♪</span>
                </div>
                <div className="absolute bottom-2 right-10 w-11 h-11 rounded-xl bg-pink-500 flex items-center justify-center shadow-md">
                  <span className="text-white text-sm">🖼</span>
                </div>
                {[
                  { top: '10%', left: '8%' }, { top: '70%', left: '15%' },
                  { top: '20%', right: '8%' }, { top: '75%', right: '20%' },
                  { top: '45%', left: '30%' }, { top: '55%', right: '35%' },
                ].map((pos, i) => (
                  <div key={i} className="absolute w-2 h-2 rounded-full bg-blue-200 opacity-70" style={pos} />
                ))}
              </div>
            </div>
            <div className="px-5 py-4 flex items-center gap-3 border-t border-gray-100">
              <span className="font-bold text-gray-800 whitespace-nowrap text-sm">Stay Updated!</span>
              <div className="flex flex-1 items-center border border-gray-200 rounded-lg overflow-hidden">
                <input type="email" placeholder="Enter Your E-mail Here"
                  className="flex-1 px-3 py-2 text-xs text-gray-500 outline-none" />
                <button className="bg-[#1a9bff] px-3 py-2 text-white text-sm">✉</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 max-w-lg z-10">
          <h2 className="text-4xl font-extrabold text-gray-700 leading-tight mb-4">Start Campaign At Anytime</h2>
          <p className="text-gray-500 mb-6 leading-relaxed">Progravida nibh vel velit auctor alinean sollicitu.</p>
          <BulletList />
          <FreeTrialBtn />
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 gap-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f0f8ff 0%, #e8f4ff 60%, #dbeeff 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a5c8f0 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
        <div className="flex-1 max-w-lg z-10">
          <h2 className="text-4xl font-extrabold text-gray-700 leading-tight mb-4">Drive Sales From Your Email Campaigns</h2>
          <p className="text-gray-500 mb-6 leading-relaxed">Progravida nibh vel velit auctor alinean sollicitu.</p>
          <BulletList />
          <FreeTrialBtn />
        </div>
        <div className="flex-1 flex justify-center md:justify-end relative z-10">
          <div className="w-72 bg-white rounded-[40px] shadow-2xl border-4 border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
              <div className="w-16 h-1.5 bg-gray-300 rounded-full" />
              <div className="w-4 h-4 rounded-full bg-gray-200" />
            </div>
            <div className="mx-4 mt-3 bg-white rounded-2xl shadow-md p-4 border border-gray-50">
              <div className="flex justify-between mb-2">
                <p className="text-xs text-gray-400">all tickets</p>
                <span className="text-xs text-gray-300">⋯</span>
              </div>
              <div className="flex justify-center">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#6366f1" strokeWidth="12"
                    strokeDasharray="120 80" strokeLinecap="round" strokeDashoffset="50" transform="rotate(-90 40 40)" />
                  <text x="40" y="46" textAnchor="middle" fontSize="16" fontWeight="900" fill="#1e293b">569</text>
                </svg>
              </div>
              <p className="text-center text-xs text-gray-400 mt-1">completed</p>
            </div>
            <div className="mx-4 mt-3 bg-white rounded-2xl shadow-md p-4 border border-gray-50">
              <div className="flex justify-between mb-2">
                <p className="text-xs text-gray-400">CTR</p>
                <span className="text-xs text-gray-300">≡</span>
              </div>
              <div className="flex justify-center">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#6366f1" strokeWidth="10"
                    strokeDasharray="75 75" strokeLinecap="round" strokeDashoffset="38" transform="rotate(-90 30 30)" />
                </svg>
              </div>
            </div>
            <div className="mx-4 mt-3 mb-5 rounded-2xl px-5 py-4"
              style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)' }}>
              <div className="flex justify-between items-start">
                <p className="text-xs text-indigo-200">active users</p>
                <span className="text-xs text-indigo-200">🔍</span>
              </div>
              <p className="text-4xl font-extrabold text-white mt-1">1243</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 gap-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #f5f7ff 0%, #edf2ff 60%, #e4edff 100%)' }}>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a5c8f0 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />
        <div className="flex-1 flex justify-center relative z-10">
          <div className="relative w-full max-w-[460px]">
            <div className="absolute top-0 right-0 bg-white rounded-2xl shadow-lg p-5 w-64 z-0">
              <svg viewBox="0 0 200 100" className="w-full" height="80">
                {[
                  { x: 15, h: 40, color: '#22c55e' },
                  { x: 45, h: 65, color: '#22c55e' },
                  { x: 75, h: 50, color: '#3b82f6' },
                  { x: 105, h: 80, color: '#3b82f6' },
                  { x: 135, h: 55, color: '#3b82f6' },
                  { x: 165, h: 30, color: '#93c5fd' },
                ].map((bar, i) => (
                  <rect key={i} x={bar.x} y={100 - bar.h} width="18" height={bar.h} fill={bar.color} rx="3" />
                ))}
              </svg>
            </div>
            <div className="relative z-10 mt-16 bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gray-900 px-4 py-3 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
              </div>
              <div className="p-5">
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400 text-sm mb-4">
                  Drag File here
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Overview</span>
                    <span className="text-xs text-[#1a9bff] font-medium">Last 30 days</span>
                  </div>
                  <svg viewBox="0 0 400 80" className="w-full" height="65">
                    <defs>
                      <linearGradient id="s4Grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c7e2f7" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#c7e2f7" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    <path d="M0,70 C60,65 80,50 120,40 C160,30 180,55 220,48 C260,40 290,20 330,18 C360,16 380,30 400,28 L400,80 L0,80 Z" fill="url(#s4Grad)" />
                    <path d="M0,70 C60,65 80,50 120,40 C160,30 180,55 220,48 C260,40 290,20 330,18 C360,16 380,30 400,28" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="330" cy="18" r="5" fill="#22c55e" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 max-w-lg z-10">
          <h2 className="text-4xl font-extrabold text-gray-700 leading-tight mb-4">Drive Sales From Your Email Campaigns</h2>
          <p className="text-gray-500 mb-6 leading-relaxed">Progravida nibh vel velit auctor alinean sollicitu.</p>
          <BulletList />
          <FreeTrialBtn />
        </div>
      </section>

    </div>
  )
}

export default About