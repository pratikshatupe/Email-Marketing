import React, { useState } from "react";

export const SIDEBAR_ITEMS = [
  { id: "dashboard",       label: "Dashboard",       icon: "⊞",  group: null },
  { id: "marketplace",     label: "Marketplace (0)", icon: "🛒", group: null },
  { id: "agents",          label: "Agents",          icon: "👤", group: null },
  { id: "coupons",         label: "Coupons",         icon: "%",  group: null },
  { id: "contacts",        label: "Contacts",        icon: "#",  group: "Manage",       hasDropdown: true },
  { id: "groups",          label: "Groups",          icon: "👥", group: "Manage",       hasDropdown: true },
  { id: "email",           label: "Email",           icon: "✉️", group: "Campaigns",    hasDropdown: true },
  { id: "sms",             label: "SMS",             icon: "📱", group: "Campaigns",    hasDropdown: true },
  { id: "builder",         label: "Builder",         icon: "🔧", group: "Tools",        hasDropdown: true },
  { id: "themes",          label: "Themes",          icon: "🎨", group: "Tools",        hasDropdown: true },
  { id: "setup",           label: "Setup",           icon: "⚙️", group: "Settings",     hasDropdown: true },
  { id: "subscription",    label: "Subscription",    icon: "💳", group: "Settings",     hasDropdown: true },
  { id: "user-management", label: "User Management", icon: "👥", group: "Admin" },
  { id: "blogs",           label: "Blogs",           icon: "📝", group: "Admin" },
  { id: "pages",           label: "Pages",           icon: "📄", group: "Admin" },
  { id: "contact-us",      label: "Contact Us (0)",  icon: "📞", group: "Admin" },
  { id: "notes",           label: "Notes",           icon: "📒", group: "Admin" },
  { id: "payment-setup",   label: "Payment Setup",   icon: "💳", group: "Finance",      hasDropdown: true },
  { id: "third-parties",   label: "Third Parties",   icon: "🔗", group: "Finance",      hasDropdown: true },
  { id: "chat-gpt",        label: "Chat GPT",        icon: "🤖", group: "Integrations", hasDropdown: true },
  { id: "support-tickets", label: "Support Tickets", icon: "🎫", group: "Support" },
  { id: "upgrade",         label: "Upgrade",         icon: "⬆️", group: "Support" },
];

export default function AdminSidebar({ activePage, onNavigate, darkMode }) {
  const [openGroups, setOpenGroups] = useState({});

  const groups = [...new Set(SIDEBAR_ITEMS.map(i => i.group))];

  const toggleGroup = (g) =>
    setOpenGroups(prev => ({ ...prev, [g]: prev[g] === false ? true : false }));

  return (
    <aside
      className={`w-56 min-w-[224px] flex flex-col h-screen sticky top-0 overflow-hidden transition-colors duration-300
        ${darkMode ? "bg-[#0a0919]" : "bg-[#0d0c1d]"}`}
    >
      {/* ── Logo ── */}
      <div className="flex-shrink-0 flex items-center gap-3 px-5 py-4 border-b border-white/10">
        <div className="w-9 h-9 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-lg">
          M
        </div>
        <span
          className="text-lg font-extrabold text-white tracking-wide"
          style={{ fontFamily: "Georgia, serif" }}
        >
          MailDoll
        </span>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 py-2 overflow-hidden">
        {groups.map((group) => {
          const items = SIDEBAR_ITEMS.filter(i => i.group === group);
          const isOpen = openGroups[group] !== false;

          return (
            <div key={String(group)}>
              {/* Group label */}
              {group && (
                <button
                  onClick={() => toggleGroup(group)}
                  className="w-full flex items-center justify-between px-5 py-1.5 mt-2
                    text-[9px] font-bold uppercase tracking-widest
                    text-white/30 hover:text-white/50
                    bg-transparent border-none cursor-pointer transition-colors"
                >
                  <span>{group}</span>
                  <span className="text-[8px] opacity-60">{isOpen ? "▲" : "▼"}</span>
                </button>
              )}

              {/* Items */}
              {(isOpen || !group) && items.map(item => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    flex items-center justify-between w-full px-5 py-2.5 text-[13px]
                    border-none cursor-pointer transition-all duration-150
                    ${activePage === item.id
                      ? "bg-gradient-to-r from-indigo-500/25 to-indigo-500/10 text-indigo-300 border-l-[3px] border-indigo-500"
                      : "text-white/55 hover:bg-white/[0.05] hover:text-white/85 border-l-[3px] border-transparent"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-center text-sm">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.hasDropdown && (
                    <span className="text-[8px] opacity-40">▼</span>
                  )}
                </button>
              ))}
            </div>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="flex-shrink-0 px-4 py-3 border-t border-white/10">
        <select className="w-full bg-white/10 text-white/60 text-xs rounded-lg px-3 py-2 border border-white/15 outline-none cursor-pointer">
          <option>Select Language</option>
          <option>English</option>
          <option>Hindi</option>
          <option>Marathi</option>
        </select>
        <p className="text-[10px] text-white/20 text-center mt-2">
          Use profile menu to logout
        </p>
      </div>
    </aside>
  );
}