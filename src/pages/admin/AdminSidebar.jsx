import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


export const roleConfig = {
  SUPER_ADMIN: { label: "Super Admin", icon: "👑", color: "#6366f1", bg: "#ede9fe" },
  BUSINESS_ADMIN: { label: "Business Admin", icon: "🏢", color: "#10b981", bg: "#d1fae5" },
  MARKETING_MANAGER: { label: "Marketing Manager", icon: "🎯", color: "#f59e0b", bg: "#fef3c7" },
  VIEWER: { label: "Viewer", icon: "👁️", color: "#ec4899", bg: "#fce7f3" },
};


export const NAV_ITEMS = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", icon: "📊", path: "/admin", perm: null, end: true },
    ],
  },
  {
    group: "Marketing",
    items: [
      {
        label: "Campaigns",
        icon: "📢",
        path: "/admin/campaigns",
        perm: "view_campaigns",
        children: [
          { label: "Email Campaigns", icon: "✉️", path: "/admin/campaigns/email" },
          { label: "WhatsApp Campaigns", icon: "💬", path: "/admin/campaigns/whatsapp" },
        ],
      },
      {
        label: "Templates",
        icon: "🎨",
        path: "/admin/templates",
        perm: "sidebar_templates",
        children: [
          { label: "Email Templates", icon: "📧", path: "/admin/templates/email" },
          { label: "WhatsApp Templates", icon: "💬", path: "/admin/templates/whatsapp" },
        ],
      },
      { label: "Contacts", icon: "👥", path: "/admin/contacts", perm: "sidebar_subscribers" },
      { label: "Automation", icon: "⚙️", path: "/admin/automation", perm: "view_campaigns" },
    ],
  },
  {
    group: "Analytics",
    items: [
      { label: "Reports", icon: "📈", path: "/admin/reports", perm: "sidebar_reports" },
      { label: "Audit Logs", icon: "🛡️", path: "/admin/audit", perm: "sidebar_roles" },
    ],
  },
  {
    group: "Administration",
    items: [
      { label: "Users", icon: "👤", path: "/admin/users", perm: "sidebar_roles" },
      { label: "Roles", icon: "🔐", path: "/admin/roles", perm: "sidebar_roles" },
      { label: "Subscription", icon: "💳", path: "/admin/subscription", perm: "view_purchase" },
      {
        label: "Settings",
        icon: "🔧",
        path: "/admin/settings",
        perm: null
      },
    ],
  },
];


export default function AdminSidebar({ collapsed }) {
  const { user, hasPerm, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const role = user?.role || "VIEWER";
  const rc = roleConfig[role] || roleConfig.VIEWER;

  const [campaignsOpen, setCampaignsOpen] = useState(
    location.pathname.startsWith("/admin/campaigns")
  );

  const [templatesOpen, setTemplatesOpen] = useState(
    location.pathname.startsWith("/admin/templates")
  );

  const isDropdownOpen = (path) => {
    if (path === "/admin/campaigns") return campaignsOpen;
    if (path === "/admin/templates") return templatesOpen;
    return false;
  };

  const toggleDropdown = (path) => {
    if (path === "/admin/campaigns") setCampaignsOpen((o) => !o);
    if (path === "/admin/templates") setTemplatesOpen((o) => !o);
  };

  return (
    <aside
      className="flex flex-col h-full transition-all duration-300 overflow-hidden flex-shrink-0"
      style={{
        width: collapsed ? "68px" : "236px",
        background: "#0F0E2A",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center gap-3 px-4 py-[18px] border-b border-white/5 flex-shrink-0">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{ background: "linear-gradient(135deg,#4F46E5,#06B6D4)" }}
        >
          <span className="text-white font-black text-base">M</span>
        </div>
        {!collapsed && (
          <span className="text-white font-bold text-lg tracking-wide truncate">
            MailDoll
          </span>
        )}
      </div>

      {!collapsed && (
        <div
          className="mx-3 mt-3 mb-1 px-3 py-2.5 rounded-xl flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
              style={{ background: rc.bg }}
            >
              {rc.icon}
            </div>
            <div className="min-w-0">
              <p className="text-white text-[11px] font-semibold truncate">
                {user?.email}
              </p>
              <p className="text-[10px] font-bold truncate" style={{ color: rc.color }}>
                {rc.label}
              </p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {NAV_ITEMS.map(({ group, items }) => {
          const visible = items.filter(
            (item) => item.perm === null || hasPerm(item.perm)
          );
          if (visible.length === 0) return null;

          return (
            <div key={group} className="mb-1">
              {!collapsed && (
                <p
                  className="text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-2 mt-1.5"
                  style={{ color: "rgba(255,255,255,0.22)" }}
                >
                  {group}
                </p>
              )}
              {collapsed && <div className="h-2" />}

              {visible.map((item) => {
                const hasSub = item.children && item.children.length > 0;

                if (hasSub) {
                  const isParentActive = location.pathname.startsWith(item.path);
                  const isOpen = isDropdownOpen(item.path);

                  return (
                    <div key={item.path}>
                      <button
                        onClick={() => {
                          if (collapsed) {
                            navigate(item.children[0].path);
                          } else {
                            toggleDropdown(item.path);
                          }
                        }}
                        title={collapsed ? item.label : undefined}
                        className={`flex items-center w-full px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150
                          ${isParentActive
                            ? "text-white"
                            : "text-white/45 hover:text-white/80 hover:bg-white/5"
                          }
                          ${collapsed ? "justify-center" : "gap-3"}`}
                        style={
                          isParentActive
                            ? {
                              background:
                                "linear-gradient(135deg,rgba(99,102,241,0.28),rgba(139,92,246,0.15))",
                              border: "1px solid rgba(99,102,241,0.32)",
                            }
                            : {}
                        }
                      >
                        <span className="text-[18px] flex-shrink-0 leading-none">
                          {item.icon}
                        </span>
                        {!collapsed && (
                          <>
                            <span className="text-[13px] font-semibold truncate flex-1 text-left">
                              {item.label}
                            </span>
                            <span
                              className={`text-[10px] transition-transform duration-200 text-white/30 ${isOpen ? "rotate-180" : ""
                                }`}
                            >
                              ▼
                            </span>
                          </>
                        )}
                      </button>

                      {!collapsed && isOpen && (
                        <div className="ml-3 pl-3 border-l border-white/10 mb-1 space-y-0.5">
                          {item.children.map((child) => {
                            const isChildActive =
                              location.pathname === child.path;
                            return (
                              <NavLink
                                key={child.path}
                                to={child.path}
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-150 text-[12px] font-semibold
                                  ${isChildActive
                                    ? "text-white bg-white/10"
                                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                                  }`}
                              >
                                <span className="text-[14px] leading-none">
                                  {child.icon}
                                </span>
                                <span className="truncate">{child.label}</span>
                                {isChildActive && (
                                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                                )}
                              </NavLink>
                            );
                          })}
                        </div>
                      )}

                      {collapsed && (
                        <div className="space-y-0.5">
                          {item.children.map((child) => (
                            <NavLink
                              key={child.path}
                              to={child.path}
                              title={child.label}
                              className={({ isActive }) =>
                                `flex items-center justify-center py-2 rounded-xl mb-0.5 transition-all duration-150
                                ${isActive
                                  ? "text-white bg-white/10"
                                  : "text-white/30 hover:text-white/60 hover:bg-white/5"
                                }`
                              }
                            >
                              <span className="text-[14px]">{child.icon}</span>
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    title={collapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150
                      ${isActive
                        ? "text-white"
                        : "text-white/45 hover:text-white/80 hover:bg-white/5"
                      }
                      ${collapsed ? "justify-center" : ""}`
                    }
                    style={({ isActive }) =>
                      isActive
                        ? {
                          background:
                            "linear-gradient(135deg,rgba(99,102,241,0.28),rgba(139,92,246,0.15))",
                          border: "1px solid rgba(99,102,241,0.32)",
                        }
                        : {}
                    }
                  >
                    <span className="text-[18px] flex-shrink-0 leading-none">
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <span className="text-[13px] font-semibold truncate">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div className="p-2.5 border-t border-white/5 flex-shrink-0">
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          title={collapsed ? "Logout" : undefined}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
        >
          <span className="text-[18px] flex-shrink-0">🚪</span>
          {!collapsed && (
            <span className="text-[13px] font-semibold">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
}