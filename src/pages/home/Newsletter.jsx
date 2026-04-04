import React, { useState } from 'react'
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
        <li>
          <NavLink to="/marketplace" className={({ isActive }) => isActive ? 'text-[#06B6D4] underline underline-offset-4 cursor-pointer' : 'hover:text-[#06B6D4] cursor-pointer transition'}>
            Marketplace
          </NavLink>
        </li>
      </ul>
      <button className="font-semibold text-sm px-6 py-2.5 rounded-full flex items-center gap-1 transition shadow border-2 border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white">
        Login ›
      </button>
    </nav>
  )
}

function Newsletter() {
  const [form, setForm] = useState({ name: '', mobile: '', email: '' })
  const [showPopup, setShowPopup] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.mobile.trim()) newErrors.mobile = 'Mobile is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email'
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setShowPopup(true)
  }

  const handleClose = () => {
    setShowPopup(false)
    setForm({ name: '', mobile: '', email: '' })
  }

  return (
    <div className="min-h-screen font-sans" style={{ background: '#0F0E2A' }}>
      <Navbar />

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
            <p className="mb-2" style={{ color: '#A0A0B8' }}>Welcome aboard, <span className="text-white font-semibold">{form.name}</span> 🎉</p>
            <p className="text-sm mb-8" style={{ color: '#A0A0B8' }}>
              We'll send updates to <span style={{ color: '#06B6D4' }}>{form.email}</span>
            </p>

            <button
              onClick={handleClose}
              className="w-full py-3.5 rounded-full text-white font-bold text-base transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              OK, Got it!
            </button>
          </div>
        </div>
      )}

      <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-10 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }} />

        <span className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#06B6D4' }}>
          Stay in the loop
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center">
          Subscribe For <span style={{ color: '#4F46E5' }}>Newsletter</span>
        </h1>
        <p className="text-center mb-12 max-w-md" style={{ color: '#A0A0B8' }}>
          Get the latest updates, tips and offers directly in your inbox.
        </p>

        <div className="w-full max-w-2xl flex flex-col gap-4 z-10">
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-full text-white placeholder-white outline-none text-base transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${errors.name ? '#EF4444' : '#2D2A5E'}` }}
                onFocus={e => e.currentTarget.style.borderColor = '#4F46E5'}
                onBlur={e => e.currentTarget.style.borderColor = errors.name ? '#EF4444' : '#2D2A5E'}
              />
              {errors.name && <p className="text-xs pl-4" style={{ color: '#EF4444' }}>{errors.name}</p>}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <input
                type="text"
                name="mobile"
                placeholder="Mobile number Ex : +880182"
                value={form.mobile}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-full text-white placeholder-white outline-none text-base transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${errors.mobile ? '#EF4444' : '#2D2A5E'}` }}
                onFocus={e => e.currentTarget.style.borderColor = '#4F46E5'}
                onBlur={e => e.currentTarget.style.borderColor = errors.mobile ? '#EF4444' : '#2D2A5E'}
              />
              {errors.mobile && <p className="text-xs pl-4" style={{ color: '#EF4444' }}>{errors.mobile}</p>}
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="flex-1 flex flex-col gap-1">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-full text-white placeholder-white outline-none text-base transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${errors.email ? '#EF4444' : '#2D2A5E'}` }}
                onFocus={e => e.currentTarget.style.borderColor = '#4F46E5'}
                onBlur={e => e.currentTarget.style.borderColor = errors.email ? '#EF4444' : '#2D2A5E'}
              />
              {errors.email && <p className="text-xs pl-4" style={{ color: '#EF4444' }}>{errors.email}</p>}
            </div>
            <button
              onClick={handleSubmit}
              className="px-10 py-4 rounded-full text-white font-semibold text-base transition-all duration-300 border-2"
              style={{ background: '#4F46E5', borderColor: '#4F46E5' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F59E0B'; e.currentTarget.style.borderColor = '#F59E0B' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#4F46E5'; e.currentTarget.style.borderColor = '#4F46E5' }}>
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Newsletter