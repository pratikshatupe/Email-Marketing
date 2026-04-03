

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../auth/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const STORAGE_KEY = "audit_logs_cache";

const MOCK_LOGS = [
  { id: 1, user_id: 1, user_name: "superadmin", action_type: "LOGIN", module: "auth", description: "LOGIN on auth by superadmin", ip_address: "192.168.1.1", timestamp: new Date(Date.now() - 2 * 60000).toISOString() },
  { id: 2, user_id: 1, user_name: "superadmin", action_type: "CREATE", module: "campaigns", description: "CREATE on campaigns by superadmin", ip_address: "192.168.1.1", timestamp: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: 3, user_id: 2, user_name: "Rahul Sharma", action_type: "UPDATE", module: "contacts", description: "UPDATE on contacts by Rahul Sharma", ip_address: "192.168.1.10", timestamp: new Date(Date.now() - 30 * 60000).toISOString() },
  { id: 4, user_id: 3, user_name: "Priya Patil", action_type: "CREATE", module: "templates", description: "CREATE on templates by Priya Patil", ip_address: "10.0.0.5", timestamp: new Date(Date.now() - 60 * 60000).toISOString() },
  { id: 5, user_id: 1, user_name: "superadmin", action_type: "DELETE", module: "users", description: "DELETE on users by superadmin", ip_address: "192.168.1.1", timestamp: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: 6, user_id: 2, user_name: "Rahul Sharma", action_type: "UPDATE", module: "settings", description: "UPDATE on settings by Rahul Sharma", ip_address: "192.168.1.10", timestamp: new Date(Date.now() - 3 * 3600000).toISOString() },
  { id: 7, user_id: 3, user_name: "Priya Patil", action_type: "CREATE", module: "automations", description: "CREATE on automations by Priya Patil", ip_address: "10.0.0.5", timestamp: new Date(Date.now() - 5 * 3600000).toISOString() },
  { id: 8, user_id: 1, user_name: "superadmin", action_type: "LOGIN", module: "auth", description: "LOGIN on auth by superadmin", ip_address: "192.168.1.1", timestamp: new Date(Date.now() - 1 * 86400000).toISOString() },
  { id: 9, user_id: 2, user_name: "Rahul Sharma", action_type: "CREATE", module: "contacts", description: "CREATE on contacts by Rahul Sharma", ip_address: "192.168.1.10", timestamp: new Date(Date.now() - 1.2 * 86400000).toISOString() },
  { id: 10, user_id: 1, user_name: "superadmin", action_type: "DELETE", module: "campaigns", description: "DELETE on campaigns by superadmin", ip_address: "192.168.1.1", timestamp: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: 11, user_id: 4, user_name: "Sneha Kulkarni", action_type: "LOGIN", module: "auth", description: "LOGIN on auth by Sneha Kulkarni", ip_address: "10.0.0.20", timestamp: new Date(Date.now() - 2.5 * 86400000).toISOString() },
  { id: 12, user_id: 3, user_name: "Priya Patil", action_type: "UPDATE", module: "templates", description: "UPDATE on templates by Priya Patil", ip_address: "10.0.0.5", timestamp: new Date(Date.now() - 3 * 86400000).toISOString() },
  { id: 13, user_id: 1, user_name: "superadmin", action_type: "CREATE", module: "roles", description: "CREATE on roles by superadmin", ip_address: "192.168.1.1", timestamp: new Date(Date.now() - 4 * 86400000).toISOString() },
  { id: 14, user_id: 2, user_name: "Rahul Sharma", action_type: "LOGOUT", module: "auth", description: "LOGOUT on auth by Rahul Sharma", ip_address: "192.168.1.10", timestamp: new Date(Date.now() - 4.5 * 86400000).toISOString() },
  { id: 15, user_id: 1, user_name: "superadmin", action_type: "UPDATE", module: "campaigns", description: "UPDATE on campaigns by superadmin", ip_address: "192.168.1.1", timestamp: new Date(Date.now() - 5 * 86400000).toISOString() },
];

function saveToStorage(logs) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(logs)); } catch { }
}
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { }
  return null;
}

const ACTION_META = {
  CREATE: { bg: "bg-emerald-50", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", icon: "➕", accent: "#10b981", tableBg: "bg-emerald-100", tableText: "text-emerald-700" },
  UPDATE: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-100 text-blue-700", dot: "bg-blue-500", icon: "✏️", accent: "#3b82f6", tableBg: "bg-blue-100", tableText: "text-blue-700" },
  DELETE: { bg: "bg-red-50", border: "border-red-200", badge: "bg-red-100 text-red-700", dot: "bg-red-500", icon: "🗑️", accent: "#ef4444", tableBg: "bg-red-100", tableText: "text-red-700" },
  LOGIN: { bg: "bg-indigo-50", border: "border-indigo-200", badge: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500", icon: "🔓", accent: "#6366f1", tableBg: "bg-indigo-100", tableText: "text-indigo-700" },
  LOGOUT: { bg: "bg-slate-50", border: "border-slate-200", badge: "bg-slate-100 text-slate-600", dot: "bg-slate-400", icon: "🔒", accent: "#94a3b8", tableBg: "bg-slate-100", tableText: "text-slate-600" },
};

const MODULE_ICONS = {
  campaigns: "📢", contacts: "👥", templates: "🎨",
  users: "👤", automations: "⚙️", settings: "🔧",
  roles: "🔐", segments: "🗂️", auth: "🔑",
};

const MODULE_COLORS = {
  campaigns: "bg-orange-100 text-orange-700", contacts: "bg-cyan-100 text-cyan-700",
  templates: "bg-purple-100 text-purple-700", users: "bg-pink-100 text-pink-700",
  automations: "bg-yellow-100 text-yellow-700", settings: "bg-slate-100 text-slate-600",
  roles: "bg-red-100 text-red-700", segments: "bg-teal-100 text-teal-700",
  auth: "bg-indigo-100 text-indigo-700",
};

const LIMIT_OPTIONS = [25, 50, 100, 200];

const AVATAR_COLORS = [
  "bg-violet-500", "bg-indigo-500", "bg-sky-500", "bg-emerald-500",
  "bg-amber-500", "bg-rose-500", "bg-teal-500", "bg-fuchsia-500",
];

function getAM(type) {
  return ACTION_META[type?.toUpperCase()] || {
    bg: "bg-slate-50", border: "border-slate-200", badge: "bg-slate-100 text-slate-600",
    dot: "bg-slate-400", icon: "📋", accent: "#94a3b8", tableBg: "bg-slate-100", tableText: "text-slate-600",
  };
}

function getModuleColor(mod) {
  return MODULE_COLORS[mod?.toLowerCase()] || "bg-slate-100 text-slate-600";
}

function formatTime(ts) {
  if (!ts) return "—";
  return new Date(ts).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function timeAgo(ts) {
  if (!ts) return "";
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name[0].toUpperCase();
}

function avatarColor(name) {
  let hash = 0;
  for (let i = 0; i < (name || "").length; i++) hash += name.charCodeAt(i);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function LogCard({ log, index, onClick }) {
  const am = getAM(log.action_type);
  const modIcon = MODULE_ICONS[log.module?.toLowerCase()] || "📁";
  const modCls = getModuleColor(log.module);
  const avColor = avatarColor(log.user_name);

  return (
    <div
      onClick={() => onClick(log)}
      className={`
        relative rounded-2xl border ${am.border} ${am.bg}
        p-4 cursor-pointer
        hover:shadow-md hover:-translate-y-0.5
        active:scale-[0.98]
        transition-all duration-200 ease-out
      `}
    >
      <div
        className="absolute left-0 top-3 bottom-3 w-1 rounded-full"
        style={{ backgroundColor: am.accent }}
      />

      <span className="absolute top-2 right-3 text-[10px] font-mono text-slate-300">
        #{String(index + 1).padStart(3, "0")}
      </span>

      <div className="flex items-start justify-between gap-2 pl-3 mb-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${am.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${am.dot}`} />
          {log.action_type || "—"}
        </span>
        <div className="text-right shrink-0">
          <p className="text-xs font-medium text-slate-500">{timeAgo(log.timestamp)}</p>
          <p className="text-[11px] text-slate-400">{formatTime(log.timestamp)}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 pl-3 mb-3">
        <div className={`w-8 h-8 rounded-full ${avColor} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
          {getInitials(log.user_name)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-800 truncate">
            {log.user_name || `User #${log.user_id}` || "System"}
          </p>
          <p className="text-xs text-slate-400 truncate">{log.description || "—"}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pl-3">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold capitalize ${modCls}`}>
          {modIcon} {log.module || "—"}
        </span>
        <span className="font-mono text-[11px] text-slate-400 bg-white/70 px-2 py-0.5 rounded-lg border border-slate-200">
          {log.ip_address || "—"}
        </span>
      </div>
    </div>
  );
}

export default function AuditLogs() {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const [logs, setLogs] = useState(() => loadFromStorage() || MOCK_LOGS);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(50);
  const [search, setSearch] = useState("");
  const [filterAction, setFilterAction] = useState("ALL");
  const [filterModule, setFilterModule] = useState("ALL");
  const [selected, setSelected] = useState(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const res = await fetch(`${API}/analytics/audit-logs?limit=${limit}`, { headers });
      const data = await res.json();
      if (res.ok) {
        const rows = data.data?.logs || data.logs || data.data || [];
        if (rows.length > 0) { setLogs(rows); saveToStorage(rows); }
        else { const c = loadFromStorage() || MOCK_LOGS; setLogs(c); if (!loadFromStorage()) saveToStorage(MOCK_LOGS); }
      } else {
        const c = loadFromStorage() || MOCK_LOGS; setLogs(c); if (!loadFromStorage()) saveToStorage(MOCK_LOGS);
      }
    } catch {
      const c = loadFromStorage() || MOCK_LOGS; setLogs(c); if (!loadFromStorage()) saveToStorage(MOCK_LOGS);
    } finally { setLoading(false); }
  }, [limit, token]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const allActions = ["ALL", ...Array.from(new Set(logs.map(l => l.action_type).filter(Boolean)))];
  const allModules = ["ALL", ...Array.from(new Set(logs.map(l => l.module).filter(Boolean)))];

  const filtered = logs.filter(log => {
    const matchAction = filterAction === "ALL" || log.action_type === filterAction;
    const matchModule = filterModule === "ALL" || log.module === filterModule;
    const q = search.toLowerCase();
    const matchSearch = !q
      || log.user_name?.toLowerCase().includes(q)
      || log.description?.toLowerCase().includes(q)
      || log.module?.toLowerCase().includes(q)
      || log.action_type?.toLowerCase().includes(q)
      || log.ip_address?.includes(q);
    return matchAction && matchModule && matchSearch;
  });

  const counts = logs.reduce((acc, l) => {
    const t = l.action_type || "OTHER";
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});

  const selAM = selected ? getAM(selected.action_type) : null;

  return (
    <div className="space-y-5">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800">Audit Logs</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track every action performed in the system</p>
        </div>
        <button
          onClick={fetchLogs}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm self-start sm:self-auto"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { key: "CREATE", label: "Creates", icon: "➕", color: "bg-emerald-50 border-emerald-200", textColor: "text-emerald-700" },
          { key: "UPDATE", label: "Updates", icon: "✏️", color: "bg-blue-50 border-blue-200", textColor: "text-blue-700" },
          { key: "DELETE", label: "Deletes", icon: "🗑️", color: "bg-red-50 border-red-200", textColor: "text-red-700" },
          { key: "LOGIN", label: "Logins", icon: "🔓", color: "bg-indigo-50 border-indigo-200", textColor: "text-indigo-700" },
        ].map(s => (
          <div
            key={s.key}
            onClick={() => setFilterAction(filterAction === s.key ? "ALL" : s.key)}
            className={`
              rounded-2xl border p-4 cursor-pointer transition-all duration-150
              ${s.color}
              ${filterAction === s.key ? "ring-2 ring-offset-1 ring-indigo-400 shadow-md" : "hover:shadow-sm"}
            `}
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <p className={`text-2xl font-black ${s.textColor}`}>{counts[s.key] || 0}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search user, action, module, IP..."
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <select value={filterAction} onChange={e => setFilterAction(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
            {allActions.map(a => <option key={a} value={a}>{a === "ALL" ? "All Actions" : a}</option>)}
          </select>
          <select value={filterModule} onChange={e => setFilterModule(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white capitalize">
            {allModules.map(m => <option key={m} value={m}>{m === "ALL" ? "All Modules" : m}</option>)}
          </select>
          <select value={limit} onChange={e => setLimit(Number(e.target.value))}
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
            {LIMIT_OPTIONS.map(l => <option key={l} value={l}>Show {l}</option>)}
          </select>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          Showing <strong className="text-slate-600">{filtered.length}</strong> of{" "}
          <strong className="text-slate-600">{logs.length}</strong> logs
          {(search || filterAction !== "ALL" || filterModule !== "ALL") && (
            <button onClick={() => { setSearch(""); setFilterAction("ALL"); setFilterModule("ALL"); }}
              className="ml-2 text-indigo-500 hover:text-indigo-700 font-medium underline">
              Clear filters ×
            </button>
          )}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-60">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-sm text-slate-400">Loading audit logs…</p>
          </div>
        </div>

      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 gap-3 bg-white rounded-2xl border border-slate-200">
          <div className="text-5xl">📋</div>
          <p className="text-slate-500 font-semibold">No logs found</p>
          <p className="text-slate-400 text-sm">Try adjusting your filters</p>
        </div>

      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {filtered.map((log, i) => (
              <LogCard key={log.id || i} log={log} index={i} onClick={setSelected} />
            ))}
          </div>

          <div className="hidden md:block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-5 py-3.5">#</th>
                    <th className="px-5 py-3.5">Action</th>
                    <th className="px-5 py-3.5">Module</th>
                    <th className="px-5 py-3.5">User</th>
                    <th className="px-5 py-3.5">Description</th>
                    <th className="px-5 py-3.5">IP Address</th>
                    <th className="px-5 py-3.5">Time</th>
                    <th className="px-5 py-3.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((log, i) => {
                    const am = getAM(log.action_type);
                    const modIcon = MODULE_ICONS[log.module?.toLowerCase()] || "📁";
                    const avColor = avatarColor(log.user_name);
                    return (
                      <tr key={log.id || i} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-5 py-3.5 text-slate-400 font-mono text-xs">
                          {String(i + 1).padStart(3, "0")}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${am.tableBg} ${am.tableText}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${am.dot}`} />
                            {log.action_type || "—"}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="flex items-center gap-1.5 text-slate-600 font-medium capitalize">
                            {modIcon} {log.module || "—"}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full ${avColor} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                              {getInitials(log.user_name)}
                            </div>
                            <span className="text-slate-700 font-medium truncate max-w-[120px]">
                              {log.user_name || `User #${log.user_id}` || "System"}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 max-w-[200px]">
                          <p className="text-slate-500 truncate" title={log.description}>
                            {log.description || "—"}
                          </p>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                            {log.ip_address || "—"}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <p className="text-slate-600 text-xs font-medium">{formatTime(log.timestamp)}</p>
                          <p className="text-slate-400 text-[11px]">{timeAgo(log.timestamp)}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <button
                            onClick={() => setSelected(log)}
                            className="opacity-0 group-hover:opacity-100 text-xs font-semibold text-indigo-500 hover:text-indigo-700 transition-all px-2 py-1 rounded-lg hover:bg-indigo-50"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {selected && selAM && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-slate-200" />
            </div>

            <div className={`p-5 ${selAM.bg} border-b ${selAM.border}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{selAM.icon}</div>
                  <div>
                    <p className={`font-black text-lg ${selAM.tableText}`}>{selected.action_type}</p>
                    <p className="text-sm text-slate-500 capitalize">
                      {MODULE_ICONS[selected.module?.toLowerCase()] || "📁"} {selected.module}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-xl bg-white/70 hover:bg-white flex items-center justify-center text-slate-500 font-bold transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 px-5 py-4 bg-slate-50 border-b border-slate-100">
              <div className={`w-10 h-10 rounded-full ${avatarColor(selected.user_name)} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                {getInitials(selected.user_name)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  {selected.user_name || `User #${selected.user_id}` || "System"}
                </p>
                <p className="text-xs text-slate-400">
                  {formatTime(selected.timestamp)} · {timeAgo(selected.timestamp)}
                </p>
              </div>
            </div>

            <div className="p-5 space-y-3">
              {[
                { label: "Log ID", value: `#${selected.id || "—"}` },
                { label: "Module", value: `${MODULE_ICONS[selected.module?.toLowerCase()] || "📁"} ${selected.module || "—"}` },
                { label: "Description", value: selected.description || "—" },
                { label: "IP Address", value: selected.ip_address || "—" },
                { label: "Timestamp", value: formatTime(selected.timestamp) },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
                  <span className="text-sm text-slate-700 font-medium bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="px-5 pb-6">
              <button
                onClick={() => setSelected(null)}
                className="w-full py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}