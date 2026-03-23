import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const campaignReportData = [
  { name: "Recipients",   value: 151 },
  { name: "Delivered",    value: 134 },
  { name: "Click",        value: 8   },
  { name: "Unique Click", value: 7   },
  { name: "Failed",       value: 17  },
  { name: "Open",         value: 7   },
  { name: "Bounce",       value: 17  },
];

const earningsData   = [{ month: "March", earnings: 0   }];
const pieEmailData   = [{ name: "Sent Emails",      value: 24  }, { name: "Available Emails", value: 76  }];
const pieSMSData     = [{ name: "Sent SMS",         value: 0   }, { name: "Available SMS",    value: 100 }];
const PIE_COLORS     = ["#3b82f6", "#10b981"];
const gatewayData    = [
  { name: "Free",   value: 2, color: "#3b82f6" },
  { name: "PayPal", value: 0, color: "#10b981" },
  { name: "Stripe", value: 0, color: "#f59e0b" },
];
const purchaseHistory = [
  { id: "#20268987", plan: "FREE", date: "2026-03-13 01:31:15", status: "PAID", color: "#84cc16" },
  { id: "#20252438", plan: "FREE", date: "2026-03-01 06:00:06", status: "PAID", color: "#3b82f6" },
];
const lastSentMails = [
  { id: 1, email: "sheetgv@gmail.com",            date: "15 Mar, 2026", color: "#ef4444" },
  { id: 2, email: "shihabhossain639@aol.com",     date: "15 Mar, 2026", color: "#ec4899" },
  { id: 3, email: "mdshihabhossain639@gmail.com", date: "15 Mar, 2026", color: "#ef4444" },
  { id: 4, email: "shihabhossain639@yahoo.co...", date: "15 Mar, 2026", color: "#f97316" },
  { id: 5, email: "mprince2k16@gmail.com",        date: "15 Mar, 2026", color: "#84cc16" },
  { id: 6, email: "mprince2k16@gmail.com",        date: "15 Mar, 2026", color: "#3b82f6" },
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
    </div>
  );
}

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
      </div>
    </div>
  );
}