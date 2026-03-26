import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { ROLE_PERMISSIONS_MAP } from "../auth/AuthContext";

// ─── Permission Groups ─────────────────────────
const PERMISSION_GROUPS = [
  {
    group: "Dashboard",
    icon: "📊",
    permissions: [
      { key: "view_stats", label: "View Stats Cards" },
      { key: "view_charts", label: "View Charts & Graphs" },
      { key: "view_earnings", label: "View Revenue & Earnings" },

      // 👉 NEW permission add example
      { key: "view_notifications", label: "View Notifications" },
    ],
  },
];

// ─── Roles ─────────────────────────
const ROLES = ["SUPER_ADMIN", "BUSINESS_ADMIN", "MARKETING_MANAGER", "VIEWER"];

// ─── Toggle ─────────────────────────
function PermToggle({ value, onChange, disabled }) {
  return (
    <button
      onClick={() => !disabled && onChange(!value)}
      className="w-10 h-5 rounded-full"
      style={{ background: value ? "green" : "gray" }}
    />
  );
}

// ════════════════════════════════════════
export default function RolePermissions() {
  const { hasPerm } = useAuth();
  const canEdit = hasPerm("can_edit_roles");

  // 👉 Collect ALL permission keys dynamically
  const ALL_PERMISSIONS = PERMISSION_GROUPS.flatMap(g =>
    g.permissions.map(p => p.key)
  );

  // ─── INIT + AUTO SYNC ─────────────────
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    const newPerms = {};

    ROLES.forEach(role => {
      newPerms[role] = {};

      ALL_PERMISSIONS.forEach(key => {
        // existing value or default false
        newPerms[role][key] =
          ROLE_PERMISSIONS_MAP[role]?.permissions?.[key] ?? false;
      });
    });

    setPermissions(newPerms);
  }, []);

  // ─── Toggle ─────────────────────────
  function togglePerm(role, key) {
    if (!canEdit || role === "SUPER_ADMIN") return;

    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [key]: !prev[role][key],
      },
    }));
  }

  // ─── UI ─────────────────────────
  return (
    <div className="p-5 space-y-5">
      <h1 className="text-xl font-bold">Roles & Permissions</h1>

      {PERMISSION_GROUPS.map(group => (
        <div key={group.group} className="border p-3 rounded">
          <h2 className="font-semibold mb-2">
            {group.icon} {group.group}
          </h2>

          {group.permissions.map(p => (
            <div key={p.key} className="flex justify-between mb-2">
              <span>{p.label}</span>

              <div className="flex gap-4">
                {ROLES.map(role => (
                  <PermToggle
                    key={role}
                    value={permissions[role]?.[p.key] || false}
                    onChange={() => togglePerm(role, p.key)}
                    disabled={role === "SUPER_ADMIN"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}