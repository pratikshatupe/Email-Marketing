
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { roleConfig } from "../admin/AdminSidebar";
import DonutChart from "../admin/Donutchart";
import {
  MOCK_STATS, MOCK_CAMPAIGNS, MOCK_AUDIT, MOCK_TEAM,
  statusColors, roleBanners,
} from "../admin/Mockdata";

export default function DashboardPage() {
  const { user, hasPerm } = useAuth();
  const navigate = useNavigate();
  const role = user?.role || "VIEWER";
  const banner = roleBanners[role];
  const stats = MOCK_STATS[role] || [];
  const rc = roleConfig[role] || roleConfig.VIEWER;
  const campaigns = role === "MARKETING_MANAGER" ? MOCK_CAMPAIGNS.slice(0, 3) : MOCK_CAMPAIGNS;

  return (
    <div className="space-y-5">
      <div
        className="relative rounded-2xl overflow-hidden p-5 md:p-6 text-white"
        style={{ background: banner.gradient }}
      >
        <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-6xl md:text-7xl opacity-15 select-none pointer-events-none">
          {banner.icon}
        </div>
        <p className="text-[11px] font-bold uppercase tracking-widest opacity-60 mb-1">{rc.label}</p>
        <h2 className="text-lg md:text-xl font-black mb-1">{banner.title}</h2>
        <p className="text-sm opacity-70 max-w-xs">{banner.subtitle}</p>
      </div>

      <div className={`grid gap-3 md:gap-4 ${stats.length <= 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"}`}>
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-3 md:p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-base md:text-lg"
                style={{ background: s.color + "18" }}>
                {s.icon}
              </div>
              {s.change && (
                <span className={`text-[10px] md:text-xs font-semibold px-1.5 md:px-2 py-0.5 rounded-full ${s.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                  {s.up ? "↑" : "↓"} {s.change}
                </span>
              )}
            </div>
            <p className="text-xl md:text-2xl font-black text-slate-800 mb-0.5">{s.value}</p>
            <p className="text-[10px] md:text-xs text-slate-400 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {hasPerm("view_campaigns") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <button
            onClick={() => navigate("/admin/campaigns/email")}
            className="flex items-center gap-3 md:gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-5 hover:shadow-md hover:border-blue-200 transition-all text-left group"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl md:text-2xl group-hover:bg-blue-100 transition-colors flex-shrink-0">✉️</div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Email Campaigns</p>
              <p className="text-xs text-slate-400 mt-0.5">Bulk email campaigns manage karo</p>
            </div>
            <span className="ml-auto text-slate-300 group-hover:text-blue-400 transition-colors text-lg">→</span>
          </button>
          <button
            onClick={() => navigate("/admin/campaigns/whatsapp")}
            className="flex items-center gap-3 md:gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-5 hover:shadow-md hover:border-green-200 transition-all text-left group"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl md:text-2xl group-hover:bg-green-100 transition-colors flex-shrink-0">💬</div>
            <div>
              <p className="font-bold text-slate-800 text-sm">WhatsApp Campaigns</p>
              <p className="text-xs text-slate-400 mt-0.5">Bulk WhatsApp messages bhejo</p>
            </div>
            <span className="ml-auto text-slate-300 group-hover:text-green-400 transition-colors text-lg">→</span>
          </button>
        </div>
      )}

      {hasPerm("view_charts") && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div className="md:col-span-2 bg-white rounded-2xl p-4 md:p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-sm md:text-base">Email Performance</h3>
                <p className="text-xs text-slate-400">Monthly emails sent — 2026</p>
              </div>
              <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-2 md:px-3 py-1 rounded-full">This Year</span>
            </div>
            <div className="flex items-end gap-0.5 md:gap-1 h-16 md:h-20">
              {[65, 78, 55, 90, 72, 88, 95, 60, 82, 74, 91, 85].map((v, i) => (
                <div key={i} className="flex-1 rounded-t transition-all duration-300 hover:opacity-80"
                  style={{
                    height: `${(v / 95) * 100}%`,
                    background: i === new Date().getMonth()
                      ? "linear-gradient(180deg,#6366f1,#8b5cf6)"
                      : "linear-gradient(180deg,#e0e7ff,#c7d2fe)",
                  }}
                />
              ))}
            </div>
            <div className="flex mt-2">
              {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
                <span key={i} className="flex-1 text-center text-[9px] text-slate-300">{m}</span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-1 text-sm md:text-base">Open Rate</h3>
            <p className="text-xs text-slate-400 mb-4">Last campaign</p>
            <div className="flex flex-col items-center gap-4">
              <DonutChart opened={5488} sent={12400} />
              <div className="w-full space-y-2">
                {[
                  { label: "Opened", value: "5,488", color: "#6366f1" },
                  { label: "Not Opened", value: "6,912", color: "#e0e7ff" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: row.color }} />
                      <span className="text-xs text-slate-500">{row.label}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`grid gap-3 md:gap-4 ${role === "SUPER_ADMIN" ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1"}`}>
        {hasPerm("view_last_campaigns") && (
          <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden ${role === "SUPER_ADMIN" ? "lg:col-span-2" : ""}`}>
            <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 border-b border-slate-50">
              <h3 className="font-bold text-slate-800 text-sm md:text-base">Recent Campaigns</h3>
              <button onClick={() => navigate("/admin/campaigns/email")} className="text-xs text-indigo-500 font-semibold hover:underline">View All →</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="border-b border-slate-50 bg-slate-50">
                    {["Campaign", "Status", "Sent", "Opened", "CTR", "Date"].map(h => (
                      <th key={h} className="px-4 md:px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c, i) => {
                    const sc = statusColors[c.status] || statusColors.Draft;
                    return (
                      <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-4 md:px-5 py-3 font-semibold text-slate-700 max-w-[130px] truncate text-xs md:text-sm">{c.name}</td>
                        <td className="px-4 md:px-5 py-3"><span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: sc.bg, color: sc.text }}>{c.status}</span></td>
                        <td className="px-4 md:px-5 py-3 text-slate-500 text-xs">{c.sent.toLocaleString()}</td>
                        <td className="px-4 md:px-5 py-3 text-slate-500 text-xs">{c.opened.toLocaleString()}</td>
                        <td className="px-4 md:px-5 py-3 font-semibold text-indigo-600 text-xs">{c.ctr}</td>
                        <td className="px-4 md:px-5 py-3 text-slate-400 text-xs">{c.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {role === "SUPER_ADMIN" && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 border-b border-slate-50">
              <h3 className="font-bold text-slate-800 text-sm md:text-base">Audit Log</h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-semibold animate-pulse">Live</span>
            </div>
            <div className="divide-y divide-slate-50">
              {MOCK_AUDIT.map((log, i) => (
                <div key={i} className="px-4 md:px-5 py-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-700">{log.action}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{log.user}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[10px] bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded-full font-medium">{log.module}</span>
                      <p className="text-[10px] text-slate-300 mt-1">{log.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {role === "BUSINESS_ADMIN" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-4 md:px-5 py-3 md:py-4 border-b border-slate-50">
            <h3 className="font-bold text-slate-800 text-sm md:text-base">Team Members</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {MOCK_TEAM.map((u, i) => {
              const rc2 = roleConfig[u.role];
              const sc2 = statusColors[u.status];
              return (
                <div key={i} className="flex items-center justify-between px-4 md:px-5 py-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                      {u.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{u.name}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ background: rc2?.bg, color: rc2?.color }}>{rc2?.label}</span>
                    <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ background: sc2?.bg, color: sc2?.text }}>{u.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {hasPerm("view_purchase") && (
        <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 text-sm md:text-base">Revenue Overview</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl md:text-3xl font-black text-slate-800">₹4,21,800</p>
              <p className="text-xs text-slate-400 mt-0.5">Total this month</p>
            </div>
            <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">↑ +22%</span>
          </div>
          <div className="space-y-2">
            {[
              { label: "New subscriptions", value: "₹1,84,000", pct: 44 },
              { label: "Renewals", value: "₹2,10,000", pct: 50 },
              { label: "Add-ons", value: "₹27,800", pct: 6 },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3 text-xs">
                <div className="w-28 md:w-32 text-slate-500 flex-shrink-0">{row.label}</div>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${row.pct}%` }} />
                </div>
                <div className="w-20 text-right font-semibold text-slate-700">{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {role === "VIEWER" && (
        <div className="bg-pink-50 border border-pink-100 rounded-2xl p-4 md:p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-xl flex-shrink-0">👁️</div>
          <div>
            <p className="font-semibold text-pink-800 text-sm md:text-base">Read-Only Access</p>
            <p className="text-xs md:text-sm text-pink-600 mt-0.5">Analytics आणि reports बघता येतात. More access साठी Business Admin शी संपर्क करा.</p>
          </div>
        </div>
      )}
    </div>
  );
}