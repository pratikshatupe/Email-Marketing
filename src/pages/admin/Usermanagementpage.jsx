
import React, { useState, useEffect } from "react";

const DEMO_USERS = [
  { id: 1, name: "Arjun Sharma", email: "arjun@company.com", role: "super_admin", is_active: 1, created_at: "2024-01-15", role_id: 1 },
  { id: 2, name: "Priya Patil", email: "priya@company.com", role: "business_admin", is_active: 1, created_at: "2024-02-20", role_id: 2 },
  { id: 3, name: "Rohit Desai", email: "rohit@company.com", role: "marketing_manager", is_active: 1, created_at: "2024-03-10", role_id: 3 },
  { id: 4, name: "Sneha Joshi", email: "sneha@company.com", role: "marketing_manager", is_active: 0, created_at: "2024-04-05", role_id: 3 },
  { id: 5, name: "Vikram Nair", email: "vikram@company.com", role: "viewer", is_active: 1, created_at: "2024-05-18", role_id: 4 },
  { id: 6, name: "Meera Kulkarni", email: "meera@company.com", role: "viewer", is_active: 1, created_at: "2024-06-22", role_id: 4 },
  { id: 7, name: "Aditya Rao", email: "aditya@company.com", role: "business_admin", is_active: 1, created_at: "2024-07-01", role_id: 2 },
  { id: 8, name: "Kavita Singh", email: "kavita@company.com", role: "viewer", is_active: 0, created_at: "2024-08-14", role_id: 4 },
];

const ROLES_LIST = [
  { id: 1, name: "super_admin", label: "Super Admin" },
  { id: 2, name: "business_admin", label: "Business Admin" },
  { id: 3, name: "marketing_manager", label: "Marketing Manager" },
  { id: 4, name: "viewer", label: "Viewer" },
];

const ROLE_META = {
  super_admin: { label: "Super Admin", color: "#7c3aed", bg: "#f5f3ff" },
  business_admin: { label: "Business Admin", color: "#059669", bg: "#ecfdf5" },
  marketing_manager: { label: "Marketing Manager", color: "#d97706", bg: "#fffbeb" },
  viewer: { label: "Viewer", color: "#0284c7", bg: "#f0f9ff" },
};

const AVATAR_GRADIENTS = [
  ["#7c3aed", "#a855f7"], ["#059669", "#10b981"], ["#d97706", "#f59e0b"],
  ["#0284c7", "#38bdf8"], ["#db2777", "#f43f5e"], ["#7c3aed", "#3b82f6"],
];

function Avatar({ name, size = 36 }) {
  const idx = (name?.charCodeAt(0) || 0) % AVATAR_GRADIENTS.length;
  const [a, b] = AVATAR_GRADIENTS[idx];
  const initials = (name || "?").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div style={{
      width: size, height: size, borderRadius: Math.floor(size / 3),
      background: `linear-gradient(135deg,${a},${b})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: size * 0.36, flexShrink: 0,
      boxShadow: "0 2px 8px rgba(0,0,0,.15)"
    }}>{initials}</div>
  );
}

function RolePill({ role }) {
  const m = ROLE_META[role] || { label: role, color: "#64748b", bg: "#f8fafc" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 20,
      background: m.bg, color: m.color,
      fontSize: 11, fontWeight: 700, letterSpacing: .3,
      border: `1px solid ${m.color}22`
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.color }} />
      {m.label}
    </span>
  );
}

function StatusPill({ active }) {
  return active
    ? <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, background: "#dcfce7", color: "#15803d", fontSize: 11, fontWeight: 700, border: "1px solid #bbf7d0" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />Active
    </span>
    : <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, background: "#fee2e2", color: "#dc2626", fontSize: 11, fontWeight: 700, border: "1px solid #fecaca" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f87171" }} />Inactive
    </span>;
}

function Modal({ title, onClose, children, width = 480 }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(2,6,23,.5)", backdropFilter: "blur(6px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "#fff", borderRadius: 20, boxShadow: "0 24px 80px rgba(0,0,0,.2)",
        width: "100%", maxWidth: width, overflow: "hidden", maxHeight: "90vh", overflowY: "auto"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 16px", borderBottom: "1px solid #f1f5f9" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#0f172a" }}>{title}</h3>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 10, border: "none", background: "#f8fafc", cursor: "pointer", color: "#94a3b8", fontSize: 16 }}>✕</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

const iStyle = {
  width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0",
  background: "#f8fafc", fontSize: 13, outline: "none", boxSizing: "border-box", color: "#0f172a"
};
const lStyle = { display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 6, letterSpacing: .5, textTransform: "uppercase" };

export default function UserManagementPage() {
  const me = { id: 1, role: "super_admin", name: "Arjun Sharma" };
  const isSA = me?.role === "super_admin";
  const canEdit = isSA || me?.role === "business_admin";

  const [users, setUsers] = useState(DEMO_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFil] = useState("all");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", role_id: 4, is_active: 1 });

  const PER_PAGE = 6;

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  }

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      && (roleFilter === "all" || u.role === roleFilter)
      && (statusFilter === "all" || (statusFilter === "active" ? u.is_active : !u.is_active));
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageUsers = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  useEffect(() => setPage(1), [search, roleFilter, statusFilter]);

  function openCreate() { setForm({ name: "", email: "", password: "", role_id: 4, is_active: 1 }); setModal("create"); }
  function openEdit(u) { setSelected(u); setForm({ name: u.name, email: u.email, password: "", role_id: u.role_id || 4, is_active: u.is_active }); setModal("edit"); }
  function openDelete(u) { setSelected(u); setModal("delete"); }

  function handleCreate(e) {
    e.preventDefault(); setSaving(true);
    setTimeout(() => {
      const roleName = ROLES_LIST.find(r => r.id == form.role_id)?.name || "viewer";
      setUsers(p => [{ id: Date.now(), name: form.name, email: form.email, role: roleName, role_id: Number(form.role_id), is_active: form.is_active, created_at: new Date().toISOString() }, ...p]);
      setSaving(false); setModal(null);
      showToast(`${form.name} added successfully!`);
    }, 600);
  }

  function handleUpdate(e) {
    e.preventDefault(); setSaving(true);
    setTimeout(() => {
      const roleName = ROLES_LIST.find(r => r.id == form.role_id)?.name || selected.role;
      setUsers(p => p.map(u => u.id === selected.id ? { ...u, name: form.name, role: roleName, role_id: Number(form.role_id), is_active: form.is_active } : u));
      setSaving(false); setModal(null);
      showToast("User updated successfully!");
    }, 600);
  }

  function handleDelete() {
    setSaving(true);
    setTimeout(() => {
      setUsers(p => p.filter(u => u.id !== selected.id));
      setSaving(false); setModal(null);
      showToast(`${selected.name} removed.`, "error");
    }, 500);
  }

  const stats = [
    { label: "Total Users", value: users.length, color: "#7c3aed", icon: "👥" },
    { label: "Active", value: users.filter(u => u.is_active).length, color: "#059669", icon: "✅" },
    { label: "Inactive", value: users.filter(u => !u.is_active).length, color: "#dc2626", icon: "⛔" },
    { label: "Admins", value: users.filter(u => u.role.includes("admin")).length, color: "#d97706", icon: "🛡️" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#fafafe,#f0f4ff)", padding: "24px 20px" }}>
      <style>{`
        .um-row:hover{background:#fafbff}
        .um-card{transition:transform .2s,box-shadow .2s}
        .um-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.09)}
        @media (max-width: 767px) {
          .um-table-wrapper { display: none !important; }
          .um-mobile-cards { display: flex !important; }
        }
        @media (min-width: 768px) {
          .um-table-wrapper { display: block !important; }
          .um-mobile-cards { display: none !important; }
        }
        .user-mobile-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          padding: 16px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .user-mobile-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.10); transform: translateY(-1px); }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: "#0f172a", letterSpacing: -.5 }}>User Management</h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94a3b8" }}>{users.length} users · {ROLES_LIST.length} roles</p>
          </div>
          {canEdit && (
            <button onClick={openCreate} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg,#7c3aed,#6d28d9)", color: "#fff", fontSize: 13, fontWeight: 700,
              boxShadow: "0 4px 14px rgba(124,58,237,.4)"
            }}>
              <span style={{ fontSize: 16 }}>＋</span> Add User
            </button>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginBottom: 24 }}>
          {stats.map(s => (
            <div key={s.label} className="um-card" style={{ background: "#fff", borderRadius: 16, padding: "18px 20px", border: `1px solid ${s.color}18`, boxShadow: "0 2px 8px rgba(0,0,0,.05)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: s.color, background: `${s.color}12`, padding: "2px 8px", borderRadius: 20 }}>STAT</span>
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 20, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,.05)", border: "1px solid #f1f5f9" }}>
          <div style={{ position: "relative", flex: "1 1 220px", minWidth: 0 }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#94a3b8" }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email…" style={{ ...iStyle, paddingLeft: 36 }} />
          </div>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ ...iStyle, width: "auto", minWidth: 150, cursor: "pointer" }}>
            <option value="all">All Roles</option>
            {ROLES_LIST.map(r => <option key={r.id} value={r.name}>{r.label}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFil(e.target.value)} style={{ ...iStyle, width: "auto", minWidth: 130, cursor: "pointer" }}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{filtered.length} found</span>
        </div>

        <div className="um-table-wrapper" style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,.06)", border: "1px solid #f1f5f9" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
              <thead>
                <tr style={{ background: "#fafbff", borderBottom: "1px solid #f1f5f9" }}>
                  {["User", "Role", "Status", "Joined", canEdit ? "Actions" : ""].filter(Boolean).map(h => (
                    <th key={h} style={{ padding: "12px 18px", textAlign: h === "Actions" ? "right" : "left", fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: .8, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "56px 0", color: "#94a3b8" }}>
                      <div style={{ fontSize: 36, marginBottom: 10 }}>👥</div>
                      <p style={{ margin: 0, fontWeight: 700, color: "#475569" }}>No users found</p>
                    </td>
                  </tr>
                ) : pageUsers.map(u => (
                  <tr key={u.id} className="um-row" style={{ borderBottom: "1px solid #f8fafc", transition: "background .12s" }}>
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Avatar name={u.name} />
                        <div>
                          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                            {u.name}
                            {u.id === me?.id && <span style={{ marginLeft: 6, fontSize: 9, background: "#ede9fe", color: "#7c3aed", padding: "1px 6px", borderRadius: 10, fontWeight: 800 }}>YOU</span>}
                          </p>
                          <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 18px" }}><RolePill role={u.role} /></td>
                    <td style={{ padding: "14px 18px" }}><StatusPill active={u.is_active} /></td>
                    <td style={{ padding: "14px 18px", fontSize: 12, color: "#94a3b8" }}>
                      {u.created_at ? new Date(u.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                    </td>
                    {canEdit && (
                      <td style={{ padding: "14px 18px", textAlign: "right" }}>
                        <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                          <button onClick={() => openEdit(u)} style={{ padding: "5px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: "#ede9fe", color: "#7c3aed", fontSize: 11, fontWeight: 700 }}>Edit</button>
                          {isSA && u.id !== me?.id && (
                            <button onClick={() => openDelete(u)} style={{ padding: "5px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: "#fee2e2", color: "#dc2626", fontSize: 11, fontWeight: 700 }}>Delete</button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: 14, borderTop: "1px solid #f8fafc" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} style={{
                  width: 34, height: 34, borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700, transition: "all .15s",
                  border: `1px solid ${p === page ? "#7c3aed" : "#e2e8f0"}`,
                  background: p === page ? "#7c3aed" : "#fff", color: p === page ? "#fff" : "#475569"
                }}>{p}</button>
              ))}
            </div>
          )}
        </div>

        <div className="um-mobile-cards flex-col gap-3">
          {pageUsers.length === 0 ? (
            <div style={{ textAlign: "center", padding: "56px 0" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>👥</div>
              <p style={{ margin: 0, fontWeight: 700, color: "#475569" }}>No users found</p>
            </div>
          ) : pageUsers.map(u => (
            <div key={u.id} className="user-mobile-card">
              {/* Avatar + Name + Email */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                  <Avatar name={u.name} size={44} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#0f172a" }}>{u.name}</p>
                      {u.id === me?.id && <span style={{ fontSize: 9, background: "#ede9fe", color: "#7c3aed", padding: "1px 6px", borderRadius: 10, fontWeight: 800 }}>YOU</span>}
                    </div>
                    <p style={{ margin: 0, fontSize: 11, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</p>
                  </div>
                </div>
                <StatusPill active={u.is_active} />
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                <RolePill role={u.role} />
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 20, background: "#f8fafc", color: "#64748b", fontSize: 11, fontWeight: 600, border: "1px solid #e2e8f0" }}>
                  📅 {u.created_at ? new Date(u.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                </span>
              </div>

              {canEdit && (
                <div style={{ display: "flex", gap: 8, paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
                  <button onClick={() => openEdit(u)} style={{
                    flex: 1, padding: "8px 0", borderRadius: 10, border: "none", cursor: "pointer",
                    background: "#ede9fe", color: "#7c3aed", fontSize: 12, fontWeight: 700
                  }}>✏️ Edit</button>
                  {isSA && u.id !== me?.id && (
                    <button onClick={() => openDelete(u)} style={{
                      flex: 1, padding: "8px 0", borderRadius: 10, border: "none", cursor: "pointer",
                      background: "#fee2e2", color: "#dc2626", fontSize: 12, fontWeight: 700
                    }}>🗑️ Delete</button>
                  )}
                </div>
              )}
            </div>
          ))}

          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{
                padding: "8px 16px", borderRadius: 10, border: "1px solid #e2e8f0",
                background: "#fff", color: "#475569", fontSize: 12, fontWeight: 700, cursor: "pointer", opacity: page === 1 ? .4 : 1
              }}>← Prev</button>
              <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{page} / {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{
                padding: "8px 16px", borderRadius: 10, border: "1px solid #e2e8f0",
                background: "#fff", color: "#475569", fontSize: 12, fontWeight: 700, cursor: "pointer", opacity: page === totalPages ? .4 : 1
              }}>Next →</button>
            </div>
          )}
        </div>
      </div>

      {modal === "create" && (
        <Modal title="Add New User" onClose={() => setModal(null)}>
          <form onSubmit={handleCreate}>
            <div style={{ display: "grid", gap: 14 }}>
              <div><label style={lStyle}>Full Name</label><input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Priya Sharma" style={iStyle} /></div>
              <div><label style={lStyle}>Email Address</label><input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="priya@company.com" style={iStyle} /></div>
              <div><label style={lStyle}>Password</label><input required type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Min 6 characters" style={iStyle} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label style={lStyle}>Role</label>
                  <select required value={form.role_id} onChange={e => setForm(p => ({ ...p, role_id: Number(e.target.value) }))} style={{ ...iStyle, cursor: "pointer" }}>
                    {ROLES_LIST.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                  </select>
                </div>
                <div><label style={lStyle}>Status</label>
                  <select value={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: Number(e.target.value) }))} style={{ ...iStyle, cursor: "pointer" }}>
                    <option value={1}>Active</option><option value={0}>Inactive</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                <button type="button" onClick={() => setModal(null)} style={{ flex: 1, padding: 11, borderRadius: 12, border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                <button type="submit" disabled={saving} style={{ flex: 1, padding: 11, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#7c3aed,#6d28d9)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: saving ? .6 : 1 }}>
                  {saving ? "Creating…" : "Create User"}
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {modal === "edit" && selected && (
        <Modal title={`Edit — ${selected.name}`} onClose={() => setModal(null)}>
          <form onSubmit={handleUpdate}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#f8fafc", borderRadius: 12, marginBottom: 16 }}>
              <Avatar name={selected.name} size={40} />
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{selected.name}</p>
                <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{selected.email}</p>
              </div>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              <div><label style={lStyle}>Full Name</label><input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={iStyle} /></div>
              <div>
                <label style={lStyle}>New Password <span style={{ fontWeight: 400, textTransform: "none", color: "#94a3b8" }}>(blank = keep current)</span></label>
                <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••" style={iStyle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label style={lStyle}>Role</label>
                  <select value={form.role_id} onChange={e => setForm(p => ({ ...p, role_id: Number(e.target.value) }))} style={{ ...iStyle, cursor: "pointer" }}>
                    {ROLES_LIST.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                  </select>
                </div>
                <div><label style={lStyle}>Status</label>
                  <select value={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: Number(e.target.value) }))} style={{ ...iStyle, cursor: "pointer" }}>
                    <option value={1}>Active</option><option value={0}>Inactive</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                <button type="button" onClick={() => setModal(null)} style={{ flex: 1, padding: 11, borderRadius: 12, border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                <button type="submit" disabled={saving} style={{ flex: 1, padding: 11, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#7c3aed,#6d28d9)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: saving ? .6 : 1 }}>
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {modal === "delete" && selected && (
        <Modal title="Remove User?" onClose={() => setModal(null)} width={420}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: 20, background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 16px" }}>🗑️</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#f8fafc", borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
              <Avatar name={selected.name} size={38} />
              <div style={{ textAlign: "left" }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{selected.name}</p>
                <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{selected.email}</p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>This action cannot be undone. All data associated with this user will be permanently removed.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, padding: 11, borderRadius: 12, border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
              <button onClick={handleDelete} disabled={saving} style={{ flex: 1, padding: 11, borderRadius: 12, border: "none", background: "#dc2626", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: saving ? .6 : 1 }}>
                {saving ? "Removing…" : "Yes, Remove"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 2000, display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderRadius: 14, background: toast.type === "success" ? "#059669" : "#dc2626", color: "#fff", fontSize: 13, fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,.2)" }}>
          <span>{toast.type === "success" ? "✓" : "✕"}</span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}