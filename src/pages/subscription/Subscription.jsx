// src/pages/subscription/Subscription.jsx
import React, { useState } from 'react';

const PLANS = [
  { id: 1, name: 'Free', price: 0, duration: 30, max_emails_per_month: 1000, max_contacts: 500, features: ['Basic Templates', 'Email Support'] },
  { id: 2, name: 'Basic', price: 499, duration: 30, max_emails_per_month: 10000, max_contacts: 2000, features: ['All Templates', 'Priority Support', 'Analytics'] },
  { id: 3, name: 'Pro', price: 999, duration: 30, max_emails_per_month: 50000, max_contacts: 10000, features: ['All Templates', '24/7 Support', 'Advanced Analytics', 'Automation'] },
  { id: 4, name: 'Enterprise', price: 2499, duration: 30, max_emails_per_month: 200000, max_contacts: 100000, features: ['Custom Templates', 'Dedicated Manager', 'Full Analytics', 'Automation', 'API Access'] },
];

const MY_SUB = {
  plan_id: 3, plan_name: 'Pro', status: 'active',
  max_contacts: 10000, max_emails_per_month: 50000,
  start_date: '2025-03-01', end_date: '2025-04-30',
};

const ALL_SUBS = [
  { id: 1, user_name: 'Rahul Sharma', user_email: 'rahul@example.com', plan_name: 'Pro', status: 'active', start_date: '2025-03-01', end_date: '2025-03-31', amount_paid: 999 },
  { id: 2, user_name: 'Priya Patil', user_email: 'priya@example.com', plan_name: 'Basic', status: 'active', start_date: '2025-03-05', end_date: '2025-04-04', amount_paid: 499 },
  { id: 3, user_name: 'Amit Joshi', user_email: 'amit@example.com', plan_name: 'Enterprise', status: 'active', start_date: '2025-02-01', end_date: '2025-04-30', amount_paid: 2499 },
  { id: 4, user_name: 'Sneha More', user_email: 'sneha@example.com', plan_name: 'Free', status: 'expired', start_date: '2025-01-01', end_date: '2025-01-31', amount_paid: 0 },
  { id: 5, user_name: 'Vikram Desai', user_email: 'vikram@example.com', plan_name: 'Pro', status: 'cancelled', start_date: '2025-02-10', end_date: '2025-03-09', amount_paid: 999 },
];

const STATS = { active_count: 3, this_month: 5, total_revenue: 4996 };

const PLAN_ICONS = { Free: '🆓', Basic: '⚡', Pro: '🚀', Enterprise: '🏢' };
const PLAN_COLORS = {
  Free: 'border-slate-200 bg-slate-50',
  Basic: 'border-blue-200 bg-blue-50',
  Pro: 'border-indigo-300 bg-indigo-50 ring-2 ring-indigo-300',
  Enterprise: 'border-purple-200 bg-purple-50',
};

const STATUS_COLORS = {
  active: 'bg-green-100 text-green-700 border-green-200',
  expired: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

export default function Subscription() {
  const [activeTab, setActiveTab] = useState('plans');
  const [assignModal, setAssignModal] = useState(false);
  const [assignData, setAssignData] = useState({ user_id: '', plan_id: '', amount_paid: '' });
  const [subs, setSubs] = useState(ALL_SUBS);
  const [toast, setToast] = useState(null);

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleAssign() {
    if (!assignData.user_id || !assignData.plan_id) { showToast('Please fill User ID and Plan.', 'error'); return; }
    const plan = PLANS.find(p => p.id === Number(assignData.plan_id));
    const newSub = {
      id: subs.length + 1,
      user_name: `User #${assignData.user_id}`,
      user_email: `user${assignData.user_id}@example.com`,
      plan_name: plan?.name || '—',
      status: 'active',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      amount_paid: assignData.amount_paid || plan?.price || 0,
    };
    setSubs(prev => [newSub, ...prev]);
    setAssignModal(false);
    setAssignData({ user_id: '', plan_id: '', amount_paid: '' });
    showToast('Plan assigned successfully!');
  }

  function handleCancel(id) {
    if (!confirm('Are you sure you want to cancel this subscription?')) return;
    setSubs(prev => prev.map(s => s.id === id ? { ...s, status: 'cancelled' } : s));
    showToast('Subscription cancelled.');
  }

  const tabs = [
    { id: 'plans', label: '📦 Plans' },
    { id: 'manage', label: '⚙️ Manage' },
  ];

  return (
    <div className="space-y-6">
      <style>{`
        @media (max-width: 767px) {
          .sub-manage-table { display: none !important; }
          .sub-manage-cards { display: flex !important; }
        }
        @media (min-width: 768px) {
          .sub-manage-table { display: block !important; }
          .sub-manage-cards { display: none !important; }
        }
        .sub-user-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          padding: 16px;
          transition: box-shadow 0.2s;
        }
        .sub-user-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.10); }
      `}</style>

      {/* Toast */}
      {toast && (
        <div className={`rounded-xl px-4 py-3 text-sm border flex items-center justify-between ${toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'}`}>
          <span>{toast.type === 'error' ? '⚠️' : '✅'} {toast.msg}</span>
          <button onClick={() => setToast(null)} className="ml-4 opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Subscription</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage plans and billing</p>
        </div>
        <button onClick={() => setAssignModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          ➕ Assign Plan
        </button>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <p className="text-indigo-200 text-sm font-medium">Your Current Plan</p>
        <h2 className="text-2xl font-bold mt-1">{MY_SUB.plan_name}</h2>
        <div className="flex flex-wrap gap-4 mt-3 text-sm">
          <div>
            <span className="text-indigo-200">Status: </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-400/20 text-green-100">{MY_SUB.status}</span>
          </div>
          <div><span className="text-indigo-200">Contacts: </span><span className="font-medium">{MY_SUB.max_contacts.toLocaleString()}</span></div>
          <div><span className="text-indigo-200">Emails/mo: </span><span className="font-medium">{MY_SUB.max_emails_per_month.toLocaleString()}</span></div>
          <div><span className="text-indigo-200">Expires: </span><span className="font-medium">{new Date(MY_SUB.end_date).toLocaleDateString('en-IN')}</span></div>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '✅', label: 'Active Subscriptions', value: STATS.active_count },
          { icon: '📅', label: 'This Month', value: STATS.this_month },
          { icon: '💰', label: 'Total Revenue', value: `₹${STATS.total_revenue.toLocaleString()}` },
          { icon: '📦', label: 'Total Plans', value: PLANS.length },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4">
            <div className="text-2xl mb-2">{s.icon}</div>
            <p className="text-xl font-bold text-slate-800">{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === t.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Plans Grid */}
      {activeTab === 'plans' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {PLANS.map(plan => {
            const isCurrent = MY_SUB.plan_id === plan.id;
            return (
              <div key={plan.id} className={`rounded-2xl border p-5 relative transition-transform hover:-translate-y-1 ${PLAN_COLORS[plan.name] || 'border-slate-200 bg-white'}`}>
                {plan.name === 'Pro' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-0.5 rounded-full font-medium whitespace-nowrap">Most Popular</div>
                )}
                {isCurrent && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">Current</div>
                )}
                <div className="text-3xl mb-2">{PLAN_ICONS[plan.name] || '📦'}</div>
                <h3 className="font-bold text-slate-800 text-lg">{plan.name}</h3>
                <p className="text-2xl font-bold text-slate-800 mt-2">
                  {plan.price === 0 ? 'Free' : `₹${plan.price.toLocaleString()}`}
                  {plan.price > 0 && <span className="text-sm font-normal text-slate-500">/mo</span>}
                </p>
                <div className="mt-4 space-y-1.5 text-sm text-slate-600">
                  <div>📧 {plan.max_emails_per_month.toLocaleString()} emails/mo</div>
                  <div>👥 {plan.max_contacts.toLocaleString()} contacts</div>
                  <div>📅 {plan.duration} days validity</div>
                  {plan.features.map((f, i) => <div key={i}>✅ {f}</div>)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Manage Tab */}
      {activeTab === 'manage' && (
        <>
          {/* ── DESKTOP TABLE ── */}
          <div className="sub-manage-table bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[680px]">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr className="text-left text-xs text-slate-500">
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Plan</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Start</th>
                    <th className="px-4 py-3">End</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subs.map(sub => (
                    <tr key={sub.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">{sub.user_name}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{sub.user_email}</td>
                      <td className="px-4 py-3 text-slate-600">{sub.plan_name}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[sub.status] || 'bg-gray-100 text-gray-600'}`}>{sub.status}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{new Date(sub.start_date).toLocaleDateString('en-IN')}</td>
                      <td className="px-4 py-3 text-slate-500">{new Date(sub.end_date).toLocaleDateString('en-IN')}</td>
                      <td className="px-4 py-3 text-slate-600">₹{Number(sub.amount_paid).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        {sub.status === 'active' && (
                          <button onClick={() => handleCancel(sub.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Cancel</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── MOBILE CARDS ── */}
          <div className="sub-manage-cards flex-col gap-3">
            {subs.map(sub => (
              <div key={sub.id} className="sub-user-card">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{sub.user_name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{sub.user_email}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${STATUS_COLORS[sub.status] || 'bg-gray-100 text-gray-600'}`}>
                    {sub.status}
                  </span>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="flex items-center gap-1.5 bg-indigo-50 rounded-lg px-2.5 py-1.5">
                    <span className="text-indigo-400 text-xs">📦</span>
                    <span className="text-xs text-indigo-700 font-semibold">{sub.plan_name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-green-50 rounded-lg px-2.5 py-1.5">
                    <span className="text-green-400 text-xs">💰</span>
                    <span className="text-xs text-green-700 font-semibold">₹{Number(sub.amount_paid).toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-slate-50 rounded-lg px-3 py-2">
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mb-0.5">Start Date</p>
                    <p className="text-xs text-slate-700 font-semibold">{new Date(sub.start_date).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg px-3 py-2">
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mb-0.5">End Date</p>
                    <p className="text-xs text-slate-700 font-semibold">{new Date(sub.end_date).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>

                {sub.status === 'active' && (
                  <div className="pt-3 border-t border-slate-100">
                    <button onClick={() => handleCancel(sub.id)}
                      className="w-full py-2 rounded-xl text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 transition-colors">
                      🚫 Cancel Subscription
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
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
                <label className="text-sm font-medium text-slate-700 block mb-1">User ID *</label>
                <input type="number" value={assignData.user_id} onChange={e => setAssignData(d => ({ ...d, user_id: e.target.value }))}
                  placeholder="e.g. 5"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Plan *</label>
                <select value={assignData.plan_id} onChange={e => setAssignData(d => ({ ...d, plan_id: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                  <option value="">Select plan</option>
                  {PLANS.map(p => <option key={p.id} value={p.id}>{p.name} — ₹{p.price.toLocaleString()} ({p.duration} days)</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Amount Paid <span className="text-slate-400 font-normal">(optional)</span></label>
                <input type="number" value={assignData.amount_paid} onChange={e => setAssignData(d => ({ ...d, amount_paid: e.target.value }))}
                  placeholder="e.g. 999"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setAssignModal(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleAssign} className="px-5 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors">Assign Plan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}