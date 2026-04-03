import { useState } from "react";

const mockCampaigns = [
  { id: 1, name: "Summer Sale 2026", subject: "☀️ Exclusive Summer Deals — Up to 50% Off!", template_name: "Discount Template", segment_name: "Newsletter Subscribers", status: "sent", total_sent: 5000, scheduled_at: "2026-03-20T10:00", created_at: "2026-03-18T09:00" },
  { id: 2, name: "Product Launch", subject: "🚀 Introducing Our New Product Line", template_name: "Launch Template", segment_name: "Active Users", status: "scheduled", total_sent: 0, scheduled_at: "2026-04-01T09:00", created_at: "2026-03-25T11:00" },
  { id: 3, name: "Re-engagement Campaign", subject: "We Miss You! Here's 20% Off", template_name: "Winback Template", segment_name: "Returning Customers", status: "draft", total_sent: 0, scheduled_at: null, created_at: "2026-03-26T14:00" },
  { id: 4, name: "Welcome Series", subject: "👋 Welcome — Get Started with Us", template_name: "Welcome Template", segment_name: "New Customers", status: "pending_approval", total_sent: 0, scheduled_at: null, created_at: "2026-03-27T10:00" },
];

const MOCK_TEMPLATES = ["Discount Template", "Launch Template", "Winback Template", "Welcome Template", "Newsletter Template"];
const SEGMENTS = ["All Contacts", "New Customers", "Active Users", "Newsletter Subscribers", "Returning Customers"];

const STATUS_CONFIG = {
  draft: { label: "Draft", bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
  pending_approval: { label: "Pending Approval", bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-400" },
  scheduled: { label: "Scheduled", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-400" },
  sending: { label: "Sending", bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-400" },
  sent: { label: "Sent", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  rejected: { label: "Rejected", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function Toast({ toasts }) {
  return (
    <div className="fixed top-5 right-5 z-[999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white pointer-events-auto
            ${t.type === "success" ? "bg-green-500" : t.type === "error" ? "bg-red-500" : t.type === "info" ? "bg-blue-600" : "bg-gray-700"}`}
          style={{ animation: "slideInRight .3s ease" }}>
          <span className="text-base">{t.type === "success" ? "✅" : t.type === "error" ? "❌" : t.type === "info" ? "ℹ️" : "🔔"}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

function SubmitConfirmModal({ campaign, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Submit for Approval</h2>
            <p className="text-xs text-gray-500">Goes to Admin Dashboard → Campaigns</p>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-indigo-50 rounded-xl p-4 mb-5 border border-indigo-100">
            <p className="text-sm font-semibold text-indigo-800 mb-1">📧 {campaign.name}</p>
            <p className="text-xs text-indigo-600 mb-3">{campaign.subject}</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-white text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100 font-medium">📄 {campaign.template_name}</span>
              <span className="text-xs bg-white text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100 font-medium">👥 {campaign.segment_name}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2">
            ⚠️ After submitting, the admin can approve or reject this campaign.
          </p>
        </div>
        <div className="flex gap-3 p-6 pt-0">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Submit for Approval
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ campaign, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
        <div className="p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Delete Campaign?</h3>
          <p className="text-sm text-gray-500 mb-1"><span className="font-semibold text-gray-700">"{campaign.name}"</span> will be permanently deleted.</p>
          <p className="text-xs text-red-500 mb-6">This action cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            <button onClick={onConfirm}
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CampaignFormModal({ onClose, onSave, editData = null }) {
  const isEdit = !!editData;
  const [form, setForm] = useState({
    name: editData?.name || "",
    subject: editData?.subject || "",
    template_id: editData?.template_name || "",
    segment_id: editData?.segment_name || "",
    scheduled_at: editData?.scheduled_at || "",
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const isValid = form.name && form.subject && form.template_id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isEdit ? "bg-amber-500" : "bg-blue-600"}`}>
              {isEdit ? (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{isEdit ? "Edit Campaign" : "New Email Campaign"}</h2>
              <p className="text-xs text-gray-500">{isEdit ? "Update campaign details" : "Create a bulk email campaign"}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Campaign Name <span className="text-red-500">*</span></label>
            <input type="text" value={form.name} onChange={e => set("name", e.target.value)}
              placeholder="e.g. Summer Sale 2026"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject Line <span className="text-red-500">*</span></label>
            <input type="text" value={form.subject} onChange={e => set("subject", e.target.value)}
              placeholder="e.g. ☀️ Exclusive Summer Deals — Up to 50% Off!"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
            <p className="text-xs text-gray-400 mt-1">{form.subject.length}/150 chars</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Template <span className="text-red-500">*</span></label>
            <select value={form.template_id} onChange={e => set("template_id", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white">
              <option value="">Select template</option>
              {MOCK_TEMPLATES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          {form.template_id && (
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-xs font-semibold text-blue-700 mb-2 uppercase tracking-wide">Email Preview</p>
              <div className="bg-white rounded-lg border border-gray-100 p-4 text-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-gray-700">{form.subject || "Subject Line"}</p>
                <p className="text-xs text-gray-400 mt-1">Template: {form.template_id}</p>
                <div className="mt-3 w-full h-1.5 bg-gray-100 rounded" />
                <div className="mt-1.5 w-3/4 h-1.5 bg-gray-100 rounded mx-auto" />
                <div className="mt-3 inline-block px-4 py-1.5 bg-blue-600 text-white text-xs rounded-lg">CTA Button</div>
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Target Segment</label>
            <select value={form.segment_id} onChange={e => set("segment_id", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white">
              <option value="">All Contacts (Default)</option>
              {SEGMENTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Schedule Date & Time</label>
            <input type="datetime-local" value={form.scheduled_at} onChange={e => set("scheduled_at", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
            <p className="text-xs text-gray-400 mt-1">If left empty, saved as a draft.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-6 pt-0">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }} disabled={!isValid}
            className={`flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isEdit ? "bg-amber-500 hover:bg-amber-600" : "bg-blue-600 hover:bg-blue-700"}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {isEdit ? "Update Campaign" : "Save as Draft"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EmailCampaigns() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [showCreate, setShowCreate] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [submitTarget, setSubmitTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const filtered = campaigns.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleCreate = (form) => {
    setCampaigns(prev => [{
      id: Date.now(), name: form.name, subject: form.subject,
      template_name: form.template_id, segment_name: form.segment_id || "All Contacts",
      status: "draft", total_sent: 0, scheduled_at: form.scheduled_at || null,
      created_at: new Date().toISOString(),
    }, ...prev]);
    addToast("Campaign saved as draft! ✍️", "success");
  };

  const handleEdit = (form) => {
    setCampaigns(prev => prev.map(c =>
      c.id === editTarget.id ? { ...c, name: form.name, subject: form.subject, template_name: form.template_id, segment_name: form.segment_id || "All Contacts", scheduled_at: form.scheduled_at || null } : c
    ));
    addToast("Campaign updated! ✅", "success");
    setEditTarget(null);
  };

  const handleDelete = () => {
    setCampaigns(prev => prev.filter(c => c.id !== deleteTarget.id));
    addToast(`"${deleteTarget.name}" deleted 🗑️`, "error");
    setDeleteTarget(null);
  };

  const handleSubmit = () => {
    setCampaigns(prev => prev.map(c => c.id === submitTarget.id ? { ...c, status: "pending_approval" } : c));
    addToast(`${submitTarget.name} submitted for approval ⏳`, "info");
    setSubmitTarget(null);
  };

  const handleApprove = (campaign) => {
    setCampaigns(prev => prev.map(c => c.id === campaign.id ? { ...c, status: campaign.scheduled_at ? "scheduled" : "sending" } : c));
    addToast(`"${campaign.name}" approved! ${campaign.scheduled_at ? "Scheduled ✅" : "Sending 📤"}`, "success");
  };

  const handleReject = (campaign) => {
    setCampaigns(prev => prev.map(c => c.id === campaign.id ? { ...c, status: "rejected" } : c));
    addToast(`"${campaign.name}" rejected ❌`, "error");
  };

  const handleSendNow = (campaign) => {
    setCampaigns(prev => prev.map(c => c.id === campaign.id ? { ...c, status: "sending" } : c));
    addToast(`"${campaign.name}" sending started! 📤`, "info");
  };

  const stats = {
    total: campaigns.length,
    sent: campaigns.filter(c => c.status === "sent").length,
    totalSent: campaigns.reduce((a, c) => a + c.total_sent, 0),
    pending: campaigns.filter(c => c.status === "pending_approval").length,
  };

  const ActionButtons = ({ c, compact = false }) => (
    <div className={`flex items-center gap-1.5 flex-wrap ${compact ? "" : "justify-end"}`}>
      {c.status === "draft" && (
        <button onClick={() => setSubmitTarget(c)}
          className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition-colors whitespace-nowrap">Submit</button>
      )}
      {c.status === "pending_approval" && (
        <>
          <button onClick={() => handleApprove(c)}
            className="px-2.5 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors">Approve</button>
          <button onClick={() => handleReject(c)}
            className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition-colors">Reject</button>
        </>
      )}
      {c.status === "scheduled" && (
        <button onClick={() => handleSendNow(c)}
          className="px-2.5 py-1 rounded-lg bg-yellow-50 text-yellow-700 text-xs font-semibold hover:bg-yellow-100 transition-colors whitespace-nowrap">Send Now</button>
      )}
      {c.status === "sent" && (
        <button className="px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">Analytics</button>
      )}
      {!["sent", "sending"].includes(c.status) && (
        <button onClick={() => setEditTarget(c)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-amber-500 hover:bg-amber-50 transition-colors" title="Edit">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )}
      {!["sent", "sending"].includes(c.status) && (
        <button onClick={() => setDeleteTarget(c)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors" title="Delete">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes slideInRight { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @media (max-width: 767px) {
          .campaigns-table { display: none !important; }
          .campaigns-cards { display: flex !important; }
        }
        @media (min-width: 768px) {
          .campaigns-table { display: block !important; }
          .campaigns-cards { display: none !important; }
        }
        .campaign-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          padding: 16px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .campaign-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.10); transform: translateY(-1px); }
      `}</style>

      <Toast toasts={toasts} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Email Campaigns</h1>
              <p className="text-sm text-gray-500">Manage your email marketing campaigns</p>
            </div>
          </div>
          <button onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Campaign
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Campaigns", value: stats.total, icon: "📧", sub: "all campaigns" },
            { label: "Sent", value: stats.sent, icon: "✅", sub: "successfully sent" },
            { label: "Emails Delivered", value: stats.totalSent.toLocaleString(), icon: "📤", sub: "total emails" },
            { label: "Pending Approval", value: stats.pending, icon: "⏳", sub: "under review" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs font-semibold text-gray-600 mt-0.5">{s.label}</div>
              <div className="text-xs text-gray-400">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search campaign or subject..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition">
            <option value="all">All Status</option>
            {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="text-5xl mb-3">📧</div>
            <p className="text-gray-500 text-sm">No campaigns found</p>
            <button onClick={() => setShowCreate(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">Create Campaign</button>
          </div>
        ) : (
          <>
            <div className="campaigns-table bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Campaign</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Template</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Segment</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Sent</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Scheduled</th>
                      <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c, i) => (
                      <tr key={c.id} className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${i === filtered.length - 1 ? "border-b-0" : ""}`}>
                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">{c.name}</p>
                          <p className="text-xs text-gray-500 truncate max-w-[180px] mt-0.5">{c.subject}</p>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">{c.template_name}</span>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <span className="text-xs text-gray-500">{c.segment_name || "All Contacts"}</span>
                        </td>
                        <td className="px-5 py-4"><StatusBadge status={c.status} /></td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <span className="text-sm font-semibold text-gray-700">{c.total_sent.toLocaleString()}</span>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <span className="text-xs text-gray-500">{c.scheduled_at ? new Date(c.scheduled_at).toLocaleDateString("en-IN") : "—"}</span>
                        </td>
                        <td className="px-5 py-4"><ActionButtons c={c} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="campaigns-cards flex-col gap-3">
              {filtered.map(c => (
                <div key={c.id} className="campaign-card">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{c.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{c.subject}</p>
                    </div>
                    <StatusBadge status={c.status} />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2.5 py-1.5">
                      <span className="text-gray-400 text-xs">📄</span>
                      <span className="text-xs text-gray-600 font-medium">{c.template_name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-blue-50 rounded-lg px-2.5 py-1.5">
                      <span className="text-blue-400 text-xs">👥</span>
                      <span className="text-xs text-blue-600 font-medium">{c.segment_name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-green-50 rounded-lg px-2.5 py-1.5">
                      <span className="text-green-400 text-xs">📤</span>
                      <span className="text-xs text-green-600 font-medium">{c.total_sent.toLocaleString()} sent</span>
                    </div>
                    {c.scheduled_at && (
                      <div className="flex items-center gap-1.5 bg-yellow-50 rounded-lg px-2.5 py-1.5">
                        <span className="text-yellow-400 text-xs">🕐</span>
                        <span className="text-xs text-yellow-700 font-medium">{new Date(c.scheduled_at).toLocaleDateString("en-IN")}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <ActionButtons c={c} compact />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {showCreate && <CampaignFormModal onClose={() => setShowCreate(false)} onSave={handleCreate} />}
      {editTarget && <CampaignFormModal onClose={() => setEditTarget(null)} onSave={handleEdit} editData={editTarget} />}
      {deleteTarget && <DeleteConfirmModal onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} campaign={deleteTarget} />}
      {submitTarget && <SubmitConfirmModal onClose={() => setSubmitTarget(null)} onConfirm={handleSubmit} campaign={submitTarget} />}
    </div>
  );
}