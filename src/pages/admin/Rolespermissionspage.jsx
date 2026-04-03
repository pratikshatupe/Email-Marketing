
import React, { useState } from "react";

const ROLES = [
  { id: 1, name: "super_admin", label: "Super Admin", icon: "👑", color: "#7c3aed", bg: "#f5f3ff", light: "#ede9fe", desc: "Full system access. Cannot be modified.", locked: true, users: 1 },
  { id: 2, name: "business_admin", label: "Business Admin", icon: "🏢", color: "#059669", bg: "#ecfdf5", light: "#d1fae5", desc: "Manage users, billing, and all content.", locked: false, users: 2 },
  { id: 3, name: "marketing_manager", label: "Marketing Manager", icon: "📣", color: "#d97706", bg: "#fffbeb", light: "#fef3c7", desc: "Create and manage campaigns and contacts.", locked: false, users: 3 },
  { id: 4, name: "viewer", label: "Viewer", icon: "👁️", color: "#0284c7", bg: "#f0f9ff", light: "#e0f2fe", desc: "Read-only access to assigned modules.", locked: false, users: 5 },
];

const MODULES = [
  { key: "dashboard", label: "Dashboard", icon: "📊", group: "Overview", desc: "Stats, charts, KPIs" },
  { key: "campaigns", label: "Campaigns", icon: "📧", group: "Marketing", desc: "Email & WhatsApp campaigns" },
  { key: "templates", label: "Templates", icon: "📄", group: "Marketing", desc: "Email & WhatsApp templates" },
  { key: "contacts", label: "Contacts", icon: "👥", group: "Audience", desc: "Contact list management" },
  { key: "segments", label: "Segments", icon: "🎯", group: "Audience", desc: "Audience segmentation" },
  { key: "automations", label: "Automations", icon: "⚡", group: "Marketing", desc: "Workflow automations" },
  { key: "analytics", label: "Analytics", icon: "📈", group: "Reports", desc: "Reports & performance data" },
  { key: "users", label: "Users", icon: "👤", group: "Admin", desc: "User management" },
  { key: "roles", label: "Roles", icon: "🔐", group: "Admin", desc: "Roles & permissions" },
  { key: "settings", label: "Settings", icon: "⚙️", group: "Admin", desc: "System configuration" },
  { key: "subscription", label: "Subscription", icon: "💳", group: "Admin", desc: "Plans & billing" },
];

const PERM_COLS = [
  { key: "can_view", label: "View", short: "V", color: "#0284c7", light: "#e0f2fe" },
  { key: "can_create", label: "Create", short: "C", color: "#059669", light: "#d1fae5" },
  { key: "can_edit", label: "Edit", short: "E", color: "#d97706", light: "#fef3c7" },
  { key: "can_delete", label: "Delete", short: "D", color: "#dc2626", light: "#fee2e2" },
];

const GROUPS = [...new Set(MODULES.map(m => m.group))];

function buildDefaults() {
  const defs = {};
  ROLES.forEach(role => {
    defs[role.name] = {};
    MODULES.forEach(m => {
      const isSA = role.name === "super_admin";
      const isBA = role.name === "business_admin";
      const isMM = role.name === "marketing_manager";
      const adminOnly = ["users", "roles", "settings", "subscription"].includes(m.key);
      const mmModules = ["dashboard", "campaigns", "templates", "contacts", "segments", "automations", "analytics"];
      defs[role.name][m.key] = {
        can_view: true,
        can_create: isSA || isBA || (isMM && mmModules.includes(m.key)),
        can_edit: isSA || isBA || (isMM && mmModules.includes(m.key)),
        can_delete: isSA || (isBA && !adminOnly),
      };
    });
  });
  return defs;
}

function Toggle({ value, onChange, disabled, color = "#7c3aed" }) {
  return (
    <button type="button" onClick={() => !disabled && onChange(!value)} disabled={disabled}
      title={disabled ? "Locked" : value ? "Click to disable" : "Click to enable"}
      style={{
        width: 40, height: 22, borderRadius: 11, border: "none", cursor: disabled ? "not-allowed" : "pointer",
        background: value ? color : "#e2e8f0", opacity: disabled ? .5 : 1,
        position: "relative", transition: "background .2s", flexShrink: 0, display: "flex", alignItems: "center",
      }}>
      <span style={{
        position: "absolute", left: value ? "calc(100% - 18px)" : 2,
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,.2)", transition: "left .2s",
      }} />
    </button>
  );
}

export default function RolesPermissionsPage({ currentUser }) {
  const me = currentUser || { role: "super_admin" };
  const isSA = me?.role === "super_admin" || me?.role === "SUPER_ADMIN";

  const [perms, setPerms] = useState(buildDefaults);
  const [active, setActive] = useState(ROLES[0]);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [view, setView] = useState("editor");

  const isLocked = active.locked || !isSA;

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function toggle(mod, permKey, val) {
    if (isLocked) return;
    setPerms(p => ({ ...p, [active.name]: { ...p[active.name], [mod]: { ...p[active.name][mod], [permKey]: val } } }));
    setDirty(true);
  }

  function toggleRow(mod) {
    if (isLocked) return;
    const all = PERM_COLS.every(c => perms[active.name][mod]?.[c.key]);
    const upd = {};
    PERM_COLS.forEach(c => { upd[c.key] = !all; });
    setPerms(p => ({ ...p, [active.name]: { ...p[active.name], [mod]: upd } }));
    setDirty(true);
  }

  function toggleCol(permKey) {
    if (isLocked) return;
    const all = MODULES.every(m => perms[active.name][m.key]?.[permKey]);
    const upd = { ...perms[active.name] };
    MODULES.forEach(m => { upd[m.key] = { ...upd[m.key], [permKey]: !all }; });
    setPerms(p => ({ ...p, [active.name]: upd }));
    setDirty(true);
  }

  function resetRole() {
    const fresh = buildDefaults();
    setPerms(p => ({ ...p, [active.name]: fresh[active.name] }));
    setDirty(true);
  }

  function handleSave() {
    if (!dirty) return;
    setSaving(true);
    setTimeout(() => { setSaving(false); setDirty(false); showToast(`${active.label} permissions saved!`); }, 700);
  }

  const accessCount = (roleName) => MODULES.filter(m => perms[roleName]?.[m.key]?.can_view).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800;900&display=swap');
        @keyframes fadeIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        .rp-root * { box-sizing:border-box; font-family:'DM Sans',sans-serif; }
        .rp-role-btn:hover { border-color:#a78bfa!important; }
        .rp-mod-row:hover { background:#fafbff; }
        .rp-col-hd:hover { opacity:.7; }
        .rp-save:hover { opacity:.9; }
        .rp-view-tab:hover { color:#7c3aed; }
        .rp-reset:hover { background:#f8fafc; border-color:#94a3b8!important; }
        .matrix-row:hover { background:#fafbff; }

        /* ── RESPONSIVE ── */
        /* On desktop: show side-by-side layout; on mobile: stack vertically */
        @media (max-width: 767px) {
          .rp-editor-layout { display: flex !important; flex-direction: column !important; }
          .rp-role-sidebar { display: flex !important; flex-direction: row !important; overflow-x: auto !important; gap: 8px !important; padding-bottom: 4px; width: 100% !important; }
          .rp-role-sidebar::-webkit-scrollbar { height: 4px; }
          .rp-role-sidebar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
          .rp-role-sidebar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
          .rp-role-btn-item { min-width: 140px !important; flex-shrink: 0; }
          .rp-perms-panel { width: 100% !important; }
          .rp-perm-table-wrapper { display: none !important; }
          .rp-perm-mobile-cards { display: flex !important; }
          .rp-matrix-wrap { overflow-x: auto; }
        }
        @media (min-width: 768px) {
          .rp-editor-layout { display: grid !important; grid-template-columns: 240px 1fr !important; }
          .rp-role-sidebar { display: flex !important; flex-direction: column !important; gap: 8px !important; }
          .rp-role-btn-item { min-width: unset !important; }
          .rp-perm-table-wrapper { display: block !important; }
          .rp-perm-mobile-cards { display: none !important; }
        }

        /* Permission module cards for mobile */
        .perm-module-card {
          background: #fff;
          border-radius: 14px;
          border: 1px solid #f1f5f9;
          padding: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
      `}</style>

      <div className="rp-root" style={{ minHeight: "100vh", background: "linear-gradient(135deg,#fafafe 0%,#f0f4ff 100%)", padding: "24px 20px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: "#0f172a", letterSpacing: -.5 }}>Roles & Permissions</h1>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94a3b8" }}>Control what each role can access across your platform</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 12, padding: 4, gap: 2 }}>
                {[["editor", "Editor ✏️"], ["matrix", "Matrix 📋"]].map(([v, l]) => (
                  <button key={v} onClick={() => setView(v)} className="rp-view-tab" style={{
                    padding: "6px 14px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700,
                    background: view === v ? "#fff" : "transparent",
                    color: view === v ? "#7c3aed" : "#94a3b8",
                    boxShadow: view === v ? "0 1px 4px rgba(0,0,0,.1)" : "none",
                    transition: "all .15s"
                  }}>{l}</button>
                ))}
              </div>
              {isSA && dirty && (
                <button onClick={handleSave} disabled={saving} className="rp-save" style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 12, border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg,#7c3aed,#6d28d9)", color: "#fff",
                  fontSize: 13, fontWeight: 700, boxShadow: "0 4px 14px rgba(124,58,237,.4)",
                  opacity: saving ? .7 : 1, transition: "opacity .15s"
                }}>
                  💾 {saving ? "Saving…" : "Save Changes"}
                </button>
              )}
            </div>
          </div>

          {!isSA && (
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 18 }}>🔒</span>
              <p style={{ margin: 0, fontSize: 13, color: "#92400e", fontWeight: 600 }}>Only <strong>Super Admin</strong> can edit role permissions. You have read-only access.</p>
            </div>
          )}

          {view === "editor" && (
            <div className="rp-editor-layout" style={{ gap: 16, alignItems: "start" }}>

              <div className="rp-role-sidebar">
                {ROLES.map(role => {
                  const isAct = active.id === role.id;
                  const cnt = accessCount(role.name);
                  return (
                    <div key={role.id} className="rp-role-btn-item" style={{ flexShrink: 0 }}>
                      <button onClick={() => { setActive(role); setDirty(false); }}
                        className="rp-role-btn"
                        style={{
                          display: "block", width: "100%", textAlign: "left",
                          padding: "14px 16px", borderRadius: 14, cursor: "pointer",
                          border: `2px solid ${isAct ? role.color : "#e2e8f0"}`,
                          background: isAct ? role.bg : "#fff",
                          transition: "all .18s",
                          boxShadow: isAct ? `0 4px 14px ${role.color}22` : "none"
                        }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 18 }}>{role.icon}</span>
                          {role.locked && <span style={{ fontSize: 9, background: "#f1f5f9", color: "#64748b", padding: "2px 6px", borderRadius: 8, fontWeight: 800, letterSpacing: .5 }}>LOCKED</span>}
                        </div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#0f172a" }}>{role.label}</p>
                        <p style={{ margin: "2px 0 8px", fontSize: 11, color: "#94a3b8" }}>{role.users} users</p>
                        <div style={{ background: "#f1f5f9", borderRadius: 10, height: 5, overflow: "hidden" }}>
                          <div style={{ height: "100%", borderRadius: 10, background: role.color, width: `${(cnt / MODULES.length) * 100}%`, transition: "width .3s" }} />
                        </div>
                        <p style={{ margin: "4px 0 0", fontSize: 10, color: role.color, fontWeight: 700 }}>{cnt}/{MODULES.length} modules</p>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="rp-perms-panel">
                <div style={{
                  background: "#fff", borderRadius: 16, padding: "18px 20px", marginBottom: 14,
                  display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10,
                  border: `1px solid ${active.color}22`, boxShadow: `0 2px 12px ${active.color}10`
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 14, background: active.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: `1px solid ${active.color}22` }}>
                      {active.icon}
                    </div>
                    <div>
                      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0f172a" }}>{active.label}</h2>
                      <p style={{ margin: "2px 0 0", fontSize: 12, color: "#94a3b8" }}>{active.desc}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {dirty && <span style={{ fontSize: 11, color: "#d97706", fontWeight: 700, background: "#fffbeb", padding: "4px 10px", borderRadius: 8, border: "1px solid #fde68a" }}>● Unsaved changes</span>}
                    {!isLocked && (
                      <button onClick={resetRole} className="rp-reset" style={{ padding: "6px 14px", borderRadius: 9, border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all .15s" }}>↺ Reset</button>
                    )}
                    {isLocked && (
                      <span style={{ fontSize: 11, background: "#f1f5f9", color: "#64748b", padding: "6px 12px", borderRadius: 9, fontWeight: 700 }}>
                        {active.locked ? "🔒 Full Access – Locked" : "🔒 Read Only"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="rp-perm-table-wrapper" style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #f1f5f9", boxShadow: "0 2px 12px rgba(0,0,0,.05)" }}>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                      <thead>
                        <tr style={{ background: "#fafbff", borderBottom: "2px solid #f1f5f9" }}>
                          <th style={{ padding: "12px 20px", textAlign: "left", fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: .8, width: 240 }}>Module</th>
                          {PERM_COLS.map(c => (
                            <th key={c.key} style={{ padding: "12px 14px", textAlign: "center" }}>
                              <button onClick={() => toggleCol(c.key)} disabled={isLocked} className="rp-col-hd" style={{
                                background: `${c.color}10`, border: "none", cursor: isLocked ? "default" : "pointer",
                                fontSize: 11, fontWeight: 800, color: c.color, textTransform: "uppercase", letterSpacing: .6,
                                padding: "4px 10px", borderRadius: 8, transition: "opacity .15s"
                              }}>{c.label}</button>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {GROUPS.map(group => {
                          const groupMods = MODULES.filter(m => m.group === group);
                          return (
                            <React.Fragment key={group}>
                              <tr style={{ background: "#f8fafc" }}>
                                <td colSpan={5} style={{ padding: "8px 20px", fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>{group}</td>
                              </tr>
                              {groupMods.map(m => {
                                const rp = perms[active.name]?.[m.key] || {};
                                return (
                                  <tr key={m.key} className="rp-mod-row" style={{ borderBottom: "1px solid #f8fafc", transition: "background .12s" }}>
                                    <td style={{ padding: "12px 20px" }}>
                                      <button onClick={() => toggleRow(m.key)} disabled={isLocked} style={{
                                        display: "flex", alignItems: "center", gap: 10,
                                        background: "none", border: "none", cursor: isLocked ? "default" : "pointer", padding: 0, textAlign: "left"
                                      }}>
                                        <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>{m.icon}</span>
                                        <div>
                                          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{m.label}</p>
                                          <p style={{ margin: 0, fontSize: 10, color: "#94a3b8" }}>{m.desc}</p>
                                        </div>
                                      </button>
                                    </td>
                                    {PERM_COLS.map(c => (
                                      <td key={c.key} style={{ padding: "12px 14px", textAlign: "center" }}>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                          <Toggle value={!!rp[c.key]} onChange={val => toggle(m.key, c.key, val)} disabled={isLocked} color={c.color} />
                                        </div>
                                      </td>
                                    ))}
                                  </tr>
                                );
                              })}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", background: "#fafbff", borderTop: "1px solid #f1f5f9", flexWrap: "wrap", gap: 8 }}>
                    <p style={{ margin: 0, fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>
                      {accessCount(active.name)} of {MODULES.length} modules accessible for {active.label}
                    </p>
                    <div style={{ display: "flex", gap: 12 }}>
                      {PERM_COLS.map(c => {
                        const cnt = MODULES.filter(m => perms[active.name]?.[m.key]?.[c.key]).length;
                        return <span key={c.key} style={{ fontSize: 10, color: c.color, fontWeight: 700 }}>{c.label}: {cnt}/{MODULES.length}</span>;
                      })}
                    </div>
                  </div>
                </div>

                <div className="rp-perm-mobile-cards" style={{ flexDirection: "column", gap: 8 }}>
                  {GROUPS.map(group => {
                    const groupMods = MODULES.filter(m => m.group === group);
                    return (
                      <div key={group}>
                        <p style={{ margin: "0 0 8px 4px", fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>{group}</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 8 }}>
                          {groupMods.map(m => {
                            const rp = perms[active.name]?.[m.key] || {};
                            return (
                              <div key={m.key} className="perm-module-card">
                                {/* Module header */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 18 }}>{m.icon}</span>
                                    <div>
                                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{m.label}</p>
                                      <p style={{ margin: 0, fontSize: 10, color: "#94a3b8" }}>{m.desc}</p>
                                    </div>
                                  </div>
                                  {!isLocked && (
                                    <button onClick={() => toggleRow(m.key)} style={{
                                      fontSize: 10, padding: "4px 10px", borderRadius: 8, border: `1px solid ${active.color}33`,
                                      background: active.bg, color: active.color, fontWeight: 700, cursor: "pointer"
                                    }}>Toggle All</button>
                                  )}
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                  {PERM_COLS.map(c => (
                                    <div key={c.key} style={{
                                      display: "flex", alignItems: "center", justifyContent: "space-between",
                                      padding: "8px 10px", borderRadius: 10,
                                      background: rp[c.key] ? c.light : "#f8fafc",
                                      border: `1px solid ${rp[c.key] ? c.color + "33" : "#e2e8f0"}`
                                    }}>
                                      <span style={{ fontSize: 11, fontWeight: 700, color: rp[c.key] ? c.color : "#94a3b8" }}>{c.label}</span>
                                      <Toggle value={!!rp[c.key]} onChange={val => toggle(m.key, c.key, val)} disabled={isLocked} color={c.color} />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {view === "matrix" && (
            <div className="rp-matrix-wrap">
              <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #f1f5f9", boxShadow: "0 2px 12px rgba(0,0,0,.05)" }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                    <thead>
                      <tr style={{ background: "#fafbff", borderBottom: "2px solid #f1f5f9" }}>
                        <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: .8, width: 180 }}>Module</th>
                        {ROLES.map(r => (
                          <th key={r.id} colSpan={4} style={{ padding: "12px 8px", textAlign: "center", borderLeft: "2px solid #f1f5f9" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                              <span style={{ fontSize: 16 }}>{r.icon}</span>
                              <span style={{ fontSize: 11, fontWeight: 800, color: r.color }}>{r.label}</span>
                              <span style={{ fontSize: 9, color: "#94a3b8", fontWeight: 600 }}>{accessCount(r.name)}/{MODULES.length}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                      <tr style={{ background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                        <th style={{ padding: "8px 20px" }} />
                        {ROLES.map(r =>
                          PERM_COLS.map(c => (
                            <th key={`${r.id}-${c.key}`} style={{ padding: "6px 4px", textAlign: "center", fontSize: 9, fontWeight: 800, color: c.color, textTransform: "uppercase", letterSpacing: .5 }}>{c.short}</th>
                          ))
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {GROUPS.map(group => {
                        const groupMods = MODULES.filter(m => m.group === group);
                        return (
                          <React.Fragment key={group}>
                            <tr style={{ background: "#f8fafc" }}>
                              <td colSpan={1 + ROLES.length * 4} style={{ padding: "7px 20px", fontSize: 9, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>{group}</td>
                            </tr>
                            {groupMods.map(m => (
                              <tr key={m.key} className="matrix-row" style={{ borderBottom: "1px solid #f8fafc", transition: "background .12s" }}>
                                <td style={{ padding: "10px 20px" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 14 }}>{m.icon}</span>
                                    <div>
                                      <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{m.label}</p>
                                      <p style={{ margin: 0, fontSize: 9, color: "#94a3b8" }}>{m.desc}</p>
                                    </div>
                                  </div>
                                </td>
                                {ROLES.map(r =>
                                  PERM_COLS.map(c => {
                                    const on = !!perms[r.name]?.[m.key]?.[c.key];
                                    const locked = r.locked || !isSA;
                                    return (
                                      <td key={`${r.id}-${c.key}`} style={{ padding: "8px 4px", textAlign: "center", borderLeft: c.key === "can_view" ? "2px solid #f1f5f9" : "none" }}>
                                        {locked
                                          ? <span style={{ color: on ? c.color : "#e2e8f0", fontSize: 16, fontWeight: 900 }}>{on ? "✓" : "–"}</span>
                                          : <Toggle value={on} onChange={val => { setActive(r); toggle(m.key, c.key, val); }} disabled={false} color={c.color} />
                                        }
                                      </td>
                                    );
                                  })
                                )}
                              </tr>
                            ))}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 2000,
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 18px", borderRadius: 14,
          background: toast.type === "success" ? "#059669" : "#dc2626",
          color: "#fff", fontSize: 13, fontWeight: 700,
          boxShadow: "0 8px 24px rgba(0,0,0,.2)", animation: "fadeIn .25s ease"
        }}>
          <span>{toast.type === "success" ? "✓" : "✕"}</span>
          {toast.msg}
        </div>
      )}
    </>
  );
}