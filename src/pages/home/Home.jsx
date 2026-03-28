import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/* ════════════════════════════════════════
   VIDEO DEMO MODAL
════════════════════════════════════════ */
function VideoDemoModal({ onClose }) {
  // Email marketing demo video — YouTube embed (no autoplay issues)
  const VIDEO_ID = 'tU5wPo-FaHk' // Email marketing explainer video

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position:'fixed', inset:0, zIndex:9999,
        background:'rgba(8,6,30,.85)', backdropFilter:'blur(10px)',
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:'16px', animation:'fadeIn .25s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(32px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>

      <div style={{
        width:'100%', maxWidth:860, position:'relative',
        animation:'slideUp .35s ease',
      }}>
        {/* Top bar */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          marginBottom:14, flexWrap:'wrap', gap:10,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{
              width:38, height:38, borderRadius:12,
              background:'linear-gradient(135deg,#4F46E5,#06B6D4)',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:18,
            }}>▶</div>
            <div>
              <div style={{ color:'#fff', fontWeight:700, fontSize:16, fontFamily:"'Clash Display',sans-serif" }}>
                Maildoll — Product Demo
              </div>
              <div style={{ color:'rgba(255,255,255,.45)', fontSize:12, marginTop:1 }}>
                Email Marketing Platform walkthrough • 3 min
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width:36, height:36, borderRadius:'50%',
              background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.18)',
              color:'#fff', fontSize:18, cursor:'pointer', display:'flex',
              alignItems:'center', justifyContent:'center', transition:'all .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,.22)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,.1)'}
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Video iframe */}
        <div style={{
          position:'relative', paddingBottom:'56.25%', height:0,
          borderRadius:18, overflow:'hidden',
          boxShadow:'0 32px 80px rgba(0,0,0,.6)',
          border:'1px solid rgba(255,255,255,.1)',
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&color=white`}
            title="Maildoll Email Marketing Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position:'absolute', top:0, left:0,
              width:'100%', height:'100%', border:'none',
            }}
          />
        </div>

        {/* Bottom chips */}
        <div style={{ display:'flex', gap:10, marginTop:14, flexWrap:'wrap', justifyContent:'center' }}>
          {['📧 Campaign Management','📊 Analytics Dashboard','🤖 Automation Workflows','👥 Contact Segmentation'].map(t => (
            <span key={t} style={{
              fontSize:12, color:'rgba(255,255,255,.6)',
              background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.12)',
              padding:'5px 14px', borderRadius:20, fontFamily:"'Cabinet Grotesk',sans-serif",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Cabinet Grotesk', sans-serif; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #4F46E5; border-radius: 2px; }

  .cd { font-family: 'Clash Display', sans-serif; }

  @keyframes floatY   { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-14px)} }
  @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ping     { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(1.9);opacity:0} }

  .float-y  { animation: floatY 5s ease-in-out infinite; }
  .fade-up  { animation: fadeUp .7s ease forwards; }
  .ping-anim{ animation: ping 1.4s ease-out infinite; }

  .grad-text {
    background: linear-gradient(135deg,#4F46E5,#06B6D4);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .divider-bar { width:56px; height:4px; border-radius:2px; background:linear-gradient(90deg,#4F46E5,#06B6D4); }
  .dot-grid {
    background-image: radial-gradient(circle,rgba(79,70,229,.18) 1.5px,transparent 1.5px);
    background-size: 26px 26px;
  }
  .pill {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(79,70,229,.12); border:1px solid rgba(79,70,229,.3);
    color:#818CF8; padding:6px 18px; border-radius:50px;
    font-size:11px; font-weight:700; letter-spacing:1.6px; text-transform:uppercase;
  }
  .pill-dot { width:6px; height:6px; border-radius:50%; background:#10B981; }

  .btn-indigo {
    background: linear-gradient(135deg,#4F46E5,#7C3AED);
    color:#fff; border:none; padding:14px 34px; border-radius:50px;
    font-family:'Cabinet Grotesk',sans-serif; font-weight:700; font-size:15px;
    cursor:pointer; transition:all .3s ease; letter-spacing:.3px;
    box-shadow:0 8px 32px rgba(79,70,229,.35);
  }
  .btn-indigo:hover { transform:translateY(-2px); box-shadow:0 14px 40px rgba(79,70,229,.55); }

  .btn-ghost {
    background:transparent; color:#0F0E2A;
    border:2px solid rgba(79,70,229,.25); padding:13px 32px; border-radius:50px;
    font-family:'Cabinet Grotesk',sans-serif; font-weight:700; font-size:15px;
    cursor:pointer; transition:all .3s ease;
  }
  .btn-ghost:hover { border-color:#4F46E5; color:#4F46E5; }

  .btn-amber {
    background:transparent; color:#F59E0B;
    border:2px solid #F59E0B; padding:10px 24px; border-radius:50px;
    font-family:'Cabinet Grotesk',sans-serif; font-weight:700; font-size:13px;
    cursor:pointer; transition:all .3s ease;
  }
  .btn-amber:hover { background:#F59E0B; color:#fff; }

  .glass-card {
    background:rgba(255,255,255,.72); backdrop-filter:blur(16px);
    border:1px solid rgba(79,70,229,.12); border-radius:20px;
    box-shadow:0 8px 40px rgba(79,70,229,.1);
  }
  .stat-chip {
    background:#fff; border-radius:14px; padding:14px 10px;
    border:1px solid rgba(79,70,229,.1); box-shadow:0 4px 16px rgba(79,70,229,.08);
    text-align:center;
  }
  .feature-card {
    background:#fff; border-radius:20px; padding:28px 24px;
    border:1px solid rgba(79,70,229,.1); box-shadow:0 4px 20px rgba(79,70,229,.06);
    transition:all .3s ease;
  }
  .feature-card:hover { transform:translateY(-6px); box-shadow:0 18px 48px rgba(79,70,229,.18); border-color:rgba(79,70,229,.3); }

  .plan-card {
    background:#fff; border-radius:24px; padding:36px 28px;
    border:2px solid rgba(79,70,229,.1); transition:all .35s ease;
  }
  .plan-card:hover { border-color:#4F46E5; box-shadow:0 20px 56px rgba(79,70,229,.2); transform:translateY(-6px); }
  .plan-popular { border-color:#4F46E5 !important; background:linear-gradient(160deg,#F0EFFF,#fff) !important; }

  .scroll-top {
    position:fixed; bottom:20px; right:20px; z-index:999;
    width:44px; height:44px; border-radius:50%;
    background:linear-gradient(135deg,#4F46E5,#06B6D4);
    color:#fff; border:none; cursor:pointer; font-size:18px;
    box-shadow:0 8px 28px rgba(79,70,229,.4);
    display:flex; align-items:center; justify-content:center;
    transition:all .3s ease;
  }
  .scroll-top:hover { transform:translateY(-3px) scale(1.08); }
  .nav-underline { height:2px; border-radius:2px; background:#06B6D4; transition:width .3s ease; }

  /* ══ DESKTOP NAV ══ */
  .nav-desktop { display:flex; }
  .nav-ham     { display:none !important; }

  /* ══════════════════════════════
     RESPONSIVE
  ══════════════════════════════ */
  @media (max-width:900px) {
    .nav-desktop { display:none !important; }
    .nav-ham     { display:flex !important; }
  }

  @media (max-width:768px) {
    /* Hero */
    .hero-wrap  { flex-direction:column !important; padding:96px 5% 60px !important; text-align:center; }
    .hero-left  { max-width:100% !important; }
    .hero-btns  { justify-content:center !important; }
    .hero-stats { grid-template-columns:repeat(2,1fr) !important; }
    .hero-card  { max-width:100% !important; width:100% !important; }
    .hero-badge { display:none !important; }

    /* About */
    .about-row  { flex-direction:column !important; padding:60px 5% !important; text-align:center; }
    .about-rev  { flex-direction:column !important; padding:60px 5% !important; text-align:center; }
    .abt-txt    { max-width:100% !important; }
    .abt-txt ul { text-align:left; }
    .abt-vis    { max-width:100% !important; width:100% !important; }
    .abt-badge  { display:none !important; }
    .donut-row  { flex-direction:column !important; }

    /* CTA */
    .cta-wrap   { flex-direction:column !important; }
    .cta-left   { max-width:100% !important; text-align:center; }
    .cta-left .pill { margin:0 auto 18px !important; }
    .cta-btns   { justify-content:center !important; }
    .cta-trust  { justify-content:center !important; }
    .cta-right  { max-width:100% !important; width:100% !important; }
    .cta-box    { margin:0 !important; border-radius:0 !important; }
  }

  @media (max-width:640px) {
    .feat-grid  { grid-template-columns:1fr !important; }
  }

  @media (max-width:700px) {
    .price-grid { grid-template-columns:1fr !important; max-width:380px !important; margin:0 auto !important; }
    .steps-row  { flex-direction:column !important; align-items:center !important; }
    .step-line  { display:none !important; }
  }

  @media (max-width:600px) {
    .nl-row1 { flex-direction:column !important; }
    .nl-row1 > div { flex:unset !important; width:100% !important; }
    .nl-row2 { flex-direction:column !important; }
    .nl-row2 > div,
    .nl-row2 > button { flex:unset !important; width:100% !important; }
    .nl-btn  { width:100% !important; border-radius:50px !important; }
  }

  @media (max-width:650px) {
    .foot-inner { flex-direction:column !important; align-items:flex-start !important; }
    .foot-links { flex-wrap:wrap !important; gap:12px !important; }
  }
`

/* ── shared check icon ── */
const Check = () => (
  <div style={{ width:22,height:22,borderRadius:'50%',background:'linear-gradient(135deg,#4F46E5,#06B6D4)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1 }}>
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </div>
)

/* ════════════════════════════════════════
   NAVBAR
════════════════════════════════════════ */
function Navbar() {
  const navigate = useNavigate()
  const [scrolled,       setScrolled]       = useState(false)
  const [activeSection,  setActiveSection]  = useState('home')
  const [menuOpen,       setMenuOpen]       = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const ids = ['home','about','features','pricing','newsletter','marketplace']
    const obs = []
    ids.forEach(id => {
      const el = document.getElementById(id); if (!el) return
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActiveSection(id) }, { threshold:0.3 })
      o.observe(el); obs.push(o)
    })
    return () => obs.forEach(o => o.disconnect())
  }, [])

  const go = id => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' }) }

  const links = [
    { id:'home',        label:'Home' },
    { id:'about',       label:'About Us' },
    { id:'features',    label:'Features' },
    { id:'pricing',     label:'Pricing' },
    { id:'newsletter',  label:'Newsletter' },
    { id:'marketplace', label:'Marketplace' },
  ]

  return (
    <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:999,background:scrolled?'rgba(15,14,42,.96)':'#0F0E2A',backdropFilter:scrolled?'blur(14px)':'none',boxShadow:scrolled?'0 2px 28px rgba(0,0,0,.35)':'none',transition:'all .3s ease' }}>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',height:64 }}>

        {/* Logo */}
        <button onClick={() => go('home')} style={{ display:'flex',alignItems:'center',gap:10,background:'none',border:'none',cursor:'pointer',flexShrink:0 }}>
          <div style={{ width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#4F46E5,#06B6D4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:17 }}>✉</div>
          <span className="cd" style={{ color:'#fff',fontWeight:700,fontSize:20,letterSpacing:'-.5px' }}>Mail<span style={{ color:'#06B6D4' }}>Doll</span></span>
        </button>

        {/* Desktop links */}
        <ul className="nav-desktop" style={{ gap:32,listStyle:'none',alignItems:'center' }}>
          {links.map(({ id,label }) => (
            <li key={id}>
              <button onClick={() => go(id)} style={{ background:'none',border:'none',cursor:'pointer',padding:'4px 0',color:activeSection===id?'#06B6D4':'rgba(255,255,255,.75)',fontFamily:"'Cabinet Grotesk',sans-serif",fontWeight:600,fontSize:14,transition:'color .2s' }}>
                {label}
                <div className="nav-underline" style={{ width:activeSection===id?'100%':'0%',marginTop:3 }} />
              </button>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div style={{ display:'flex',gap:10,alignItems:'center' }}>
          <div className="nav-desktop" style={{ gap:10 }}>
            <button className="btn-amber" onClick={() => navigate('/login')}>Login ›</button>
            <button className="btn-indigo" style={{ padding:'10px 22px',fontSize:13 }} onClick={() => navigate('/register')}>Start Free</button>
          </div>
          {/* Hamburger */}
          <button className="nav-ham" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background:'none',border:'none',color:'#fff',fontSize:26,cursor:'pointer',lineHeight:1,padding:'2px 4px' }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background:'#0F0E2A',padding:'8px 5% 20px',borderTop:'1px solid rgba(255,255,255,.08)' }}>
          {links.map(({ id,label }) => (
            <button key={id} onClick={() => go(id)} style={{ display:'block',width:'100%',textAlign:'left',padding:'12px 0',color:activeSection===id?'#06B6D4':'#fff',background:'none',border:'none',borderBottom:'1px solid rgba(255,255,255,.07)',fontFamily:"'Cabinet Grotesk',sans-serif",fontWeight:600,fontSize:15,cursor:'pointer' }}>{label}</button>
          ))}
          <div style={{ display:'flex',gap:10,marginTop:14 }}>
            <button className="btn-amber" style={{ flex:1 }} onClick={() => { navigate('/login'); setMenuOpen(false) }}>Login</button>
            <button className="btn-indigo" style={{ flex:1 }} onClick={() => { navigate('/register'); setMenuOpen(false) }}>Start Free</button>
          </div>
        </div>
      )}
    </nav>
  )
}

/* ════════════════════════════════════════
   HERO
════════════════════════════════════════ */
function HeroSection() {
  const navigate = useNavigate()
  const [showDemo, setShowDemo] = useState(false)

  const stats = [
    { val:'2.4B+', label:'Emails Delivered', color:'#4F46E5' },
    { val:'98.7%', label:'Delivery Rate',    color:'#10B981' },
    { val:'44%',   label:'Avg Open Rate',    color:'#06B6D4' },
    { val:'12K+',  label:'Businesses',       color:'#F59E0B' },
  ]
  return (
    <section id="home" className="hero-wrap" style={{ minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'110px 5% 80px',gap:48,flexWrap:'wrap',position:'relative',overflow:'hidden',background:'linear-gradient(155deg,#F8F9FF 0%,#EEF0FF 55%,#E4E7FF 100%)' }}>
      <div style={{ position:'absolute',top:'8%',right:'-4%',width:520,height:520,borderRadius:'50%',background:'radial-gradient(circle,rgba(79,70,229,.14) 0%,transparent 70%)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',bottom:'-5%',left:'-4%',width:360,height:360,borderRadius:'50%',background:'radial-gradient(circle,rgba(6,182,212,.1) 0%,transparent 70%)',pointerEvents:'none' }} />
      <div className="dot-grid" style={{ position:'absolute',inset:0,opacity:.5,pointerEvents:'none' }} />

      {/* Left */}
      <div className="hero-left fade-up" style={{ flex:'1 1 300px',maxWidth:560,position:'relative',zIndex:2 }}>
        <div className="pill" style={{ marginBottom:22 }}><span className="pill-dot" /> #1 Email & SMS Marketing Platform</div>
        <h1 className="cd" style={{ fontSize:'clamp(34px,5.5vw,70px)',fontWeight:700,lineHeight:1.07,color:'#0F0E2A',marginBottom:20,letterSpacing:'-1.5px' }}>
          Email Marketing<br /><span className="grad-text">That Actually Converts</span>
        </h1>
        <p style={{ fontSize:16,color:'#6B7280',lineHeight:1.75,marginBottom:32,maxWidth:460 }}>
          Create campaigns, automate sequences, segment your audience, and track performance — all in one platform built for serious marketers.
        </p>
        <div className="hero-btns" style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
          <button className="btn-indigo" onClick={() => navigate('/register')}>Try Free — No Card Needed</button>
          <button className="btn-ghost" onClick={() => setShowDemo(true)}>Watch Demo ▶</button>
        </div>
        <div className="hero-stats" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginTop:36 }}>
          {stats.map(s => (
            <div key={s.label} className="stat-chip">
              <div className="cd" style={{ fontSize:18,fontWeight:700,color:s.color }}>{s.val}</div>
              <div style={{ fontSize:10,color:'#9CA3AF',marginTop:3,fontWeight:600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right card */}
      <div className="hero-card float-y" style={{ flex:'1 1 300px',maxWidth:500,position:'relative',zIndex:2 }}>
        <div className="glass-card" style={{ padding:20 }}>
          <div style={{ display:'flex',gap:7,marginBottom:16 }}>
            {['#EF4444','#F59E0B','#10B981'].map(c => <div key={c} style={{ width:10,height:10,borderRadius:'50%',background:c }} />)}
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10,marginBottom:14 }}>
            {[
              { label:'Emails Sent',val:'48,291',icon:'📤',color:'#4F46E5',bg:'#EEF0FF' },
              { label:'Open Rate',  val:'44.2%', icon:'👁', color:'#10B981',bg:'#ECFDF5' },
              { label:'Click Rate', val:'10.8%', icon:'🖱', color:'#06B6D4',bg:'#ECFEFF' },
              { label:'Bounced',    val:'0.3%',  icon:'🔕',color:'#F59E0B',bg:'#FFFBEB' },
            ].map(m => (
              <div key={m.label} style={{ background:m.bg,borderRadius:12,padding:'12px 14px',border:`1px solid ${m.color}20` }}>
                <div style={{ fontSize:18,marginBottom:5 }}>{m.icon}</div>
                <div className="cd" style={{ fontSize:20,fontWeight:700,color:m.color }}>{m.val}</div>
                <div style={{ fontSize:10,color:'#9CA3AF',marginTop:2 }}>{m.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background:'#fff',borderRadius:12,padding:'14px 16px',border:'1px solid rgba(79,70,229,.1)' }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10,flexWrap:'wrap',gap:6 }}>
              <span style={{ fontSize:12,fontWeight:700,color:'#0F0E2A' }}>Summer Sale Campaign</span>
              <span style={{ fontSize:11,color:'#10B981',background:'#ECFDF5',padding:'3px 10px',borderRadius:20,border:'1px solid #D1FAE5' }}>● Live</span>
            </div>
            <svg viewBox="0 0 400 75" style={{ width:'100%',height:65 }}>
              <defs>
                <linearGradient id="hg1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity=".25"/>
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0,60 C60,52 100,32 160,35 C220,38 260,16 310,20 C350,23 380,12 400,16 L400,75 L0,75Z" fill="url(#hg1)"/>
              <path d="M0,60 C60,52 100,32 160,35 C220,38 260,16 310,20 C350,23 380,12 400,16" fill="none" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M0,68 C60,63 100,52 160,55 C220,58 260,44 310,48 C350,51 380,40 400,44" fill="none" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="5 4"/>
            </svg>
          </div>
        </div>
        <div className="hero-badge" style={{ position:'absolute',top:-16,right:-16,background:'linear-gradient(135deg,#4F46E5,#06B6D4)',borderRadius:14,padding:'11px 16px',color:'#fff',boxShadow:'0 10px 32px rgba(79,70,229,.4)' }}>
          <div style={{ fontSize:10,opacity:.75,marginBottom:2 }}>active users</div>
          <div className="cd" style={{ fontSize:24,fontWeight:700 }}>1,243</div>
        </div>
      </div>

      {/* Video Demo Modal */}
      {showDemo && <VideoDemoModal onClose={() => setShowDemo(false)} />}
    </section>
  )
}

/* ════════════════════════════════════════
   ABOUT
════════════════════════════════════════ */
function AboutSection() {
  const b1 = ['Campaign scheduling with bulk email queue processing','Contact segmentation — tag by behavior, source, activity','Role-based access: Admin, Manager, Analyst']
  const b2 = ['Drag-and-drop email template builder with HTML editor','Personalization variables: {{name}}, {{company}} etc.','Multi-step automation workflows triggered by user actions']

  return (
    <section id="about" style={{ background:'#F8F9FF' }}>

      {/* Part 1 */}
      <div className="about-row" style={{ display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',padding:'90px 5%',gap:48,background:'linear-gradient(160deg,#F8F9FF 0%,#EEF0FF 55%,#E4E7FF 100%)',position:'relative',overflow:'hidden' }}>
        <div className="dot-grid" style={{ position:'absolute',inset:0,opacity:.4,pointerEvents:'none' }} />

        <div className="abt-txt" style={{ flex:'1 1 280px',maxWidth:500,position:'relative',zIndex:2 }}>
          <div className="pill" style={{ marginBottom:18 }}>About Us</div>
          <h2 className="cd" style={{ fontSize:'clamp(26px,4vw,48px)',fontWeight:700,color:'#0F0E2A',lineHeight:1.1,marginBottom:16,letterSpacing:'-1px' }}>
            Drive Real Sales From<br /><span className="grad-text">Email Campaigns</span>
          </h2>
          <p style={{ color:'#6B7280',lineHeight:1.75,marginBottom:22,fontSize:15 }}>Maildoll gives businesses a complete suite — from contact list management to campaign scheduling and real-time analytics — so every email counts.</p>
          <ul style={{ listStyle:'none',padding:0,margin:'0 0 28px' }}>
            {b1.map((b,i) => <li key={i} style={{ display:'flex',alignItems:'flex-start',gap:12,marginBottom:12,fontSize:14,color:'#374151',lineHeight:1.6 }}><Check/>{b}</li>)}
          </ul>
          <button className="btn-indigo">Free Trial Now →</button>
        </div>

        <div className="abt-vis float-y" style={{ flex:'1 1 280px',maxWidth:460,position:'relative',zIndex:2 }}>
          <div className="glass-card" style={{ padding:18 }}>
            <div style={{ display:'flex',gap:6,marginBottom:14 }}>
              {['#EF4444','#F59E0B','#10B981'].map(c => <div key={c} style={{ width:10,height:10,borderRadius:'50%',background:c }} />)}
            </div>
            <div className="donut-row" style={{ display:'flex',gap:12,marginBottom:12 }}>
              {[
                { label:'Campaigns Sent',      val:'569',   color:'#4F46E5',da:'120 56',do_:'50',note:'68% Delivered' },
                { label:'Click-Through Rate',  val:'10.8%', color:'#06B6D4',da:'95 81', do_:'50',note:'Industry avg: 3%' },
              ].map(m => (
                <div key={m.label} style={{ flex:1,background:'#fff',borderRadius:14,padding:'14px 10px',textAlign:'center',border:`1px solid ${m.color}18` }}>
                  <div style={{ fontSize:11,color:'#9CA3AF',marginBottom:8 }}>{m.label}</div>
                  <svg width="72" height="72" viewBox="0 0 80 80" style={{ display:'block',margin:'0 auto' }}>
                    <circle cx="40" cy="40" r="28" fill="none" stroke="#EEF0FF" strokeWidth="11"/>
                    <circle cx="40" cy="40" r="28" fill="none" stroke={m.color} strokeWidth="11" strokeDasharray={m.da} strokeLinecap="round" strokeDashoffset={m.do_} transform="rotate(-90 40 40)"/>
                    <text x="40" y="45" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0F0E2A" fontFamily="Cabinet Grotesk,sans-serif">{m.val}</text>
                  </svg>
                  <div style={{ fontSize:11,color:m.color,marginTop:6,fontWeight:700 }}>{m.note}</div>
                </div>
              ))}
            </div>
            <div style={{ background:'#fff',borderRadius:12,padding:'12px 14px',border:'1px solid rgba(79,70,229,.08)' }}>
              <div style={{ display:'flex',justifyContent:'space-between',marginBottom:8,flexWrap:'wrap',gap:4 }}>
                <span style={{ fontSize:12,fontWeight:700,color:'#0F0E2A' }}>30-Day Overview</span>
                <span style={{ fontSize:11,color:'#4F46E5',fontWeight:600 }}>Last 30 days</span>
              </div>
              <svg viewBox="0 0 400 70" style={{ width:'100%',height:60 }}>
                <defs>
                  <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity=".18"/>
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,60 C40,52 70,44 110,46 C150,48 170,56 210,48 C250,40 270,18 310,16 C340,14 370,26 400,24 L400,70 L0,70Z" fill="url(#ag1)"/>
                <path d="M0,60 C40,52 70,44 110,46 C150,48 170,56 210,48 C250,40 270,18 310,16 C340,14 370,26 400,24" fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="310" cy="16" r="5" fill="#F59E0B" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <div className="abt-badge" style={{ position:'absolute',top:-14,right:-14,background:'linear-gradient(135deg,#4F46E5,#06B6D4)',borderRadius:14,padding:'11px 16px',color:'#fff',boxShadow:'0 10px 32px rgba(79,70,229,.4)' }}>
            <div style={{ fontSize:10,opacity:.75,marginBottom:2 }}>active users</div>
            <div className="cd" style={{ fontSize:24,fontWeight:700 }}>1,243</div>
          </div>
        </div>
      </div>

      {/* Part 2 */}
      <div className="about-rev" style={{ display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',padding:'90px 5%',gap:48,background:'#EEF0FF',position:'relative',overflow:'hidden' }}>

        <div className="abt-vis float-y" style={{ flex:'1 1 280px',maxWidth:440,position:'relative',zIndex:2 }}>
          <div style={{ background:'#fff',borderRadius:20,overflow:'hidden',boxShadow:'0 12px 48px rgba(79,70,229,.16)',border:'1px solid rgba(79,70,229,.12)' }}>
            <div style={{ background:'#0F0E2A',padding:'10px 16px',display:'flex',gap:7 }}>
              {['#4F46E5','#06B6D4','#F59E0B'].map(c => <div key={c} style={{ width:10,height:10,borderRadius:'50%',background:c }} />)}
            </div>
            <div style={{ background:'linear-gradient(135deg,#4F46E5,#06B6D4)',minHeight:155,display:'flex',alignItems:'center',justifyContent:'center',padding:22 }}>
              <div style={{ background:'rgba(255,255,255,.12)',borderRadius:16,padding:18,textAlign:'center',width:'100%',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,.2)' }}>
                <div style={{ fontSize:30,marginBottom:8 }}>✉️</div>
                <div style={{ color:'#fff',fontWeight:700,fontSize:14,marginBottom:4 }}>Summer Sale 🔥</div>
                <div style={{ color:'rgba(255,255,255,.75)',fontSize:12 }}>5,000 subscribers · Mar 20</div>
                <div style={{ marginTop:10,display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap' }}>
                  <span style={{ background:'#F59E0B',color:'#fff',fontSize:11,padding:'4px 12px',borderRadius:20,fontWeight:700 }}>Sending</span>
                  <span style={{ background:'rgba(255,255,255,.2)',color:'#fff',fontSize:11,padding:'4px 12px',borderRadius:20 }}>Open: 44%</span>
                </div>
              </div>
            </div>
            <div style={{ padding:'14px 16px',display:'flex',gap:8,alignItems:'center',borderTop:'1px solid rgba(79,70,229,.1)',flexWrap:'wrap' }}>
              <span style={{ fontWeight:700,fontSize:13,color:'#0F0E2A',whiteSpace:'nowrap' }}>Stay Updated!</span>
              <div style={{ flex:1,minWidth:150,display:'flex',borderRadius:10,overflow:'hidden',border:'1px solid rgba(79,70,229,.15)' }}>
                <input type="email" placeholder="Enter your email" style={{ flex:1,padding:'9px 12px',fontSize:12,border:'none',outline:'none',fontFamily:'Cabinet Grotesk,sans-serif',color:'#374151',minWidth:0 }}/>
                <button style={{ background:'#4F46E5',color:'#fff',border:'none',padding:'9px 14px',cursor:'pointer',fontSize:14 }}>✉</button>
              </div>
            </div>
          </div>
        </div>

        <div className="abt-txt" style={{ flex:'1 1 280px',maxWidth:500,position:'relative',zIndex:2 }}>
          <div className="pill" style={{ marginBottom:18 }}>Campaigns</div>
          <h2 className="cd" style={{ fontSize:'clamp(26px,4vw,48px)',fontWeight:700,color:'#0F0E2A',lineHeight:1.1,marginBottom:16,letterSpacing:'-1px' }}>
            Launch Campaigns<br /><span className="grad-text">At Any Time, Instantly</span>
          </h2>
          <p style={{ color:'#6B7280',lineHeight:1.75,marginBottom:22,fontSize:15 }}>Schedule campaigns for future delivery or send immediately. Our Redis + Bull queue handles thousands of emails with zero manual effort.</p>
          <ul style={{ listStyle:'none',padding:0,margin:'0 0 28px' }}>
            {b2.map((b,i) => <li key={i} style={{ display:'flex',alignItems:'flex-start',gap:12,marginBottom:12,fontSize:14,color:'#374151',lineHeight:1.6 }}><Check/>{b}</li>)}
          </ul>
          <button className="btn-indigo">Start Campaign →</button>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════
   FEATURES
════════════════════════════════════════ */
const FEATS = [
  { emoji:'🚀', title:'Never Get Stuck',      color:'#4F46E5', bg:'#EEF0FF', desc:'Dedicated support and guided onboarding ensure your campaigns always move forward.' },
  { emoji:'📨', title:'Unlimited Email Sends', color:'#10B981', bg:'#ECFDF5', desc:'Send bulk emails at scale using our Redis + Bull queue. No bottlenecks on higher plans.' },
  { emoji:'📍', title:'Email Deliverability',  color:'#06B6D4', bg:'#ECFEFF', desc:'98.7% delivery rate powered by SendGrid & Amazon SES with automated bounce handling.' },
  { emoji:'⭐', title:'Free Migration Service',color:'#F59E0B', bg:'#FFFBEB', desc:'Moving from another platform? We migrate your contacts, templates, and history free.' },
  { emoji:'🎨', title:'Template Builder',      color:'#8B5CF6', bg:'#F5F3FF', desc:'Drag-and-drop editor with HTML mode, image uploads, and personalization variables.' },
  { emoji:'📊', title:'Analytics Dashboard',  color:'#EF4444', bg:'#FEF2F2', desc:'Real-time metrics: open rate, CTR, bounce rate, unsubscribes — visualized beautifully.' },
]

function FeaturesSection() {
  return (
    <section id="features" style={{ background:'#F8F9FF' }}>
      <div style={{ padding:'72px 5% 36px',textAlign:'center',background:'linear-gradient(160deg,#EEF0FF 0%,#E4E7FF 55%,#F8F9FF 100%)' }}>
        <div className="pill" style={{ marginBottom:18 }}>What We Offer</div>
        <h2 className="cd" style={{ fontSize:'clamp(26px,4vw,50px)',fontWeight:700,color:'#0F0E2A',marginBottom:14,letterSpacing:'-1px' }}>
          Email Marketing <span className="grad-text">Features</span>
        </h2>
        <p style={{ fontSize:16,color:'#6B7280',maxWidth:500,margin:'0 auto',lineHeight:1.7 }}>Eight powerful modules — from contact management to automation workflows and real-time analytics.</p>
      </div>
      <div style={{ padding:'48px 5% 80px',maxWidth:1100,margin:'0 auto' }}>
        <div className="feat-grid" style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20 }}>
          {FEATS.map(f => (
            <div key={f.title} className="feature-card">
              <div style={{ width:52,height:52,borderRadius:14,background:f.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,marginBottom:16,border:`1px solid ${f.color}25` }}>{f.emoji}</div>
              <h3 className="cd" style={{ fontSize:17,fontWeight:700,color:'#0F0E2A',marginBottom:8 }}>{f.title}</h3>
              <p style={{ fontSize:14,color:'#6B7280',lineHeight:1.72 }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center',marginTop:48 }}>
          <button className="btn-indigo" style={{ fontSize:16,padding:'16px 44px' }}>Get Free Trial Now</button>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════
   PRICING
════════════════════════════════════════ */
const PLANS = [
  { name:'Starter', price:'₹0',     per:'/month', tag:'FREE',    popular:false, desc:'Perfect for bloggers and small businesses just getting started.', features:['1 Month Access','100 Emails/day','500 Contacts','Basic Templates','Campaign Analytics'], cta:'Start Free' },
  { name:'Growth',  price:'₹2,999', per:'/month', tag:'MONTHLY', popular:true,  desc:'Ideal for growing teams running multiple campaigns.',              features:['Unlimited Emails','10,000 Contacts','Automation Workflows','Advanced Segmentation','Priority Support','Team Roles (Admin/Manager/Viewer)'], cta:'Get Started' },
  { name:'Agency',  price:'₹5,999', per:'/month', tag:'YEARLY',  popular:false, desc:'For agencies managing campaigns across multiple clients.',         features:['Unlimited Everything','Multi-tenant Access','Audit Logs','Approval Workflows','API Access + Webhooks','Dedicated Account Manager'], cta:'Contact Sales' },
]

function PricingSection() {
  return (
    <section id="pricing" style={{ background:'#F8F9FF',padding:'90px 5%' }}>
      <div style={{ textAlign:'center',marginBottom:56 }}>
        <div className="pill" style={{ marginBottom:18 }}>Plans</div>
        <h2 className="cd" style={{ fontSize:'clamp(26px,4vw,50px)',fontWeight:700,color:'#0F0E2A',marginBottom:14,letterSpacing:'-1px' }}>
          Simple, <span className="grad-text">Transparent</span> Pricing
        </h2>
        <p style={{ fontSize:16,color:'#6B7280',maxWidth:420,margin:'0 auto' }}>No hidden fees. Scale your plan as your email list grows.</p>
      </div>
      <div className="price-grid" style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:22,maxWidth:980,margin:'0 auto' }}>
        {PLANS.map(p => (
          <div key={p.name} className={`plan-card${p.popular?' plan-popular':''}`} style={{ position:'relative' }}>
            {p.popular && <div style={{ position:'absolute',top:-14,left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#4F46E5,#06B6D4)',color:'#fff',fontSize:11,fontWeight:700,padding:'5px 18px',borderRadius:20,whiteSpace:'nowrap' }}>★ MOST POPULAR</div>}
            <div style={{ display:'inline-block',background:p.popular?'#EEF0FF':'#F3F4F6',color:p.popular?'#4F46E5':'#6B7280',fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:8,marginBottom:14,letterSpacing:1 }}>{p.tag}</div>
            <h3 className="cd" style={{ fontSize:21,fontWeight:700,color:'#0F0E2A',marginBottom:6 }}>{p.name}</h3>
            <div style={{ display:'flex',alignItems:'baseline',gap:4,marginBottom:8 }}>
              <span className="cd" style={{ fontSize:42,fontWeight:700,color:'#0F0E2A' }}>{p.price}</span>
              <span style={{ fontSize:14,color:'#9CA3AF' }}>{p.per}</span>
            </div>
            <p style={{ fontSize:13,color:'#6B7280',marginBottom:22,lineHeight:1.6 }}>{p.desc}</p>
            <div className="divider-bar" style={{ marginBottom:22 }} />
            <ul style={{ listStyle:'none',padding:0,margin:'0 0 26px',display:'flex',flexDirection:'column',gap:10 }}>
              {p.features.map(f => <li key={f} style={{ display:'flex',alignItems:'center',gap:10,fontSize:14,color:'#374151' }}><span style={{ color:'#10B981',fontWeight:700,fontSize:12 }}>✓</span> {f}</li>)}
            </ul>
            <button className={p.popular?'btn-indigo':'btn-ghost'} style={{ width:'100%',textAlign:'center',borderRadius:14 }}>{p.cta}</button>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ════════════════════════════════════════
   NEWSLETTER
════════════════════════════════════════ */
function NewsletterSection() {
  const [form, setForm]         = useState({ name:'', mobile:'', email:'' })
  const [errors, setErrors]     = useState({})
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
    setErrors({}); setShowPopup(true)
  }

  function handleClose() { setShowPopup(false); setForm({ name:'', mobile:'', email:'' }) }

  const inp = err => ({
    width:'100%', padding:'14px 22px', borderRadius:50,
    background:'rgba(255,255,255,.06)', border:`1.5px solid ${err?'#EF4444':'rgba(79,70,229,.25)'}`,
    color:'#fff', outline:'none', fontSize:15,
    fontFamily:"'Cabinet Grotesk',sans-serif", transition:'border-color .2s',
  })

  return (
    <section id="newsletter" style={{ background:'#0F0E2A',position:'relative',overflow:'hidden' }}>
      <div className="dot-grid" style={{ position:'absolute',inset:0,opacity:.06,pointerEvents:'none' }} />
      <div style={{ position:'absolute',top:0,left:0,width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(79,70,229,.18) 0%,transparent 70%)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',bottom:0,right:0,width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(6,182,212,.12) 0%,transparent 70%)',pointerEvents:'none' }} />

      {showPopup && (
        <div style={{ position:'fixed',inset:0,background:'rgba(0,0,0,.75)',backdropFilter:'blur(6px)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999,padding:'0 16px' }}>
          <div style={{ background:'linear-gradient(145deg,#1A1840,#0F0E2A)',border:'1.5px solid #4F46E5',borderRadius:28,padding:'40px 28px',maxWidth:380,width:'100%',textAlign:'center',boxShadow:'0 32px 80px rgba(79,70,229,.4)' }}>
            <div style={{ position:'relative',width:76,height:76,margin:'0 auto 22px' }}>
              <div className="ping-anim" style={{ position:'absolute',inset:0,borderRadius:'50%',background:'linear-gradient(135deg,#4F46E5,#06B6D4)',opacity:.35 }} />
              <div style={{ position:'relative',width:76,height:76,borderRadius:'50%',background:'linear-gradient(135deg,#4F46E5,#06B6D4)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                <svg width="34" height="34" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
            </div>
            <h3 className="cd" style={{ color:'#fff',fontSize:22,fontWeight:700,marginBottom:10 }}>Successfully Subscribed!</h3>
            <p style={{ color:'#A0A0B8',marginBottom:6 }}>Welcome, <strong style={{ color:'#fff' }}>{form.name}</strong> 🎉</p>
            <p style={{ color:'#A0A0B8',fontSize:13,marginBottom:26 }}>Updates will be sent to <span style={{ color:'#06B6D4' }}>{form.email}</span></p>
            <button onClick={handleClose} className="btn-indigo" style={{ width:'100%',textAlign:'center',borderRadius:14 }}>OK, Got it!</button>
          </div>
        </div>
      )}

      <div style={{ display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'80px 5%',position:'relative',zIndex:2 }}>
        <div className="pill" style={{ marginBottom:20,borderColor:'rgba(6,182,212,.3)',color:'#06B6D4',background:'rgba(6,182,212,.1)' }}>Stay in the Loop</div>
        <h2 className="cd" style={{ fontSize:'clamp(26px,5vw,58px)',fontWeight:700,color:'#fff',textAlign:'center',marginBottom:14,letterSpacing:'-1px' }}>
          Subscribe For <span className="grad-text">Newsletter</span>
        </h2>
        <p style={{ color:'#A0A0B8',textAlign:'center',marginBottom:44,maxWidth:440,lineHeight:1.7,fontSize:16 }}>
          Get the latest campaign tips, product updates, and email marketing best practices directly in your inbox.
        </p>
        <div style={{ width:'100%',maxWidth:640,display:'flex',flexDirection:'column',gap:14 }}>
          <div className="nl-row1" style={{ display:'flex',gap:14,flexWrap:'wrap' }}>
            <div style={{ flex:'1 1 190px' }}>
              <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} style={inp(errors.name)}/>
              {errors.name && <p style={{ fontSize:12,color:'#EF4444',marginTop:6,paddingLeft:16 }}>{errors.name}</p>}
            </div>
            <div style={{ flex:'1 1 190px' }}>
              <input name="mobile" placeholder="Mobile: +91 98XXXXXXXX" value={form.mobile} onChange={handleChange} style={inp(errors.mobile)}/>
              {errors.mobile && <p style={{ fontSize:12,color:'#EF4444',marginTop:6,paddingLeft:16 }}>{errors.mobile}</p>}
            </div>
          </div>
          <div className="nl-row2" style={{ display:'flex',gap:14,flexWrap:'wrap',alignItems:'flex-start' }}>
            <div style={{ flex:'1 1 210px' }}>
              <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} style={inp(errors.email)}/>
              {errors.email && <p style={{ fontSize:12,color:'#EF4444',marginTop:6,paddingLeft:16 }}>{errors.email}</p>}
            </div>
            <button onClick={handleSubmit} className="btn-indigo nl-btn" style={{ whiteSpace:'nowrap',padding:'14px 28px' }}>Subscribe Now →</button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════
   MARKETPLACE
════════════════════════════════════════ */
function MarketplaceSection() {
  const navigate = useNavigate()
  const steps = [
    { num:'01', label:'Upload Contacts', sub:'CSV / API / Manual' },
    { num:'02', label:'Design Template', sub:'Drag-drop or HTML' },
    { num:'03', label:'Create Campaign', sub:'Target + Schedule' },
    { num:'04', label:'Track Analytics', sub:'Open · Click · Bounce' },
  ]

  return (
    <section id="marketplace" style={{ background:'#F8F9FF' }}>

      {/* Steps */}
      <div style={{ padding:'80px 5%',background:'#EEF0FF',textAlign:'center' }}>
        <div className="pill" style={{ marginBottom:18 }}>How It Works</div>
        <h2 className="cd" style={{ fontSize:'clamp(24px,4vw,46px)',fontWeight:700,color:'#0F0E2A',marginBottom:48,letterSpacing:'-1px' }}>
          From Zero to First Campaign<br /><span className="grad-text">in 4 Simple Steps</span>
        </h2>
        <div className="steps-row" style={{ display:'flex',justifyContent:'center',alignItems:'center',flexWrap:'wrap',gap:0,maxWidth:860,margin:'0 auto' }}>
          {steps.map((s,i) => (
            <div key={s.num} style={{ display:'flex',alignItems:'center' }}>
              <div style={{ textAlign:'center',width:160,padding:'8px' }}>
                <div className="cd" style={{ width:50,height:50,borderRadius:14,background:'linear-gradient(135deg,#4F46E5,#06B6D4)',color:'#fff',fontSize:17,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px',boxShadow:'0 8px 24px rgba(79,70,229,.35)' }}>{s.num}</div>
                <div style={{ fontWeight:700,fontSize:14,color:'#0F0E2A',marginBottom:3 }}>{s.label}</div>
                <div style={{ fontSize:12,color:'#9CA3AF' }}>{s.sub}</div>
              </div>
              {i < steps.length-1 && <div className="step-line" style={{ width:44,height:2,background:'linear-gradient(90deg,#4F46E5,#06B6D4)',opacity:.3,flexShrink:0 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-box" style={{ margin:'0 4%',borderRadius:28,position:'relative',overflow:'hidden',background:'linear-gradient(155deg,#F8F9FF 0%,#EEF0FF 55%,#E4E7FF 100%)',padding:'72px 6%' }}>
        <div className="dot-grid" style={{ position:'absolute',inset:0,opacity:.5,pointerEvents:'none' }} />
        <div style={{ position:'absolute',top:0,right:0,width:380,height:380,borderRadius:'50%',background:'radial-gradient(circle,rgba(79,70,229,.14) 0%,transparent 70%)',pointerEvents:'none' }} />

        <div className="cta-wrap" style={{ display:'flex',flexWrap:'wrap',alignItems:'center',gap:48,position:'relative',zIndex:2 }}>
          <div className="cta-left" style={{ flex:'1 1 280px',maxWidth:520 }}>
            <div className="pill" style={{ marginBottom:18 }}>Marketplace</div>
            <h2 className="cd" style={{ fontSize:'clamp(26px,4.5vw,54px)',fontWeight:700,color:'#0F0E2A',lineHeight:1.1,marginBottom:16,letterSpacing:'-1.5px' }}>
              Start Your Marketing<br />Campaign <span className="grad-text">Today</span>
            </h2>
            <p style={{ fontSize:15,color:'#6B7280',lineHeight:1.75,marginBottom:32,maxWidth:420 }}>
              Join 12,000+ businesses already using Maildoll to automate email marketing, engage customers, and grow revenue.
            </p>
            <div className="cta-btns" style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
              <button className="btn-indigo" onClick={() => navigate('/register')} style={{ fontSize:15,padding:'14px 36px' }}>Start Free — 14 Days</button>
              <button className="btn-ghost"  onClick={() => navigate('/pricing')}>See Pricing →</button>
            </div>
            <div className="cta-trust" style={{ marginTop:32,display:'flex',alignItems:'center',gap:12,flexWrap:'wrap' }}>
              <div style={{ display:'flex' }}>
                {['#4F46E5','#06B6D4','#10B981','#F59E0B','#EF4444'].map((c,i) => (
                  <div key={c} style={{ width:30,height:30,borderRadius:'50%',background:c,border:'2px solid #fff',marginLeft:i>0?-9:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'#fff',fontWeight:700 }}>{String.fromCharCode(65+i)}</div>
                ))}
              </div>
              <span style={{ fontSize:13,color:'#6B7280' }}><strong style={{ color:'#0F0E2A' }}>12,000+</strong> businesses trust Maildoll</span>
            </div>
          </div>

          <div className="cta-right" style={{ flex:'1 1 250px',maxWidth:340 }}>
            <div style={{ background:'#fff',borderRadius:24,border:'2px solid rgba(79,70,229,.2)',padding:8,boxShadow:'0 20px 64px rgba(79,70,229,.16)' }}>
              <div style={{ background:'#EEF0FF',borderRadius:18,padding:'22px 18px' }}>
                <div style={{ fontSize:13,color:'#6B7280',marginBottom:6 }}>Estimated monthly cost</div>
                <div className="cd" style={{ fontSize:46,fontWeight:700,color:'#0F0E2A',lineHeight:1 }}>₹2,999</div>
                <div style={{ fontSize:13,color:'#9CA3AF',marginTop:4 }}>Growth Plan · Billed Monthly</div>
                <div style={{ marginTop:14,display:'flex',gap:6,flexWrap:'wrap' }}>
                  {['50K Emails','10K Contacts','Automations'].map(t => (
                    <span key={t} style={{ fontSize:11,background:'#fff',color:'#4F46E5',padding:'4px 10px',borderRadius:20,fontWeight:700,border:'1px solid rgba(79,70,229,.2)' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ padding:'16px 14px 12px' }}>
                <button className="btn-indigo" style={{ width:'100%',textAlign:'center',borderRadius:12,marginBottom:10 }} onClick={() => navigate('/register')}>Get Started Free →</button>
                <div style={{ display:'flex',gap:6,justifyContent:'center',flexWrap:'wrap' }}>
                  {[{ icon:'🔒',label:'Secure' },{ icon:'↩',label:'Cancel anytime' },{ icon:'💳',label:'No card needed' }].map(({ icon,label }) => (
                    <div key={label} style={{ fontSize:11,color:'#9CA3AF',display:'flex',alignItems:'center',gap:3 }}><span>{icon}</span>{label}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background:'#0F0E2A',padding:'48px 5%' }}>
        <div className="foot-inner" style={{ display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center',gap:24,maxWidth:1100,margin:'0 auto' }}>
          <div>
            <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:8 }}>
              <div style={{ width:32,height:32,borderRadius:9,background:'linear-gradient(135deg,#4F46E5,#06B6D4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15 }}>✉</div>
              <span className="cd" style={{ color:'#fff',fontWeight:700,fontSize:19 }}>Mail<span style={{ color:'#06B6D4' }}>Doll</span></span>
            </div>
            <p style={{ fontSize:12,color:'#6B7280',maxWidth:220,lineHeight:1.6 }}>Email & SMS marketing automation platform for modern businesses.</p>
          </div>
          <div className="foot-links" style={{ display:'flex',gap:22,flexWrap:'wrap' }}>
            {['Privacy Policy','Terms of Service','Contact Us','Blog','API Docs'].map(l => (
              <a key={l} href="#" style={{ color:'#6B7280',fontSize:13,textDecoration:'none',fontFamily:'Cabinet Grotesk,sans-serif',transition:'color .2s' }}
                onMouseEnter={e => e.target.style.color='#A78BFA'}
                onMouseLeave={e => e.target.style.color='#6B7280'}
              >{l}</a>
            ))}
          </div>
          <p style={{ fontSize:12,color:'#4B5563' }}>© 2026 Maildoll.<br />All rights reserved.</p>
        </div>
      </footer>
    </section>
  )
}

/* ════════════════════════════════════════
   SCROLL TO TOP
════════════════════════════════════════ */
function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  if (!visible) return null
  return <button className="scroll-top" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} title="Back to top">↑</button>
}

/* ════════════════════════════════════════
   ROOT
════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
      <div style={{ fontFamily:"'Cabinet Grotesk',sans-serif" }}>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <PricingSection />
        <NewsletterSection />
        <MarketplaceSection />
        <ScrollToTop />
      </div>
    </>
  )
}