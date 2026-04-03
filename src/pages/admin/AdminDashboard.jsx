import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";

const MOCK_STATS = {
  SUPER_ADMIN: [
    { label: "Total Companies",  value: "142",    change: "+12",  up: true,  icon: "🏢", color: "#6366f1" },
    { label: "Total Users",      value: "3,847",  change: "+234", up: true,  icon: "👥", color: "#10b981" },
    { label: "Emails Sent Today",value: "1.2M",   change: "+18%", up: true,  icon: "📧", color: "#06b6d4" },
    { label: "Active Plans",     value: "89",     change: "-3",   up: false, icon: "💳", color: "#f59e0b" },
    { label: "Monthly Revenue",  value: "₹4.2L",  change: "+22%", up: true,  icon: "💰", color: "#8b5cf6" },
    { label: "System Uptime",    value: "99.9%",  change: "stable",up: true, icon: "🔧", color: "#ec4899" },
  ],
  BUSINESS_ADMIN: [
    { label: "Campaigns",        value: "24",     change: "+3",   up: true,  icon: "📢", color: "#6366f1" },
    { label: "Contacts",         value: "12,430", change: "+890", up: true,  icon: "👤", color: "#10b981" },
    { label: "Emails Sent",      value: "98,210", change: "+12%", up: true,  icon: "📧", color: "#06b6d4" },
    { label: "Open Rate",        value: "44%",    change: "+6%",  up: true,  icon: "📬", color: "#f59e0b" },
    { label: "Team Members",     value: "8",      change: "+1",   up: true,  icon: "🧑‍💼", color: "#8b5cf6" },
    { label: "Automation Active",value: "5",      change: "+2",   up: true,  icon: "⚙️", color: "#ec4899" },
  ],
  MARKETING_MANAGER: [
    { label: "My Campaigns",     value: "9",      change: "+2",   up: true,  icon: "📢", color: "#6366f1" },
    { label: "Contacts Managed", value: "4,200",  change: "+310", up: true,  icon: "👤", color: "#10b981" },
    { label: "Emails Sent",      value: "41,000", change: "+8%",  up: true,  icon: "📧", color: "#06b6d4" },
    { label: "Click Rate",       value: "11%",    change: "+2%",  up: true,  icon: "🖱️", color: "#f59e0b" },
  ],
  VIEWER: [
    { label: "Campaigns Viewed", value: "24",     change: "",     up: true,  icon: "📊", color: "#6366f1" },
    { label: "Total Sent",       value: "98,210", change: "",     up: true,  icon: "📧", color: "#06b6d4" },
    { label: "Avg Open Rate",    value: "44%",    change: "",     up: true,  icon: "📬", color: "#10b981" },
    { label: "Avg CTR",          value: "11%",    change: "",     up: true,  icon: "🖱️", color: "#f59e0b" },
  ],
};

const MOCK_CAMPAIGNS = [
  { name: "Summer Sale 2026",      status: "Sent",     sent: 12400, opened: 5488, ctr: "11.2%", date: "20 Mar 2026" },
  { name: "Welcome Series",        status: "Active",   sent: 3200,  opened: 1920, ctr: "8.4%",  date: "18 Mar 2026" },
  { name: "Product Launch",        status: "Scheduled",sent: 0,     opened: 0,    ctr: "—",     date: "28 Mar 2026" },
  { name: "Re-engagement Q1",      status: "Draft",    sent: 0,     opened: 0,    ctr: "—",     date: "—"          },
  { name: "Newsletter March",      status: "Sent",     sent: 8900,  opened: 3916, ctr: "9.8%",  date: "15 Mar 2026" },
];

const MOCK_USERS = [
  { name: "Rahul Sharma",   email: "rahul@acme.com",    role: "BUSINESS_ADMIN",    status: "Active",   joined: "Jan 2026" },
  { name: "Priya Patil",    email: "priya@acme.com",    role: "MARKETING_MANAGER", status: "Active",   joined: "Feb 2026" },
  { name: "Amit Desai",     email: "amit@acme.com",     role: "MARKETING_MANAGER", status: "Active",   joined: "Feb 2026" },
  { name: "Sneha Kulkarni", email: "sneha@acme.com",    role: "VIEWER",            status: "Inactive", joined: "Mar 2026" },
];

const MOCK_AUDIT = [
  { user: "rahul@acme.com", action: "Campaign Created",      module: "Campaigns",  time: "2 min ago" },
  { user: "priya@acme.com", action: "Contacts Uploaded",     module: "Contacts",   time: "15 min ago" },
  { user: "superadmin",     action: "Plan Updated",          module: "Billing",    time: "1 hr ago" },
  { user: "amit@acme.com",  action: "Template Saved",        module: "Templates",  time: "2 hr ago" },
  { user: "rahul@acme.com", action: "Automation Activated",  module: "Automation", time: "3 hr ago" },
  { user: "sneha@acme.com", action: "Report Exported",       module: "Analytics",  time: "5 hr ago" },
];

const CHART_DATA = [65, 78, 55, 90, 72, 88, 95, 60, 82, 74, 91, 85];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const statusColors = {
  Sent:      { bg: "#d1fae5", text: "#065f46" },
  Active:    { bg: "#dbeafe", text: "#1e40af" },
  Scheduled: { bg: "#fef3c7", text: "#92400e" },
  Draft:     { bg: "#f1f5f9", text: "#475569" },
  Inactive:  { bg: "#fee2e2", text: "#991b1b" },
};

const roleColors = {
  SUPER_ADMIN:       { bg: "#ede9fe", text: "#5b21b6", label: "Super Admin" },
  BUSINESS_ADMIN:    { bg: "#d1fae5", text: "#065f46", label: "Business Admin" },
  MARKETING_MANAGER: { bg: "#fef3c7", text: "#92400e", label: "Marketing Mgr" },
  VIEWER:            { bg: "#fce7f3", text: "#9d174d", label: "Viewer" },
};

function MiniBarChart() {
  const max = Math.max(...CHART_DATA);
  return (
    <div className="flex items-end gap-1 h-16 mt-3">
      {CHART_DATA.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
          <div
            className="w-full rounded-t transition-all duration-300 group-hover:opacity-80"
            style={{
              height: `${(v / max) * 100}%`,
              background: i === new Date().getMonth()
                ? "linear-gradient(180deg,#6366f1,#8b5cf6)"
                : "linear-gradient(180deg,#e0e7ff,#c7d2fe)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

function DonutChart({ opened, sent }) {
  const pct    = sent > 0 ? Math.round((opened / sent) * 100) : 0;
  const r      = 36;
  const circ   = 2 * Math.PI * r;
  const stroke = (pct / 100) * circ;
  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg viewBox="0 0 88 88" className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="44" cy="44" r={r} fill="none" stroke="#e0e7ff" strokeWidth="10" />
        <circle cx="44" cy="44" r={r} fill="none" stroke="#6366f1" strokeWidth="10"
          strokeDasharray={`${stroke} ${circ}`} strokeLinecap="round" />
      </svg>
      <span className="text-xl font-black text-slate-800">{pct}%</span>
    </div>
  );
}

function StatCard({ stat }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
          style={{ background: stat.color + "18" }}>
          {stat.icon}
        </div>
        {stat.change && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            stat.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
          }`}>
            {stat.up ? "↑" : "↓"} {stat.change}
          </span>
        )}
      </div>
      <p className="text-2xl font-black text-slate-800 mb-0.5">{stat.value}</p>
      <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
    </div>
  );
}

const roleBanners = {
  SUPER_ADMIN: {
    title: "Platform Overview",
    subtitle: "You have full control over the entire MailDoll platform.",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    icon: "👑",
  },
  BUSINESS_ADMIN: {
    title: "Business Dashboard",
    subtitle: "Manage your company's campaigns, contacts, and team.",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    icon: "🏢",
  },
  MARKETING_MANAGER: {
    title: "Campaign Hub",
    subtitle: "Create, schedule, and track your marketing campaigns.",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    icon: "🎯",
  },
  VIEWER: {
    title: "Analytics View",
    subtitle: "Read-only access to reports and campaign analytics.",
    gradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    icon: "📊",
  },
};


export default function Dashboard() {
  const { user, hasPerm } = useAuth();
  const role   = user?.role || "VIEWER";
  const banner = roleBanners[role];
  const stats  = MOCK_STATS[role] || [];

  // Which campaigns to show
  const campaigns = role === "MARKETING_MANAGER"
    ? MOCK_CAMPAIGNS.slice(0, 3)
    : MOCK_CAMPAIGNS;

  return (
    <div className="space-y-6 p-1">

      <div className="relative rounded-2xl overflow-hidden p-6 text-white"
        style={{ background: banner.gradient }}>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl opacity-20 select-none">
          {banner.icon}
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-1">
          {roleColors[role]?.label}
        </p>
        <h1 className="text-2xl font-black mb-1">{banner.title}</h1>
        <p className="text-sm opacity-75">{banner.subtitle}</p>
      </div>

      <div className={`grid gap-4 ${
        stats.length <= 4
          ? "grid-cols-2 md:grid-cols-4"
          : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
      }`}>
        {stats.map((s, i) => <StatCard key={i} stat={s} />)}
      </div>

      {hasPerm("view_charts") && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Email Performance Bar Chart */}
          <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <div>
                <h3 className="font-bold text-slate-800">Email Performance</h3>
                <p className="text-xs text-slate-400">Monthly emails sent — 2026</p>
              </div>
              <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-3 py-1 rounded-full">
                This Year
              </span>
            </div>
            <MiniBarChart />
            <div className="flex gap-4 mt-3">
              {MONTHS.map((m, i) => (
                <span key={i} className="flex-1 text-center text-[9px] text-slate-300">{m}</span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-800 mb-1">Open Rate</h3>
            <p className="text-xs text-slate-400 mb-4">Last campaign average</p>
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <DonutChart opened={5488} sent={12400} />
              <div className="w-full space-y-2">
                {[
                  { label: "Opened",      value: "5,488", color: "#6366f1" },
                  { label: "Not Opened",  value: "6,912", color: "#e0e7ff" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                      <span className="text-xs text-slate-500">{r.label}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`grid gap-4 ${
        hasPerm("view_last_campaigns") && role === "SUPER_ADMIN"
          ? "grid-cols-1 lg:grid-cols-3"
          : "grid-cols-1"
      }`}>

        {hasPerm("view_last_campaigns") && (
          <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden ${
            role === "SUPER_ADMIN" ? "lg:col-span-2" : ""
          }`}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Recent Campaigns</h3>
              <span className="text-xs text-indigo-500 font-semibold cursor-pointer hover:underline">
                View All →
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-50">
                    {["Campaign", "Status", "Sent", "Opened", "CTR", "Date"].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c, i) => {
                    const sc = statusColors[c.status] || statusColors.Draft;
                    return (
                      <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3 font-semibold text-slate-700 max-w-[160px] truncate">{c.name}</td>
                        <td className="px-5 py-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                            style={{ background: sc.bg, color: sc.text }}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-slate-600">{c.sent.toLocaleString()}</td>
                        <td className="px-5 py-3 text-slate-600">{c.opened.toLocaleString()}</td>
                        <td className="px-5 py-3 font-semibold text-indigo-600">{c.ctr}</td>
                        <td className="px-5 py-3 text-slate-400 text-xs">{c.date}</td>
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
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Audit Log</h3>
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-medium">Live</span>
            </div>
            <div className="divide-y divide-slate-50">
              {MOCK_AUDIT.map((log, i) => (
                <div key={i} className="px-5 py-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-700">{log.action}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{log.user}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[10px] bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded-full font-medium">
                        {log.module}
                      </span>
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
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Team Members</h3>
            <span className="text-xs text-indigo-500 font-semibold cursor-pointer hover:underline">
              Manage →
            </span>
          </div>
          <div className="divide-y divide-slate-50">
            {MOCK_USERS.map((u, i) => {
              const rc = roleColors[u.role];
              const sc = statusColors[u.status];
              return (
                <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                      {u.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{u.name}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ background: rc?.bg, color: rc?.text }}>
                      {rc?.label}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ background: sc?.bg, color: sc?.text }}>
                      {u.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {hasPerm("view_purchase") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Subscription Plans</h3>
            <div className="space-y-3">
              {[
                { plan: "Starter",    companies: 34, color: "#10b981" },
                { plan: "Growth",     companies: 58, color: "#6366f1" },
                { plan: "Enterprise", companies: 27, color: "#f59e0b" },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-slate-600">{p.plan}</span>
                      <span className="text-slate-400">{p.companies} companies</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${(p.companies / 119) * 100}%`, background: p.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Revenue Overview</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-black text-slate-800">₹4,21,800</p>
                <p className="text-xs text-slate-400 mt-0.5">Total this month</p>
              </div>
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                ↑ +22%
              </span>
            </div>
            <div className="space-y-2">
              {[
                { label: "New subscriptions", value: "₹1,84,000", pct: 44 },
                { label: "Renewals",          value: "₹2,10,000", pct: 50 },
                { label: "Add-ons",           value: "₹27,800",   pct: 6  },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <div className="w-24 text-slate-500">{r.label}</div>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${r.pct}%` }} />
                  </div>
                  <div className="w-20 text-right font-semibold text-slate-700">{r.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {role === "VIEWER" && (
        <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-xl flex-shrink-0">
            👁️
          </div>
          <div>
            <p className="font-semibold text-pink-800">Read-Only Access</p>
            <p className="text-sm text-pink-600 mt-0.5">
              You can view analytics and reports. Contact your Business Admin to request additional permissions.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}