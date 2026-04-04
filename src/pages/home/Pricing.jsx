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

const plans = [
  { price: '$0.00', name: 'FREE', desc: 'Lorem Ipsum is simply a dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry', features: ['1 Months', '100 Emails', '100 SMS'], reverse: false },
  { price: '$50.00', name: 'MONTHLY', desc: 'Lorem Ipsum is simply a dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry', features: ['2 Months', '100 Emails', '100 SMS'], reverse: true },
  { price: '$60.00', name: 'MONTHLY', desc: 'Lorem Ipsum is simply a dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry', features: ['7 Months', '200 Emails', '200 SMS'], reverse: false },
  { price: '$80.00', name: 'YEARLY', desc: 'Lorem Ipsum is simply a dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry', features: ['12 Months', '300 Emails', '300 SMS'], reverse: true },
]

const CloudIllustration = () => (
  <svg viewBox="0 0 300 200" className="w-full h-48" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="130" cy="80" rx="70" ry="50" fill="#EEF0FF" opacity="0.9" />
    <ellipse cx="160" cy="90" rx="80" ry="55" fill="#E0E3FF" opacity="0.7" />
    <rect x="80" y="95" width="110" height="75" rx="6" fill="#0F0E2A" opacity="0.9" />
    <rect x="82" y="97" width="106" height="63" rx="4" fill="#06B6D4" opacity="0.8" />
    <rect x="60" y="162" width="150" height="8" rx="3" fill="#4F46E5" opacity="0.3" />
    <circle cx="220" cy="130" r="22" fill="#4F46E5" opacity="0.5" />
    <ellipse cx="225" cy="60" rx="20" ry="18" fill="#06B6D4" opacity="0.4" />
  </svg>
)

const DashedConnector = ({ flip = false }) => (
  <div className="flex justify-center py-3">
    <svg width="70%" height="60" viewBox="0 0 600 60">
      {flip ? (
        <path d="M100,55 Q100,10 300,10 Q500,10 500,55" fill="none" stroke="#4F46E5" strokeWidth="2" strokeDasharray="8,6" />
      ) : (
        <path d="M500,5 Q500,45 300,45 Q100,45 100,5" fill="none" stroke="#4F46E5" strokeWidth="2" strokeDasharray="8,6" />
      )}
      <text x="480" y={flip ? "14" : "10"} fontSize="18">✈</text>
    </svg>
  </div>
)

function Pricing() {
  return (
    <div className="min-h-screen font-sans" style={{ background: '#F8F9FF' }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-8 py-12">
        <span className="block text-center text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#4F46E5' }}>Plans</span>
        <h2 className="text-center text-3xl font-extrabold mb-12" style={{ color: '#0F0E2A' }}>
          Choose Your <span style={{ color: '#4F46E5' }}>Pricing</span>
        </h2>

        {plans.map((plan, index) => (
          <div key={index}>
            <div className={`flex items-center gap-12 py-10 ${plan.reverse ? 'flex-row-reverse' : ''}`}>
              <div className="flex-1 min-w-[280px]">
                <CloudIllustration />
              </div>
              <div className="flex-1">
                <p className="text-base mb-1 font-medium" style={{ color: '#F59E0B' }}>{plan.price}</p>
                <h3 className="text-2xl font-extrabold tracking-wide mb-3" style={{ color: '#0F0E2A' }}>{plan.name}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B7280' }}>{plan.desc}</p>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="text-sm flex items-center gap-2" style={{ color: '#374151' }}>
                      <span className="w-2 h-2 rounded-full" style={{ background: '#4F46E5' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className="text-white px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 border-2"
                  style={{ background: '#4F46E5', borderColor: '#4F46E5' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#06B6D4'; e.currentTarget.style.borderColor = '#06B6D4' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#4F46E5'; e.currentTarget.style.borderColor = '#4F46E5' }}>
                  Get It Now
                </button>
              </div>
            </div>
            {index < plans.length - 1 && <DashedConnector flip={plan.reverse} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pricing