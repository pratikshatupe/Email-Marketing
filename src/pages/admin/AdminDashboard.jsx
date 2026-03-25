import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useAuth } from "../auth/AuthContext";

// ── Dashboard Data (एकच — सगळ्यांसाठी same) ───────────
const campaignReportData = [
  { name: "Recipients",   value: 151 },
  { name: "Delivered",    value: 134 },
  { name: "Click",        value: 8   },
  { name: "Unique Click", value: 7   },
  { name: "Failed",       value: 17  },
  { name: "Open",         value: 7   },
  { name: "Bounce",       value: 17  },
];
const earningsData = [{ month: "Jan", earnings: 2 }, { month: "Feb", earnings: 8 }, { month: "Mar", earnings: 12 }];
const pieEmailData = [{ name: "Sent", value: 24 }, { name: "Available", value: 76 }];
const pieSMSData   = [{ name: "Sent", value: 0  }, { name: "Available", value: 100 }];
const PIE_COLORS   = ["#6366f1", "#10b981"];
const gatewayData  = [
  { name: "Free",   value: 2, color: "#6366f1" },
  { name: "PayPal", value: 0, color: "#10b981" },
  { name: "Stripe", value: 0, color: "#f59e0b" },
];
const purchaseHistory = [
  { id: "#20268987", plan: "FREE", date: "2026-03-13", status: "PAID", color: "#84cc16" },
  { id: "#20252438", plan: "FREE", date: "2026-03-01", status: "PAID", color: "#6366f1" },
];
const lastSentMails = [
  { id: 1, email: "sheetgv@gmail.com",            date: "15 Mar, 2026", color: "#ef4444" },
  { id: 2, email: "shihabhossain639@aol.com",     date: "15 Mar, 2026", color: "#ec4899" },
  { id: 3, email: "mdshihabhossain639@gmail.com", date: "15 Mar, 2026", color: "#6366f1" },
  { id: 4, email: "mprince2k16@gmail.com",        date: "15 Mar, 2026", color: "#84cc16" },
  { id: 5, email: "queenbks.new@gmail.com",       date: "15 Mar, 2026", color: "#f97316" },
];
const lastCampaigns = [
  { id: 1, name: "Spring Sale 2026", color: "#6366f1" },
  { id: 2, name: "Newsletter March", color: "#10b981" },
  { id: 3, name: "Homepage",         color: "#84cc16" },
  { id: 4, name: "Re-engagement",    color: "#f59e0b" },
];
const sentMailData = [{ month: "Jan", sent: 5 }, { month: "Feb", sent: 12 }, { month: "Mar", sent: 24 }];
const sentSMSData  = [{ month: "Jan", sms: 0 }, { month: "Feb", sms: 0 }, { month: "Mar", sms: 0 }];

// ── Sidebar Items ───────────────────────────────────────
const SIDEBAR_ITEMS = [
  { id: "dashboard",   label: "Dashboard",          icon: "⊞", permKey: null },
  { id: "subscribers", label: "Subscribers",         icon: "👥", permKey: "sidebar_subscribers" },
  { id: "templates",   label: "Templates",           icon: "⑂",  permKey: "sidebar_templates" },
  { id: "reports",     label: "Reports",             icon: "📊", permKey: "sidebar_reports" },
  { id: "settings",    label: "Settings",            icon: "⚙️", permKey: "sidebar_settings" },
  { id: "roles",       label: "Roles & Permissions", icon: "🔐", permKey: "sidebar_roles" },
];

// ── UI Helpers ──────────────────────────────────────────
function Card({ children, className = "", dark }) {
  return (
    <div className={`rounded-2xl p-5 shadow-sm border transition-colors
      ${dark ? "bg-[#16142e] border-white/10" : "bg-white border-slate-100"} ${className}`}>
      {children}
    </div>
  );
}
function STitle({ title, dark }) {
  return <h2 className={`text-[11px] font-bold uppercase tracking-widest mb-4 ${dark ? "text-white/30" : "text-slate-400"}`}>{title}</h2>;
}
function StatCard({ icon, value, label, dark }) {
  return (
    <div className={`rounded-2xl p-4 border flex flex-col gap-1.5 hover:shadow-md transition-all
      ${dark ? "bg-[#16142e] border-white/10" : "bg-white border-slate-100"}`}>
      <span className="text-xl">{icon}</span>
      <div className={`text-lg font-bold ${dark ? "text-white/85" : "text-slate-800"}`}>{value}</div>
      <div className={`text-[10px] ${dark ? "text-white/30" : "text-slate-400"}`}>{label}</div>
    </div>
  );
}
function VMBtn({ dark }) {
  return (
    <button className={`w-full py-2 mt-2 text-xs border border-dashed rounded-xl bg-transparent cursor-pointer
      ${dark ? "text-white/25 border-white/10 hover:bg-white/5" : "text-slate-400 border-slate-200 hover:bg-slate-50"}`}>
      View More
    </button>
  );
}
// 🔒 Permission नसल्यावर दाखवायचा block
function Locked({ label, dark }) {
  return (
    <div className={`flex flex-col items-center justify-center py-7 gap-2 rounded-2xl border border-dashed mb-4
      ${dark ? "border-white/10 text-white/20" : "border-slate-200 text-slate-300"}`}>
      <span className="text-2xl">🔒</span>
      <span className="text-xs">{label} — permission नाही</span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// DASHBOARD CONTENT — hasPerm() वापरून sections show/hide
// ══════════════════════════════════════════════════════════
function DashboardContent({ dark }) {
  const { hasPerm } = useAuth(); // ← Context मधून

  const cs  = dark ? "#1e1c3a" : "#f8fafc";
  const at  = { fontSize: 10, fill: dark ? "#5a5880" : "#94a3b8" };
  const tip = { background: dark ? "#1e1b3a" : "#fff", border: "none", borderRadius: 8, color: dark ? "#e2e8f0" : "#334155" };

  return (
    <div>
      {/* Stats */}
      {hasPerm("view_stats") ? (
        <>
          <STitle title="General Report" dark={dark} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-5">
            <StatCard dark={dark} icon="✉️" value="1,009" label="Total Emails"      />
            <StatCard dark={dark} icon="▦"  value="6"     label="Email Campaigns"   />
            <StatCard dark={dark} icon="▦"  value="0"     label="SMS Campaigns"     />
            <StatCard dark={dark} icon="👥" value="4"     label="Email Groups"      />
            <StatCard dark={dark} icon="👥" value="0"     label="SMS Groups"        />
            <StatCard dark={dark} icon="⑂"  value="17"   label="Email Templates"   />
            <StatCard dark={dark} icon="⑂"  value="1"    label="SMS Templates"     />
            <StatCard dark={dark} icon="✉️" value="24"   label="Sent Emails"       />
            <StatCard dark={dark} icon="💲" value="$0.00" label="Total Expense"     />
            <StatCard dark={dark} icon="⏱" value="0"     label="Bounced"           />
            <StatCard dark={dark} icon="👤" value="2"     label="Total Customer"    />
            <StatCard dark={dark} icon="💳" value="2"     label="Total Purchased"   />
            <StatCard dark={dark} icon="⏱" value="24"    label="Total Sent Emails" />
            <StatCard dark={dark} icon="⏱" value="0"     label="Total Sent SMS"    />
            <StatCard dark={dark} icon="👤" value="1"     label="Subscribed"        />
            <StatCard dark={dark} icon="📞" value="1,005" label="Total Phone No."   />
          </div>
        </>
      ) : <Locked label="General Stats" dark={dark} />}

      {/* Charts */}
      {hasPerm("view_charts") ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {[
            { title: "Sent Mail Report", key: "sent", val: 24, data: sentMailData, dm: [0, 30] },
            { title: "Sent SMS Report",  key: "sms",  val: 0,  data: sentSMSData,  dm: [0, 5]  },
          ].map(r => (
            <Card key={r.title} dark={dark}>
              <STitle title={r.title} dark={dark} />
              <div className="flex gap-6 mb-4">
                <div><div className="text-xl font-bold text-indigo-400">{r.val}</div>
                  <div className={`text-xs ${dark ? "text-white/25" : "text-slate-400"}`}>This Month</div></div>
                <div><div className={`text-xl font-bold ${dark ? "text-white/20" : "text-slate-300"}`}>0</div>
                  <div className={`text-xs ${dark ? "text-white/25" : "text-slate-400"}`}>Last Month</div></div>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={r.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke={cs} />
                  <XAxis dataKey="month" tick={at} />
                  <YAxis tick={at} domain={r.dm} />
                  <Tooltip contentStyle={tip} />
                  <Line type="monotone" dataKey={r.key} stroke="#6366f1" strokeWidth={2} dot={{ r: 4, fill: "#6366f1" }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          ))}
        </div>
      ) : <Locked label="Mail & SMS Charts" dark={dark} />}

      {/* Campaign Report */}
      {hasPerm("view_campaigns") ? (
        <Card dark={dark} className="mb-4">
          <STitle title="Campaign Report" dark={dark} />
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={campaignReportData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={cs} horizontal={false} />
              <XAxis type="number" tick={at} domain={[0, 160]} ticks={[0, 40, 80, 120, 160]} />
              <YAxis type="category" dataKey="name" tick={at} width={85} />
              <Tooltip contentStyle={tip} />
              <Bar dataKey="value" fill="#6366f1" radius={[0, 6, 6, 0]}
                label={{ position: "insideLeft", fill: "white", fontSize: 10, fontWeight: 700 }} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      ) : <Locked label="Campaign Report" dark={dark} />}

      {/* Limit Report */}
      {hasPerm("view_limit_report") && (
        <Card dark={dark} className="mb-4">
          <STitle title="Limit Report" dark={dark} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Email Usage", data: pieEmailData, legend: ["Sent", "Available"] },
              { title: "SMS Usage",   data: pieSMSData,   legend: ["Sent", "Available"] },
            ].map(p => (
              <div key={p.title} className="flex flex-col items-center">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie data={p.data} cx="50%" cy="50%" outerRadius={70} dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(1)}%`} labelLine={false}>
                      {p.data.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                    </Pie>
                    <Tooltip contentStyle={tip} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex gap-3 text-[10px] mt-1">
                  {PIE_COLORS.map((c, i) => (
                    <span key={i} className={`flex items-center gap-1 ${dark ? "text-white/45" : ""}`}>
                      <span className="w-2 h-2 rounded-full inline-block" style={{ background: c }}></span>
                      {p.legend[i]}
                    </span>
                  ))}
                </div>
                <div className={`text-[11px] mt-1 ${dark ? "text-white/25" : "text-slate-400"}`}>{p.title}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Purchase + Gateway */}
      {hasPerm("view_purchase") && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <Card dark={dark}>
            <STitle title="Purchase History" dark={dark} />
            <div className="space-y-3">
              {purchaseHistory.map(item => (
                <div key={item.id}
                  className={`flex items-center justify-between p-3 rounded-xl border
                    ${dark ? "border-white/10 hover:bg-white/5" : "border-slate-100 hover:bg-slate-50"}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ background: item.color }}>{item.plan[0]}</div>
                    <div>
                      <div className={`text-sm font-bold ${dark ? "text-white/80" : "text-slate-800"}`}>{item.id}</div>
                      <div className={`text-xs ${dark ? "text-white/40" : "text-slate-500"}`}>{item.plan}</div>
                      <div className={`text-[11px] ${dark ? "text-white/25" : "text-slate-400"}`}>{item.date}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400">{item.status}</span>
                </div>
              ))}
              <VMBtn dark={dark} />
            </div>
          </Card>
          {hasPerm("view_gateway") && (
            <Card dark={dark}>
              <STitle title="Most Used Gateway" dark={dark} />
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={gatewayData} cx="50%" cy="50%" outerRadius={65} dataKey="value"
                    startAngle={90} endAngle={-270}>
                    {gatewayData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tip} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-4 justify-center text-[11px] mb-2">
                {gatewayData.map(g => (
                  <span key={g.name} className={`flex items-center gap-1 ${dark ? "text-white/45" : ""}`}>
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: g.color }}></span>
                    {g.name}
                  </span>
                ))}
              </div>
              {gatewayData.map(g => (
                <div key={g.name} className={`flex justify-between text-sm py-0.5 ${dark ? "text-white/45" : "text-slate-500"}`}>
                  <span>{g.name}</span><span className="font-bold">{g.value}</span>
                </div>
              ))}
            </Card>
          )}
        </div>
      )}

      {/* Earnings */}
      {hasPerm("view_earnings") ? (
        <Card dark={dark} className="mb-4">
          <STitle title="Total Earnings ($12.00)" dark={dark} />
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={cs} />
              <XAxis dataKey="month" tick={at} />
              <YAxis tick={at} />
              <Tooltip contentStyle={tip} />
              <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: "#10b981" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      ) : <Locked label="Earnings" dark={dark} />}

      {/* Last Mails + SMS + Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hasPerm("view_last_mails") ? (
          <Card dark={dark}>
            <STitle title="Last Sent Mail" dark={dark} />
            <div className="space-y-2">
              {lastSentMails.map(item => (
                <div key={item.id} className={`flex items-center gap-3 p-2.5 rounded-xl border
                  ${dark ? "border-white/10 hover:bg-white/5" : "border-slate-100 hover:bg-slate-50"}`}>
                  <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ background: item.color }}></div>
                  <div>
                    <div className={`text-[11px] font-semibold truncate max-w-[150px] ${dark ? "text-white/65" : "text-slate-800"}`}>{item.email}</div>
                    <div className={`text-[10px] ${dark ? "text-white/25" : "text-slate-400"}`}>{item.date}</div>
                  </div>
                </div>
              ))}
              <VMBtn dark={dark} />
            </div>
          </Card>
        ) : <Locked label="Last Sent Mails" dark={dark} />}

        {hasPerm("view_last_sms") ? (
          <Card dark={dark}>
            <STitle title="Last Sent SMS" dark={dark} />
            <div className={`flex flex-col items-center py-10 ${dark ? "text-white/20" : "text-slate-300"}`}>
              <div className="text-5xl mb-3">💬</div>
              <div className="text-sm">No SMS sent yet</div>
            </div>
            <VMBtn dark={dark} />
          </Card>
        ) : <Locked label="Last Sent SMS" dark={dark} />}

        {hasPerm("view_last_campaigns") ? (
          <Card dark={dark}>
            <STitle title="Last Campaign" dark={dark} />
            <div className="space-y-2">
              {lastCampaigns.map(item => (
                <div key={item.id} className={`flex items-center gap-3 p-2.5 rounded-xl border
                  ${dark ? "border-white/10 hover:bg-white/5" : "border-slate-100 hover:bg-slate-50"}`}>
                  <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ background: item.color }}></div>
                  <div className={`text-sm font-semibold ${dark ? "text-white/65" : "text-slate-800"}`}>{item.name}</div>
                </div>
              ))}
              <VMBtn dark={dark} />
            </div>
          </Card>
        ) : <Locked label="Last Campaigns" dark={dark} />}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// MAIN LAYOUT
// ══════════════════════════════════════════════════════════
export default function AdminDashboard() {
  const navigate                           = useNavigate();
  const { user, logout, hasPerm, getRoleInfo } = useAuth();
  const [activePage, setActivePage]        = useState("dashboard");
  const [dark, setDark]                    = useState(false);

  if (!user) { navigate("/login"); return null; }

  const roleInfo  = getRoleInfo();
  const roleColor = roleInfo?.color || "#6366f1";
  const roleLabel = roleInfo?.label || user.role;

  // Sidebar — permission नुसार filter
  const visibleItems = SIDEBAR_ITEMS.filter(i => i.permKey === null || hasPerm(i.permKey));
  const activeItem   = SIDEBAR_ITEMS.find(i => i.id === activePage) || SIDEBAR_ITEMS[0];

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-300
      ${dark ? "bg-[#0b0a1e]" : "bg-slate-100"}`}>

      {/* Sidebar */}
      <div className={`w-52 flex-shrink-0 flex flex-col py-5 px-3 border-r transition-colors
        ${dark ? "bg-[#0f0d26] border-white/10" : "bg-white border-slate-100"}`}>

        <div className="flex items-center gap-2 px-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-sm">✉️</div>
          <span className={`font-bold text-sm ${dark ? "text-white/75" : "text-slate-700"}`}
            style={{ fontFamily: "Georgia, serif" }}>MailAdmin</span>
        </div>

        {/* User card */}
        <div className={`mx-1 mb-4 p-3 rounded-xl border ${dark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-100"}`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
              style={{ background: roleColor }}>
              {user.email.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className={`text-[11px] font-bold truncate ${dark ? "text-white/75" : "text-slate-700"}`}>
                {user.email.split("@")[0]}
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded-md font-bold inline-block mt-0.5"
                style={{ background: roleColor + "25", color: roleColor }}>{roleLabel}</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5">
          {visibleItems.map(item => {
            const active = activePage === item.id;
            return (
              <button key={item.id} onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs font-medium
                  transition-all cursor-pointer border
                  ${active ? "text-white border-transparent"
                    : dark ? "text-white/40 border-transparent hover:bg-white/5"
                    : "text-slate-500 border-transparent hover:bg-slate-50"}`}
                style={active ? { background: roleColor, boxShadow: `0 4px 12px ${roleColor}35` } : {}}>
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <button onClick={() => { logout(); navigate("/login"); }}
          className={`mx-1 mt-2 py-2.5 px-3 rounded-xl text-xs font-semibold text-left cursor-pointer border transition-colors
            ${dark ? "border-red-500/20 text-red-400/60 hover:bg-red-500/10" : "border-red-200 text-red-400 hover:bg-red-50"}`}>
          ⎋ Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className={`h-14 flex items-center justify-between px-5 border-b flex-shrink-0 transition-colors
          ${dark ? "bg-[#0f0d26] border-white/10" : "bg-white border-slate-100"}`}>
          <h1 className={`text-sm font-bold ${dark ? "text-white/60" : "text-slate-600"}`}
            style={{ fontFamily: "Georgia, serif" }}>{activeItem.label}</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => setDark(!dark)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm cursor-pointer
                ${dark ? "bg-white/10 text-white/45" : "bg-slate-100 text-slate-500"}`}>
              {dark ? "☀️" : "🌙"}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                style={{ background: roleColor }}>
                {user.email.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <div className={`text-xs font-semibold ${dark ? "text-white/55" : "text-slate-600"}`}>
                  {user.email.split("@")[0]}
                </div>
                <div className="text-[9px]" style={{ color: roleColor }}>{roleLabel}</div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 p-5 overflow-y-auto">
          {activePage === "dashboard"
            ? <DashboardContent dark={dark} />
            : (
              <div className="flex flex-col items-center justify-center h-[55vh] gap-3">
                <div className="text-5xl">{activeItem.icon}</div>
                <h1 className={`text-xl font-bold ${dark ? "text-white/70" : "text-slate-700"}`}
                  style={{ fontFamily: "Georgia, serif" }}>{activeItem.label}</h1>
                <p className={`text-xs ${dark ? "text-white/25" : "text-slate-400"}`}>हे page लवकरच येईल.</p>
                <div className="w-10 h-1 rounded-full" style={{ background: roleColor }}></div>
              </div>
            )
          }
        </main>
      </div>
    </div>
  );
}