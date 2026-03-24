import React, { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import AdminSidebar, { SIDEBAR_ITEMS } from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

// ─── Data ─────────────────────────────────────────────────────────────────────
const campaignReportData = [
  { name: "Recipients",   value: 151 },
  { name: "Delivered",    value: 134 },
  { name: "Click",        value: 8   },
  { name: "Unique Click", value: 7   },
  { name: "Failed",       value: 17  },
  { name: "Open",         value: 7   },
  { name: "Bounce",       value: 17  },
];
const earningsData = [{ month: "March", earnings: 0 }];
const pieEmailData = [
  { name: "Sent Emails",       value: 24 },
  { name: "Available Emails",  value: 76 },
];
const pieSMSData = [
  { name: "Sent SMS",      value: 0   },
  { name: "Available SMS", value: 100 },
];
const PIE_COLORS = ["#6366f1", "#10b981"];
const gatewayData = [
  { name: "Free",   value: 2, color: "#6366f1" },
  { name: "PayPal", value: 0, color: "#10b981" },
  { name: "Stripe", value: 0, color: "#f59e0b" },
];
const purchaseHistory = [
  { id: "#20268987", plan: "FREE", date: "2026-03-13 01:31:15", status: "PAID", color: "#84cc16" },
  { id: "#20252438", plan: "FREE", date: "2026-03-01 06:00:06", status: "PAID", color: "#6366f1" },
];
const lastSentMails = [
  { id: 1, email: "sheetgv@gmail.com",            date: "15 Mar, 2026", color: "#ef4444" },
  { id: 2, email: "shihabhossain639@aol.com",     date: "15 Mar, 2026", color: "#ec4899" },
  { id: 3, email: "mdshihabhossain639@gmail.com", date: "15 Mar, 2026", color: "#ef4444" },
  { id: 4, email: "shihabhossain639@yahoo.co...", date: "15 Mar, 2026", color: "#f97316" },
  { id: 5, email: "mprince2k16@gmail.com",        date: "15 Mar, 2026", color: "#84cc16" },
  { id: 6, email: "mprince2k16@gmail.com",        date: "15 Mar, 2026", color: "#6366f1" },
  { id: 7, email: "queenbks.new@gmail.com",       date: "15 Mar, 2026", color: "#ef4444" },
  { id: 8, email: "mipon5500u@gmail.com",         date: "15 Mar, 2026", color: "#06b6d4" },
];
const lastCampaigns = [
  { id: 1, name: "test",          color: "#f59e0b" },
  { id: 2, name: "Rohit Jhariya", color: "#84cc16" },
  { id: 3, name: "Homepage",      color: "#84cc16" },
  { id: 4, name: "Homepage",      color: "#84cc16" },
  { id: 5, name: "Homepage",      color: "#f59e0b" },
  { id: 6, name: "Homepage",      color: "#84cc16" },
  { id: 7, name: "terterter",     color: "#84cc16" },
  { id: 8, name: "terterter",     color: "#6366f1" },
];

// ─── Reusable UI (dark-mode aware) ────────────────────────────────────────────
function StatCard({ icon, value, label, iconColor = "text-indigo-400", dark }) {
  return (
    <div className={`rounded-2xl p-4 border flex flex-col gap-1.5 hover:shadow-md transition-all duration-300 shadow-sm
      ${dark
        ? "bg-[#16142e] border-white/10 hover:border-indigo-500/40"
        : "bg-white border-slate-100"
      }`}>
      <span className={`text-2xl ${iconColor}`}>{icon}</span>
      <div
        className={`text-xl font-bold ${dark ? "text-white/90" : "text-slate-800"}`}
        style={{ fontFamily: "Georgia, serif" }}
      >{value}</div>
      <div className={`text-xs ${dark ? "text-white/40" : "text-slate-400"}`}>{label}</div>
    </div>
  );
}

function SectionTitle({ title, dark }) {
  return (
    <h2
      className={`text-[11px] font-bold uppercase tracking-widest mb-4 transition-colors duration-300
        ${dark ? "text-white/35" : "text-slate-500"}`}
      style={{ fontFamily: "Georgia, serif" }}
    >{title}</h2>
  );
}

function Card({ children, className = "", dark }) {
  return (
    <div className={`rounded-2xl p-5 shadow-sm border transition-colors duration-300
      ${dark
        ? "bg-[#16142e] border-white/10"
        : "bg-white border-slate-100"
      } ${className}`}>
      {children}
    </div>
  );
}

function ViewMoreBtn({ dark }) {
  return (
    <button className={`w-full py-2 mt-2 text-xs border border-dashed rounded-xl transition-colors cursor-pointer bg-transparent
      ${dark
        ? "text-white/30 border-white/10 hover:bg-white/5"
        : "text-slate-400 border-slate-200 hover:bg-slate-50"
      }`}>
      View More
    </button>
  );
}

// ─── Dashboard Page ────────────────────────────────────────────────────────────
function DashboardPage({ dark }) {
  const chartStroke  = dark ? "#1e1c3a" : "#f8fafc";
  const axisTick     = { fontSize: 10, fill: dark ? "#5a5880" : "#94a3b8" };
  const tooltipStyle = {
    background: dark ? "#1e1b3a" : "#fff",
    border: "none",
    borderRadius: 8,
    color: dark ? "#e2e8f0" : "#334155",
  };

  return (
    <div>
      {/* ── Stats ── */}
      <SectionTitle title="General Report" dark={dark} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-5">
        <StatCard dark={dark} icon="✉️" value="1,009" label="Total Emails"      iconColor="text-indigo-400" />
        <StatCard dark={dark} icon="▦"  value="6"     label="Email Campaigns"   iconColor="text-amber-400"  />
        <StatCard dark={dark} icon="▦"  value="0"     label="SMS Campaigns"     iconColor="text-amber-400"  />
        <StatCard dark={dark} icon="👥" value="4"     label="Email Groups"      iconColor="text-amber-400"  />
        <StatCard dark={dark} icon="👥" value="0"     label="SMS Groups"        iconColor="text-amber-400"  />
        <StatCard dark={dark} icon="⑂"  value="17"   label="Email Templates"   iconColor="text-emerald-400" />
        <StatCard dark={dark} icon="⑂"  value="1"    label="SMS Templates"     iconColor="text-emerald-400" />
        <StatCard dark={dark} icon="✉️" value="24"   label="Your Sent Emails"  iconColor="text-indigo-400"  />
        <StatCard dark={dark} icon="💲" value="$0.00" label="Total Expense"     iconColor="text-emerald-400" />
        <StatCard dark={dark} icon="⏱" value="0"     label="Bounced"            iconColor="text-emerald-400" />
        <StatCard dark={dark} icon="👤" value="2"     label="Total Customer"    iconColor="text-emerald-400" />
        <StatCard dark={dark} icon="💳" value="2"     label="Total Purchased"   iconColor="text-emerald-400" />
        <StatCard dark={dark} icon="⏱" value="24"    label="Total Sent Emails" iconColor="text-emerald-400" />
        <StatCard dark={dark} icon="⏱" value="0"     label="Total Sent SMS"    iconColor="text-emerald-400" />
        <StatCard dark={dark} icon="👤" value="1"     label="Subscribed"        iconColor="text-emerald-400" />
        <StatCard dark={dark} icon="📞" value="1,005" label="Total Phone No."   iconColor="text-emerald-400" />
      </div>

      {/* ── Sent Mail + SMS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {[
          { title: "Sent Mail Report", key: "sent", thisMonth: 24, data: [{ month: "March", sent: 24 }], domain: [0, 30] },
          { title: "Sent SMS Report",  key: "sms",  thisMonth: 0,  data: [{ month: "March", sms:  0  }], domain: [0, 5]  },
        ].map(r => (
          <Card key={r.title} dark={dark}>
            <SectionTitle title={r.title} dark={dark} />
            <div className="flex gap-7 mb-4">
              <div>
                <div className="text-xl font-bold text-indigo-400">{r.thisMonth}</div>
                <div className={`text-xs ${dark ? "text-white/30" : "text-slate-400"}`}>This Month</div>
              </div>
              <div>
                <div className={`text-xl font-bold ${dark ? "text-white/20" : "text-slate-300"}`}>0</div>
                <div className={`text-xs ${dark ? "text-white/30" : "text-slate-400"}`}>Last Month</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={130}>
              <LineChart data={r.data}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartStroke} />
                <XAxis dataKey="month" tick={axisTick} />
                <YAxis tick={axisTick} domain={r.domain} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey={r.key} stroke="#6366f1" strokeWidth={2} dot={{ r: 4, fill: "#6366f1" }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        ))}
      </div>

      {/* ── Campaign Report ── */}
      <Card dark={dark} className="mb-4">
        <SectionTitle title="Campaign Report" dark={dark} />
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={campaignReportData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartStroke} horizontal={false} />
            <XAxis type="number" tick={axisTick} domain={[0, 160]} ticks={[0, 40, 80, 120, 160]} />
            <YAxis type="category" dataKey="name" tick={axisTick} width={85} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" fill="#6366f1" radius={[0, 6, 6, 0]}
              label={{ position: "insideLeft", fill: "white", fontSize: 10, fontWeight: 700 }} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* ── Limit Report ── */}
      <Card dark={dark} className="mb-4">
        <SectionTitle title="Limit Report" dark={dark} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Campaign Email Usage",
              totalLabel: "Total Emails",    total: 100,
              sentLabel:  "Sent Emails",     sent:  24,
              availLabel: "Available Emails", avail: 76,
              data: pieEmailData, legend: ["Sent Emails", "Available"],
            },
            {
              title: "Campaign SMS Usage",
              totalLabel: "Total SMS",       total: 100,
              sentLabel:  "Sent SMS",        sent:  0,
              availLabel: "Available SMS",   avail: 100,
              data: pieSMSData, legend: ["Sent SMS", "Available"],
            },
          ].map(p => (
            <div key={p.title} className="flex items-center gap-5">
              <div className={`text-xs min-w-[105px] space-y-1 ${dark ? "text-white/50" : "text-slate-500"}`}>
                <div className={`font-bold ${dark ? "text-white/70" : "text-slate-700"}`}>{p.totalLabel}</div>
                <div className="pb-2">{p.total}</div>
                <div className={`font-bold ${dark ? "text-white/70" : "text-slate-700"}`}>{p.sentLabel}</div>
                <div className="pb-2">{p.sent}</div>
                <div className={`font-bold ${dark ? "text-white/70" : "text-slate-700"}`}>{p.availLabel}</div>
                <div>{p.avail}</div>
              </div>
              <div className="flex flex-col items-center">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie data={p.data} cx="50%" cy="50%" outerRadius={70} dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(1)}%`} labelLine={false}>
                      {p.data.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex gap-3 text-[10px] mt-1">
                  {PIE_COLORS.map((c, i) => (
                    <span key={i} className={`flex items-center gap-1 ${dark ? "text-white/50" : ""}`}>
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: c }}></span>
                      {p.legend[i]}
                    </span>
                  ))}
                </div>
                <div className={`text-[11px] mt-1.5 ${dark ? "text-white/30" : "text-slate-400"}`}>{p.title}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Purchase History + Gateway ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card dark={dark}>
          <SectionTitle title="Purchase History" dark={dark} />
          <div className="space-y-3">
            {purchaseHistory.map(item => (
              <div key={item.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-colors
                  ${dark ? "border-white/10 hover:bg-white/5" : "border-slate-100 hover:bg-slate-50"}`}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: item.color }}>
                    {item.plan[0]}
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${dark ? "text-white/80" : "text-slate-800"}`}>{item.id}</div>
                    <div className={`text-xs ${dark ? "text-white/40" : "text-slate-500"}`}>{item.plan}</div>
                    <div className={`text-[11px] ${dark ? "text-white/25" : "text-slate-400"}`}>{item.date}</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-red-400">{item.status}</span>
              </div>
            ))}
            <ViewMoreBtn dark={dark} />
          </div>
        </Card>

        <Card dark={dark}>
          <SectionTitle title="Most Used Gateway" dark={dark} />
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={gatewayData} cx="50%" cy="50%" outerRadius={70} dataKey="value"
                startAngle={90} endAngle={-270}>
                {gatewayData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center text-[11px] mb-3">
            {gatewayData.map(g => (
              <span key={g.name} className={`flex items-center gap-1 ${dark ? "text-white/50" : ""}`}>
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: g.color }}></span>
                {g.name}
              </span>
            ))}
          </div>
          {gatewayData.map(g => (
            <div key={g.name} className={`flex justify-between text-sm py-0.5 ${dark ? "text-white/50" : "text-slate-500"}`}>
              <span>{g.name}</span><span className="font-bold">{g.value}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* ── Total Earnings ── */}
      <Card dark={dark} className="mb-4">
        <SectionTitle title="Total Earnings ($0)" dark={dark} />
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartStroke} />
            <XAxis dataKey="month" tick={axisTick} />
            <YAxis tick={axisTick} domain={[0, 5]} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="earnings" stroke="#6366f1" strokeWidth={2} dot={{ r: 4, fill: "#6366f1" }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* ── Weekly Top Senders ── */}
      <Card dark={dark} className="mb-4">
        <SectionTitle title="Weekly Top Senders" dark={dark} />
        <table className="w-full text-sm">
          <thead>
            <tr className={`border-b ${dark ? "border-white/10" : "border-slate-100"}`}>
              {["Images", "User Name", "Record"].map(h => (
                <th key={h} className={`text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider
                  ${dark ? "text-white/30" : "text-slate-400"}`}>{h}</th>
              ))}
            </tr>
          </thead>
        </table>
        <div className={`flex flex-col items-center py-10 ${dark ? "text-white/20" : "text-slate-300"}`}>
          <div className="text-5xl mb-3">🔍</div>
          <div className="text-sm">No data found</div>
        </div>
      </Card>

      {/* ── Last Sent Mail + SMS + Campaign ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card dark={dark}>
          <SectionTitle title="Last Sent Mail" dark={dark} />
          <div className="space-y-2">
            {lastSentMails.map(item => (
              <div key={item.id}
                className={`flex items-center gap-3 p-2.5 rounded-xl border transition-colors
                  ${dark ? "border-white/10 hover:bg-white/5" : "border-slate-100 hover:bg-slate-50"}`}>
                <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: item.color }}></div>
                <div>
                  <div className={`text-[11px] font-semibold truncate max-w-[155px]
                    ${dark ? "text-white/70" : "text-slate-800"}`}>{item.email}</div>
                  <div className={`text-[10px] ${dark ? "text-white/30" : "text-slate-400"}`}>{item.date}</div>
                </div>
              </div>
            ))}
            <ViewMoreBtn dark={dark} />
          </div>
        </Card>

        <Card dark={dark}>
          <SectionTitle title="Last Sent SMS" dark={dark} />
          <div className={`flex flex-col items-center py-10 ${dark ? "text-white/20" : "text-slate-300"}`}>
            <div className="text-5xl mb-3">💬</div>
            <div className="text-sm">No SMS sent yet</div>
          </div>
          <ViewMoreBtn dark={dark} />
        </Card>

        <Card dark={dark}>
          <SectionTitle title="Last Campaign" dark={dark} />
          <div className="space-y-2">
            {lastCampaigns.map(item => (
              <div key={item.id}
                className={`flex items-center gap-3 p-2.5 rounded-xl border transition-colors
                  ${dark ? "border-white/10 hover:bg-white/5" : "border-slate-100 hover:bg-slate-50"}`}>
                <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: item.color }}></div>
                <div className={`text-sm font-semibold ${dark ? "text-white/70" : "text-slate-800"}`}>{item.name}</div>
              </div>
            ))}
            <ViewMoreBtn dark={dark} />
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Placeholder Page ──────────────────────────────────────────────────────────
function PlaceholderPage({ pageId, label, icon, dark }) {
  const accentMap = {
    "upgrade":         "bg-amber-400",
    "support-tickets": "bg-red-400",
    "chat-gpt":        "bg-emerald-400",
  };
  const accent = accentMap[pageId] || "bg-indigo-500";

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <div className="text-6xl">{icon}</div>
      <h1
        className={`text-2xl font-bold m-0 ${dark ? "text-white/80" : "text-slate-800"}`}
        style={{ fontFamily: "Georgia, serif" }}
      >{label}</h1>
      <p className={`text-sm text-center max-w-xs m-0 ${dark ? "text-white/40" : "text-slate-400"}`}>
        This page is under construction. Content for <strong>{label}</strong> will appear here soon.
      </p>
      <div className={`w-14 h-1 rounded-full ${accent}`}></div>
    </div>
  );
}

// ─── Main Layout ───────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [darkMode,   setDarkMode]   = useState(false);

  const activeItem = SIDEBAR_ITEMS.find(i => i.id === activePage) || SIDEBAR_ITEMS[0];

  function renderPage() {
    if (activePage === "dashboard")
      return <DashboardPage dark={darkMode} />;
    return (
      <PlaceholderPage
        pageId={activePage}
        label={activeItem.label}
        icon={activeItem.icon}
        dark={darkMode}
      />
    );
  }

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-300
      ${darkMode ? "bg-[#0b0a1e]" : "bg-slate-100"}`}>

      {/* ── Sidebar ── */}
      <AdminSidebar
        activePage={activePage}
        onNavigate={setActivePage}
        darkMode={darkMode}
      />

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Navbar ── */}
        <AdminNavbar
          activeLabel={activeItem.label}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* ── Page content ── */}
        <main className="flex-1 p-5 overflow-y-auto">
          {renderPage()}
        </main>

      </div>
    </div>
  );
}