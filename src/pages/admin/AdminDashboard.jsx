// src/admin/AdminDashboard.jsx
import React from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Users, Mail, Send, BarChart3, TrendingUp, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../admin/Languagecontext";

const lineData = [
  { month: "Jan", emails: 5, sms: 2 }, { month: "Feb", emails: 12, sms: 5 },
  { month: "Mar", emails: 24, sms: 8 }, { month: "Apr", emails: 18, sms: 12 },
  { month: "May", emails: 30, sms: 18 },
];
const barData = [
  { name: "Recipients", value: 151 }, { name: "Delivered", value: 134 },
  { name: "Clicked", value: 8 }, { name: "Failed", value: 17 }, { name: "Bounced", value: 17 },
];
const statusStyle = { Sent: "bg-emerald-100 text-emerald-700", Draft: "bg-slate-100 text-slate-500", Sending: "bg-blue-100 text-blue-600" };
const campaigns = [
  { name: "Spring Sale 2026", status: "Sent",    open: "68%", click: "24%", color: "#6366f1" },
  { name: "Newsletter March", status: "Sent",    open: "54%", click: "18%", color: "#10b981" },
  { name: "Product Launch",   status: "Draft",   open: "—",   click: "—",   color: "#f59e0b" },
  { name: "Re-engagement",    status: "Sending", open: "32%", click: "11%", color: "#ec4899" },
];

export default function AdminDashboard() {
  const { t } = useLanguage();

  const cards = [
    { titleKey: "total_users",       value: "1,245", icon: Users,    color: "from-indigo-500 to-indigo-600",   bg: "bg-indigo-50",  text: "text-indigo-600"  },
    { titleKey: "total_contacts",    value: "8,932", icon: Mail,     color: "from-pink-500 to-pink-600",      bg: "bg-pink-50",    text: "text-pink-600"    },
    { titleKey: "total_campaigns",   value: "342",   icon: BarChart3, color: "from-purple-500 to-purple-600", bg: "bg-purple-50",  text: "text-purple-600"  },
    { titleKey: "emails_sent_today", value: "1,876", icon: Send,     color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50", text: "text-emerald-600" },
  ];

  const quickStats = [
    { labelKey: "sent_this_month", value: "24", accent: "bg-indigo-500"  },
    { labelKey: "bounced",         value: "0",  accent: "bg-red-400"     },
    { labelKey: "subscribers",     value: "1",  accent: "bg-emerald-500" },
    { labelKey: "sms_sent",        value: "0",  accent: "bg-amber-400"   },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">{t("dashboard_overview")}</h1>
          <p className="text-xs text-slate-400 mt-0.5">{t("welcome_msg")}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-xl self-start sm:self-auto">
          <TrendingUp size={13} className="text-indigo-500" />
          <span>March 2026</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className={`p-3.5 sm:p-5 rounded-2xl border shadow-sm ${card.bg} hover:shadow-md transition-all`}>
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-sm`}>
                  <Icon size={15} />
                </div>
                <span className={`text-[10px] font-bold ${card.text} bg-white px-1.5 py-0.5 rounded-lg flex items-center gap-0.5`}>
                  <ArrowUpRight size={9} />+12%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">{t(card.titleKey)}</p>
              <h2 className="text-lg sm:text-2xl font-bold text-slate-800 mt-0.5">{card.value}</h2>
              <div className="mt-3 h-1 w-full bg-white/70 rounded-full overflow-hidden">
                <div className={`h-full w-3/4 bg-gradient-to-r ${card.color} rounded-full`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-700">{t("email_analytics")}</h2>
              <p className="text-[11px] text-slate-400">{t("last_5_months")}</p>
            </div>
            <div className="flex gap-3 text-[10px] text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>Email</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>SMS</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={185}>
            <LineChart data={lineData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "none", fontSize: 12 }} />
              <Line type="monotone" dataKey="emails" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="sms" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-slate-700">{t("campaign_report")}</h2>
            <p className="text-[11px] text-slate-400">{t("last_campaign_stats")}</p>
          </div>
          <ResponsiveContainer width="100%" height={185}>
            <BarChart data={barData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "none", fontSize: 12 }} />
              <Bar dataKey="value" fill="#6366f1" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickStats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border shadow-sm p-3.5 sm:p-4">
            <div className={`w-1 h-7 rounded-full ${s.accent} mb-2.5`}></div>
            <div className="text-xl font-bold text-slate-800">{s.value}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{t(s.labelKey)}</div>
          </div>
        ))}
      </div>

      {/* Recent Campaigns */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t("recent_campaigns")}</h2>
          <span className="text-xs text-indigo-500 cursor-pointer hover:underline">{t("view_all")}</span>
        </div>
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  {[t("campaign_col"), t("status"), t("open_rate"), t("click_rate")].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 last:border-0 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0"
                          style={{ background: c.color + "20", color: c.color }}>✉</div>
                        <span className="font-medium text-slate-700 text-[13px]">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyle[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-semibold text-[13px]">{c.open}</td>
                    <td className="py-3 px-4 text-slate-600 font-semibold text-[13px]">{c.click}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile */}
          <div className="sm:hidden divide-y divide-slate-50">
            {campaigns.map((c, i) => (
              <div key={i} className="p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: c.color + "20", color: c.color }}>✉</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-700 text-sm truncate">{c.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[c.status]}`}>{c.status}</span>
                    {c.open !== "—" && <span className="text-[10px] text-slate-400">Open: {c.open}</span>}
                  </div>
                </div>
                {c.click !== "—" && <div className="text-xs font-bold text-indigo-500 flex-shrink-0">{c.click}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}