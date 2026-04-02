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

  const [plans, setPlans]             = useState([]);
  const [mySub, setMySub]             = useState(null);
  const [allSubs, setAllSubs]         = useState([]);
  const [stats, setStats]             = useState(null);
  const [loading, setLoading]         = useState(true);
  const [assignModal, setAssignModal] = useState(false);
  const [assignData, setAssignData]   = useState({ user_id: '', plan_id: '', amount_paid: '' });
  const [saving, setSaving]           = useState(false);
  const [activeTab, setActiveTab]     = useState('plans');
  const [error, setError]             = useState(null);
  const [successMsg, setSuccessMsg]   = useState(null);

  const isSA    = user?.role === 'SUPER_ADMIN';
  const isAdmin = ['SUPER_ADMIN', 'BUSINESS_ADMIN'].includes(user?.role);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // ── Load all data ──────────────────────────────────────────────────────────
  async function fetchAllSubs() {
    // Backend: getAllSubscriptions => sendSuccess(res, paginatedResponse(rows,...))
    // => { success, data: { data: [...], pagination: {...} } }
    const res  = await fetch(`${API}/subscriptions`, { headers });
    const json = await res.json();
    // paginatedResponse wraps rows in data.data
    return json.data?.data || json.data || [];
  }

  useEffect(() => {
    async function load() {
      try {
        // /plans => sendSuccess(res, { plans: rows }) => data.plans
        const plRes  = await fetch(`${API}/subscriptions/plans`, { headers });
        const plJson = await plRes.json();
        setPlans(plJson.data?.plans || plJson.data || []);

        // /my => sendSuccess(res, { subscription: row }) => data.subscription
        const myRes  = await fetch(`${API}/subscriptions/my`, { headers });
        const myJson = await myRes.json();
        setMySub(myJson.data?.subscription || myJson.data || null);

        if (isAdmin) {
          const [subs, stRes] = await Promise.all([
            fetchAllSubs(),
            fetch(`${API}/subscriptions/stats`, { headers }),
          ]);
          setAllSubs(subs);

          // /stats => sendSuccess(res, statsObj) => data = statsObj
          const stJson = await stRes.json();
          setStats(stJson.data || stJson);
        }
      } catch (e) {
        console.error(e);
        setError('Data load karne mein error aayi.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ── Assign plan ────────────────────────────────────────────────────────────
  async function handleAssign() {
    if (!assignData.user_id || !assignData.plan_id) {
      setError('User ID aur Plan dono zaroori hain.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      // Backend assign: { user_id, plan_id, amount_paid }
      const res = await fetch(`${API}/subscriptions/assign`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          user_id:    Number(assignData.user_id),
          plan_id:    Number(assignData.plan_id),
          amount_paid: assignData.amount_paid ? Number(assignData.amount_paid) : undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || 'Assign nahi ho saka.');
      } else {
        setAssignModal(false);
        setAssignData({ user_id: '', plan_id: '', amount_paid: '' });
        setAllSubs(await fetchAllSubs());
        showSuccess('Plan successfully assign kiya gaya!');
      }
    } catch (e) {
      console.error(e);
      setError('Network error aayi.');
    }
    setSaving(false);
  }

  // ── Cancel subscription ───────────────────────────────────────────────────
  async function handleCancel(id) {
    if (!confirm('Kya aap yeh subscription cancel karna chahte hain?')) return;
    try {
      await fetch(`${API}/subscriptions/${id}/cancel`, { method: 'PUT', headers });
      setAllSubs(await fetchAllSubs());
      showSuccess('Subscription cancel kar diya gaya.');
    } catch (e) {
      console.error(e);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center h-60">
      <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  );

  const tabs = [
    { id: 'plans',  label: '📦 Plans'  },
    ...(isAdmin ? [{ id: 'manage', label: '⚙️ Manage' }] : []),
  ];

  // Stats card data — backend getStats returns: active_count, total_revenue, this_month
  const statCards = isAdmin && stats ? [
    { label: 'Active Subscriptions', value: stats.active_count,                                               icon: '✅' },
    { label: 'This Month',           value: stats.this_month,                                                  icon: '📅' },
    { label: 'Total Revenue',        value: stats.total_revenue != null ? `₹${Number(stats.total_revenue).toLocaleString()}` : '—', icon: '💰' },
    { label: 'Total Plans',          value: plans.length,                                                      icon: '📦' },
  ] : [];

  return (
    <div className="space-y-6">

      {/* Toast messages */}
      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
          ✅ {successMsg}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center justify-between">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Subscription</h1>
          <p className="text-sm text-slate-500 mt-0.5">Plans aur billing manage karein</p>
        </div>
        {isSA && (
          <button
            onClick={() => { setAssignModal(true); setError(null); }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            ➕ Plan Assign Karein
          </button>
        )}
      </div>

      {/* Current plan banner */}
      {mySub ? (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
          <p className="text-indigo-200 text-sm font-medium">Aapka Current Plan</p>
          <h2 className="text-2xl font-bold mt-1">{mySub.plan_name || 'Free'}</h2>
          <div className="flex flex-wrap gap-6 mt-3 text-sm">
            <div>
              <span className="text-indigo-200">Status: </span>
              <span className={`font-medium capitalize px-2 py-0.5 rounded-full text-xs ${mySub.status === 'active' ? 'bg-green-400/20 text-green-100' : 'bg-red-400/20 text-red-100'}`}>
                {mySub.status}
              </span>
            </div>
            <div>
              <span className="text-indigo-200">Max Contacts: </span>
              <span className="font-medium">{mySub.max_contacts ? Number(mySub.max_contacts).toLocaleString() : '—'}</span>
            </div>
            <div>
              <span className="text-indigo-200">Emails/Month: </span>
              <span className="font-medium">{mySub.max_emails_per_month ? Number(mySub.max_emails_per_month).toLocaleString() : '—'}</span>
            </div>
            <div>
              <span className="text-indigo-200">Expires: </span>
              <span className="font-medium">{mySub.end_date ? new Date(mySub.end_date).toLocaleDateString('en-IN') : '—'}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-slate-500">
          Abhi koi active subscription nahi hai. Niche se koi plan choose karein.
        </div>
      )}

      {/* Admin stats */}
      {isAdmin && stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((s, i) => (
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
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === t.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* Plans grid */}
      {(!isAdmin || activeTab === 'plans') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {plans.length === 0 ? (
            <div className="col-span-4 text-center text-slate-400 py-10">Koi plan available nahi hai.</div>
          ) : plans.map(plan => {
            const featuresList = (() => {
              try { return Array.isArray(plan.features) ? plan.features : JSON.parse(plan.features || '[]'); }
              catch { return []; }
            })();
            const isCurrent = mySub?.plan_id === plan.id;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl border p-5 relative transition-transform hover:-translate-y-0.5 ${PLAN_COLORS[plan.name] || 'border-slate-200 bg-white'} ${isCurrent ? 'shadow-lg' : ''}`}
              >
                {plan.name === 'Pro' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-0.5 rounded-full font-medium whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                    Current
                  </div>
                )}
                <div className="text-3xl mb-2">{PLAN_ICONS[plan.name] || '📦'}</div>
                <h3 className="font-bold text-slate-800 text-lg">{plan.name}</h3>
                <p className="text-2xl font-bold text-slate-800 mt-2">
                  {Number(plan.price) === 0 ? 'Free' : `₹${Number(plan.price).toLocaleString()}`}
                  {Number(plan.price) > 0 && <span className="text-sm font-normal text-slate-500">/mo</span>}
                </p>
                <div className="mt-4 space-y-1.5 text-sm text-slate-600">
                  <div>📧 {Number(plan.max_emails_per_month).toLocaleString()} emails/mo</div>
                  <div>👥 {Number(plan.max_contacts).toLocaleString()} contacts</div>
                  <div>📅 {plan.duration} days validity</div>
                  {featuresList.map((f, i) => <div key={i}>✅ {f}</div>)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Manage tab */}
      {isAdmin && activeTab === 'manage' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-left text-xs text-slate-500">
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Start</th>
                  <th className="px-4 py-3">End</th>
                  <th className="px-4 py-3">Amount Paid</th>
                  {isSA && <th className="px-4 py-3">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {allSubs.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-slate-400">
                      Koi subscription nahi mili
                    </td>
                  </tr>
                ) : allSubs.map(sub => (
                  <tr key={sub.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-700">{sub.user_name || sub.user_id}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{sub.user_email || '—'}</td>
                    <td className="px-4 py-3 text-slate-600">{sub.plan_name}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        sub.status === 'active'    ? 'bg-green-100 text-green-700'  :
                        sub.status === 'expired'   ? 'bg-yellow-100 text-yellow-700' :
                        sub.status === 'cancelled' ? 'bg-red-100 text-red-700'      :
                                                     'bg-slate-100 text-slate-600'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {sub.start_date ? new Date(sub.start_date).toLocaleDateString('en-IN') : '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {sub.end_date ? new Date(sub.end_date).toLocaleDateString('en-IN') : '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {sub.amount_paid != null ? `₹${Number(sub.amount_paid).toLocaleString()}` : '—'}
                    </td>
                    {isSA && (
                      <td className="px-4 py-3">
                        {sub.status === 'active' && (
                          <button
                            onClick={() => handleCancel(sub.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium"
                          >
                            Cancel
                          </button>
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
              <h2 className="text-lg font-semibold text-slate-800">User Ko Plan Assign Karein</h2>
              <p className="text-xs text-slate-500 mt-1">
                Plan assign karne par backend start_date aur end_date automatically set karta hai (plan duration ke hisab se).
              </p>
            </div>
            <div className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-3 py-2 text-xs">
                  {error}
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">User ID *</label>
                <input
                  type="number"
                  value={assignData.user_id}
                  onChange={e => setAssignData(d => ({ ...d, user_id: e.target.value }))}
                  placeholder="e.g. 5"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Plan *</label>
                <select
                  value={assignData.plan_id}
                  onChange={e => setAssignData(d => ({ ...d, plan_id: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="">Plan chunein</option>
                  {plans.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ₹{Number(p.price).toLocaleString()} ({p.duration} days)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">
                  Amount Paid <span className="text-slate-400 font-normal">(optional — plan price default)</span>
                </label>
                <input
                  type="number"
                  value={assignData.amount_paid}
                  onChange={e => setAssignData(d => ({ ...d, amount_paid: e.target.value }))}
                  placeholder="e.g. 999"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => { setAssignModal(false); setError(null); }}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={saving}
                className="px-5 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors"
              >
                {saving ? 'Saving…' : 'Assign Karein'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}