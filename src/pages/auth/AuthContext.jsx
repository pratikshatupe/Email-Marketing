import { createContext, useContext, useState, useEffect } from "react";

export const ROLE_PERMISSIONS_MAP = {
  SUPER_ADMIN: {
    label: "Super Admin",
    color: "#6366f1",
    permissions: {
      view_stats: true,
      view_charts: true,
      view_campaigns: true,
      view_limit_report: true,
      view_earnings: true,
      view_purchase: true,
      view_gateway: true,
      view_last_mails: true,
      view_last_sms: true,
      view_last_campaigns: true,
      sidebar_subscribers: true,
      sidebar_templates: true,
      sidebar_reports: true,
      sidebar_settings: true,
      sidebar_roles: true,
      can_edit_roles: true,
    },
  },

  BUSINESS_ADMIN: {
    label: "Business Admin",
    color: "#10b981",
    permissions: {
      view_stats: true,
      view_charts: true,
      view_campaigns: true,
      view_limit_report: true,
      view_earnings: true,
      view_purchase: true,
      view_gateway: true,
      view_last_mails: true,
      view_last_sms: true,
      view_last_campaigns: true,
      sidebar_subscribers: true,
      sidebar_templates: true,
      sidebar_reports: true,
      sidebar_settings: true,
      sidebar_roles: false,
      can_edit_roles: false,
    },
  },

  MARKETING_MANAGER: {
    label: "Marketing Manager",
    color: "#f59e0b",
    permissions: {
      view_stats: true,
      view_charts: true,
      view_campaigns: true,
      view_limit_report: true,
      view_earnings: false,
      view_purchase: false,
      view_gateway: false,
      view_last_mails: true,
      view_last_sms: true,
      view_last_campaigns: true,
      sidebar_subscribers: true,
      sidebar_templates: true,
      sidebar_reports: true,
      sidebar_settings: false,
      sidebar_roles: false,
      can_edit_roles: false,
    },
  },

  VIEWER: {
    label: "Viewer",
    color: "#ec4899",
    permissions: {
      view_stats: true,
      view_charts: false,
      view_campaigns: false,
      view_limit_report: false,
      view_earnings: false,
      view_purchase: false,
      view_gateway: false,
      view_last_mails: false,
      view_last_sms: false,
      view_last_campaigns: false,
      sidebar_subscribers: false,
      sidebar_templates: false,
      sidebar_reports: false,
      sidebar_settings: false,
      sidebar_roles: false,
      can_edit_roles: false,
    },
  },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔥 IMPORTANT: restore user on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function login(email, role) {
    const userData = { email, role };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  function hasPerm(key) {
    if (!user) return false;
    return ROLE_PERMISSIONS_MAP[user.role]?.permissions?.[key];
  }

  function getRoleInfo() {
    if (!user) return null;
    return ROLE_PERMISSIONS_MAP[user.role];
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPerm, getRoleInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}