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

// ── Feature Card ──
function FeatureCard({ emoji, title }) {
  return (
    <div className="flex items-start gap-5 bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="text-5xl flex-shrink-0 w-16 text-center">
        {emoji}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-700 mb-3">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Sure there isn't anything embarrassing hidden in the middle of text generators on the Internet tend to repeat.
        </p>
      </div>
    </div>
  )
}

const features = [
  { emoji: '🚀', title: 'Never Get Stuck' },
  { emoji: '📨', title: 'Unlimited Email Sends' },
  { emoji: '📍', title: 'Email Deliverability' },
  { emoji: '⭐', title: 'Free Migration Service' },
  { emoji: '❤️', title: '5,000+ Free Photos' },
  { emoji: '✉️', title: 'Free Email Templates' },
]

function Features() {
  return (
    <div className="min-h-screen font-sans bg-white">

      <Navbar />

      {/* ── HERO TEXT ── */}
      <section className="text-center py-16 px-10"
        style={{ background: 'linear-gradient(160deg, #f0f8ff 0%, #e8f4ff 60%, #ffffff 100%)' }}>
        <h1 className="text-4xl font-extrabold text-gray-600 mb-4">
          Email Marketing Features
        </h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto">
          Progravida nibh vel velit auctor alinean sollicitudin, lorem quis bibendum auctor,
        </p>
      </section>

      {/* ── FEATURE CARDS GRID ── */}
      <section className="px-10 md:px-20 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} emoji={f.emoji} title={f.title} />
          ))}
        </div>

        {/* ── GET FREE TRIAL BUTTON ── */}
        <div className="flex justify-center mt-14">
          <button
            className="font-semibold px-10 py-4 rounded-full text-base shadow-lg transition-all duration-300 text-white border-2 border-[#22c55e] bg-[#22c55e]"
            onMouseEnter={e => {
              e.currentTarget.style.background = '#ffffff'
              e.currentTarget.style.color = '#22c55e'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#22c55e'
              e.currentTarget.style.color = '#ffffff'
            }}>
            Get Free Trial Now
          </button>
        </div>
      </section>

    </div>
  )
}

export default Features