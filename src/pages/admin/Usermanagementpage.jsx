// admin/users/UserManagementPage.jsx

import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { roleConfig } from "../admin/AdminSidebar";
import { INITIAL_USERS, ROLES_LIST, statusColors } from "../admin/Mockdata";

export default function UserManagementPage() {
  const { user: currentUser } = useAuth();
  const role    = currentUser?.role;
  const canEdit = role === "SUPER_ADMIN" || role === "BUSINESS_ADMIN";

  const [users,    setUsers]    = useState(INITIAL_USERS);
  const [search,   setSearch]   = useState("");
  const [fRole,    setFRole]    = useState("ALL");
  const [editUser, setEditUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showAdd,  setShowAdd]  = useState(false);
  const [addForm,  setAddForm]  = useState({ name:"", email:"", role:"VIEWER", company:"" });

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      && (fRole === "ALL" || u.role === fRole);
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800">User Management</h1>
          <p className="text-sm text-slate-400 mt-0.5">{users.length} total users</p>
        </div>
        {canEdit && (
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-white text-sm font-bold shadow-lg hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
          >
            + Add User
          </button>
        )}
      </div>

      {/* Role count cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {ROLES_LIST.map(r => {
          const rc2   = roleConfig[r];
          const count = users.filter(u => u.role === r).length;
          return (
            <div key={r} onClick={() => setFRole(fRole === r ? "ALL" : r)}
              className={`bg-white rounded-xl p-3 md:p-4 border-2 cursor-pointer transition-all hover:shadow-md ${fRole === r ? "border-indigo-400 shadow-md" : "border-slate-100"}`}>
              <div className="flex items-center gap-2 mb-1">
                <span>{rc2.icon}</span>
                <span className="text-xl md:text-2xl font-black text-slate-800">{count}</span>
              </div>
              <p className="text-xs font-semibold text-slate-500">{rc2.label}</p>
            </div>
          );
        })}
      </div>

      {/* Search + filter */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 md:p-4 flex flex-col md:flex-row gap-3">
        <input
          type="text" placeholder="Search name or email..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg text-sm outline-none focus:border-indigo-400"
        />
        <select value={fRole} onChange={e => setFRole(e.target.value)}
          className="border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg text-sm outline-none focus:border-indigo-400">
          <option value="ALL">All Roles</option>
          {ROLES_LIST.map(r => <option key={r} value={r}>{roleConfig[r].label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["User","Role","Company","Status","Joined", canEdit ? "Actions" : ""].filter(Boolean).map(h => (
                  <th key={h} className="px-4 md:px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => {
                const rc2    = roleConfig[u.role];
                const sc2    = statusColors[u.status] || statusColors.Draft;
                const isSelf = u.email === currentUser?.email;
                return (
                  <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-4 md:px-5 py-3">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0"
                          style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                          {u.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-700 text-xs md:text-sm flex items-center gap-1.5">
                            {u.name}
                            {isSelf && <span className="text-[9px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full font-bold">YOU</span>}
                          </p>
                          <p className="text-[10px] md:text-xs text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-5 py-3">
                      <span className="flex items-center gap-1 w-fit px-2 py-1 rounded-full text-xs font-semibold"
                        style={{ background: rc2?.bg, color: rc2?.color }}>
                        {rc2?.icon} {rc2?.label}
                      </span>
                    </td>
                    <td className="px-4 md:px-5 py-3 text-slate-500 text-xs">{u.company}</td>
                    <td className="px-4 md:px-5 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: sc2.bg, color: sc2.text }}>{u.status}</span>
                    </td>
                    <td className="px-4 md:px-5 py-3 text-slate-400 text-xs">{u.joined}</td>
                    {canEdit && (
                      <td className="px-4 md:px-5 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => setEditUser({...u})}
                            className="text-xs px-2.5 py-1.5 rounded-lg font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">Edit</button>
                          {role === "SUPER_ADMIN" && !isSelf && (
                            <button onClick={() => setDeleteId(u.id)}
                              className="text-xs px-2.5 py-1.5 rounded-lg font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors">Delete</button>
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
      </div>

      {/* Add User Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(15,14,42,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-slate-100">
              <h3 className="font-black text-slate-800">Add New User</h3>
              <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>
            <div className="p-5 md:p-6 space-y-4">
              {[
                { label:"Full Name", name:"name",    type:"text"  },
                { label:"Email",     name:"email",   type:"email" },
                { label:"Company",   name:"company", type:"text"  },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">{f.label}</label>
                  <input type={f.type} value={addForm[f.name]}
                    onChange={e => setAddForm(p => ({...p, [f.name]: e.target.value}))}
                    className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Role</label>
                <select value={addForm.role} onChange={e => setAddForm(p => ({...p, role: e.target.value}))}
                  className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400">
                  {ROLES_LIST.map(r => <option key={r} value={r}>{roleConfig[r].label}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50">Cancel</button>
                <button onClick={() => {
                  if (!addForm.name || !addForm.email) return;
                  setUsers(p => [{...addForm, id: Date.now(), status:"Active", joined:"Mar 2026"}, ...p]);
                  setShowAdd(false);
                  setAddForm({ name:"", email:"", role:"VIEWER", company:"" });
                }} className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(15,14,42,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-slate-100">
              <h3 className="font-black text-slate-800">Edit User</h3>
              <button onClick={() => setEditUser(null)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>
            <div className="p-5 md:p-6 space-y-4">
              <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                  {editUser.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{editUser.name}</p>
                  <p className="text-xs text-slate-400">{editUser.email}</p>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Role</label>
                <div className="space-y-2">
                  {ROLES_LIST.map(r => {
                    const rc2 = roleConfig[r];
                    return (
                      <label key={r} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${editUser.role === r ? "border-indigo-400 bg-indigo-50" : "border-slate-100 hover:border-slate-200"}`}>
                        <input type="radio" checked={editUser.role === r} onChange={() => setEditUser(p => ({...p, role: r}))} className="sr-only" />
                        <span className="text-lg">{rc2.icon}</span>
                        <span className="text-sm font-semibold text-slate-700">{rc2.label}</span>
                        {editUser.role === r && <span className="ml-auto text-indigo-500">✓</span>}
                      </label>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Status</label>
                <div className="flex gap-2">
                  {["Active","Inactive"].map(s => (
                    <button key={s} onClick={() => setEditUser(p => ({...p, status: s}))}
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${editUser.status === s ? "border-indigo-400 bg-indigo-50 text-indigo-700" : "border-slate-100 text-slate-500"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={() => setEditUser(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold">Cancel</button>
                <button
                  onClick={() => { setUsers(p => p.map(u => u.id === editUser.id ? editUser : u)); setEditUser(null); }}
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold"
                  style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(15,14,42,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-2xl mx-auto mb-4">🗑️</div>
            <h3 className="font-black text-slate-800 text-lg mb-2">Delete User?</h3>
            <p className="text-sm text-slate-400 mb-6">हा user permanently delete होईल.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold">Cancel</button>
              <button
                onClick={() => { setUsers(p => p.filter(u => u.id !== deleteId)); setDeleteId(null); }}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold bg-red-500 hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}