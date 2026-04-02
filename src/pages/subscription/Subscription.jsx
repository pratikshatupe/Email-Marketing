// src/pages/subscription/Subscription.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const PLAN_ICONS = { Free: '🆓', Basic: '⚡', Pro: '🚀', Enterprise: '🏢' };
const PLAN_COLORS = {
  Free:       'border-slate-200 bg-slate-50',
  Basic:      'border-blue-200 bg-blue-50',
  Pro:        'border-indigo-300 bg-indigo-50 ring-2 ring-indigo-300',
  Enterprise: 'border-purple-200 bg-purple-50',
};

export default function Subscription() {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const [plans, setPlans]               = useState([]);
  const [mySub, setMySub]               = useState(null);
  const [allSubs, setAllSubs]           = useState([]);
  const [stats, setStats]               = useState(null);
  const [loading, setLoading]           = useState(true);
  const [assignModal, setAssignModal]   = useState(false);
  const [assignData, setAssignData]     = useState({ user_id: '', plan_id: '', start_date: '', end_date: '' });
  const [saving, setSaving]             = useState(false);
  const [activeTab, setActiveTab]       = useState('plans');

  const isSA = user?.role === 'SUPER_ADMIN';
  const isAdmin = ['SUPER_ADMIN','BUSINESS_ADMIN'].includes(user?.role);

  useEffect(() => {
    async function load() {
      try {
        const [plRes, myRes] = await Promise.all([
          fetch(`${API}/subscriptions/plans`, { headers }),
          fetch(`${API}/subscriptions/my`, { headers }),
        ]);
        const [pl, my] = await Promise.all([plRes.json(), myRes.json()]);
        setPlans(pl.data || pl || []);
        setMySub(my.data || my);

        if (isAdmin) {
          const [allRes, stRes] = await Promise.all([
            fetch(`${API}/subscriptions`, { headers }),
            fetch(`${API}/subscriptions/stats`, { headers }),
          ]);
          const [all, st] = await Promise.all([allRes.json(), stRes.json()]);
          setAllSubs(all.data || all || []);
          setStats(st.data || st);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleAssign() {
    setSaving(true);
    try {
      const res = await fetch(`${API}/subscriptions/assign`, {
        method: 'POST', headers, body: JSON.stringify(assignData)
      });
      if (res.ok) {
        setAssignModal(false);
        const allRes = await fetch(`${API}/subscriptions`, { headers });
        const all = await allRes.json();
        setAllSubs(all.data || all || []);
      }
    } catch (e) { console.error(e); }
    setSaving(false);
  }

  async function handleCancel(id) {
    if (!confirm('Cancel this subscription?')) return;
    await fetch(`${API}/subscriptions/${id}/cancel`, { method: 'PUT', headers });
    const allRes = await fetch(`${API}/subscriptions`, { headers });
    const all = await allRes.json();
    setAllSubs(all.data || all || []);
  }

  if (loading) return (
    <div className="flex items-center justify-center h-60">
      <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  );

  const tabs = [
    { id: 'plans', label: '📦 Plans' },
    ...(isAdmin ? [{ id: 'manage', label: '⚙️ Manage' }] : []),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Subscription</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage plans and billing</p>
        </div>
        {isSA && (
          <button onClick={() => setAssignModal(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
            ➕ Assign Plan
          </button>
        )}
      </div>

      {/* My Current Plan */}
      {mySub && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
          <p className="text-indigo-200 text-sm font-medium">Current Plan</p>
          <h2 className="text-2xl font-bold mt-1">{mySub.plan_name || 'Free'}</h2>
          <div className="flex gap-6 mt-3 text-sm">
            <div><span className="text-indigo-200">Status: </span><span className="font-medium capitalize">{mySub.status}</span></div>
            <div><span className="text-indigo-200">Expires: </span><span className="font-medium">{mySub.end_date ? new Date(mySub.end_date).toLocaleDateString() : '—'}</span></div>
          </div>
        </div>
      )}

      {/* Stats (Admin only) */}
      {isAdmin && stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Subscriptions', value: stats.total, icon: '📊' },
            { label: 'Active', value: stats.active, icon: '✅' },
            { label: 'Expired', value: stats.expired, icon: '⏰' },
            { label: 'Revenue', value: stats.total_revenue ? `₹${Number(stats.total_revenue).toLocaleString()}` : '—', icon: '💰' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4">
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="text-xl font-bold text-slate-800">{s.value ?? '—'}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      {isAdmin && (
        <div className="flex gap-2 border-b border-slate-200">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === t.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* Plans Grid */}
      {(!isAdmin || activeTab === 'plans') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {plans.map(plan => (
            <div key={plan.id} className={`rounded-2xl border p-5 relative ${PLAN_COLORS[plan.name] || 'border-slate-200 bg-white'}`}>
              {plan.name === 'Pro' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-0.5 rounded-full font-medium">Most Popular</div>
              )}
              <div className="text-3xl mb-2">{PLAN_ICONS[plan.name] || '📦'}</div>
              <h3 className="font-bold text-slate-800 text-lg">{plan.name}</h3>
              <p className="text-2xl font-bold text-slate-800 mt-2">
                {plan.price === 0 ? 'Free' : `₹${Number(plan.price).toLocaleString()}`}
                {plan.price > 0 && <span className="text-sm font-normal text-slate-500">/mo</span>}
              </p>
              <div className="mt-4 space-y-1.5 text-sm text-slate-600">
                <div>📧 {Number(plan.max_emails_per_month).toLocaleString()} emails/mo</div>
                <div>👥 {Number(plan.max_contacts).toLocaleString()} contacts</div>
                {(plan.features || []).map((f, i) => <div key={i}>✅ {f}</div>)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Manage Tab */}
      {isAdmin && activeTab === 'manage' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-left text-xs text-slate-500">
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Start</th>
                  <th className="px-4 py-3">End</th>
                  {isSA && <th className="px-4 py-3">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {allSubs.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-10 text-slate-400">No subscriptions found</td></tr>
                ) : allSubs.map(sub => (
                  <tr key={sub.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-700">{sub.user_name || sub.user_id}</td>
                    <td className="px-4 py-3 text-slate-600">{sub.plan_name}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${sub.status === 'active' ? 'bg-green-100 text-green-700' : sub.status === 'expired' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{sub.start_date ? new Date(sub.start_date).toLocaleDateString() : '—'}</td>
                    <td className="px-4 py-3 text-slate-500">{sub.end_date ? new Date(sub.end_date).toLocaleDateString() : '—'}</td>
                    {isSA && (
                      <td className="px-4 py-3">
                        {sub.status === 'active' && (
                          <button onClick={() => handleCancel(sub.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Cancel</button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {assignModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-800">Assign Plan to User</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">User ID</label>
                <input value={assignData.user_id} onChange={e => setAssignData(d => ({ ...d, user_id: e.target.value }))} placeholder="User ID" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Plan</label>
                <select value={assignData.plan_id} onChange={e => setAssignData(d => ({ ...d, plan_id: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                  <option value="">Select Plan</option>
                  {plans.map(p => <option key={p.id} value={p.id}>{p.name} — ₹{p.price}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Start Date</label>
                  <input type="date" value={assignData.start_date} onChange={e => setAssignData(d => ({ ...d, start_date: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">End Date</label>
                  <input type="date" value={assignData.end_date} onChange={e => setAssignData(d => ({ ...d, end_date: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setAssignModal(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleAssign} disabled={saving} className="px-5 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors">{saving ? 'Saving…' : 'Assign'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
