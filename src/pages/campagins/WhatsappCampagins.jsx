import { useState } from "react";

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const mockCampaigns = [
  {
    id: 1,
    name: "Diwali Offer 2025",
    message: "🎉 Diwali Special! 40% off on all products. Shop now: {{link}}",
    segment_name: "All Contacts",
    status: "sent",
    total_sent: 3200,
    scheduled_at: "2025-10-20T10:00",
    created_at: "2025-10-18T09:00",
  },
  {
    id: 2,
    name: "New Year Sale",
    message: "🎊 New Year, New Deals! Use code NY2026 for 30% off.",
    segment_name: "Newsletter Subscribers",
    status: "scheduled",
    total_sent: 0,
    scheduled_at: "2025-12-31T08:00",
    created_at: "2025-12-25T11:00",
  },
  {
    id: 3,
    name: "Flash Sale Alert",
    message: "⚡ Flash Sale - 2 hours only! Grab deals before they expire.",
    segment_name: "Active Users",
    status: "draft",
    total_sent: 0,
    scheduled_at: null,
    created_at: "2026-01-02T14:00",
  },
  {
    id: 4,
    name: "Welcome Sequence",
    message: "👋 Welcome to our family! Here's 10% off your first order.",
    segment_name: "New Customers",
    status: "pending_approval",
    total_sent: 0,
    scheduled_at: null,
    created_at: "2026-01-05T10:00",
  },
];

const STATUS_CONFIG = {
  draft:            { label: "Draft",            bg: "bg-gray-100",   text: "text-gray-600",   dot: "bg-gray-400" },
  pending_approval: { label: "Pending Approval",  bg: "bg-yellow-50",  text: "text-yellow-700", dot: "bg-yellow-400" },
  scheduled:        { label: "Scheduled",         bg: "bg-blue-50",    text: "text-blue-700",   dot: "bg-blue-400" },
  sending:          { label: "Sending",           bg: "bg-purple-50",  text: "text-purple-700", dot: "bg-purple-400" },
  sent:             { label: "Sent",              bg: "bg-green-50",   text: "text-green-700",  dot: "bg-green-500" },
  rejected:         { label: "Rejected",          bg: "bg-red-50",     text: "text-red-700",    dot: "bg-red-500" },
};

const SEGMENTS = [
  "All Contacts",
  "New Customers",
  "Active Users",
  "Newsletter Subscribers",
  "Returning Customers",
];

/* ─────────────────────────────────────────────
   WHATSAPP ICON (reusable)
───────────────────────────────────────────── */
const WaIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─────────────────────────────────────────────
   STATUS BADGE
───────────────────────────────────────────── */
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
function Toast({ toasts }) {
  return (
    <div className="fixed top-5 right-5 z-[999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white pointer-events-auto
            ${t.type === "success" ? "bg-green-500" : t.type === "error" ? "bg-red-500" : t.type === "info" ? "bg-blue-600" : "bg-gray-700"}`}
          style={{ animation: "slideInRight .3s ease" }}
        >
          <span className="text-base">
            {t.type === "success" ? "✅" : t.type === "error" ? "❌" : t.type === "info" ? "ℹ️" : "🔔"}
          </span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SUBMIT CONFIRM MODAL
───────────────────────────────────────────── */
function SubmitConfirmModal({ campaign, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">

        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Submit for Approval</h2>
            <p className="text-xs text-gray-500">Admin Dashboard →  go to Campaigns </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Campaign preview */}
          <div className="bg-indigo-50 rounded-xl p-4 mb-5 border border-indigo-100">
            <p className="text-sm font-semibold text-indigo-800 mb-1">💬 {campaign.name}</p>
            <p className="text-xs text-indigo-600 mb-3 line-clamp-2">{campaign.message}</p>
            <span className="text-xs bg-white text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100 font-medium">
              👥 {campaign.segment_name}
            </span>
          </div>

          {/* Flow steps */}
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Approval Flow</p>
          <div className="space-y-2 mb-5">
            {[
              { icon: "✍️", label: "Draft",                desc: "Your current status",        active: true  },
              { icon: "⏳", label: "Pending Approval",      desc: "Admin will review it",           active: true  },
              { icon: "✅", label: "Approved / Scheduled",  desc: "Campaign will be added to queue",   active: false },
              { icon: "📤", label: "Messages Sent",         desc: "Messages will be sent to contacts on WhatsApp", active: false },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0
                  ${step.active ? "bg-indigo-100" : "bg-gray-100"}`}>
                  {step.icon}
                </div>
                <div>
                  <span className={`text-xs font-semibold ${step.active ? "text-indigo-700" : "text-gray-400"}`}>
                    {step.label}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">— {step.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2">
⚠️ After submitting, the campaign will appear in the Admin Dashboard under the Campaigns section, and the admin will be able to approve or reject it.          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
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

/* ─────────────────────────────────────────────
   DELETE CONFIRM MODAL
───────────────────────────────────────────── */
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
          <h3 className="text-base font-bold text-gray-900 mb-1">Campaign Delete ?</h3>
          <p className="text-sm text-gray-500 mb-1">
            <span className="font-semibold text-gray-700">"{campaign.name}"</span> permanently delete .
          </p>
<p className="text-xs text-red-500 mb-6">This action cannot be undone.</p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CREATE / EDIT MODAL (shared)
───────────────────────────────────────────── */
function CampaignFormModal({ onClose, onSave, editData = null }) {
  const isEdit = !!editData;

  const [form, setForm] = useState({
    name:         editData?.name         || "",
    message:      editData?.message      || "",
    segment_id:   editData?.segment_name || "",
    scheduled_at: editData?.scheduled_at || "",
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const charCount = form.message.length;
  const charColor = charCount > 1000 ? "text-red-500" : charCount > 800 ? "text-yellow-500" : "text-gray-400";
  const isValid = form.name && form.message;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${isEdit ? "bg-amber-500" : "bg-green-500"}`}>
              {isEdit ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ) : (
                <WaIcon />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {isEdit ? "Campaign Edit " : "New WhatsApp Campaign"}
              </h2>
              <p className="text-xs text-gray-500">
                {isEdit ? "Details update " : " send Bulk WhatsApp message "}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">

          {/* Campaign Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Campaign Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => set("name", e.target.value)}
              placeholder="e.g. Diwali Sale 2026"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              WhatsApp Message <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                rows={5}
                value={form.message}
                onChange={e => set("message", e.target.value)}
placeholder={"Hello {{name}}, we have a special offer for you! 🎉\n\nYou can use variables: {{name}}, {{link}}"}                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition resize-none"
              />
              <span className={`absolute bottom-2 right-3 text-xs ${charColor}`}>{charCount}/1024</span>
            </div>
            {/* Variable chips */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["{{name}}", "{{link}}", "{{company}}", "{{offer}}"].map(v => (
                <button
                  key={v}
                  onClick={() => set("message", form.message + v)}
                  className="px-2.5 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors font-mono"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* WA Preview */}
          {form.message && (
            <div className="rounded-xl bg-[#e5ddd5] p-3">
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">WhatsApp Preview</p>
              <div className="bg-white rounded-lg rounded-tl-none px-3.5 py-2.5 max-w-[85%] shadow-sm">
                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{form.message}</p>
                <p className="text-right text-[10px] text-gray-400 mt-1">10:30 AM ✓✓</p>
              </div>
            </div>
          )}

          {/* Segment */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Target Segment</label>
            <select
              value={form.segment_id}
              onChange={e => set("segment_id", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition bg-white"
            >
              <option value="">All Contacts (Default)</option>
              {SEGMENTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Schedule Date & Time</label>
            <input
              type="datetime-local"
              value={form.scheduled_at}
              onChange={e => set("scheduled_at", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
            />
            <p className="text-xs text-gray-400 mt-1">Khali chhodo toh draft mein save hoga</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 p-6 pt-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { onSave(form); onClose(); }}
            disabled={!isValid}
            className={`flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2
              ${isEdit ? "bg-amber-500 hover:bg-amber-600" : "bg-green-500 hover:bg-green-600"}`}
          >
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

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function WhatsAppCampaigns() {
  const [campaigns,    setCampaigns]    = useState(mockCampaigns);
  const [showCreate,   setShowCreate]   = useState(false);
  const [editTarget,   setEditTarget]   = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [submitTarget, setSubmitTarget] = useState(null);
  const [search,       setSearch]       = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toasts,       setToasts]       = useState([]);

  /* ── Toast helper ── */
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  /* ── Filtered list ── */
  const filtered = campaigns.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  /* ── Create ── */
  const handleCreate = (form) => {
    setCampaigns(prev => [{
      id: Date.now(),
      name: form.name,
      message: form.message,
      segment_name: form.segment_id || "All Contacts",
      status: "draft",
      total_sent: 0,
      scheduled_at: form.scheduled_at || null,
      created_at: new Date().toISOString(),
    }, ...prev]);
addToast("Campaign successfully saved as a draft! ✍️", "success");  };

  /* ── Edit ── */
  const handleEdit = (form) => {
    setCampaigns(prev => prev.map(c =>
      c.id === editTarget.id
        ? {
            ...c,
            name:         form.name,
            message:      form.message,
            segment_name: form.segment_id || "All Contacts",
            scheduled_at: form.scheduled_at || null,
          }
        : c
    ));
    addToast("Campaign successfully update! ✅", "success");
    setEditTarget(null);
  };

  /* ── Delete ── */
  const handleDelete = () => {
    setCampaigns(prev => prev.filter(c => c.id !== deleteTarget.id));
    addToast(`"${deleteTarget.name}" delete 🗑️`, "error");
    setDeleteTarget(null);
  };

  /* ── Submit for Approval ── */
  const handleSubmit = () => {
    setCampaigns(prev => prev.map(c =>
      c.id === submitTarget.id ? { ...c, status: "pending_approval" } : c
    ));
    addToast(
      `"${submitTarget.name}"Submitted to Admin Dashboard → Campaigns. The admin will review it. ⏳`,
      "info"
    );
    setSubmitTarget(null);
  };

  /* ── Approve ── */
  const handleApprove = (campaign) => {
    setCampaigns(prev => prev.map(c =>
      c.id === campaign.id
        ? { ...c, status: campaign.scheduled_at ? "scheduled" : "sending" }
        : c
    ));
    addToast(`"${campaign.name}" approved! ${campaign.scheduled_at ? "Scheduled ✅" : "Sending shuru 📤"}`, "success");
  };

  /* ── Reject ── */
  const handleReject = (campaign) => {
    setCampaigns(prev => prev.map(c =>
      c.id === campaign.id ? { ...c, status: "rejected" } : c
    ));
    addToast(`"${campaign.name}" rejected ❌`, "error");
  };

  /* ── Send Now ── */
  const handleSendNow = (campaign) => {
    setCampaigns(prev => prev.map(c =>
      c.id === campaign.id ? { ...c, status: "sending" } : c
    ));
    addToast(`"${campaign.name}" sending start! 📤`, "info");
  };

  /* ── Stats ── */
  const stats = {
    total:     campaigns.length,
    sent:      campaigns.filter(c => c.status === "sent").length,
    totalSent: campaigns.reduce((a, c) => a + c.total_sent, 0),
    scheduled: campaigns.filter(c => c.status === "scheduled").length,
  };

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Toast */}
      <Toast toasts={toasts} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-200">
              <WaIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">WhatsApp Campaigns</h1>
              <p className="text-sm text-gray-500">Bulk WhatsApp messages manage </p>
            </div>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white text-sm font-semibold rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-200 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Campaign
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Campaigns",    value: stats.total,                      icon: "📋" },
            { label: "Sent",               value: stats.sent,                       icon: "✅" },
            { label: "Messages Delivered", value: stats.totalSent.toLocaleString(), icon: "📤" },
            { label: "Scheduled",          value: stats.scheduled,                  icon: "🕐" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Campaign search here..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white transition"
            />
          </div>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white transition"
          >
            <option value="all">All Status</option>
            {Object.entries(STATUS_CONFIG).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>

        {/* Campaign List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="text-5xl mb-3">💬</div>
            <p className="text-gray-500 text-sm">campagins not found</p>
            <button
              onClick={() => setShowCreate(true)}
              className="mt-4 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-xl hover:bg-green-600 transition-colors"
            >
              create a first campagins
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(c => (
              <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">

                  {/* Left — campaign info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-gray-900 truncate">{c.name}</h3>
                      <StatusBadge status={c.status} />
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{c.message}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                        </svg>
                        {c.segment_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        {c.total_sent.toLocaleString()} sent
                      </span>
                      {c.scheduled_at && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {new Date(c.scheduled_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right — Action buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">

                    {/* Submit */}
                    {c.status === "draft" && (
                      <button
                        onClick={() => setSubmitTarget(c)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition-colors"
                      >
                        Submit
                      </button>
                    )}

                    {/* Approve / Reject */}
                    {c.status === "pending_approval" && (
                      <>
                        <button
                          onClick={() => handleApprove(c)}
                          className="px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(c)}
                          className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {/* Send Now */}
                    {c.status === "scheduled" && (
                      <button
                        onClick={() => handleSendNow(c)}
                        className="px-3 py-1.5 rounded-lg bg-yellow-50 text-yellow-700 text-xs font-semibold hover:bg-yellow-100 transition-colors"
                      >
                        Send Now
                      </button>
                    )}

                    {/* Analytics */}
                    {c.status === "sent" && (
                      <button className="px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 text-xs font-semibold hover:bg-gray-100 transition-colors">
                        Analytics
                      </button>
                    )}

                    {/* Edit — only non-sent/sending */}
                    {!["sent", "sending"].includes(c.status) && (
                      <button
                        onClick={() => setEditTarget(c)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-amber-500 hover:bg-amber-50 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    )}

                    {/* Delete — only non-sent/sending */}
                    {!["sent", "sending"].includes(c.status) && (
                      <button
                        onClick={() => setDeleteTarget(c)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreate   && <CampaignFormModal  onClose={() => setShowCreate(false)}   onSave={handleCreate} />}
      {editTarget   && <CampaignFormModal  onClose={() => setEditTarget(null)}    onSave={handleEdit}   editData={editTarget} />}
      {deleteTarget && <DeleteConfirmModal onClose={() => setDeleteTarget(null)}  onConfirm={handleDelete}  campaign={deleteTarget} />}
      {submitTarget && <SubmitConfirmModal onClose={() => setSubmitTarget(null)}  onConfirm={handleSubmit}  campaign={submitTarget} />}

      {/* Animation */}
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}