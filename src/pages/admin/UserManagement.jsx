import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";

// ─── Mock Users ───────────────────────────────────────────────────────────────
const INITIAL_USERS = [
  { id: 1,  name: "Rajesh Mehta",    email: "superadmin@test.com",  role: "SUPER_ADMIN",       company: "MailDoll HQ",   status: "Active",   joined: "Jan 2025", lastLogin: "Today" },
  { id: 2,  name: "Rahul Sharma",    email: "admin@test.com",       role: "BUSINESS_ADMIN",    company: "Acme Corp",     status: "Active",   joined: "Feb 2026", lastLogin: "Today" },
  { id: 3,  name: "Priya Patil",     email: "manager@test.com",     role: "MARKETING_MANAGER", company: "Acme Corp",     status: "Active",   joined: "Feb 2026", lastLogin: "2d ago" },
  { id: 4,  name: "Sneha Kulkarni",  email: "viewer@test.com",      role: "VIEWER",            company: "Acme Corp",     status: "Inactive", joined: "Mar 2026", lastLogin: "1w ago" },
  { id: 5,  name: "Amit Desai",      email: "amit@techstart.com",   role: "BUSINESS_ADMIN",    company: "TechStart",     status: "Active",   joined: "Jan 2026", lastLogin: "1d ago" },
  { id: 6,  name: "Neha Joshi",      email: "neha@techstart.com",   role: "MARKETING_MANAGER", company: "TechStart",     status: "Active",   joined: "Mar 2026", lastLogin: "Today" },
  { id: 7,  name: "Vikram Singh",    email: "vikram@shopify.in",    role: "BUSINESS_ADMIN",    company: "ShopIndia",     status: "Active",   joined: "Dec 2025", lastLogin: "3d ago" },
  { id: 8,  name: "Pooja Nair",      email: "pooja@shopify.in",     role: "VIEWER",            company: "ShopIndia",     status: "Active",   joined: "Feb 2026", lastLogin: "Today" },
];

const ROLES = ["SUPER_ADMIN", "BUSINESS_ADMIN", "MARKETING_MANAGER", "VIEWER"];

const roleConfig = {
  SUPER_ADMIN:       { label: "Super Admin",       bg: "#ede9fe", text: "#5b21b6", icon: "👑" },
  BUSINESS_ADMIN:    { label: "Business Admin",    bg: "#d1fae5", text: "#065f46", icon: "🏢" },
  MARKETING_MANAGER: { label: "Marketing Manager", bg: "#fef3c7", text: "#92400e", icon: "🎯" },
  VIEWER:            { label: "Viewer",            bg: "#fce7f3", text: "#9d174d", icon: "👁️" },
};

const statusConfig = {
  Active:   { bg: "#d1fae5", text: "#065f46" },
  Inactive: { bg: "#fee2e2", text: "#991b1b" },
};

// ─── Add User Modal ───────────────────────────────────────────────────────────
function AddUserModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", email: "", role: "VIEWER", company: "", status: "Active" });
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) { setError("सर्व fields भरा."); return; }
    if (!/\S+@\S+\.\S+/.test(form.email)) { setError("Valid email टाका."); return; }
    onAdd({ ...form, id: Date.now(), joined: "Mar 2026", lastLogin: "Never" });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(15,14,42,0.55)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-black text-slate-800 text-lg">Add New User</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-2.5 rounded-xl">❌ {error}</div>
          )}

          {[
            { label: "Full Name", name: "name", type: "text", placeholder: "Rahul Sharma" },
            { label: "Email",     name: "email", type: "email", placeholder: "rahul@company.com" },
            { label: "Company",   name: "company", type: "text", placeholder: "Acme Corp" },
          ].map(f => (
            <div key={f.name}>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} value={form[f.name]}
                onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400 transition-all" />
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Role</label>
            <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
              className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400">
              {ROLES.map(r => (
                <option key={r} value={r}>{roleConfig[r].label}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-all"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Edit Role Modal ──────────────────────────────────────────────────────────
function EditRoleModal({ user, onClose, onSave }) {
  const [role,   setRole]   = useState(user.role);
  const [status, setStatus] = useState(user.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(15,14,42,0.55)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-black text-slate-800">Edit User</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
        </div>

        <div className="p-6 space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              {user.name[0]}
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">{user.name}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>

          {/* Role Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Change Role</label>
            <div className="space-y-2">
              {ROLES.map(r => {
                const rc = roleConfig[r];
                return (
                  <label key={r} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    role === r ? "border-indigo-400 bg-indigo-50" : "border-slate-100 hover:border-slate-200"
                  }`}>
                    <input type="radio" name="role" value={r} checked={role === r}
                      onChange={() => setRole(r)} className="sr-only" />
                    <span className="text-lg">{rc.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{rc.label}</p>
                    </div>
                    {role === r && <span className="ml-auto text-indigo-500 text-sm">✓</span>}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Status Toggle */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Status</label>
            <div className="flex gap-2">
              {["Active", "Inactive"].map(s => (
                <button key={s} type="button" onClick={() => setStatus(s)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                    status === s ? "border-indigo-400 bg-indigo-50 text-indigo-700" : "border-slate-100 text-slate-500 hover:border-slate-200"
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button onClick={() => { onSave(user.id, role, status); onClose(); }}
              className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN USER MANAGEMENT COMPONENT
// ═════════════════════════════════════════════════════════════════════════════
export default function UserManagement() {
  const { user: currentUser, hasPerm } = useAuth();
  const role = currentUser?.role;

  const [users,      setUsers]      = useState(INITIAL_USERS);
  const [search,     setSearch]     = useState("");
  const [filterRole, setFilterRole] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [showAdd,    setShowAdd]    = useState(false);
  const [editUser,   setEditUser]   = useState(null);
  const [deleteId,   setDeleteId]   = useState(null);

  // ── Can this role manage users? ──
  const canEdit   = role === "SUPER_ADMIN" || role === "BUSINESS_ADMIN";
  const canDelete = role === "SUPER_ADMIN";
  const canAdd    = role === "SUPER_ADMIN" || role === "BUSINESS_ADMIN";

  // ── Filtered Users ──
  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch  = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.company.toLowerCase().includes(q);
    const matchRole    = filterRole   === "ALL" || u.role   === filterRole;
    const matchStatus  = filterStatus === "ALL" || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  function handleAdd(newUser) {
    setUsers(prev => [newUser, ...prev]);
  }

  function handleSave(id, newRole, newStatus) {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole, status: newStatus } : u));
  }

  function handleDelete(id) {
    setUsers(prev => prev.filter(u => u.id !== id));
    setDeleteId(null);
  }

  // ── Summary counts ──
  const counts = ROLES.reduce((acc, r) => ({ ...acc, [r]: users.filter(u => u.role === r).length }), {});

  return (
    <div className="space-y-5 p-1">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">User Management</h1>
          <p className="text-sm text-slate-400 mt-0.5">{users.length} total users across all roles</p>
        </div>
        {canAdd && (
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
            + Add User
          </button>
        )}
      </div>

      {/* ── Role Summary Cards ───────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {ROLES.map(r => {
          const rc = roleConfig[r];
          return (
            <div key={r}
              onClick={() => setFilterRole(filterRole === r ? "ALL" : r)}
              className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all hover:shadow-md ${
                filterRole === r ? "border-indigo-400 shadow-md" : "border-slate-100"
              }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{rc.icon}</span>
                <span className="text-2xl font-black text-slate-800">{counts[r] || 0}</span>
              </div>
              <p className="text-xs font-semibold text-slate-500">{rc.label}</p>
            </div>
          );
        })}
      </div>

      {/* ── Filters ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search by name, email, company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-indigo-400 bg-slate-50 transition-all"
          />
        </div>

        {/* Role Filter */}
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)}
          className="border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg text-sm outline-none focus:border-indigo-400">
          <option value="ALL">All Roles</option>
          {ROLES.map(r => <option key={r} value={r}>{roleConfig[r].label}</option>)}
        </select>

        {/* Status Filter */}
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg text-sm outline-none focus:border-indigo-400">
          <option value="ALL">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Clear */}
        {(search || filterRole !== "ALL" || filterStatus !== "ALL") && (
          <button onClick={() => { setSearch(""); setFilterRole("ALL"); setFilterStatus("ALL"); }}
            className="px-4 py-2 text-sm text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            Clear ✕
          </button>
        )}
      </div>

      {/* ── Users Table ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-300">
            <span className="text-4xl mb-3">🔍</span>
            <p className="font-semibold text-slate-400">No users found</p>
            <p className="text-sm text-slate-300 mt-1">Try changing your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["User", "Role", "Company", "Status", "Joined", "Last Login", canEdit ? "Actions" : ""].filter(Boolean).map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => {
                  const rc = roleConfig[u.role];
                  const sc = statusConfig[u.status];
                  const isSelf = u.email === currentUser?.email;
                  return (
                    <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      {/* User */}
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0"
                            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                            {u.name[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-700 flex items-center gap-1.5">
                              {u.name}
                              {isSelf && <span className="text-[9px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full font-bold">YOU</span>}
                            </p>
                            <p className="text-xs text-slate-400">{u.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{ background: rc.bg, color: rc.text }}>
                          <span>{rc.icon}</span> {rc.label}
                        </span>
                      </td>

                      {/* Company */}
                      <td className="px-5 py-3 text-slate-600 text-xs">{u.company}</td>

                      {/* Status */}
                      <td className="px-5 py-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{ background: sc.bg, color: sc.text }}>
                          {u.status}
                        </span>
                      </td>

                      {/* Joined */}
                      <td className="px-5 py-3 text-slate-400 text-xs">{u.joined}</td>

                      {/* Last Login */}
                      <td className="px-5 py-3 text-slate-400 text-xs">{u.lastLogin}</td>

                      {/* Actions */}
                      {canEdit && (
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => setEditUser(u)}
                              className="text-xs px-3 py-1.5 rounded-lg font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">
                              Edit
                            </button>
                            {canDelete && !isSelf && (
                              <button onClick={() => setDeleteId(u.id)}
                                className="text-xs px-3 py-1.5 rounded-lg font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors">
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Modals ──────────────────────────────────────────────── */}
      {showAdd  && <AddUserModal  onClose={() => setShowAdd(false)}  onAdd={handleAdd} />}
      {editUser && <EditRoleModal user={editUser} onClose={() => setEditUser(null)} onSave={handleSave} />}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(15,14,42,0.55)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-2xl mx-auto mb-4">🗑️</div>
            <h3 className="font-black text-slate-800 text-lg mb-2">Delete User?</h3>
            <p className="text-sm text-slate-400 mb-6">हा user permanently delete होईल. Undo करता येणार नाही.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold bg-red-500 hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}