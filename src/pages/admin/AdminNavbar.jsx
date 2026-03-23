import React, { useState, useRef, useEffect } from "react";

// ── Icons (inline SVG so no extra dependency needed) ──────────────────────────
function IconProfile() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-6V7a4 4 0 00-8 0v4m16 0H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2z" />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}
function IconHelp() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093M12 21a9 9 0 100-18 9 9 0 000 18zm0-4h.01" />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
    </svg>
  );
}

// ── Dropdown Menu ─────────────────────────────────────────────────────────────
function AvatarDropdown({ open, onClose, darkMode }) {
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open) return null;

  const menuItems = [
    { icon: <IconProfile />,  label: "Profile" },
    { icon: <IconLock />,     label: "Reset Password" },
    { icon: <IconDoc />,      label: "Documentation" },
    { icon: <IconHelp />,     label: "Tutorial" },
  ];

  return (
    <div
      ref={ref}
      className="absolute right-0 top-[calc(100%+8px)] w-56 rounded-2xl overflow-hidden shadow-2xl z-50 animate-fadeIn"
      style={{
        background: "linear-gradient(160deg, #1e3a8a 0%, #1d4ed8 100%)",
        boxShadow: "0 20px 40px rgba(29,78,216,0.35)",
      }}
    >
      {/* User Info */}
      <div className="px-5 pt-5 pb-4 border-b border-white/15">
        <div className="text-white font-bold text-base leading-tight">admin</div>
        <div className="text-blue-200 text-xs mt-0.5">Admin</div>
        <div className="text-white text-xs font-semibold mt-1.5">Balance: $0</div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {menuItems.map(item => (
          <button
            key={item.label}
            className="flex items-center gap-3 w-full px-5 py-2.5 text-sm text-blue-100 hover:bg-white/15 hover:text-white transition-colors cursor-pointer bg-transparent border-none text-left"
          >
            <span className="text-blue-200">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Logout — separated */}
      <div className="border-t border-white/15 py-2">
        <button
          onClick={() => { onClose(); alert("Logged out!"); }}
          className="flex items-center gap-3 w-full px-5 py-2.5 text-sm text-blue-100 hover:bg-white/15 hover:text-white transition-colors cursor-pointer bg-transparent border-none text-left"
        >
          <span className="text-blue-200"><IconLogout /></span>
          Logout
        </button>
      </div>
    </div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function AdminNavbar({ activeLabel, darkMode, setDarkMode }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header
      className={`h-14 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm border-b transition-colors duration-300
        ${darkMode
          ? "bg-[#1e1b3a] border-white/10"
          : "bg-white border-slate-200"
        }`}
    >
      {/* Breadcrumb */}
      <nav className={`text-sm transition-colors duration-300 ${darkMode ? "text-white/40" : "text-slate-400"}`}>
        Admin
        <span className="mx-1.5">›</span>
        <span className={`font-semibold ${darkMode ? "text-white/80" : "text-slate-700"}`}>
          {activeLabel}
        </span>
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-2">

        {/* Dark / Light Toggle */}
        <button
          onClick={() => setDarkMode(prev => !prev)}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-base border transition-all duration-200 cursor-pointer
            ${darkMode
              ? "bg-white/10 border-white/20 hover:bg-white/20 text-yellow-300"
              : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-600"
            }`}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Refresh */}
        <button
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-base border transition-all duration-200 cursor-pointer
            ${darkMode
              ? "bg-white/10 border-white/20 hover:bg-white/20 text-white/70"
              : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-600"
            }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        {/* Dollar / Balance */}
        <button
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold border transition-all duration-200 cursor-pointer
            ${darkMode
              ? "bg-white/10 border-white/20 hover:bg-white/20 text-white/70"
              : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-600"
            }`}
        >
          $
        </button>

        {/* Notification Bell */}
        <button
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-base border transition-all duration-200 cursor-pointer relative
            ${darkMode
              ? "bg-white/10 border-white/20 hover:bg-white/20 text-white/70"
              : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-600"
            }`}
        >
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
        </button>

        {/* Divider */}
        <div className={`w-px h-6 mx-1 ${darkMode ? "bg-white/10" : "bg-slate-200"}`}></div>

        {/* Avatar + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(prev => !prev)}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-xs font-extrabold shadow-md hover:shadow-indigo-400/40 hover:scale-105 transition-all duration-200 cursor-pointer border-none outline-none"
          >
            AD
          </button>

          <AvatarDropdown
            open={dropdownOpen}
            onClose={() => setDropdownOpen(false)}
            darkMode={darkMode}
          />
        </div>

      </div>

      {/* Fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .animate-fadeIn { animation: fadeIn 0.15s ease-out both; }
      `}</style>
    </header>
  );
}