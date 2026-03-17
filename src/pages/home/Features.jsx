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

function FeatureCard({ emoji, title }) {
  return (
    <div className="flex items-start gap-5 bg-white rounded-2xl p-7 hover:shadow-md transition-shadow duration-300"
      style={{ border: '1px solid #E0E3FF', boxShadow: '0 2px 12px rgba(79,70,229,0.06)' }}>
      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
        style={{ background: 'linear-gradient(135deg, #EEF0FF, #E0E3FF)' }}>
        {emoji}
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2" style={{ color: '#0F0E2A' }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
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
    <div className="min-h-screen font-sans" style={{ background: '#F8F9FF' }}>
      <Navbar />

      <section className="text-center py-16 px-10"
        style={{ background: 'linear-gradient(160deg, #EEF0FF 0%, #E4E7FF 60%, #F8F9FF 100%)' }}>
        <span className="text-sm font-semibold uppercase tracking-widest mb-3 inline-block" style={{ color: '#4F46E5' }}>
          What We Offer
        </span>
        <h1 className="text-4xl font-extrabold mb-4" style={{ color: '#0F0E2A' }}>
          Email Marketing <span style={{ color: '#4F46E5' }}>Features</span>
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: '#6B7280' }}>
          Progravida nibh vel velit auctor alinean sollicitudin, lorem quis bibendum auctor,
        </p>
      </section>

      <section className="px-10 md:px-20 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} emoji={f.emoji} title={f.title} />
          ))}
        </div>
        <div className="flex justify-center mt-14">
          <button
            className="font-semibold px-10 py-4 rounded-full text-base shadow-lg transition-all duration-300 text-white border-2"
            style={{ background: '#4F46E5', borderColor: '#4F46E5' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#06B6D4'; e.currentTarget.style.borderColor = '#06B6D4' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#4F46E5'; e.currentTarget.style.borderColor = '#4F46E5' }}>
            Get Free Trial Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default Features