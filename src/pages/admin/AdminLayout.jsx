// frontend/pages/admin/AdminLayout.jsx
// Settings + Contacts integrated inside AdminLayout

import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

import AdminSidebar, { roleConfig } from "./AdminSidebar";

import EmailCampaigns    from "../campagins/EmailCampagins";
import WhatsAppCampaigns from "../campagins/WhatsappCampagins";

import EmailTemplates    from "../templates/Tamplates";
import WhatsAppTemplates from "../templates/WhatsappTamplates";

import Settings  from "../settings/Settings";
import Contacts  from "../contacts/Contacts";

import { ROLE_PERMISSIONS_MAP } from "../auth/AuthContext";

// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDER
// ─────────────────────────────────────────────────────────────────────────────
function PlaceholderPage({ title, icon }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-2xl font-black text-slate-700 mb-2">{title}</h2>
      <p className="text-slate-400 text-sm">हे page येईल. Coming soon...</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACCESS DENIED
// ─────────────────────────────────────────────────────────────────────────────
function AccessDenied() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="text-2xl font-black text-slate-700 mb-2">Access Denied</h2>
      <p className="text-slate-400 text-sm mb-6 max-w-xs">
        तुमच्या role ला हे page access करण्याची permission नाही.
      </p>
      <button
        onClick={() => navigate("/admin")}
        className="px-6 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity"
        style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
      >
        Dashboard वर जा →
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────
const MOCK_STATS = {
  SUPER_ADMIN: [
    { label: "Total Companies",   value: "142",   change: "+12",   up: true,  icon: "🏢", color: "#6366f1" },
    { label: "Total Users",       value: "3,847", change: "+234",  up: true,  icon: "👥", color: "#10b981" },
    { label: "Emails Sent Today", value: "1.2M",  change: "+18%",  up: true,  icon: "📧", color: "#06b6d4" },
    { label: "Active Plans",      value: "89",    change: "-3",    up: false, icon: "💳", color: "#f59e0b" },
    { label: "Monthly Revenue",   value: "₹4.2L", change: "+22%",  up: true,  icon: "💰", color: "#8b5cf6" },
    { label: "System Uptime",     value: "99.9%", change: "stable",up: true,  icon: "🔧", color: "#ec4899" },
  ],
  BUSINESS_ADMIN: [
    { label: "Campaigns",          value: "24",     change: "+3",   up: true, icon: "📢", color: "#6366f1" },
    { label: "Contacts",           value: "12,430", change: "+890", up: true, icon: "👤", color: "#10b981" },
    { label: "Emails Sent",        value: "98,210", change: "+12%", up: true, icon: "📧", color: "#06b6d4" },
    { label: "Open Rate",          value: "44%",    change: "+6%",  up: true, icon: "📬", color: "#f59e0b" },
    { label: "Team Members",       value: "8",      change: "+1",   up: true, icon: "🧑‍💼", color: "#8b5cf6" },
    { label: "Automations Active", value: "5",      change: "+2",   up: true, icon: "⚙️", color: "#ec4899" },
  ],
  MARKETING_MANAGER: [
    { label: "My Campaigns",     value: "9",      change: "+2",   up: true, icon: "📢", color: "#6366f1" },
    { label: "Contacts Managed", value: "4,200",  change: "+310", up: true, icon: "👤", color: "#10b981" },
    { label: "Emails Sent",      value: "41,000", change: "+8%",  up: true, icon: "📧", color: "#06b6d4" },
    { label: "Click Rate",       value: "11%",    change: "+2%",  up: true, icon: "🖱️", color: "#f59e0b" },
  ],
  VIEWER: [
    { label: "Total Campaigns", value: "24",     change: "", up: true, icon: "📊", color: "#6366f1" },
    { label: "Total Sent",      value: "98,210", change: "", up: true, icon: "📧", color: "#06b6d4" },
    { label: "Avg Open Rate",   value: "44%",    change: "", up: true, icon: "📬", color: "#10b981" },
    { label: "Avg CTR",         value: "11%",    change: "", up: true, icon: "🖱️", color: "#f59e0b" },
  ],
};

const MOCK_CAMPAIGNS = [
  { name: "Summer Sale 2026",  status: "Sent",      sent: 12400, opened: 5488, ctr: "11.2%", date: "20 Mar 2026" },
  { name: "Welcome Series",    status: "Active",    sent: 3200,  opened: 1920, ctr: "8.4%",  date: "18 Mar 2026" },
  { name: "Product Launch",    status: "Scheduled", sent: 0,     opened: 0,    ctr: "—",     date: "28 Mar 2026" },
  { name: "Re-engagement Q1",  status: "Draft",     sent: 0,     opened: 0,    ctr: "—",     date: "—"           },
  { name: "Newsletter March",  status: "Sent",      sent: 8900,  opened: 3916, ctr: "9.8%",  date: "15 Mar 2026" },
];

const MOCK_AUDIT = [
  { user: "rahul@acme.com", action: "Campaign Created",     module: "Campaigns",  time: "2 min ago"  },
  { user: "priya@acme.com", action: "Contacts Uploaded",    module: "Contacts",   time: "15 min ago" },
  { user: "superadmin",     action: "Plan Updated",         module: "Billing",    time: "1 hr ago"   },
  { user: "amit@acme.com",  action: "Template Saved",       module: "Templates",  time: "2 hr ago"   },
  { user: "rahul@acme.com", action: "Automation Activated", module: "Automation", time: "3 hr ago"   },
];

const MOCK_TEAM = [
  { name: "Priya Patil",    email: "priya@acme.com", role: "MARKETING_MANAGER", status: "Active"   },
  { name: "Amit Desai",     email: "amit@acme.com",  role: "MARKETING_MANAGER", status: "Active"   },
  { name: "Sneha Kulkarni", email: "sneha@acme.com", role: "VIEWER",            status: "Inactive" },
];

const statusColors = {
  Sent:      { bg: "#d1fae5", text: "#065f46" },
  Active:    { bg: "#dbeafe", text: "#1e40af" },
  Scheduled: { bg: "#fef3c7", text: "#92400e" },
  Draft:     { bg: "#f1f5f9", text: "#475569" },
  Inactive:  { bg: "#fee2e2", text: "#991b1b" },
};

const roleBanners = {
  SUPER_ADMIN:       { title: "Platform Overview",  subtitle: "Full control over the entire MailDoll platform.",        gradient: "linear-gradient(135deg,#4f46e5,#7c3aed)", icon: "👑" },
  BUSINESS_ADMIN:    { title: "Business Dashboard", subtitle: "Manage your company's campaigns, contacts, and team.",   gradient: "linear-gradient(135deg,#10b981,#059669)", icon: "🏢" },
  MARKETING_MANAGER: { title: "Campaign Hub",       subtitle: "Create, schedule, and track your marketing campaigns.",  gradient: "linear-gradient(135deg,#f59e0b,#d97706)", icon: "🎯" },
  VIEWER:            { title: "Analytics View",     subtitle: "Read-only access to reports and campaign analytics.",    gradient: "linear-gradient(135deg,#ec4899,#be185d)", icon: "📊" },
};

// ─────────────────────────────────────────────────────────────────────────────
// DONUT CHART
// ─────────────────────────────────────────────────────────────────────────────
function DonutChart({ opened, sent }) {
  const pct    = sent > 0 ? Math.round((opened / sent) * 100) : 0;
  const r      = 34;
  const circ   = 2 * Math.PI * r;
  const stroke = (pct / 100) * circ;
  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg viewBox="0 0 80 80" className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#e0e7ff" strokeWidth="10" />
        <circle cx="40" cy="40" r={r} fill="none" stroke="#6366f1" strokeWidth="10"
          strokeDasharray={`${stroke} ${circ}`} strokeLinecap="round" />
      </svg>
      <span className="text-lg font-black text-slate-800">{pct}%</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD PAGE
// ─────────────────────────────────────────────────────────────────────────────
function DashboardPage() {
  const { user, hasPerm } = useAuth();
  const role      = user?.role || "VIEWER";
  const banner    = roleBanners[role];
  const stats     = MOCK_STATS[role] || [];
  const rc        = roleConfig[role] || roleConfig.VIEWER;
  const campaigns = role === "MARKETING_MANAGER" ? MOCK_CAMPAIGNS.slice(0, 3) : MOCK_CAMPAIGNS;
  const navigate  = useNavigate();

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden p-5 md:p-6 text-white" style={{ background: banner.gradient }}>
        <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-6xl md:text-7xl opacity-15 select-none pointer-events-none">{banner.icon}</div>
        <p className="text-[11px] font-bold uppercase tracking-widest opacity-60 mb-1">{rc.label}</p>
        <h2 className="text-lg md:text-xl font-black mb-1">{banner.title}</h2>
        <p className="text-sm opacity-70 max-w-xs">{banner.subtitle}</p>
      </div>

      {/* Stats */}
      <div className={`grid gap-3 md:gap-4 ${stats.length <= 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"}`}>
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-3 md:p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-base md:text-lg"
                style={{ background: s.color + "18" }}>{s.icon}</div>
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

      {/* Campaign Quick Access */}
      {hasPerm("view_campaigns") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <button onClick={() => navigate("/admin/campaigns/email")}
            className="flex items-center gap-3 md:gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-5 hover:shadow-md hover:border-blue-200 transition-all text-left group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl md:text-2xl group-hover:bg-blue-100 transition-colors flex-shrink-0">✉️</div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Email Campaigns</p>
              <p className="text-xs text-slate-400 mt-0.5">Bulk email campaigns manage karo</p>
            </div>
            <span className="ml-auto text-slate-300 group-hover:text-blue-400 transition-colors text-lg">→</span>
          </button>
          <button onClick={() => navigate("/admin/campaigns/whatsapp")}
            className="flex items-center gap-3 md:gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-5 hover:shadow-md hover:border-green-200 transition-all text-left group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl md:text-2xl group-hover:bg-green-100 transition-colors flex-shrink-0">💬</div>
            <div>
              <p className="font-bold text-slate-800 text-sm">WhatsApp Campaigns</p>
              <p className="text-xs text-slate-400 mt-0.5">Bulk WhatsApp messages bhejo</p>
            </div>
            <span className="ml-auto text-slate-300 group-hover:text-green-400 transition-colors text-lg">→</span>
          </button>
        </div>
      )}

      {/* Charts */}
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
              {[65,78,55,90,72,88,95,60,82,74,91,85].map((v, i) => (
                <div key={i} className="flex-1 rounded-t transition-all duration-300 hover:opacity-80"
                  style={{ height: `${(v/95)*100}%`, background: i === new Date().getMonth() ? "linear-gradient(180deg,#6366f1,#8b5cf6)" : "linear-gradient(180deg,#e0e7ff,#c7d2fe)" }} />
              ))}
            </div>
            <div className="flex mt-2">
              {["J","F","M","A","M","J","J","A","S","O","N","D"].map((m, i) => (
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
                  { label: "Opened",     value: "5,488", color: "#6366f1" },
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

      {/* Recent Campaigns + Audit */}
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
                    {["Campaign","Status","Sent","Opened","CTR","Date"].map(h => (
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

      {/* Team — Business Admin */}
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

      {/* Revenue */}
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
              { label: "Renewals",          value: "₹2,10,000", pct: 50 },
              { label: "Add-ons",           value: "₹27,800",   pct: 6  },
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

      {/* Viewer notice */}
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

// ─────────────────────────────────────────────────────────────────────────────
// USER MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────
const INITIAL_USERS = [
  { id:1, name:"Rajesh Mehta",    email:"superadmin@test.com", role:"SUPER_ADMIN",       company:"MailDoll HQ", status:"Active",   joined:"Jan 2025" },
  { id:2, name:"Rahul Sharma",    email:"admin@test.com",      role:"BUSINESS_ADMIN",    company:"Acme Corp",   status:"Active",   joined:"Feb 2026" },
  { id:3, name:"Priya Patil",     email:"manager@test.com",    role:"MARKETING_MANAGER", company:"Acme Corp",   status:"Active",   joined:"Feb 2026" },
  { id:4, name:"Sneha Kulkarni",  email:"viewer@test.com",     role:"VIEWER",            company:"Acme Corp",   status:"Inactive", joined:"Mar 2026" },
  { id:5, name:"Amit Desai",      email:"amit@techstart.com",  role:"BUSINESS_ADMIN",    company:"TechStart",   status:"Active",   joined:"Jan 2026" },
  { id:6, name:"Neha Joshi",      email:"neha@techstart.com",  role:"MARKETING_MANAGER", company:"TechStart",   status:"Active",   joined:"Mar 2026" },
];
const ROLES_LIST = ["SUPER_ADMIN","BUSINESS_ADMIN","MARKETING_MANAGER","VIEWER"];

function UserManagementPage() {
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
          <button onClick={() => setShowAdd(true)}
            className="px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-white text-sm font-bold shadow-lg hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
            + Add User
          </button>
        )}
      </div>

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

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 md:p-4 flex flex-col md:flex-row gap-3">
        <input type="text" placeholder="Search name or email..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg text-sm outline-none focus:border-indigo-400" />
        <select value={fRole} onChange={e => setFRole(e.target.value)}
          className="border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg text-sm outline-none focus:border-indigo-400">
          <option value="ALL">All Roles</option>
          {ROLES_LIST.map(r => <option key={r} value={r}>{roleConfig[r].label}</option>)}
        </select>
      </div>

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
                    className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400" />
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
                }} className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>Add User</button>
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
                <button onClick={() => { setUsers(p => p.map(u => u.id === editUser.id ? editUser : u)); setEditUser(null); }}
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>Save</button>
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
              <button onClick={() => { setUsers(p => p.filter(u => u.id !== deleteId)); setDeleteId(null); }}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold bg-red-500 hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROLES & PERMISSIONS
// ─────────────────────────────────────────────────────────────────────────────
const PERM_GROUPS = [
  { group:"Dashboard",      icon:"📊", perms:[
    { key:"view_stats",        label:"View Stats Cards"        },
    { key:"view_charts",       label:"View Charts & Graphs"    },
    { key:"view_earnings",     label:"View Revenue & Earnings" },
  ]},
  { group:"Campaigns",      icon:"📢", perms:[
    { key:"view_campaigns",      label:"View Campaigns"        },
    { key:"view_last_campaigns", label:"View Recent Campaigns" },
  ]},
  { group:"Email & SMS",    icon:"📧", perms:[
    { key:"view_last_mails",   label:"View Last Emails"    },
    { key:"view_last_sms",     label:"View Last SMS"       },
    { key:"view_gateway",      label:"View Email Gateway"  },
  ]},
  { group:"Reports",        icon:"📈", perms:[
    { key:"view_limit_report", label:"View Limit Report"       },
    { key:"view_purchase",     label:"View Purchase / Billing" },
  ]},
  { group:"Sidebar Access", icon:"🗂️", perms:[
    { key:"sidebar_subscribers", label:"Contacts / Subscribers" },
    { key:"sidebar_templates",   label:"Templates"              },
    { key:"sidebar_reports",     label:"Reports"                },
    { key:"sidebar_settings",    label:"Settings"               },
    { key:"sidebar_roles",       label:"Roles & Permissions"    },
  ]},
  { group:"Administration", icon:"⚙️", perms:[
    { key:"can_edit_roles", label:"Can Edit Roles" },
  ]},
];

function RolesPermissionsPage() {
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
                    <button onClick={() => setPerms(p => ({...p, [activeRole]: {...ROLE_PERMISSIONS_MAP[activeRole].permissions}}))}
                      className="text-xs text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Reset</button>
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
                          <button onClick={() => toggle(activeRole, key)} disabled={!canEdit || isLocked}
                            className={`relative inline-flex items-center w-10 md:w-11 h-5 md:h-6 rounded-full transition-all duration-200 ${(!canEdit || isLocked) ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                            style={{ background: isOn ? "#6366f1" : "#e2e8f0" }}>
                            <span className="inline-block w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-white shadow transition-transform duration-200"
                              style={{ transform: isOn ? "translateX(20px)" : "translateX(3px)" }} />
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

// ─────────────────────────────────────────────────────────────────────────────
// TOP HEADER
// ─────────────────────────────────────────────────────────────────────────────
function TopHeader({ onMenuToggle }) {
  const { user }  = useAuth();
  const location  = useLocation();
  const role      = user?.role || "VIEWER";
  const rc        = roleConfig[role] || roleConfig.VIEWER;

  const pathTitles = {
    "/admin":                    "Dashboard",
    "/admin/campaigns":          "Campaigns",
    "/admin/campaigns/email":    "Email Campaigns",
    "/admin/campaigns/whatsapp": "WhatsApp Campaigns",
    "/admin/templates":          "Templates",
    "/admin/templates/email":    "Email Templates",
    "/admin/templates/whatsapp": "WhatsApp Templates",
    "/admin/contacts":           "Contacts",
    "/admin/automation":         "Automation",
    "/admin/reports":            "Reports",
    "/admin/users":              "User Management",
    "/admin/roles":              "Roles & Permissions",
    "/admin/subscription":       "Subscription",
    "/admin/settings":           "Settings",
  };
  const title = pathTitles[location.pathname] || "Dashboard";

  return (
    <header className="flex items-center justify-between px-4 md:px-5 py-3 bg-white border-b border-slate-100 sticky top-0 z-30 flex-shrink-0">
      <div className="flex items-center gap-2 md:gap-3">
        <button onClick={onMenuToggle}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all text-sm">
          ☰
        </button>
        <h1 className="font-black text-slate-800 text-sm md:text-[15px] truncate max-w-[140px] sm:max-w-none">{title}</h1>
      </div>
      <div className="flex items-center gap-1.5 md:gap-2">
        <button className="relative w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all text-base">
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-all">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg,${rc.color},${rc.color}99)` }}>
            {user?.email?.[0]?.toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <p className="text-[11px] font-bold text-slate-700 leading-none">{user?.email?.split("@")[0]}</p>
            <p className="text-[10px] font-semibold mt-0.5" style={{ color: rc.color }}>{rc.label}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN LAYOUT — MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function AdminLayout() {
  const { user, hasPerm } = useAuth();
  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar — Desktop */}
      <div className="hidden md:flex h-full">
        <AdminSidebar collapsed={collapsed} />
      </div>

      {/* Sidebar — Mobile Drawer */}
      <div
        className={`fixed left-0 top-0 h-full z-50 md:hidden transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ width: "236px" }}
      >
        <AdminSidebar collapsed={false} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopHeader onMenuToggle={() => {
          if (window.innerWidth < 768) setMobileOpen(o => !o);
          else setCollapsed(c => !c);
        }} />

        <main className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6">
          <Routes>
            <Route index element={<DashboardPage />} />

            {/* Campaigns */}
            <Route path="campaigns" element={
              hasPerm("view_campaigns") ? <Navigate to="/admin/campaigns/email" replace /> : <AccessDenied />
            } />
            <Route path="campaigns/email" element={
              hasPerm("view_campaigns") ? <EmailCampaigns /> : <AccessDenied />
            } />
            <Route path="campaigns/whatsapp" element={
              hasPerm("view_campaigns") ? <WhatsAppCampaigns /> : <AccessDenied />
            } />

            {/* Templates */}
            <Route path="templates" element={
              hasPerm("sidebar_templates") ? <Navigate to="/admin/templates/email" replace /> : <AccessDenied />
            } />
            <Route path="templates/email" element={
              hasPerm("sidebar_templates") ? <EmailTemplates /> : <AccessDenied />
            } />
            <Route path="templates/whatsapp" element={
              hasPerm("sidebar_templates") ? <WhatsAppTemplates /> : <AccessDenied />
            } />

            {/* Contacts */}
            <Route path="contacts" element={
              hasPerm("sidebar_subscribers") ? <Contacts /> : <AccessDenied />
            } />

            <Route path="automation"   element={hasPerm("view_campaigns")  ? <PlaceholderPage title="Automation"    icon="⚙️" /> : <AccessDenied />} />
            <Route path="reports"      element={hasPerm("sidebar_reports") ? <PlaceholderPage title="Reports"       icon="📈" /> : <AccessDenied />} />
            <Route path="users"        element={hasPerm("sidebar_roles")   ? <UserManagementPage />                 : <AccessDenied />} />
            <Route path="roles"        element={hasPerm("sidebar_roles")   ? <RolesPermissionsPage />               : <AccessDenied />} />
            <Route path="subscription" element={hasPerm("view_purchase")   ? <PlaceholderPage title="Subscription"  icon="💳" /> : <AccessDenied />} />

            {/* Settings */}
            <Route path="settings" element={
              hasPerm("sidebar_settings") ? <Settings /> : <AccessDenied />
            } />

            <Route path="*" element={<AccessDenied />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}