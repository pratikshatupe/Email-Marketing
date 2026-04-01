// admin/roles/RolesPermissionsPage.jsx

import React, { useState } from "react";
import { useAuth, ROLE_PERMISSIONS_MAP } from "../auth/AuthContext";
import { roleConfig } from "../admin/AdminSidebar";
import { ROLES_LIST, PERM_GROUPS } from "../admin/Mockdata";

export default function RolesPermissionsPage() {
  const { user: currentUser, hasPerm } = useAuth();
  const canEdit = hasPerm("can_edit_roles");

  const [perms, setPerms] = useState(() => {
    const copy = {};
    ROLES_LIST.forEach(r => { copy[r] = {...ROLE_PERMISSIONS_MAP[r].permissions}; });
    return copy;
  });
  const [activeRole, setActiveRole] = useState("SUPER_ADMIN");
  const [saved,      setSaved]      = useState(false);
  const [viewMode,   setViewMode]   = useState("edit");
  const totalPerms = Object.keys(ROLE_PERMISSIONS_MAP.SUPER_ADMIN.permissions).length;

  function toggle(role, key) {
    if (!canEdit || role === "SUPER_ADMIN") return;
    setPerms(p => ({...p, [role]: {...p[role], [key]: !p[role][key]}}));
    setSaved(false);
  }
  const count = (r) => Object.values(perms[r]).filter(Boolean).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800">Roles & Permissions</h1>
          <p className="text-sm text-slate-400 mt-0.5">{canEdit ? "Toggle permissions per role." : "Read-only view."}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 rounded-xl p-1">
            {[{v:"edit",l:"Editor"},{v:"matrix",l:"Matrix"}].map(({v,l}) => (
              <button key={v} onClick={() => setViewMode(v)}
                className={`px-3 md:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${viewMode === v ? "bg-white shadow text-indigo-600" : "text-slate-500"}`}>
                {l}
              </button>
            ))}
          </div>
          {canEdit && (
            <button onClick={() => setSaved(true)}
              className={`px-4 md:px-5 py-2 rounded-xl text-sm font-bold text-white transition-all ${saved ? "bg-emerald-500" : "bg-indigo-600 hover:bg-indigo-700"}`}>
              {saved ? "✓ Saved!" : "Save"}
            </button>
          )}
        </div>
      </div>

      {!canEdit && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-amber-500">🔒</span>
          <p className="text-sm text-amber-700">Only <strong>Super Admin</strong> can edit permissions.</p>
        </div>
      )}

      {/* Matrix View */}
      {viewMode === "matrix" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-4 md:px-5 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide w-52">Permission</th>
                  {ROLES_LIST.map(r => {
                    const rc2 = roleConfig[r];
                    return (
                      <th key={r} className="px-3 md:px-4 py-4 text-center">
                        <span className="text-lg block">{rc2.icon}</span>
                        <span className="text-xs font-bold text-slate-700 block">{rc2.label}</span>
                        <span className="text-[10px] text-slate-400">{count(r)}/{totalPerms}</span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {PERM_GROUPS.map(group => (
                  <React.Fragment key={group.group}>
                    <tr className="bg-slate-50">
                      <td colSpan={ROLES_LIST.length + 1} className="px-4 md:px-5 py-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{group.icon} {group.group}</span>
                      </td>
                    </tr>
                    {group.perms.map(({key, label}) => (
                      <tr key={key} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-4 md:px-5 py-3 text-sm text-slate-600 font-medium">{label}</td>
                        {ROLES_LIST.map(r => (
                          <td key={r} className="px-3 md:px-4 py-3 text-center">
                            {perms[r][key]
                              ? <span className="text-emerald-500 text-lg">✓</span>
                              : <span className="text-slate-200 text-lg">✕</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit View */}
      {viewMode === "edit" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {ROLES_LIST.map(r => {
              const rc2      = roleConfig[r];
              const isLocked = r === "SUPER_ADMIN";
              return (
                <button key={r} onClick={() => setActiveRole(r)}
                  className={`w-full text-left p-3 md:p-4 rounded-xl border-2 transition-all ${activeRole === r ? "border-indigo-400 bg-indigo-50 shadow-md" : "border-slate-100 bg-white hover:border-slate-200"}`}>
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <span className="text-lg md:text-xl">{rc2.icon}</span>
                    {isLocked && <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-semibold">Locked</span>}
                  </div>
                  <p className="font-bold text-xs md:text-sm text-slate-800">{rc2.label}</p>
                  <div className="flex items-center gap-1 mt-1 md:mt-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(count(r)/totalPerms)*100}%`, background: rc2.color }} />
                    </div>
                    <span className="text-[10px] text-slate-400">{count(r)}/{totalPerms}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-3 space-y-4">
            {(() => {
              const rc2      = roleConfig[activeRole];
              const isLocked = activeRole === "SUPER_ADMIN";
              return (
                <div className="flex items-center justify-between bg-white rounded-xl border border-slate-100 shadow-sm px-4 md:px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-lg md:text-xl" style={{ background: rc2.bg }}>{rc2.icon}</div>
                    <div>
                      <p className="font-black text-slate-800 text-sm md:text-base">{rc2.label}</p>
                      <p className="text-xs text-slate-400">{count(activeRole)}/{totalPerms} permissions {isLocked ? "— locked" : "enabled"}</p>
                    </div>
                  </div>
                  {canEdit && !isLocked && (
                    <button
                      onClick={() => setPerms(p => ({...p, [activeRole]: {...ROLE_PERMISSIONS_MAP[activeRole].permissions}}))}
                      className="text-xs text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
              );
            })()}

            {PERM_GROUPS.map(group => (
              <div key={group.group} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-4 md:px-5 py-3 border-b border-slate-50 bg-slate-50">
                  <span>{group.icon}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{group.group}</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {group.perms.map(({key, label}) => {
                    const isLocked = activeRole === "SUPER_ADMIN";
                    const isOn     = perms[activeRole][key];
                    return (
                      <div key={key} className="flex items-center justify-between px-4 md:px-5 py-3 md:py-3.5 hover:bg-slate-50 transition-colors">
                        <p className={`text-xs md:text-sm font-semibold ${isOn ? "text-slate-800" : "text-slate-400"}`}>{label}</p>
                        <div className="flex items-center gap-2 md:gap-3">
                          <span className={`text-xs font-semibold hidden sm:block ${isOn ? "text-emerald-600" : "text-slate-300"}`}>{isOn ? "ON" : "OFF"}</span>
                          <button
                            onClick={() => toggle(activeRole, key)}
                            disabled={!canEdit || isLocked}
                            className={`relative inline-flex items-center w-10 md:w-11 h-5 md:h-6 rounded-full transition-all duration-200 ${(!canEdit || isLocked) ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                            style={{ background: isOn ? "#6366f1" : "#e2e8f0" }}
                          >
                            <span
                              className="inline-block w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-white shadow transition-transform duration-200"
                              style={{ transform: isOn ? "translateX(20px)" : "translateX(3px)" }}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}