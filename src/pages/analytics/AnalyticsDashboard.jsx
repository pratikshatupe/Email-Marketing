// src/pages/analytics/AnalyticsDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${color}`}>{sub}</span>
      </div>
      <p className="text-2xl font-bold text-slate-800">{value ?? '—'}</p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
  );
}

function BarChart({ data }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.count || d.value || d.new_contacts || d.sent || 0), 1);
  return (
    <div className="space-y-2">
      {data.slice(0, 8).map((item, i) => {
        const val = item.count || item.value || item.new_contacts || item.sent || 0;
        const pct = Math.round((val / max) * 100);
        const label = item.label || item.name || item.month || item.date || '';
        return (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs text-slate-500 w-24 truncate shrink-0">{label}</span>
            <div className="flex-1 bg-slate-100 rounded-full h-2">
              <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs font-medium text-slate-700 w-8 text-right">{val}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function AnalyticsDashboard() {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const [overview, setOverview]   = useState(null);
  const [chartData, setChartData] = useState([]);
  const [growth, setGrowth]       = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const isAdmin = ['SUPER_ADMIN', 'BUSINESS_ADMIN'].includes(user?.role);

  useEffect(() => {
    async function load() {
      try {
        // Backend: sendSuccess(res, data) => { success, message, data }
        const [ovRes, chartRes, growRes] = await Promise.all([
          fetch(`${API}/analytics/overview`, { headers }),
          fetch(`${API}/analytics/campaigns/chart`, { headers }),
          fetch(`${API}/analytics/contacts/growth`, { headers }),
        ]);

        const [ovJson, chartJson, growJson] = await Promise.all([
          ovRes.json(), chartRes.json(), growRes.json()
        ]);

        // getOverview => sendSuccess(res, overviewObject) => data = overviewObject directly
        setOverview(ovJson.data || ovJson);

        // getCampaignChart => sendSuccess(res, { chartData: rows }) => data.chartData
        setChartData(chartJson.data?.chartData || chartJson.data || chartJson || []);

        // getContactGrowth => sendSuccess(res, { growth: rows }) => data.growth
        setGrowth(growJson.data?.growth || growJson.data || growJson || []);

        if (isAdmin) {
          const auRes = await fetch(`${API}/analytics/audit-logs`, { headers });
          const auJson = await auRes.json();
          // getAuditLogs => sendSuccess(res, { logs: rows }) => data.logs
          const logs = auJson.data?.logs || auJson.data || auJson || [];
          setAuditLogs(logs.slice(0, 10));
        }
      } catch (e) {
        console.error(e);
        setError('Analytics load karne mein error aayi.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-60">
      <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-60">
      <div className="text-center">
        <p className="text-red-500 font-medium">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-3 text-indigo-600 text-sm hover:underline">
          Retry करा
        </button>
      </div>
    </div>
  );

  const stats = [
    { icon: '📧', label: 'Total Campaigns',  value: overview?.total_campaigns,  sub: 'All time',  color: 'bg-blue-100 text-blue-700'   },
    { icon: '✅', label: 'Sent Campaigns',    value: overview?.sent_campaigns,    sub: 'Completed', color: 'bg-green-100 text-green-700'  },
    { icon: '👥', label: 'Total Contacts',    value: overview?.total_contacts,    sub: 'Active',    color: 'bg-teal-100 text-teal-700'    },
    { icon: '📬', label: 'Emails Sent',       value: overview?.total_emails_sent, sub: 'Delivered', color: 'bg-purple-100 text-purple-700' },
    { icon: '👁️', label: 'Open Rate',         value: overview?.open_rate   != null ? `${overview.open_rate}%`        : '—', sub: 'Avg.', color: 'bg-yellow-100 text-yellow-700' },
    { icon: '🖱️', label: 'Click Rate',        value: overview?.clicks_rate != null ? `${overview.clicks_rate}%`      : '—', sub: 'Avg.', color: 'bg-indigo-100 text-indigo-700' },
    { icon: '⚠️', label: 'Bounce Rate',       value: overview?.bounce_rate != null ? `${overview.bounce_rate}%`      : '—', sub: 'Avg.', color: 'bg-orange-100 text-orange-700' },
    { icon: '🚫', label: 'Unsubscribe Rate',  value: overview?.unsubscribe_rate != null ? `${overview.unsubscribe_rate}%` : '—', sub: 'Total', color: 'bg-red-100 text-red-700' },
  ];

  const actionColor = {
    CREATE: 'bg-green-100 text-green-700',
    DELETE: 'bg-red-100 text-red-700',
    UPDATE: 'bg-blue-100 text-blue-700',
    LOGIN:  'bg-indigo-100 text-indigo-700',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">Analytics & Reports</h1>
        <p className="text-sm text-slate-500 mt-0.5">Track your marketing performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">📊 Campaigns Performance</h2>
          {chartData.length > 0
            ? <BarChart data={chartData} />
            : <div className="text-center text-slate-400 py-10">No campaign data yet</div>
          }
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">📈 Contact Growth (Monthly)</h2>
          {growth.length > 0
            ? <BarChart data={growth.map(d => ({ ...d, label: d.month }))} />
            : <div className="text-center text-slate-400 py-10">No growth data yet</div>
          }
        </div>
      </div>

      {/* Audit Logs — Admin only */}
      {isAdmin && auditLogs.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">📋 Recent Activity</h2>
          <div className="overflow-x-auto">
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
                {auditLogs.map((log, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-2 pr-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${actionColor[log.action_type] || 'bg-slate-100 text-slate-600'}`}>
                        {log.action_type}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-slate-600 capitalize">{log.module}</td>
                    <td className="py-2 pr-4 text-slate-500 max-w-xs truncate">{log.description}</td>
                    <td className="py-2 text-slate-400 whitespace-nowrap">
                      {log.created_at || log.timestamp
                        ? new Date(log.created_at || log.timestamp).toLocaleString('en-IN')
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}