import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-4 sticky top-0 z-50" style={{ background: '#0F0E2A' }}>
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow"
          style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}>
          <span className="text-white font-black text-lg">M</span>
        </div>
        <span className="text-white font-bold text-xl tracking-wide">MailDoll</span>
      </div>
      <ul className="hidden md:flex items-center gap-8 text-white font-medium text-sm">
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-[#06B6D4] underline underline-offset-4 cursor-pointer' : 'hover:text-[#06B6D4] cursor-pointer transition'}>Home</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'text-[#06B6D4] underline underline-offset-4 cursor-pointer' : 'hover:text-[#06B6D4] cursor-pointer transition'}>About Us</NavLink></li>
        <li><NavLink to="/features" className={({ isActive }) => isActive ? 'text-[#06B6D4] underline underline-offset-4 cursor-pointer' : 'hover:text-[#06B6D4] cursor-pointer transition'}>Features</NavLink></li>
        <li><NavLink to="/pricing" className={({ isActive }) => isActive ? 'text-[#06B6D4] underline underline-offset-4 cursor-pointer' : 'hover:text-[#06B6D4] cursor-pointer transition'}>Pricing</NavLink></li>
        <li><NavLink to="/newsletter" className={({ isActive }) => isActive ? 'text-[#06B6D4] underline underline-offset-4 cursor-pointer' : 'hover:text-[#06B6D4] cursor-pointer transition'}>Newsletter</NavLink></li>
        <li className="cursor-pointer hover:text-[#06B6D4] transition">Marketplace</li>
      </ul>
      <button className="font-semibold text-sm px-6 py-2.5 rounded-full flex items-center gap-1 transition shadow border-2 border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white">
        Login ›
      </button>
    </nav>
  )
}

const BulletList = () => (
  <ul className="space-y-3 mb-8">
    {['Contrary to popular belief', 'There are many variations of passages', 'It is a long established fact'].map((item, i) => (
      <li key={i} className="flex items-center gap-3 text-base" style={{ color: '#374151' }}>
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#4F46E5' }} />
        {item}
      </li>
    ))}
  </ul>
)

const FreeTrialBtn = () => (
  <button
    className="font-semibold px-8 py-3.5 rounded-full text-base shadow-lg transition-all duration-300 text-white border-2"
    style={{ background: '#4F46E5', borderColor: '#4F46E5' }}
    onMouseEnter={e => { e.currentTarget.style.background = '#06B6D4'; e.currentTarget.style.borderColor = '#06B6D4' }}
    onMouseLeave={e => { e.currentTarget.style.background = '#4F46E5'; e.currentTarget.style.borderColor = '#4F46E5' }}>
    Free Trial Now
  </button>
)

function About() {
  return (
    <div className="font-sans" style={{ background: '#F8F9FF' }}>
      <Navbar />

      {/* SECTION 1 */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 gap-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #F8F9FF 0%, #EEF0FF 60%, #E4E7FF 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
        <div className="flex-1 max-w-lg z-10">
          <span className="text-sm font-semibold uppercase tracking-widest mb-3 inline-block" style={{ color: '#4F46E5' }}>About Us</span>
          <h2 className="text-4xl font-extrabold leading-tight mb-4" style={{ color: '#0F0E2A' }}>
            Drive Sales From Your <span style={{ color: '#4F46E5' }}>Email Campaigns</span>
          </h2>
          <p className="mb-6 leading-relaxed" style={{ color: '#6B7280' }}>Progravida nibh vel velit auctor alinean sollicitu.</p>
          <BulletList />
          <FreeTrialBtn />
        </div>
        <div className="flex-1 flex justify-center md:justify-end relative z-10">
          <div className="relative w-full max-w-[520px]">
            <div className="bg-white rounded-2xl shadow-xl p-5 w-full" style={{ border: '1px solid #E0E3FF' }}>
              <div className="flex gap-1.5 mb-4">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#4F46E5' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#06B6D4' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#F59E0B' }} />
              </div>
              <div className="flex gap-3 mb-4">
                <div className="flex-1 bg-white rounded-xl p-4 shadow-sm text-center" style={{ border: '1px solid #E0E3FF' }}>
                  <p className="text-xs mb-2" style={{ color: '#6B7280' }}>all tickets</p>
                  <div className="flex justify-center mb-1">
                    <svg width="70" height="70" viewBox="0 0 70 70">
                      <circle cx="35" cy="35" r="28" fill="none" stroke="#E0E3FF" strokeWidth="10" />
                      <circle cx="35" cy="35" r="28" fill="none" stroke="#4F46E5" strokeWidth="10"
                        strokeDasharray="105 70" strokeLinecap="round" strokeDashoffset="44" transform="rotate(-90 35 35)" />
                      <text x="35" y="40" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0F0E2A">569</text>
                    </svg>
                  </div>
                  <p className="text-xs" style={{ color: '#6B7280' }}>completed</p>
                </div>
                <div className="flex-1 bg-white rounded-xl p-4 shadow-sm text-center" style={{ border: '1px solid #E0E3FF' }}>
                  <p className="text-xs mb-2" style={{ color: '#6B7280' }}>CTR</p>
                  <div className="flex justify-center">
                    <svg width="70" height="70" viewBox="0 0 70 70">
                      <circle cx="35" cy="35" r="28" fill="none" stroke="#E0E3FF" strokeWidth="10" />
                      <circle cx="35" cy="35" r="28" fill="none" stroke="#06B6D4" strokeWidth="10"
                        strokeDasharray="88 88" strokeLinecap="round" strokeDashoffset="44" transform="rotate(-90 35 35)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #E0E3FF' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#6B7280' }}>Overview</span>
                  <span className="text-xs font-medium" style={{ color: '#4F46E5' }}>Last 30 days</span>
                </div>
                <svg viewBox="0 0 400 100" className="w-full" height="75">
                  <defs>
                    <linearGradient id="s1Grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <path d="M0,80 C40,75 60,60 90,55 C120,50 140,70 170,60 C200,50 220,30 260,25 C290,20 320,40 350,35 C370,32 390,45 400,40 L400,100 L0,100 Z" fill="url(#s1Grad)" />
                  <path d="M0,80 C40,75 60,60 90,55 C120,50 140,70 170,60 C200,50 220,30 260,25 C290,20 320,40 350,35 C370,32 390,45 400,40" fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="260" cy="25" r="5" fill="#F59E0B" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 text-white rounded-2xl px-5 py-4 shadow-xl min-w-[110px]"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}>
              <p className="text-xs opacity-70 mb-1">active users</p>
              <p className="text-3xl font-extrabold">1243</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 gap-10 relative overflow-hidden"
        style={{ background: '#EEF0FF' }}>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />
        <div className="flex-1 flex justify-center relative z-10">
          <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-xl overflow-hidden" style={{ border: '1px solid #E0E3FF' }}>
            <div className="px-4 py-3 flex items-center gap-1.5" style={{ background: '#0F0E2A' }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#4F46E5' }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#06B6D4' }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#F59E0B' }} />
            </div>
            <div className="p-6 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)', minHeight: '180px' }}>
              <div className="relative flex items-center justify-center w-full h-36">
                <div className="w-20 h-14 rounded-lg shadow-lg z-10 flex items-center justify-center"
                  style={{ background: '#F59E0B' }}>
                  <span className="text-2xl">✉️</span>
                </div>
                <div className="absolute top-2 left-14 w-11 h-11 rounded-full flex items-center justify-center shadow-md"
                  style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <span className="text-white text-sm ml-0.5">▶</span>
                </div>
                <div className="absolute top-0 right-14 w-11 h-11 rounded-full flex items-center justify-center shadow-md"
                  style={{ background: '#F59E0B' }}>
                  <span className="text-white text-base">♪</span>
                </div>
                <div className="absolute bottom-2 right-10 w-11 h-11 rounded-xl flex items-center justify-center shadow-md"
                  style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <span className="text-white text-sm">🖼</span>
                </div>
              </div>
            </div>
            <div className="px-5 py-4 flex items-center gap-3" style={{ borderTop: '1px solid #E0E3FF' }}>
              <span className="font-bold whitespace-nowrap text-sm" style={{ color: '#0F0E2A' }}>Stay Updated!</span>
              <div className="flex flex-1 items-center rounded-lg overflow-hidden" style={{ border: '1px solid #E0E3FF' }}>
                <input type="email" placeholder="Enter Your E-mail Here"
                  className="flex-1 px-3 py-2 text-xs outline-none" style={{ color: '#6B7280' }} />
                <button className="px-3 py-2 text-white text-sm" style={{ background: '#4F46E5' }}>✉</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 max-w-lg z-10">
          <span className="text-sm font-semibold uppercase tracking-widest mb-3 inline-block" style={{ color: '#4F46E5' }}>Campaigns</span>
          <h2 className="text-4xl font-extrabold leading-tight mb-4" style={{ color: '#0F0E2A' }}>
            Start Campaign <span style={{ color: '#4F46E5' }}>At Anytime</span>
          </h2>
          <p className="mb-6 leading-relaxed" style={{ color: '#6B7280' }}>Progravida nibh vel velit auctor alinean sollicitu.</p>
          <BulletList />
          <FreeTrialBtn />
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 gap-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #F8F9FF 0%, #EEF0FF 60%, #E4E7FF 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
        <div className="flex-1 max-w-lg z-10">
          <span className="text-sm font-semibold uppercase tracking-widest mb-3 inline-block" style={{ color: '#4F46E5' }}>Growth</span>
          <h2 className="text-4xl font-extrabold leading-tight mb-4" style={{ color: '#0F0E2A' }}>
            Drive Sales From Your <span style={{ color: '#06B6D4' }}>Email Campaigns</span>
          </h2>
          <p className="mb-6 leading-relaxed" style={{ color: '#6B7280' }}>Progravida nibh vel velit auctor alinean sollicitu.</p>
          <BulletList />
          <FreeTrialBtn />
        </div>
        <div className="flex-1 flex justify-center md:justify-end relative z-10">
          <div className="w-72 rounded-[40px] shadow-2xl overflow-hidden" style={{ background: '#0F0E2A', border: '2px solid #2D2A5E' }}>
            <div className="px-5 py-3 flex justify-between items-center" style={{ background: '#13132A' }}>
              <div className="w-16 h-1.5 rounded-full" style={{ background: '#2D2A5E' }} />
              <div className="w-4 h-4 rounded-full" style={{ background: '#4F46E5' }} />
            </div>
            <div className="mx-4 mt-3 rounded-2xl shadow-md p-4" style={{ background: '#13132A', border: '1px solid #2D2A5E' }}>
              <div className="flex justify-between mb-2">
                <p className="text-xs" style={{ color: '#A0A0B8' }}>all tickets</p>
                <span className="text-xs" style={{ color: '#A0A0B8' }}>⋯</span>
              </div>
              <div className="flex justify-center">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#2D2A5E" strokeWidth="12" />
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#4F46E5" strokeWidth="12"
                    strokeDasharray="120 80" strokeLinecap="round" strokeDashoffset="50" transform="rotate(-90 40 40)" />
                  <text x="40" y="46" textAnchor="middle" fontSize="16" fontWeight="900" fill="white">569</text>
                </svg>
              </div>
              <p className="text-center text-xs mt-1" style={{ color: '#A0A0B8' }}>completed</p>
            </div>
            <div className="mx-4 mt-3 rounded-2xl shadow-md p-4" style={{ background: '#13132A', border: '1px solid #2D2A5E' }}>
              <div className="flex justify-between mb-2">
                <p className="text-xs" style={{ color: '#A0A0B8' }}>CTR</p>
                <span className="text-xs" style={{ color: '#A0A0B8' }}>≡</span>
              </div>
              <div className="flex justify-center">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#2D2A5E" strokeWidth="10" />
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#06B6D4" strokeWidth="10"
                    strokeDasharray="75 75" strokeLinecap="round" strokeDashoffset="38" transform="rotate(-90 30 30)" />
                </svg>
              </div>
            </div>
            <div className="mx-4 mt-3 mb-5 rounded-2xl px-5 py-4"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}>
              <div className="flex justify-between items-start">
                <p className="text-xs text-white opacity-70">active users</p>
                <span className="text-xs text-white opacity-70">🔍</span>
              </div>
              <p className="text-4xl font-extrabold text-white mt-1">1243</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 gap-10 relative overflow-hidden"
        style={{ background: '#EEF0FF' }}>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />
        <div className="flex-1 flex justify-center relative z-10">
          <div className="relative w-full max-w-[460px]">
            <div className="absolute top-0 right-0 bg-white rounded-2xl shadow-lg p-5 w-64 z-0" style={{ border: '1px solid #E0E3FF' }}>
              <svg viewBox="0 0 200 100" className="w-full" height="80">
                {[
                  { x: 15, h: 40, color: '#4F46E5' },
                  { x: 45, h: 65, color: '#4F46E5' },
                  { x: 75, h: 50, color: '#06B6D4' },
                  { x: 105, h: 80, color: '#06B6D4' },
                  { x: 135, h: 55, color: '#06B6D4' },
                  { x: 165, h: 30, color: '#F59E0B' },
                ].map((bar, i) => (
                  <rect key={i} x={bar.x} y={100 - bar.h} width="18" height={bar.h} fill={bar.color} rx="3" />
                ))}
              </svg>
            </div>
            <div className="relative z-10 mt-16 bg-white rounded-2xl shadow-xl overflow-hidden" style={{ border: '1px solid #E0E3FF' }}>
              <div className="px-4 py-3 flex items-center gap-1.5" style={{ background: '#0F0E2A' }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#4F46E5' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#06B6D4' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#F59E0B' }} />
              </div>
              <div className="p-5">
                <div className="rounded-xl p-8 text-center text-sm mb-4"
                  style={{ border: '2px dashed #E0E3FF', color: '#A0A0B8' }}>
                  Drag File here
                </div>
                <div className="bg-white rounded-xl p-3" style={{ border: '1px solid #E0E3FF' }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs uppercase font-semibold tracking-wide" style={{ color: '#6B7280' }}>Overview</span>
                    <span className="text-xs font-medium" style={{ color: '#4F46E5' }}>Last 30 days</span>
                  </div>
                  <svg viewBox="0 0 400 80" className="w-full" height="65">
                    <defs>
                      <linearGradient id="s4Grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    <path d="M0,70 C60,65 80,50 120,40 C160,30 180,55 220,48 C260,40 290,20 330,18 C360,16 380,30 400,28 L400,80 L0,80 Z" fill="url(#s4Grad)" />
                    <path d="M0,70 C60,65 80,50 120,40 C160,30 180,55 220,48 C260,40 290,20 330,18 C360,16 380,30 400,28" fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="330" cy="18" r="5" fill="#F59E0B" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 max-w-lg z-10">
          <span className="text-sm font-semibold uppercase tracking-widest mb-3 inline-block" style={{ color: '#4F46E5' }}>Analytics</span>
          <h2 className="text-4xl font-extrabold leading-tight mb-4" style={{ color: '#0F0E2A' }}>
            Drive Sales From Your <span style={{ color: '#4F46E5' }}>Email Campaigns</span>
          </h2>
          <p className="mb-6 leading-relaxed" style={{ color: '#6B7280' }}>Progravida nibh vel velit auctor alinean sollicitu.</p>
          <BulletList />
          <FreeTrialBtn />
        </div>
      </section>
    </div>
  )
}

export default About