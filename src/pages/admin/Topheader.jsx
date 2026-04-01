// admin/components/TopHeader.jsx

import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { roleConfig } from "../admin/AdminSidebar";

const PATH_TITLES = {
  "/admin":                    "Dashboard",
  "/admin/campaigns":          "Campaigns",
  "/admin/campaigns/email":    "Email Campaigns",
  "/admin/campaigns/whatsapp": "WhatsApp Campaigns",
  "/admin/templates":          "Templates",
  "/admin/templates/email":    "Email Templates",
  "/admin/templates/whatsapp": "WhatsApp Templates",
  "/admin/contacts":           "Contacts",
  "/admin/automation":         "Automation",
  "/admin/reports":            "Reports",
  "/admin/users":              "User Management",
  "/admin/roles":              "Roles & Permissions",
  "/admin/subscription":       "Subscription",
  "/admin/settings":           "Settings",
};

export default function TopHeader({ onMenuToggle }) {
  const { user }  = useAuth();
  const location  = useLocation();
  const role      = user?.role || "VIEWER";
  const rc        = roleConfig[role] || roleConfig.VIEWER;
  const title     = PATH_TITLES[location.pathname] || "Dashboard";

  return (
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
        <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-all">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg,${rc.color},${rc.color}99)` }}
          >
            {user?.email?.[0]?.toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <p className="text-[11px] font-bold text-slate-700 leading-none">
              {user?.email?.split("@")[0]}
            </p>
            <p className="text-[10px] font-semibold mt-0.5" style={{ color: rc.color }}>
              {rc.label}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}