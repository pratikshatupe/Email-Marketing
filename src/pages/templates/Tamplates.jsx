import { useState } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_TEMPLATES = [
  {
    id: 1,
    name: "Welcome Email",
    category: "Onboarding",
    subject: "Welcome to {{company_name}}! 🎉",
    thumbnail: "welcome",
    lastEdited: "2026-03-28",
    usedInCampaigns: 5,
    status: "active",
    htmlContent: `<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px">
      <h1 style="color:#6366f1">Welcome, {{name}}!</h1>
      <p>We're thrilled to have you on board.</p>
      <a href="#" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:12px">Get Started</a>
    </div>`,
  },
  {
    id: 2,
    name: "Summer Sale",
    category: "Promotional",
    subject: "☀️ Exclusive Summer Deals Just For You",
    thumbnail: "sale",
    lastEdited: "2026-03-20",
    usedInCampaigns: 12,
    status: "active",
    htmlContent: `<div style="font-family:sans-serif;max-width:600px;margin:auto;background:#fff8f0;padding:24px">
      <h1 style="color:#f97316">Summer Sale is LIVE!</h1>
      <p>Hi {{name}}, grab up to 50% off on all products.</p>
      <a href="#" style="display:inline-block;background:#f97316;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:12px">Shop Now</a>
    </div>`,
  },
  {
    id: 3,
    name: "Product Recommendation",
    category: "Automated",
    subject: "Products picked just for you, {{name}}",
    thumbnail: "product",
    lastEdited: "2026-03-15",
    usedInCampaigns: 8,
    status: "active",
    htmlContent: `<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px">
      <h1 style="color:#0ea5e9">Your Picks, {{name}} 🛍️</h1>
      <p>Based on your interests, we found these for you.</p>
      <a href="#" style="display:inline-block;background:#0ea5e9;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:12px">View Products</a>
    </div>`,
  },
  {
    id: 4,
    name: "Password Reset",
    category: "Transactional",
    subject: "Reset your password",
    thumbnail: "reset",
    lastEdited: "2026-02-10",
    usedInCampaigns: 0,
    status: "active",
    htmlContent: `<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px">
      <h1 style="color:#ef4444">Password Reset</h1>
      <p>Hi {{name}}, click below to reset your password.</p>
      <a href="#" style="display:inline-block;background:#ef4444;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:12px">Reset Password</a>
    </div>`,
  },
  {
    id: 5,
    name: "Newsletter Weekly",
    category: "Newsletter",
    subject: "This Week's Top Stories 📰",
    thumbnail: "newsletter",
    lastEdited: "2026-03-25",
    usedInCampaigns: 22,
    status: "active",
    htmlContent: `<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px">
      <h1 style="color:#8b5cf6">Weekly Newsletter</h1>
      <p>Hello {{name}}, here are your top stories this week.</p>
    </div>`,
  },
  {
    id: 6,
    name: "Re-engagement",
    category: "Automated",
    subject: "We miss you, {{name}} 💔",
    thumbnail: "reengagement",
    lastEdited: "2026-03-01",
    usedInCampaigns: 3,
    status: "draft",
    htmlContent: `<div style="font-family:sans-serif;max-width:600px;margin:auto;background:#fdf2f8;padding:24px">
      <h1 style="color:#ec4899">We Miss You!</h1>
      <p>Hi {{name}}, it's been a while. Come back and see what's new.</p>
      <a href="#" style="display:inline-block;background:#ec4899;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:12px">Come Back</a>
    </div>`,
  },
];

const CATEGORIES = ["All", "Onboarding", "Promotional", "Automated", "Transactional", "Newsletter"];

const THUMBNAIL_GRADIENTS = {
  welcome:      "from-indigo-500 to-purple-600",
  sale:         "from-orange-400 to-red-500",
  product:      "from-sky-400 to-cyan-500",
  reset:        "from-red-400 to-rose-600",
  newsletter:   "from-violet-500 to-purple-700",
  reengagement: "from-pink-400 to-fuchsia-600",
};

const THUMBNAIL_ICONS = {
  welcome:      "👋",
  sale:         "☀️",
  product:      "🛍️",
  reset:        "🔑",
  newsletter:   "📰",
  reengagement: "💌",
};

// ─── Toast Notification ───────────────────────────────────────────────────────
// Simple toast shown when "Use in Campaign" is clicked
function Toast({ message, onClose }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-xl animate-fade-in">
      <span className="text-base">✅</span>
      <span className="text-sm font-semibold">{message}</span>
      <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white text-xs">✕</button>
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ text }) {
  const colors = {
    Onboarding:    "bg-indigo-100 text-indigo-700",
    Promotional:   "bg-orange-100 text-orange-700",
    Automated:     "bg-sky-100 text-sky-700",
    Transactional: "bg-red-100 text-red-700",
    Newsletter:    "bg-violet-100 text-violet-700",
    active:        "bg-emerald-100 text-emerald-700",
    draft:         "bg-gray-100 text-gray-500",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${colors[text] || "bg-gray-100 text-gray-600"}`}>
      {text}
    </span>
  );
}

// ─── Template Card ────────────────────────────────────────────────────────────
function TemplateCard({ template, onPreview, onEdit, onDelete, onDuplicate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <div className={`h-36 bg-gradient-to-br ${THUMBNAIL_GRADIENTS[template.thumbnail]} flex items-center justify-center relative`}>
        <span className="text-5xl drop-shadow-lg select-none">{THUMBNAIL_ICONS[template.thumbnail]}</span>

        {/* Status badge top-left */}
        <div className="absolute top-3 left-3">
          <Badge text={template.status} />
        </div>

        {/* 3-dot menu top-right */}
        <div className="absolute top-3 right-3">
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition backdrop-blur-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-9 bg-white border border-gray-200 rounded-xl shadow-xl z-20 w-40 py-1 text-sm">
                  {[
                    { label: "✏️ Edit",      action: () => { onEdit(template);      setMenuOpen(false); } },
                    { label: "👁️ Preview",   action: () => { onPreview(template);   setMenuOpen(false); } },
                    { label: "📋 Duplicate", action: () => { onDuplicate(template); setMenuOpen(false); } },
                    { label: "🗑️ Delete",   action: () => { onDelete(template);    setMenuOpen(false); }, danger: true },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition ${item.danger ? "text-red-500" : "text-gray-700"}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-gray-900 text-sm leading-tight">{template.name}</h3>
          <Badge text={template.category} />
        </div>
        <p className="text-xs text-gray-400 truncate">
          <span className="font-medium text-gray-600">Sub:</span> {template.subject}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-2 border-t border-gray-100">
          <span>📅 {template.lastEdited}</span>
          <span>🚀 {template.usedInCampaigns}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex gap-2">
        <button
          onClick={() => onPreview(template)}
          className="flex-1 text-xs py-2 rounded-xl border border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-semibold transition"
        >
          Preview
        </button>
        <button
          onClick={() => onEdit(template)}
          className="flex-1 text-xs py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-semibold transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

// ─── Preview Modal ────────────────────────────────────────────────────────────
// UPDATED: Added device toggle (desktop/mobile preview) + Use in Campaign logic
function PreviewModal({ template, onClose, onUseInCampaign }) {
  // "desktop" | "mobile"
  const [device, setDevice] = useState("desktop");

  if (!template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{ width: "100%", maxWidth: "720px", maxHeight: "92vh" }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-gray-900">{template.name}</h2>
              <Badge text={template.category} />
              <Badge text={template.status} />
            </div>
            {/* Subject line */}
            <p className="text-xs text-gray-400 mt-1 truncate">
              <span className="font-semibold text-gray-500">Subject:</span> {template.subject}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Device Toggle Bar ── */}
        <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-100 flex-shrink-0">
          {/* Left: metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>📅 Last edited: <strong className="text-gray-600">{template.lastEdited}</strong></span>
            <span>🚀 Used in <strong className="text-gray-600">{template.usedInCampaigns}</strong> campaigns</span>
          </div>

          {/* Right: Desktop / Mobile toggle */}
          <div className="flex border border-gray-200 rounded-xl overflow-hidden text-xs">
            <button
              onClick={() => setDevice("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1.5 font-semibold transition ${
                device === "desktop" ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {/* Desktop icon */}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Desktop
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1.5 font-semibold transition ${
                device === "mobile" ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {/* Mobile icon */}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Mobile
            </button>
          </div>
        </div>

        {/* ── Preview Area ── */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100 flex items-start justify-center">
          {device === "desktop" ? (
            // Desktop preview — full width card
            <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-x-auto">
              <div dangerouslySetInnerHTML={{ __html: template.htmlContent }} />
            </div>
          ) : (
            // Mobile preview — narrow phone-like frame
            <div
              className="bg-white rounded-3xl border-4 border-gray-300 shadow-xl overflow-hidden"
              style={{ width: "375px", minHeight: "500px" }}
            >
              {/* Fake phone status bar */}
              <div className="h-8 bg-gray-100 flex items-center justify-between px-4 border-b border-gray-200">
                <span className="text-xs text-gray-400 font-medium">9:41</span>
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                </div>
              </div>
              {/* Email content */}
              <div className="p-3 overflow-x-hidden text-sm">
                <div dangerouslySetInnerHTML={{ __html: template.htmlContent }} />
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-3 flex-shrink-0 bg-white">
          {/* Left: stats / hint */}
          <p className="text-xs text-gray-400 hidden sm:block">
            Use {"{{name}}"} and {"{{company_name}}"} for personalization
          </p>

          {/* Right: action buttons */}
          <div className="flex gap-3 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition"
            >
              Close
            </button>
            {/* ✅ USE IN CAMPAIGN — the key button */}
            <button
              onClick={() => onUseInCampaign(template)}
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Use in Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Campaign Selected Banner ─────────────────────────────────────────────────
// Shows at top of page after "Use in Campaign" is clicked — confirming selection
function CampaignBanner({ template, onDismiss, onGoToCampaign }) {
  return (
    <div className="mx-4 sm:mx-6 mb-3 flex items-center justify-between gap-3 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="text-xl">🚀</span>
        <div>
          <p className="text-sm font-bold text-indigo-800">Template selected for campaign!</p>
          <p className="text-xs text-indigo-500">
            <span className="font-semibold">{template.name}</span> is ready to use
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onGoToCampaign}
          className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Go to Campaign →
        </button>
        <button
          onClick={onDismiss}
          className="text-xs px-2 py-1.5 rounded-lg text-indigo-400 hover:text-indigo-600 hover:bg-indigo-100 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ─── Create / Edit Modal ──────────────────────────────────────────────────────
function CreateEditModal({ template, onClose, onSave }) {
  const isEdit = !!template;
  const [form, setForm] = useState(
    template
      ? { ...template }
      : {
          name: "",
          category: "Promotional",
          subject: "",
          status: "active",
          htmlContent: "<p>Hello {{name}},</p>\n<p>Your message here.</p>",
          thumbnail: "welcome",
        }
  );
  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden" style={{ maxHeight: "92vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-base font-bold text-gray-900">
            {isEdit ? "✏️ Edit Template" : "✨ Create New Template"}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Template Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Welcome Email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Category + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category *</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white transition"
              >
                {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
              <div className="flex gap-4 pt-2">
                {["active", "draft"].map((s) => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={s}
                      checked={form.status === s}
                      onChange={() => handleChange("status", s)}
                      className="accent-indigo-600"
                    />
                    <span className="text-sm text-gray-700 capitalize">{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject Line *</label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              placeholder="e.g. Welcome to {{company_name}}!"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <p className="text-xs text-gray-400 mt-1">Use {"{{name}}"}, {"{{company_name}}"} for personalization</p>
          </div>

          {/* HTML Editor */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">HTML Content</label>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex gap-1.5 px-3 py-2 bg-gray-50 border-b border-gray-200 flex-wrap">
                {["B", "I", "U", "Link", "Img"].map((btn) => (
                  <button
                    key={btn}
                    className="text-xs px-2 py-1 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 transition font-medium"
                  >
                    {btn}
                  </button>
                ))}
                <span className="ml-auto text-xs text-gray-400 self-center">HTML Mode</span>
              </div>
              <textarea
                value={form.htmlContent}
                onChange={(e) => handleChange("htmlContent", e.target.value)}
                rows={8}
                className="w-full px-4 py-3 text-sm font-mono text-gray-700 focus:outline-none resize-none bg-white"
                placeholder="Enter your HTML email content..."
              />
            </div>
            <div className="mt-2">
              <p className="text-xs font-semibold text-gray-400 mb-1.5">Quick Insert:</p>
              <div className="flex flex-wrap gap-1.5">
                {["{{name}}", "{{email}}", "{{company_name}}", "{{unsubscribe_link}}", "{{date}}"].map((v) => (
                  <button
                    key={v}
                    onClick={() => handleChange("htmlContent", form.htmlContent + v)}
                    className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition font-mono"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
          >
            {isEdit ? "Save Changes" : "Create Template"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteConfirmModal({ template, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center space-y-4">
        <div className="text-5xl">🗑️</div>
        <h3 className="text-lg font-bold text-gray-900">Delete Template?</h3>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete <strong>{template?.name}</strong>? This cannot be undone.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Templates() {
  const [templates,          setTemplates]          = useState(MOCK_TEMPLATES);
  const [search,             setSearch]             = useState("");
  const [activeCategory,     setActiveCategory]     = useState("All");
  const [sortBy,             setSortBy]             = useState("lastEdited");
  const [viewMode,           setViewMode]           = useState("grid");
  const [previewTemplate,    setPreviewTemplate]    = useState(null);
  const [editTemplate,       setEditTemplate]       = useState(null);
  const [createOpen,         setCreateOpen]         = useState(false);
  const [deleteTarget,       setDeleteTarget]       = useState(null);

  // ── "Use in Campaign" state ────────────────────────────────────────────────
  // Stores the template that was selected for a campaign
  const [campaignTemplate,   setCampaignTemplate]   = useState(null);
  // Toast notification state
  const [toast,              setToast]              = useState(null);

  // ── Filter + Sort ──────────────────────────────────────────────────────────
  const filtered = templates
    .filter((t) => {
      const matchCat    = activeCategory === "All" || t.category === activeCategory;
      const q           = search.toLowerCase();
      const matchSearch = t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q);
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "lastEdited") return new Date(b.lastEdited) - new Date(a.lastEdited);
      if (sortBy === "name")       return a.name.localeCompare(b.name);
      if (sortBy === "campaigns")  return b.usedInCampaigns - a.usedInCampaigns;
      return 0;
    });

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSave = (form) => {
    if (editTemplate) {
      setTemplates((ts) =>
        ts.map((t) =>
          t.id === editTemplate.id
            ? { ...t, ...form, lastEdited: new Date().toISOString().split("T")[0] }
            : t
        )
      );
      setEditTemplate(null);
    } else {
      setTemplates((ts) => [
        {
          ...form,
          id: Date.now(),
          lastEdited: new Date().toISOString().split("T")[0],
          usedInCampaigns: 0,
          thumbnail: "welcome",
        },
        ...ts,
      ]);
      setCreateOpen(false);
    }
  };

  const handleDelete = () => {
    setTemplates((ts) => ts.filter((t) => t.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleDuplicate = (template) => {
    setTemplates((ts) => [
      {
        ...template,
        id: Date.now(),
        name: template.name + " (Copy)",
        lastEdited: new Date().toISOString().split("T")[0],
        usedInCampaigns: 0,
      },
      ...ts,
    ]);
  };

  // ── "Use in Campaign" handler ──────────────────────────────────────────────
  // Called when user clicks "Use in Campaign" inside the Preview modal
  const handleUseInCampaign = (template) => {
    // 1. Store selected template in state (or localStorage if you prefer)
    setCampaignTemplate(template);

    // 2. Optionally persist to localStorage so Campaign page can read it
    try {
      localStorage.setItem(
        "selectedCampaignTemplate",
        JSON.stringify({ id: template.id, name: template.name, subject: template.subject })
      );
    } catch (_) {
      // localStorage unavailable — no-op
    }

    // 3. Increment usedInCampaigns count for this template
    setTemplates((ts) =>
      ts.map((t) =>
        t.id === template.id ? { ...t, usedInCampaigns: t.usedInCampaigns + 1 } : t
      )
    );

    // 4. Close preview modal
    setPreviewTemplate(null);

    // 5. Show toast notification
    setToast(`"${template.name}" added to campaign!`);
    setTimeout(() => setToast(null), 3500);
  };

  // "Go to Campaign" — replace with your router.push("/campaigns/new") or navigate()
  const handleGoToCampaign = () => {
    // Example with react-router:
    // navigate("/campaigns/new");
    // Example with Next.js:
    // router.push("/campaigns/new");
    alert(`Navigating to Campaign page with template: ${campaignTemplate?.name}\n\nYou can replace this alert with:\nnavigate("/campaigns/new")\nor\nrouter.push("/campaigns/new")`);
  };

  // ── Stats ──────────────────────────────────────────────────────────────────
  const stats = [
    { label: "Total",     value: templates.length,                                       icon: "📄", color: "from-indigo-500 to-purple-500" },
    { label: "Active",    value: templates.filter((t) => t.status === "active").length,  icon: "✅", color: "from-emerald-400 to-teal-500"  },
    { label: "Draft",     value: templates.filter((t) => t.status === "draft").length,   icon: "📝", color: "from-amber-400 to-orange-500"  },
    { label: "Campaigns", value: templates.reduce((a, t) => a + t.usedInCampaigns, 0),   icon: "🚀", color: "from-sky-400 to-cyan-500"      },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col bg-gray-50 rounded-xl overflow-hidden" style={{ height: "calc(100vh - 57px - 48px)" }}>

      {/* ── STICKY HEADER ── */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm rounded-t-xl">

        {/* Title row */}
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
              📧 Email Templates
            </h1>
            <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
              Design, manage and reuse email templates for your campaigns
            </p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-sm whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">New Template</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>

        {/* Stats row */}
        <div className="px-4 sm:px-6 pb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-3 border border-gray-100">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-sm flex-shrink-0`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-lg font-extrabold text-gray-900 leading-none">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter row */}
        <div className="px-4 sm:px-6 pb-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-gray-700 transition"
              >
                <option value="lastEdited">Last Edited</option>
                <option value="name">Name A–Z</option>
                <option value="campaigns">Most Used</option>
              </select>
              <div className="flex border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  title="Grid view"
                  className={`px-3 py-2 transition ${viewMode === "grid" ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  title="List view"
                  className={`px-3 py-2 transition ${viewMode === "list" ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-1.5 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* ── END STICKY HEADER ── */}

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">

        {/* Campaign selected banner — shown after "Use in Campaign" */}
        {campaignTemplate && (
          <CampaignBanner
            template={campaignTemplate}
            onDismiss={() => setCampaignTemplate(null)}
            onGoToCampaign={handleGoToCampaign}
          />
        )}

        {/* Results count */}
        <p className="text-xs text-gray-500">
          Showing <span className="font-semibold text-gray-800">{filtered.length}</span> template{filtered.length !== 1 && "s"}
        </p>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                onPreview={setPreviewTemplate}
                onEdit={setEditTemplate}
                onDelete={setDeleteTarget}
                onDuplicate={handleDuplicate}
              />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-400 space-y-3">
                <div className="text-5xl">📭</div>
                <p className="font-semibold text-gray-600">No templates found</p>
                <p className="text-sm">Try changing your search or filter</p>
              </div>
            )}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wide">
              <div className="col-span-4">Template</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-3">Subject</div>
              <div className="col-span-1 text-center">Used</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {filtered.map((t, i) => (
              <div
                key={t.id}
                className={`flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 items-start sm:items-center border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition ${i % 2 !== 0 ? "bg-gray-50/40" : ""}`}
              >
                <div className="col-span-4 flex items-center gap-3 w-full sm:w-auto">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${THUMBNAIL_GRADIENTS[t.thumbnail]} flex items-center justify-center text-base flex-shrink-0`}>
                    {THUMBNAIL_ICONS[t.thumbnail]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">Edited {t.lastEdited}</p>
                  </div>
                </div>
                <div className="col-span-2"><Badge text={t.category} /></div>
                <div className="col-span-3 text-xs text-gray-500 truncate">{t.subject}</div>
                <div className="col-span-1 text-center text-sm font-bold text-gray-700">{t.usedInCampaigns}</div>
                <div className="col-span-1 flex sm:justify-center"><Badge text={t.status} /></div>
                <div className="col-span-1 flex justify-end gap-1.5">
                  <button
                    onClick={() => setPreviewTemplate(t)}
                    className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-500 transition"
                    title="Preview"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setEditTemplate(t)}
                    className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-500 transition"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDeleteTarget(t)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="py-16 text-center text-gray-400 space-y-2">
                <div className="text-5xl">📭</div>
                <p className="font-semibold text-gray-600">No templates found</p>
              </div>
            )}
          </div>
        )}

        {/* Bottom breathing room */}
        <div className="h-4" />
      </div>
      {/* ── END SCROLLABLE CONTENT ── */}

      {/* ── Modals ── */}
      {previewTemplate && (
        <PreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onUseInCampaign={handleUseInCampaign}
        />
      )}
      {(createOpen || editTemplate) && (
        <CreateEditModal
          template={editTemplate}
          onClose={() => { setCreateOpen(false); setEditTemplate(null); }}
          onSave={handleSave}
        />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          template={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      {/* ── Toast Notification ── */}
      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
      )}
    </div>
  );
}