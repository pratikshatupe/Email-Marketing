import React, { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

=======
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import AdminSidebar, { SIDEBAR_ITEMS } from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

// ─── Data ─────────────────────────────────────────────────────────────────────
>>>>>>> c411c31 ( add admin sidebar, dashboard , navbar)
const campaignReportData = [
  { name: "Recipients",   value: 151 },
  { name: "Delivered",    value: 134 },
  { name: "Click",        value: 8   },
  { name: "Unique Click", value: 7   },
  { name: "Failed",       value: 17  },
  { name: "Open",         value: 7   },
  { name: "Bounce",       value: 17  },
];
<<<<<<< HEAD

const earningsData   = [{ month: "March", earnings: 0   }];
const pieEmailData   = [{ name: "Sent Emails",      value: 24  }, { name: "Available Emails", value: 76  }];
const pieSMSData     = [{ name: "Sent SMS",         value: 0   }, { name: "Available SMS",    value: 100 }];
const PIE_COLORS     = ["#3b82f6", "#10b981"];
const gatewayData    = [
  { name: "Free",   value: 2, color: "#3b82f6" },
=======
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
>>>>>>> c411c31 ( add admin sidebar, dashboard , navbar)
  { name: "PayPal", value: 0, color: "#10b981" },
  { name: "Stripe", value: 0, color: "#f59e0b" },
];
const purchaseHistory = [
  { id: "#20268987", plan: "FREE", date: "2026-03-13 01:31:15", status: "PAID", color: "#84cc16" },
<<<<<<< HEAD
  { id: "#20252438", plan: "FREE", date: "2026-03-01 06:00:06", status: "PAID", color: "#3b82f6" },
=======
  { id: "#20252438", plan: "FREE", date: "2026-03-01 06:00:06", status: "PAID", color: "#6366f1" },
>>>>>>> c411c31 ( add admin sidebar, dashboard , navbar)
];
const lastSentMails = [
  { id: 1, email: "sheetgv@gmail.com",            date: "15 Mar, 2026", color: "#ef4444" },
  { id: 2, email: "shihabhossain639@aol.com",     date: "15 Mar, 2026", color: "#ec4899" },
  { id: 3, email: "mdshihabhossain639@gmail.com", date: "15 Mar, 2026", color: "#ef4444" },
  { id: 4, email: "shihabhossain639@yahoo.co...", date: "15 Mar, 2026", color: "#f97316" },
  { id: 5, email: "mprince2k16@gmail.com",        date: "15 Mar, 2026", color: "#84cc16" },
<<<<<<< HEAD
  { id: 6, email: "mprince2k16@gmail.com",        date: "15 Mar, 2026", color: "#3b82f6" },
=======
  { id: 6, email: "mprince2k16@gmail.com",        date: "15 Mar, 2026", color: "#6366f1" },
>>>>>>> c411c31 ( add admin sidebar, dashboard , navbar)
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
<<<<<<< HEAD
  { id: 8, name: "terterter",     color: "#3b82f6" },
];

const ADMIN_SIDEBAR = [
  { label: "Dashboard",       icon: "⊞",  active: true },
  { label: "Marketplace (0)", icon: "🛒" },
  { label: "Agents",          icon: "👤" },
  { label: "Coupons",         icon: "%" },
  { label: "Contacts",        icon: "#",  dropdown: true },
  { label: "Groups",          icon: "👥", dropdown: true },
  { label: "Email",           icon: "✉️", dropdown: true },
  { label: "SMS",             icon: "📱", dropdown: true },
  { label: "Builder",         icon: "🔧", dropdown: true },
  { label: "Themes",          icon: "🎨", dropdown: true },
  { label: "Setup",           icon: "⚙️", dropdown: true },
  { label: "Subscription",    icon: "💳", dropdown: true },
  { label: "User Management", icon: "👥" },
  { label: "Blogs",           icon: "📝" },
  { label: "Pages",           icon: "📄" },
  { label: "Contact Us (0)",  icon: "📞" },
  { label: "Notes",           icon: "📒" },
  { label: "Payment Setup",   icon: "💳", dropdown: true },
  { label: "Third Parties",   icon: "🔗", dropdown: true },
  { label: "Chat GPT",        icon: "🤖", dropdown: true },
  { label: "Support Tickets", icon: "🎫" },
  { label: "Upgrade",         icon: "⬆️" },
];

function StatCard({ icon, value, label, iconColor = "#3b82f6" }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col gap-2">
      <span style={{ color: iconColor, fontSize: 26 }}>{icon}</span>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
=======
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
>>>>>>> c411c31 ( add admin sidebar, dashboard , navbar)
    </div>
  );
}

<<<<<<< HEAD
function SectionTitle({ title }) {
  return <h2 className="text-base font-semibold text-gray-700 mb-4">{title}</h2>;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => navigate("/");

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">

      {/* ── Sidebar ── */}
      <aside className={`
        fixed top-0 left-0 h-full z-50 w-60 bg-[#0f0e2a] text-white flex flex-col
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">M</div>
          <span className="text-lg font-bold text-white">MailDoll</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2">
          {ADMIN_SIDEBAR.map((item, i) => (
            <button key={i}
              className={`flex items-center justify-between w-full px-5 py-2.5 text-sm transition-colors
                ${item.active ? "bg-blue-600 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base w-5 text-center">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.dropdown && <span className="text-xs text-white/40">▼</span>}
            </button>
          ))}
        </nav>

        {/* Language + Logout */}
        <div className="px-4 py-3 border-t border-white/10 space-y-2">
          <select className="w-full bg-white/10 text-white/70 text-xs rounded-lg px-3 py-2 border border-white/20 outline-none">
            <option>Select Language</option>
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
          </select>
          <button onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 h-14 flex items-center justify-between px-5 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>
            <nav className="text-sm text-gray-500 hidden sm:block">
              Dashboard <span className="mx-1">›</span>
              <span className="text-gray-800 font-medium">Dashboard</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-gray-500 hover:text-gray-800">☀️</button>
            <button className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-600 text-xs font-bold">◉</button>
            <button className="text-gray-500 hover:text-gray-800">↻</button>
            <button className="text-gray-500 hover:text-gray-800">$</button>
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">AD</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 overflow-y-auto">

          <SectionTitle title="General Report" />

          {/* Row 1 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <StatCard icon="✉️" value="1,009" label="Total Emails"    iconColor="#3b82f6" />
            <StatCard icon="▦"  value="6"     label="Email Campaigns" iconColor="#f59e0b" />
            <StatCard icon="▦"  value="0"     label="SMS Campaigns"   iconColor="#f59e0b" />
            <StatCard icon="👥" value="4"     label="Email Groups"    iconColor="#f59e0b" />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <StatCard icon="👥" value="0"  label="SMS Groups"       iconColor="#f59e0b" />
            <StatCard icon="⑂"  value="17" label="Email Templates"  iconColor="#10b981" />
            <StatCard icon="⑂"  value="1"  label="SMS Templates"    iconColor="#10b981" />
            <StatCard icon="✉️" value="24" label="Your Sent Emails"  iconColor="#3b82f6" />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon="💲" value="$0.00" label="Total Expense"        iconColor="#10b981" />
            <StatCard icon="⏱" value="0"     label="Bounced"               iconColor="#10b981" />
            <StatCard icon="👤" value="2"     label="Total Customer"        iconColor="#10b981" />
            <StatCard icon="💳" value="2"     label="Total Purchased Plan"  iconColor="#10b981" />
            <StatCard icon="⏱" value="24"    label="Total Sent Emails"     iconColor="#10b981" />
            <StatCard icon="⏱" value="0"     label="Total Sent SMS"        iconColor="#10b981" />
            <StatCard icon="👤" value="1"     label="Subscribed"            iconColor="#10b981" />
            <StatCard icon="📞" value="1,005" label="Total Phone Number"   iconColor="#10b981" />
          </div>

          {/* Sent Mail + SMS Report */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <SectionTitle title="Sent Mail Report" />
              <div className="flex gap-8 mb-4">
                <div>
                  <div className="text-2xl font-bold text-blue-500">24</div>
                  <div className="text-xs text-gray-400">This Month</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-400">0</div>
                  <div className="text-xs text-gray-400">Last Month</div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600 mb-2">Sent Mails By Month</div>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={[{ month: "March", sent: 24 }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[0, 30]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="sent" stroke="#3b82f6" strokeWidth={2}
                    dot={{ r: 4, fill: "#3b82f6" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <SectionTitle title="Sent SMS Report" />
              <div className="flex gap-8 mb-4">
                <div>
                  <div className="text-2xl font-bold text-blue-500">0</div>
                  <div className="text-xs text-gray-400">This Month</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-400">0</div>
                  <div className="text-xs text-gray-400">Last Month</div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600 mb-2">Total SMS Sent</div>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={[{ month: "March", sms: 0 }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[0, 5]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="sms" stroke="#3b82f6" strokeWidth={2}
                    dot={{ r: 4, fill: "#3b82f6" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Campaign Report */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
            <SectionTitle title="Campaign Report" />
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={campaignReportData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 160]}
                  ticks={[0, 40, 80, 120, 160]} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={90} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]}
                  label={{ position: "insideLeft", fill: "white", fontSize: 11, fontWeight: 600 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Limit Report */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
            <SectionTitle title="Limit Report" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Email Pie */}
              <div className="flex items-center gap-6">
                <div className="text-sm text-gray-600 space-y-1 min-w-max">
                  <div className="font-semibold text-gray-700">Total Emails</div>
                  <div>100</div>
                  <div className="font-semibold text-gray-700 mt-2">Sent Emails</div>
                  <div>24</div>
                  <div className="font-semibold text-gray-700 mt-2">Available Emails</div>
                  <div>76</div>
                </div>
                <div>
                  <ResponsiveContainer width={180} height={180}>
                    <PieChart>
                      <Pie data={pieEmailData} cx="50%" cy="50%" outerRadius={75} dataKey="value"
                        label={({ percent }) => `${(percent * 100).toFixed(1)}%`} labelLine={false}>
                        {pieEmailData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex gap-3 justify-center text-xs mt-1">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>Sent Emails
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>Available
                    </span>
                  </div>
                  <div className="text-center text-sm text-gray-500 mt-2">Campaign Email Usage</div>
                </div>
              </div>

              {/* SMS Pie */}
              <div className="flex items-center gap-6">
                <div className="text-sm text-gray-600 space-y-1 min-w-max">
                  <div className="font-semibold text-gray-700">Total SMS</div>
                  <div>100</div>
                  <div className="font-semibold text-gray-700 mt-2">Sent SMS</div>
                  <div>0</div>
                  <div className="font-semibold text-gray-700 mt-2">Available SMS</div>
                  <div>100</div>
                </div>
                <div>
                  <ResponsiveContainer width={180} height={180}>
                    <PieChart>
                      <Pie data={pieSMSData} cx="50%" cy="50%" outerRadius={75} dataKey="value"
                        label={({ percent }) => `${(percent * 100).toFixed(1)}%`} labelLine={false}>
                        {pieSMSData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex gap-3 justify-center text-xs mt-1">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>Sent SMS
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>Available
                    </span>
                  </div>
                  <div className="text-center text-sm text-gray-500 mt-2">Campaign SMS Usage</div>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase History + Most Used Gateway */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <SectionTitle title="Purchase History" />
              <div className="space-y-3">
                {purchaseHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ background: item.color }}>
                        {item.plan[0]}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{item.id}</div>
                        <div className="text-sm text-gray-500">{item.plan}</div>
                        <div className="text-xs text-gray-400">{item.date}</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-red-500">{item.status}</span>
                  </div>
                ))}
                <button className="w-full py-2.5 text-sm text-gray-500 border border-dashed border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  View More
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <SectionTitle title="Most Used Gateway" />
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={gatewayData} cx="50%" cy="50%" outerRadius={75} dataKey="value"
                    startAngle={90} endAngle={-270}>
                    {gatewayData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-4 justify-center text-xs mb-3">
                {gatewayData.map((g) => (
                  <span key={g.name} className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full inline-block" style={{ background: g.color }}></span>
                    {g.name}
                  </span>
                ))}
              </div>
              <div className="space-y-2 text-sm">
                {gatewayData.map((g) => (
                  <div key={g.name} className="flex justify-between text-gray-600">
                    <span>{g.name}</span>
                    <span className="font-semibold">{g.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Total Earnings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
            <SectionTitle title="Total Earnings ($0)" />
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="earnings" stroke="#3b82f6" strokeWidth={2}
                  dot={{ r: 4, fill: "#3b82f6" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Top Senders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
            <SectionTitle title="Weekly Top Senders" />
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Images</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">User Name</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Record</th>
                </tr>
              </thead>
            </table>
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <div className="text-6xl mb-3">🔍</div>
              <div className="text-sm">No data found</div>
            </div>
          </div>

          {/* Last Sent Mail + Last Sent SMS + Last Campaign */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

            {/* Last Sent Mail */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <SectionTitle title="Last Sent Mail" />
              <div className="space-y-2">
                {lastSentMails.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2.5 border border-gray-100 rounded-xl">
                    <div className="w-8 h-8 rounded-full flex-shrink-0"
                      style={{ background: item.color }}></div>
                    <div>
                      <div className="text-xs font-medium text-gray-800 truncate max-w-[160px]">{item.email}</div>
                      <div className="text-xs text-gray-400">{item.date}</div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-2 text-sm text-gray-500 border border-dashed border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  View More
                </button>
              </div>
            </div>

            {/* Last Sent SMS */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <SectionTitle title="Last Sent SMS" />
              <div className="flex flex-col items-center justify-center py-10">
                <div className="text-6xl mb-3">💬</div>
                <div className="text-sm text-gray-400">No SMS sent yet</div>
              </div>
              <button className="w-full py-2 text-sm text-gray-500 border border-dashed border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                View More
              </button>
            </div>

            {/* Last Campaign */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <SectionTitle title="Last Campaign" />
              <div className="space-y-2">
                {lastCampaigns.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2.5 border border-gray-100 rounded-xl">
                    <div className="w-8 h-8 rounded-full flex-shrink-0"
                      style={{ background: item.color }}></div>
                    <div className="text-sm font-medium text-gray-800">{item.name}</div>
                  </div>
                ))}
                <button className="w-full py-2 text-sm text-gray-500 border border-dashed border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  View More
                </button>
              </div>
            </div>

          </div>

        </main>
=======
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
  const chartStroke = dark ? "#1e1c3a" : "#f8fafc";
  const axisTick    = { fontSize: 10, fill: dark ? "#5a5880" : "#94a3b8" };
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
              totalLabel: "Total Emails",   total: 100,
              sentLabel:  "Sent Emails",    sent:  24,
              availLabel: "Available Emails", avail: 76,
              data: pieEmailData, legend: ["Sent Emails", "Available"],
            },
            {
              title: "Campaign SMS Usage",
              totalLabel: "Total SMS",      total: 100,
              sentLabel:  "Sent SMS",       sent:  0,
              availLabel: "Available SMS",  avail: 100,
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

        {/* ── Navbar (handles dark/light toggle + AD dropdown with logout) ── */}
        <AdminNavbar
          activeLabel={activeItem.label}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* ── Page content ── */}
        <main className="flex-1 p-5 overflow-y-auto">
          {renderPage()}
        </main>

>>>>>>> c411c31 ( add admin sidebar, dashboard , navbar)
      </div>
    </div>
  );
}