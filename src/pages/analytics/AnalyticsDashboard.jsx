import React, { useState } from 'react';

const OVERVIEW = {
  total_campaigns: 24, sent_campaigns: 18, total_contacts: 5420,
  total_emails_sent: 48300, open_rate: 42.5, clicks_rate: 18.3,
  bounce_rate: 3.1, unsubscribe_rate: 1.2,
};

const CAMPAIGN_CHART = [
  { name: 'Jan Campaign', sent: 4200, opens: 1800, clicks: 740 },
  { name: 'Feb Newsletter', sent: 3800, opens: 1600, clicks: 620 },
  { name: 'Mar Promo', sent: 5100, opens: 2300, clicks: 980 },
  { name: 'Apr Launch', sent: 6200, opens: 2900, clicks: 1200 },
  { name: 'May Sale', sent: 4700, opens: 1900, clicks: 830 },
  { name: 'Jun Update', sent: 5500, opens: 2400, clicks: 1050 },
  { name: 'Jul Festival', sent: 7200, opens: 3100, clicks: 1400 },
  { name: 'Aug Offer', sent: 6100, opens: 2700, clicks: 1180 },
];

const GROWTH = [
  { month: 'Sep 2024', new_contacts: 210 },
  { month: 'Oct 2024', new_contacts: 340 },
  { month: 'Nov 2024', new_contacts: 290 },
  { month: 'Dec 2024', new_contacts: 480 },
  { month: 'Jan 2025', new_contacts: 520 },
  { month: 'Feb 2025', new_contacts: 610 },
  { month: 'Mar 2025', new_contacts: 750 },
  { month: 'Apr 2025', new_contacts: 890 },
];

const AUDIT_LOGS = [
  { action_type: 'CREATE', module: 'campaign', description: 'New campaign "Summer Sale" created', created_at: '2025-04-02T09:15:00' },
  { action_type: 'UPDATE', module: 'contact', description: 'Contact list updated — 45 new entries', created_at: '2025-04-02T08:50:00' },
  { action_type: 'DELETE', module: 'template', description: 'Template "Old Newsletter" deleted', created_at: '2025-04-01T17:30:00' },
  { action_type: 'LOGIN', module: 'auth', description: 'User admin@example.com logged in', created_at: '2025-04-01T11:00:00' },
  { action_type: 'CREATE', module: 'subscription', description: 'Pro plan assigned to user #42', created_at: '2025-03-31T14:20:00' },
  { action_type: 'UPDATE', module: 'campaign', description: 'Campaign "Apr Promo" scheduled for 5 Apr', created_at: '2025-03-30T10:45:00' },
];

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${color}`}>{sub}</span>
      </div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
  );
}

function BarChart({ data, valueKey, color = 'bg-indigo-500' }) {
  const vals = data.map(d => d[valueKey] || 0);
  const max = Math.max(...vals, 1);
  return (
    <div className="space-y-3">
      {data.map((item, i) => {
        const val = vals[i];
        const pct = Math.round((val / max) * 100);
        return (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs text-slate-500 w-24 sm:w-28 truncate shrink-0">{item.name || item.month || '—'}</span>
            <div className="flex-1 bg-slate-100 rounded-full h-2.5">
              <div className={`${color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs font-semibold text-slate-700 w-12 text-right">{val.toLocaleString()}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [activeChart, setActiveChart] = useState('sent');

  const stats = [
    { icon: '📧', label: 'Total Campaigns', value: OVERVIEW.total_campaigns, sub: 'All time', color: 'bg-blue-100 text-blue-700' },
    { icon: '✅', label: 'Sent Campaigns', value: OVERVIEW.sent_campaigns, sub: 'Completed', color: 'bg-green-100 text-green-700' },
    { icon: '👥', label: 'Total Contacts', value: OVERVIEW.total_contacts.toLocaleString(), sub: 'Active', color: 'bg-teal-100 text-teal-700' },
    { icon: '📬', label: 'Emails Sent', value: OVERVIEW.total_emails_sent.toLocaleString(), sub: 'Delivered', color: 'bg-purple-100 text-purple-700' },
    { icon: '👁️', label: 'Open Rate', value: `${OVERVIEW.open_rate}%`, sub: 'Avg.', color: 'bg-yellow-100 text-yellow-700' },
    { icon: '🖱️', label: 'Click Rate', value: `${OVERVIEW.clicks_rate}%`, sub: 'Avg.', color: 'bg-indigo-100 text-indigo-700' },
    { icon: '⚠️', label: 'Bounce Rate', value: `${OVERVIEW.bounce_rate}%`, sub: 'Avg.', color: 'bg-orange-100 text-orange-700' },
    { icon: '🚫', label: 'Unsubscribe Rate', value: `${OVERVIEW.unsubscribe_rate}%`, sub: 'Total', color: 'bg-red-100 text-red-700' },
  ];

  const actionColor = {
    CREATE: 'bg-green-100 text-green-700',
    DELETE: 'bg-red-100 text-red-700',
    UPDATE: 'bg-blue-100 text-blue-700',
    LOGIN: 'bg-indigo-100 text-indigo-700',
  };

  const chartTabs = [
    { key: 'sent', label: 'Sent', color: 'bg-indigo-500' },
    { key: 'opens', label: 'Opens', color: 'bg-emerald-500' },
    { key: 'clicks', label: 'Clicks', color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6">
      <style>{`
        @media (max-width: 767px) {
          .audit-table-wrapper { display: none !important; }
          .audit-cards-wrapper { display: flex !important; }
        }
        @media (min-width: 768px) {
          .audit-table-wrapper { display: block !important; }
          .audit-cards-wrapper { display: none !important; }
        }
        .audit-card {
          background: #fff;
          border-radius: 14px;
          border: 1px solid #f1f5f9;
          padding: 14px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }
      `}</style>

      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">Analytics & Reports</h1>
        <p className="text-sm text-slate-500 mt-0.5">Track your marketing performance</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="font-semibold text-slate-800">📊 Campaigns Performance</h2>
            <div className="flex gap-1">
              {chartTabs.map(t => (
                <button key={t.key} onClick={() => setActiveChart(t.key)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${activeChart === t.key ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <BarChart data={CAMPAIGN_CHART} valueKey={activeChart} color={chartTabs.find(t => t.key === activeChart)?.color} />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">📈 Contact Growth (Monthly)</h2>
          <BarChart data={GROWTH} valueKey="new_contacts" color="bg-teal-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-800 mb-4">📋 Recent Activity</h2>

        <div className="audit-table-wrapper overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                <th className="pb-2 pr-4">Action</th>
                <th className="pb-2 pr-4">Module</th>
                <th className="pb-2 pr-4">Description</th>
                <th className="pb-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {AUDIT_LOGS.map((log, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="py-2.5 pr-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${actionColor[log.action_type] || 'bg-slate-100 text-slate-600'}`}>{log.action_type}</span>
                  </td>
                  <td className="py-2.5 pr-4 text-slate-600 capitalize">{log.module}</td>
                  <td className="py-2.5 pr-4 text-slate-500 max-w-xs truncate">{log.description}</td>
                  <td className="py-2.5 text-slate-400 whitespace-nowrap">{new Date(log.created_at).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="audit-cards-wrapper flex-col gap-3">
          {AUDIT_LOGS.map((log, i) => (
            <div key={i} className="audit-card">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${actionColor[log.action_type] || 'bg-slate-100 text-slate-600'}`}>{log.action_type}</span>
                <span className="text-xs text-slate-400">{new Date(log.created_at).toLocaleDateString('en-IN')}</span>
              </div>
              <p className="text-xs text-slate-700 font-medium mb-1 capitalize">{log.module}</p>
              <p className="text-xs text-slate-500">{log.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}