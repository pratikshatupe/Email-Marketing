import React, { useState, useEffect, useRef } from "react";
import AdminSidebar from "../admin/AdminSidebar";
import AdminDashboard from "../admin/AdminDashboard";
import AdminProfile from "../admin/AdminProfile";
import AdminSetting from "../admin/AdminSetting";
import { Menu, Bell, ChevronDown, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PAGE_ICONS = {
  user_management: "👥", campaigns: "📢", subscription_plans: "💳",
  billing_payments: "🧾", email_config: "✉️", global_analytics: "📊", audit_logs: "📋",
};

export default function AdminLayout() {
  const [active, setActive]           = useState("dashboard");
  const [collapsed, setCollapsed]     = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef                   = useRef(null);
  const navigate                      = useNavigate();

  useEffect(() => {
    const fn = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowProfile(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [active]);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  function handleLogout() { localStorage.removeItem("user"); navigate("/login"); }

  const activeLabel = () => {
    const map = { system_settings: "settings", profile: "profile" };
    return map[active] || active;
  };

  function renderPage() {
    switch (active) {
      case "dashboard":       return <AdminDashboard />;
      case "profile":         return <AdminProfile />;
      case "system_settings": return <AdminSetting />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[58vh] gap-3 p-6">
            <div className="text-5xl">{PAGE_ICONS[active] || "📄"}</div>
            <h1 className="text-xl font-bold text-slate-700">{active}</h1>
            <p className="text-sm text-slate-400 text-center max-w-xs">Coming Soon</p>
            <div className="w-10 h-1 rounded-full bg-indigo-500"></div>
          </div>
        );
    }
  }

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <div className={`fixed md:relative z-40 h-full transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <AdminSidebar
          active={active}
          setActive={setActive}
          collapsed={collapsed}
          onCloseMobile={() => setMobileOpen(false)}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between bg-white px-4 md:px-5 py-3 border-b shadow-sm flex-shrink-0 z-20">
          <div className="flex items-center gap-2.5">
            <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg hover:bg-slate-100 md:hidden">
              <Menu size={19} />
            </button>
            <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded-lg hover:bg-slate-100 hidden md:flex">
              <Menu size={19} />
            </button>
            <h1 className="text-sm sm:text-[15px] font-semibold text-slate-700 capitalize">
              {activeLabel()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-slate-100">
              <Bell size={17} />
            </button>

            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-slate-100">
                <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">A</div>
                <span className="text-sm font-medium">Admin</span>
                <ChevronDown size={13} />
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-xl rounded-xl border p-2">
                  <button onClick={() => { setActive("profile"); setShowProfile(false); }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50">
                    Profile
                  </button>
                  <button onClick={() => { setActive("system_settings"); setShowProfile(false); }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50">
                    Settings
                  </button>
                  <button onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{renderPage()}</main>
      </div>
    </div>
  );
}