import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const [scrolled,     setScrolled]     = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen,     setMenuOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['home', 'about', 'features', 'pricing', 'newsletter', 'marketplace']
    const observers = []

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  function scrollTo(id) {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const navLinks = [
    { id: 'home',        label: 'Home' },
    { id: 'about',       label: 'About Us' },
    { id: 'features',    label: 'Features' },
    { id: 'pricing',     label: 'Pricing' },
    { id: 'newsletter',  label: 'Newsletter' },
    { id: 'marketplace', label: 'Marketplace' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(15,14,42,0.97)'
          : '#0F0E2A',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-4">

        {/* Logo */}
        <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}>
            <span className="text-white font-black text-lg">M</span>
          </div>
          <span className="text-white font-bold text-xl tracking-wide">MailDoll</span>
        </button>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8 text-white font-medium text-sm">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className="relative py-1 transition-colors duration-200"
                style={{ color: activeSection === id ? '#06B6D4' : 'white' }}
              >
                {label}
                {/* Active underline */}
                <span
                  className="absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    background: '#06B6D4',
                    width: activeSection === id ? '100%' : '0%',
                  }}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Login Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300 shadow border-2 border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white"
          >
            Login ›
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-3"
          style={{ background: '#0F0E2A', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left py-2 font-medium text-sm border-b transition-colors"
              style={{
                color: activeSection === id ? '#06B6D4' : 'white',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

const BulletList = ({ items }) => (
  <ul className="space-y-3 mb-8">
    {(items || ['Contrary to popular belief', 'There are many variations of passages', 'It is a long established fact']).map((item, i) => (
      <li key={i} className="flex items-center gap-3 text-base" style={{ color: '#374151' }}>
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#4F46E5' }} />
        {item}
      </li>
    ))}
  </ul>
)

const FreeTrialBtn = ({ label = 'Free Trial Now', onClick }) => (
  <button
    onClick={onClick}
    className="font-semibold px-8 py-3.5 rounded-full text-base shadow-lg transition-all duration-300 text-white border-2"
    style={{ background: '#4F46E5', borderColor: '#4F46E5' }}
    onMouseEnter={e => { e.currentTarget.style.background = '#06B6D4'; e.currentTarget.style.borderColor = '#06B6D4' }}
    onMouseLeave={e => { e.currentTarget.style.background = '#4F46E5'; e.currentTarget.style.borderColor = '#4F46E5' }}
  >
    {label}
  </button>
)

function HeroSection() {
  const navigate = useNavigate()
  return (
    <section
      id="home"
      className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-32 pb-20 gap-10 relative overflow-hidden min-h-screen"
      style={{ background: 'linear-gradient(160deg, #F8F9FF 0%, #EEF0FF 60%, #E4E7FF 100%)' }}
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      {/* Left Content */}
      <div className="flex-1 max-w-lg z-10 text-center md:text-left">
        <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-[#4F46E5]">
          Software Landing
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5 text-[#0F0E2A]">
          Email Marketing <br />
          <span className="text-[#4F46E5]">Software</span>
        </h1>
        <p className="text-base mb-8 leading-relaxed text-gray-500">
          Maildoll Is #1 Email & SMS Marketing Tool For Your Business.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="font-semibold px-8 py-3 rounded-full text-white shadow-lg transition-all duration-300 hover:opacity-90"
          style={{ background: '#4F46E5' }}
        >
          Try Free Trial
        </button>
      </div>

      {/* Right Card */}
      <div className="flex-1 flex justify-center md:justify-end relative z-10">
        <div className="relative w-full max-w-[500px]">
          <div className="bg-white rounded-2xl shadow-2xl p-5 w-full border border-[#E0E3FF]">
            <div className="flex gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-[#4F46E5]" />
              <span className="w-3 h-3 rounded-full bg-[#06B6D4]" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E0E3FF]">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-gray-500">Overview</span>
                <span className="text-xs text-[#4F46E5]">Last 30 days</span>
              </div>
              <svg viewBox="0 0 400 100" className="w-full h-[70px]">
                <path d="M0,80 C50,70 100,50 150,60 C200,70 250,20 300,30 C350,40 380,20 400,25"
                  fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 text-white rounded-2xl px-5 py-4 shadow-xl"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}>
            <p className="text-xs opacity-70">active users</p>
            <p className="text-2xl font-bold">1243</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" style={{ background: '#F8F9FF' }}>

      {/* About 1 */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 gap-10 relative overflow-hidden"
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
                  <svg width="70" height="70" viewBox="0 0 70 70" className="mx-auto">
                    <circle cx="35" cy="35" r="28" fill="none" stroke="#E0E3FF" strokeWidth="10" />
                    <circle cx="35" cy="35" r="28" fill="none" stroke="#4F46E5" strokeWidth="10"
                      strokeDasharray="105 70" strokeLinecap="round" strokeDashoffset="44" transform="rotate(-90 35 35)" />
                    <text x="35" y="40" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0F0E2A">569</text>
                  </svg>
                  <p className="text-xs mt-1" style={{ color: '#6B7280' }}>completed</p>
                </div>
                <div className="flex-1 bg-white rounded-xl p-4 shadow-sm text-center" style={{ border: '1px solid #E0E3FF' }}>
                  <p className="text-xs mb-2" style={{ color: '#6B7280' }}>CTR</p>
                  <svg width="70" height="70" viewBox="0 0 70 70" className="mx-auto">
                    <circle cx="35" cy="35" r="28" fill="none" stroke="#E0E3FF" strokeWidth="10" />
                    <circle cx="35" cy="35" r="28" fill="none" stroke="#06B6D4" strokeWidth="10"
                      strokeDasharray="88 88" strokeLinecap="round" strokeDashoffset="44" transform="rotate(-90 35 35)" />
                  </svg>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #E0E3FF' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#6B7280' }}>Overview</span>
                  <span className="text-xs font-medium" style={{ color: '#4F46E5' }}>Last 30 days</span>
                </div>
                <svg viewBox="0 0 400 100" className="w-full" height="75">
                  <defs>
                    <linearGradient id="aboutGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <path d="M0,80 C40,75 60,60 90,55 C120,50 140,70 170,60 C200,50 220,30 260,25 C290,20 320,40 350,35 C370,32 390,45 400,40 L400,100 L0,100 Z" fill="url(#aboutGrad)" />
                  <path d="M0,80 C40,75 60,60 90,55 C120,50 140,70 170,60 C200,50 220,30 260,25 C290,20 320,40 350,35 C370,32 390,45 400,40" fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="260" cy="25" r="5" fill="#F59E0B" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 text-white rounded-2xl px-5 py-4 shadow-xl"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}>
              <p className="text-xs opacity-70 mb-1">active users</p>
              <p className="text-3xl font-extrabold">1243</p>
            </div>
          </div>
        </div>
      </div>

      {/* About 2 — Campaign */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 gap-10 relative overflow-hidden"
        style={{ background: '#EEF0FF' }}>
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
              </div>
            </div>
            <div className="px-5 py-4 flex items-center gap-3" style={{ borderTop: '1px solid #E0E3FF' }}>
              <span className="font-bold text-sm" style={{ color: '#0F0E2A' }}>Stay Updated!</span>
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
      </div>
    </section>
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

function FeaturesSection() {
  return (
    <section id="features" style={{ background: '#F8F9FF' }}>
      <div className="text-center py-16 px-6"
        style={{ background: 'linear-gradient(160deg, #EEF0FF 0%, #E4E7FF 60%, #F8F9FF 100%)' }}>
        <span className="text-sm font-semibold uppercase tracking-widest mb-3 inline-block" style={{ color: '#4F46E5' }}>
          What We Offer
        </span>
        <h2 className="text-4xl font-extrabold mb-4" style={{ color: '#0F0E2A' }}>
          Email Marketing <span style={{ color: '#4F46E5' }}>Features</span>
        </h2>
        <p className="text-base max-w-xl mx-auto" style={{ color: '#6B7280' }}>
          Progravida nibh vel velit auctor alinean sollicitudin, lorem quis bibendum auctor.
        </p>
      </div>

      <div className="px-6 md:px-20 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i}
              className="flex items-start gap-5 bg-white rounded-2xl p-7 hover:shadow-md transition-shadow duration-300"
              style={{ border: '1px solid #E0E3FF', boxShadow: '0 2px 12px rgba(79,70,229,0.06)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                style={{ background: 'linear-gradient(135deg, #EEF0FF, #E0E3FF)' }}>
                {f.emoji}
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#0F0E2A' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                  Sure there isn't anything embarrassing hidden in the middle of text generators on the Internet tend to repeat.
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-14">
          <FreeTrialBtn label="Get Free Trial Now" />
        </div>
      </div>
    </section>
  )
}

const plans = [
  { price: '$0.00',  name: 'FREE',    features: ['1 Month',   '100 Emails', '100 SMS'],  reverse: false },
  { price: '$50.00', name: 'MONTHLY', features: ['2 Months',  '100 Emails', '100 SMS'],  reverse: true  },
  { price: '$60.00', name: 'MONTHLY', features: ['7 Months',  '200 Emails', '200 SMS'],  reverse: false },
  { price: '$80.00', name: 'YEARLY',  features: ['12 Months', '300 Emails', '300 SMS'],  reverse: true  },
]

const CloudIllustration = () => (
  <svg viewBox="0 0 300 200" className="w-full h-48" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="130" cy="80" rx="70" ry="50" fill="#EEF0FF" opacity="0.9"/>
    <ellipse cx="160" cy="90" rx="80" ry="55" fill="#E0E3FF" opacity="0.7"/>
    <rect x="80" y="95" width="110" height="75" rx="6" fill="#0F0E2A" opacity="0.9"/>
    <rect x="82" y="97" width="106" height="63" rx="4" fill="#06B6D4" opacity="0.8"/>
    <rect x="60" y="162" width="150" height="8" rx="3" fill="#4F46E5" opacity="0.3"/>
    <circle cx="220" cy="130" r="22" fill="#4F46E5" opacity="0.5"/>
    <ellipse cx="225" cy="60" rx="20" ry="18" fill="#06B6D4" opacity="0.4"/>
  </svg>
)

const DashedConnector = ({ flip = false }) => (
  <div className="flex justify-center py-3">
    <svg width="70%" height="60" viewBox="0 0 600 60">
      {flip
        ? <path d="M100,55 Q100,10 300,10 Q500,10 500,55" fill="none" stroke="#4F46E5" strokeWidth="2" strokeDasharray="8,6"/>
        : <path d="M500,5 Q500,45 300,45 Q100,45 100,5" fill="none" stroke="#4F46E5" strokeWidth="2" strokeDasharray="8,6"/>
      }
      <text x="480" y={flip ? "14" : "10"} fontSize="18">✈</text>
    </svg>
  </div>
)

function PricingSection() {
  return (
    <section id="pricing" style={{ background: '#F8F9FF' }}>
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-16">
        <span className="block text-center text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#4F46E5' }}>Plans</span>
        <h2 className="text-center text-3xl font-extrabold mb-12" style={{ color: '#0F0E2A' }}>
          Choose Your <span style={{ color: '#4F46E5' }}>Pricing</span>
        </h2>

        {plans.map((plan, index) => (
          <div key={index}>
            <div className={`flex flex-col md:flex-row items-center gap-12 py-10 ${plan.reverse ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1 min-w-[240px]"><CloudIllustration /></div>
              <div className="flex-1">
                <p className="text-base mb-1 font-medium" style={{ color: '#F59E0B' }}>{plan.price}</p>
                <h3 className="text-2xl font-extrabold tracking-wide mb-3" style={{ color: '#0F0E2A' }}>{plan.name}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B7280' }}>
                  Lorem Ipsum is simply a dummy text of the printing and typesetting industry.
                </p>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="text-sm flex items-center gap-2" style={{ color: '#374151' }}>
                      <span className="w-2 h-2 rounded-full" style={{ background: '#4F46E5' }} /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className="text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 border-2"
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
    </section>
  )
}

function NewsletterSection() {
  const [form,      setForm]      = useState({ name: '', mobile: '', email: '' })
  const [errors,    setErrors]    = useState({})
  const [showPopup, setShowPopup] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  function validate() {
    const e = {}
    if (!form.name.trim())   e.name   = 'Name is required'
    if (!form.mobile.trim()) e.mobile = 'Mobile is required'
    if (!form.email.trim())  e.email  = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setErrors({})
    setShowPopup(true)
  }

  function handleClose() {
    setShowPopup(false)
    setForm({ name: '', mobile: '', email: '' })
  }

  return (
    <section id="newsletter" style={{ background: '#0F0E2A' }}>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="relative rounded-3xl p-10 max-w-sm w-full mx-4 text-center shadow-2xl"
            style={{ background: 'linear-gradient(145deg, #1A1840, #0F0E2A)', border: '1.5px solid #4F46E5' }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <div className="absolute inset-0 rounded-full opacity-30 animate-ping"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }} />
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-2">Successfully Subscribed!</h3>
            <p className="mb-2" style={{ color: '#A0A0B8' }}>Welcome, <span className="text-white font-semibold">{form.name}</span> 🎉</p>
            <p className="text-sm mb-8" style={{ color: '#A0A0B8' }}>
              Updates  <span style={{ color: '#06B6D4' }}>{form.email}</span> 
            </p>
            <button onClick={handleClose}
              className="w-full py-3.5 rounded-full text-white font-bold transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}>
              OK, Got it!
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }} />

        <span className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#06B6D4' }}>
          Stay in the loop
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center">
          Subscribe For <span style={{ color: '#4F46E5' }}>Newsletter</span>
        </h2>
        <p className="text-center mb-12 max-w-md" style={{ color: '#A0A0B8' }}>
          Get the latest updates, tips and offers directly in your inbox.
        </p>

        <div className="w-full max-w-2xl flex flex-col gap-4 z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <input type="text" name="name" placeholder="Full name" value={form.name} onChange={handleChange}
                className="w-full px-6 py-4 rounded-full text-white placeholder-gray-400 outline-none text-base"
                style={{ background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${errors.name ? '#EF4444' : '#2D2A5E'}` }} />
              {errors.name && <p className="text-xs pl-4 text-red-400">{errors.name}</p>}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <input type="text" name="mobile" placeholder="Mobile Ex: +91 98XXXXXXXX" value={form.mobile} onChange={handleChange}
                className="w-full px-6 py-4 rounded-full text-white placeholder-gray-400 outline-none text-base"
                style={{ background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${errors.mobile ? '#EF4444' : '#2D2A5E'}` }} />
              {errors.mobile && <p className="text-xs pl-4 text-red-400">{errors.mobile}</p>}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-1 flex flex-col gap-1">
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}
                className="w-full px-6 py-4 rounded-full text-white placeholder-gray-400 outline-none text-base"
                style={{ background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${errors.email ? '#EF4444' : '#2D2A5E'}` }} />
              {errors.email && <p className="text-xs pl-4 text-red-400">{errors.email}</p>}
            </div>
            <button onClick={handleSubmit}
              className="px-10 py-4 rounded-full text-white font-semibold text-base transition-all duration-300 border-2 whitespace-nowrap"
              style={{ background: '#4F46E5', borderColor: '#4F46E5' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F59E0B'; e.currentTarget.style.borderColor = '#F59E0B' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#4F46E5'; e.currentTarget.style.borderColor = '#4F46E5' }}>
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function MarketplaceSection() {
  const navigate = useNavigate()
  return (
    <section id="marketplace" style={{ background: '#F8F9FF' }}>
      <div className="relative mx-4 md:mx-12 my-12 rounded-2xl p-8 md:p-20 overflow-hidden min-h-[600px]"
        style={{ background: 'linear-gradient(160deg, #F8F9FF 0%, #EEF0FF 60%, #E4E7FF 100%)' }}>

        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
        <div className="absolute top-10 left-10 grid grid-cols-6 gap-2 opacity-20">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="z-10">
            <span className="text-sm font-semibold uppercase tracking-widest mb-3 inline-block" style={{ color: '#4F46E5' }}>
              Marketplace
            </span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight text-[#0F0E2A]">
              Get Start Your <br />Marketing <br />Campaign <br />Today
            </h2>
            <p className="mt-6 text-base text-gray-500 max-w-md leading-relaxed">
              Start your email marketing journey with powerful tools.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/pricing')}
                className="flex items-center gap-3 border-2 border-[#4F46E5] px-6 py-3 rounded-md hover:bg-[#4F46E5] hover:text-white transition"
              >
                <span className="text-xl font-bold">$</span>
                <div className="text-left">
                  <p className="text-[10px] uppercase leading-none">Get it now</p>
                  <p className="font-bold">See Pricing</p>
                </div>
              </button>
              <button className="flex items-center gap-3 border-2 border-[#06B6D4] px-6 py-3 rounded-md hover:bg-[#06B6D4] hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] uppercase leading-none">Upload CSV</p>
                  <p className="font-bold">CSV Viewer</p>
                </div>
              </button>
            </div>
          </div>

          {/* Right Card */}
          <div className="flex justify-center md:justify-end z-10">
            <div className="bg-white p-1 border-2 border-[#4F46E5] rounded-3xl w-full max-w-sm shadow-xl">
              <div className="p-8">
                <div className="flex justify-center mb-4">
                  <span className="text-5xl font-light text-gray-400">0</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full mb-8 relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#4F46E5] rounded-full border-2 border-white" />
                </div>
                <div className="bg-[#EEF0FF] rounded-2xl p-10 text-center mb-6">
                  <h3 className="text-5xl font-medium text-[#0F0E2A]">$0</h3>
                  <div className="mt-4 flex items-center justify-center text-[#06B6D4] gap-2">
                    <select className="bg-transparent font-medium focus:outline-none">
                      <option>Select Country</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/pricing')}
                  className="w-full text-white py-4 rounded-xl flex items-center justify-center gap-4 transition"
                  style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}>
                  <div className="text-left">
                    <p className="text-[10px] opacity-70 leading-none">Get the CSV</p>
                    <p className="font-semibold">Purchase Now</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 flex flex-col items-center justify-center" style={{ background: '#0F0E2A' }}>
        <h2 className="text-4xl font-bold tracking-[0.2em] text-white">Maildoll</h2>
        <p className="text-xs tracking-[0.6em] uppercase text-gray-500 mt-2">Marketplace</p>
        <p className="text-sm text-gray-400 mt-4 italic">Copyright @ 2026</p>
      </footer>
    </section>
  )
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
      style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}
      title="Scroll to top"
    >
      ↑
    </button>
  )
}

export default function Home() {
  return (
    <div className="font-sans">
      {/* Fixed Navbar */}
      <Navbar />

      {/* All Sections — one page */}
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <PricingSection />
      <NewsletterSection />
      <MarketplaceSection />

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  )
}