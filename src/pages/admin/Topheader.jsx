
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { roleConfig } from "../admin/AdminSidebar";

const PATH_TITLES = {
  "/admin": "Dashboard",
  "/admin/campaigns": "Campaigns",
  "/admin/campaigns/email": "Email Campaigns",
  "/admin/campaigns/whatsapp": "WhatsApp Campaigns",
  "/admin/templates": "Templates",
  "/admin/templates/email": "Email Templates",
  "/admin/templates/whatsapp": "WhatsApp Templates",
  "/admin/contacts": "Contacts",
  "/admin/segments": "Segments",
  "/admin/automation": "Automation",
  "/admin/reports": "Reports",
  "/admin/audit": "Audit Logs",
  "/admin/users": "User Management",
  "/admin/roles": "Roles & Permissions",
  "/admin/subscription": "Subscription",
  "/admin/settings": "Settings",
  "/admin/profile": "My Profile",
};

export default function TopHeader({ onMenuToggle }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const role = user?.role || "VIEWER";
  const rc = roleConfig[role] || roleConfig.VIEWER;
  const title = PATH_TITLES[location.pathname] || "Dashboard";

  const [dropOpen, setDropOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => { setDropOpen(false); }, [location.pathname]);

  function goProfile() {
    setDropOpen(false);
    navigate("/admin/profile");
  }

  function handleLogout() {
    setDropOpen(false);
    setLogoutConfirm(true);
  }

  function confirmLogout() {
    logout();
    navigate("/login");
  }

  const displayName = user?.name || user?.email?.split("@")[0] || "Admin";
  const avatarLetter = displayName[0].toUpperCase();

  return (
    <>
      <header className="flex items-center justify-between px-4 md:px-5 py-3 bg-white border-b border-slate-100 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={onMenuToggle}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all text-sm"
          >
            ☰
          </button>
          <h1 className="font-black text-slate-800 text-sm md:text-[15px] truncate max-w-[140px] sm:max-w-none">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2">

          <button className="relative w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all text-base">
            🔔
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>

          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setDropOpen((o) => !o)}
              className={`flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-xl transition-all cursor-pointer
                ${dropOpen ? "bg-indigo-50 ring-2 ring-indigo-200" : "hover:bg-slate-50"}`}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow"
                style={{ background: `linear-gradient(135deg,${rc.color},${rc.color}99)` }}
              >
                {avatarLetter}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[11px] font-bold text-slate-700 leading-none truncate max-w-[100px]">
                  {displayName}
                </p>
                <p className="text-[10px] font-semibold mt-0.5" style={{ color: rc.color }}>
                  {rc.label}
                </p>
              </div>
              <span className={`text-slate-400 text-[10px] transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {dropOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fadeIn">

                <div className="px-4 py-3 bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                      style={{ background: `linear-gradient(135deg,${rc.color},${rc.color}80)` }}
                    >
                      {avatarLetter}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] font-bold text-slate-800 truncate">{displayName}</p>
                      <p className="text-[10px] font-semibold truncate" style={{ color: rc.color }}>
                        {rc.icon} {rc.label}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-1.5">
                  <DropItem
                    icon="👤"
                    label="My Profile"
                    sub="View & edit your info"
                    onClick={goProfile}
                  />
                  <DropItem
                    icon="⚙️"
                    label="Settings"
                    sub="App preferences"
                    onClick={() => { setDropOpen(false); navigate("/admin/settings"); }}
                  />
                </div>

                <div className="p-1.5 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-colors text-left group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-red-100 group-hover:bg-red-200 flex items-center justify-center text-sm transition-colors">
                      🚪
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-red-600">Logout</p>
                      <p className="text-[10px] text-red-400">End your session</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {logoutConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-red-500 to-rose-600 p-6 text-center">
              <div className="text-5xl mb-2">🚪</div>
              <h2 className="text-lg font-black text-white">Logout?</h2>
              <p className="text-red-100 text-sm mt-1">You will be signed out of your session.</p>
            </div>
            <div className="p-5 flex gap-3">
              <button
                onClick={() => setLogoutConfirm(false)}
                className="flex-1 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DropItem({ icon, label, sub, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
    >
      <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center text-sm transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-[12px] font-bold text-slate-700 group-hover:text-indigo-700 transition-colors">{label}</p>
        <p className="text-[10px] text-slate-400">{sub}</p>
      </div>
    </button>
  );
}