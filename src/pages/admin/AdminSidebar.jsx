import React, { useState } from "react";
import {
  X,
  ChevronDown,
  LayoutDashboard,
  Users,
  Megaphone,
  CreditCard,
  Receipt,
  Mail,
  BarChart2,
  Settings,
  ScrollText,
  UserCircle,
} from "lucide-react";

import { useLanguage } from "../admin/Languagecontext";
import { useAuth } from "../auth/AuthContext";

// ─────────────────────────────────────────────
// MENU CONFIG WITH PERMISSIONS
// ─────────────────────────────────────────────
const MENU = [
  {
    group: "group_main",
    items: [
      {
        id: "dashboard",
        labelKey: "dashboard",
        icon: LayoutDashboard,
        perm: "view_stats",
      },
    ],
  },
  {
    group: "group_management",
    items: [
      {
        id: "user_management",
        labelKey: "user_management",
        icon: Users,
        perm: "sidebar_subscribers",
      },
      {
        id: "campaigns",
        labelKey: "campaigns",
        icon: Megaphone,
        perm: "view_campaigns",
      },
      {
        id: "subscription_plans",
        labelKey: "subscription_plans",
        icon: CreditCard,
        perm: "view_purchase",
      },
    ],
  },
  {
    group: "group_finance",
    items: [
      {
        id: "billing_payments",
        labelKey: "billing_payments",
        icon: Receipt,
        perm: "view_purchase",
      },
    ],
  },
  {
    group: "group_config",
    items: [
      {
        id: "email_config",
        labelKey: "email_config",
        icon: Mail,
        perm: "view_gateway",
      },
    ],
  },
  {
    group: "group_analytics",
    items: [
      {
        id: "global_analytics",
        labelKey: "global_analytics",
        icon: BarChart2,
        perm: "view_charts",
      },
    ],
  },
  {
    group: "group_system",
    items: [
      {
        id: "system_settings",
        labelKey: "system_settings",
        icon: Settings,
        perm: "sidebar_settings",
      },
      {
        id: "audit_logs",
        labelKey: "audit_logs",
        icon: ScrollText,
        perm: "can_edit_roles",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function AdminSidebar({
  active,
  setActive,
  collapsed,
  onCloseMobile,
}) {
  const { t } = useLanguage();
  const { hasPerm, user } = useAuth();

  const [open, setOpen] = useState(
    Object.fromEntries(MENU.map((g) => [g.group, true]))
  );

  function toggleGroup(g) {
    if (!collapsed) {
      setOpen((prev) => ({ ...prev, [g]: !prev[g] }));
    }
  }

  // ─────────────────────────────────────────────
  // PERMISSION FILTER FUNCTION
  // ─────────────────────────────────────────────
  function hasAccess(item) {
    // SUPER ADMIN → full access
    if (user?.role === "SUPER_ADMIN") return true;

    // if no permission required → show
    if (!item.perm) return true;

    return hasPerm(item.perm);
  }

  return (
    <div
      className={`h-screen bg-[#0d0c1d] text-white flex flex-col transition-all duration-300
      ${collapsed ? "w-[68px]" : "w-56"}`}
    >
      {/* ─── Logo ───────────────────────── */}
      <div
        className={`flex items-center border-b border-white/10 px-4 py-4
        ${collapsed ? "justify-center" : "justify-between"}`}
      >
        {collapsed ? (
          <span className="text-base font-bold text-indigo-400">M</span>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-sm">
                ✉️
              </div>
              <span className="font-bold text-sm">Mail Admin</span>
            </div>
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1 rounded-lg hover:bg-white/10 text-white/40"
            >
              <X size={16} />
            </button>
          </>
        )}
      </div>

      {/* ─── Menu ───────────────────────── */}
      <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
        {MENU.map(({ group, items }) => {
          const filteredItems = items.filter((item) => hasAccess(item));

          // hide group if empty
          if (filteredItems.length === 0) return null;

          const isOpen = open[group] !== false;

          return (
            <div key={group}>
              {/* Group Header */}
              {!collapsed ? (
                <button
                  onClick={() => toggleGroup(group)}
                  className="w-full flex justify-between items-center px-4 pt-3 pb-1
                  text-[10px] text-white/25 uppercase tracking-widest hover:text-white/45"
                >
                  <span>{t(group)}</span>
                  <ChevronDown
                    size={11}
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <div className="mx-3 my-1.5 border-t border-white/8" />
              )}

              {/* Items */}
              {(isOpen || collapsed) &&
                filteredItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActive(item.id)}
                      title={collapsed ? t(item.labelKey) : undefined}
                      className={`flex items-center w-full transition-all duration-150
                      ${collapsed ? "justify-center py-3" : "gap-3 px-4 py-2.5"}
                      ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "text-white/45 hover:bg-white/6 hover:text-white/75"
                      }`}
                    >
                      <Icon size={collapsed ? 18 : 15} />
                      {!collapsed && (
                        <span className="truncate text-[13px] font-medium">
                          {t(item.labelKey)}
                        </span>
                      )}
                    </button>
                  );
                })}
            </div>
          );
        })}
      </div>

      {/* ─── User Footer ───────────────────────── */}
      <div
        className={`border-t border-white/10 ${
          collapsed ? "py-3 flex justify-center" : "px-3 py-3"
        }`}
      >
        {collapsed ? (
          <button
            onClick={() => setActive("profile")}
            className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold"
          >
            A
          </button>
        ) : (
          <button
            onClick={() => setActive("profile")}
            className="flex items-center gap-2.5 w-full p-2 rounded-xl hover:bg-white/6"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
            <div className="flex-1 text-left">
              <div className="text-[12px] font-semibold text-white/70">
                {user?.email || "Admin"}
              </div>
              <div className="text-[10px] text-white/28">
                {user?.role || "Role"}
              </div>
            </div>
            <UserCircle size={13} className="text-white/20" />
          </button>
        )}
      </div>
    </div>
  );
}