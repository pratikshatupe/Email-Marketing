import { useState } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_TEMPLATES = [
  {
    id: 1,
    name: "Welcome Message",
    category: "Utility",
    language: "English",
    status: "approved",
    lastEdited: "2026-03-28",
    usedInCampaigns: 7,
    thumbnail: "welcome",
    headerType: "text",
    headerContent: "Welcome to {{company_name}}! 👋",
    body: "Hi {{name}}, we're so excited to have you with us!\n\nYour account is ready. Start exploring and let us know if you need anything.\n\nReply *HELP* for support.",
    footer: "Reply STOP to unsubscribe",
    buttons: [
      { type: "url", label: "Get Started", value: "https://example.com" },
      { type: "quick_reply", label: "Talk to Support" },
    ],
  },
  {
    id: 2,
    name: "Order Confirmed",
    category: "Transactional",
    language: "English",
    status: "approved",
    lastEdited: "2026-03-25",
    usedInCampaigns: 20,
    thumbnail: "order",
    headerType: "image",
    headerContent: "🛒",
    body: "Hello {{name}},\n\nYour order *#{{order_id}}* has been confirmed! 🎉\n\nEstimated delivery: *{{delivery_date}}*\nAmount: *₹{{amount}}*\n\nWe'll keep you updated.",
    footer: "Track your order anytime",
    buttons: [
      { type: "url", label: "Track Order", value: "https://track.example.com" },
      { type: "quick_reply", label: "Cancel Order" },
    ],
  },
  {
    id: 3,
    name: "Flash Sale Alert",
    category: "Marketing",
    language: "English",
    status: "approved",
    lastEdited: "2026-03-20",
    usedInCampaigns: 15,
    thumbnail: "sale",
    headerType: "text",
    headerContent: "🔥 Flash Sale — {{discount}}% OFF!",
    body: "Hey {{name}}! 🎁\n\nOur biggest sale is LIVE for the next *24 hours only*.\n\nUse code: *{{promo_code}}*\nShop now before it ends! ⏳",
    footer: "Valid until midnight",
    buttons: [
      { type: "url", label: "Shop Now", value: "https://shop.example.com" },
      { type: "quick_reply", label: "Remind Me Later" },
    ],
  },
  {
    id: 4,
    name: "OTP Verification",
    category: "Authentication",
    language: "English",
    status: "approved",
    lastEdited: "2026-02-15",
    usedInCampaigns: 58,
    thumbnail: "otp",
    headerType: "none",
    headerContent: "",
    body: "Your verification code for *{{company_name}}* is:\n\n*{{otp_code}}*\n\nThis code expires in *10 minutes*. Do not share it with anyone.",
    footer: "If you didn't request this, ignore.",
    buttons: [
      { type: "otp", label: "Copy Code", value: "{{otp_code}}" },
    ],
  },
  {
    id: 5,
    name: "Appointment Reminder",
    category: "Utility",
    language: "English",
    status: "approved",
    lastEdited: "2026-03-22",
    usedInCampaigns: 11,
    thumbnail: "reminder",
    headerType: "text",
    headerContent: "📅 Appointment Reminder",
    body: "Hi {{name}},\n\nThis is a reminder for your upcoming appointment:\n\n📅 *Date:* {{date}}\n⏰ *Time:* {{time}}\n📍 *Location:* {{location}}\n\nPlease arrive 10 minutes early.",
    footer: "Need help? Reply to this message.",
    buttons: [
      { type: "quick_reply", label: "Confirm" },
      { type: "quick_reply", label: "Reschedule" },
      { type: "quick_reply", label: "Cancel" },
    ],
  },
  {
    id: 6,
    name: "Feedback Request",
    category: "Marketing",
    language: "English",
    status: "draft",
    lastEdited: "2026-03-10",
    usedInCampaigns: 2,
    thumbnail: "feedback",
    headerType: "text",
    headerContent: "⭐ How did we do?",
    body: "Hello {{name}},\n\nThank you for your recent purchase of *{{product_name}}*!\n\nWe'd love to hear your feedback. It only takes 30 seconds and helps us serve you better. 😊",
    footer: "Your feedback matters to us.",
    buttons: [
      { type: "url", label: "Rate Us", value: "https://review.example.com" },
      { type: "quick_reply", label: "No, Thanks" },
    ],
  },
  {
    id: 7,
    name: "Shipping Update",
    category: "Transactional",
    language: "English",
    status: "pending",
    lastEdited: "2026-03-28",
    usedInCampaigns: 0,
    thumbnail: "shipping",
    headerType: "text",
    headerContent: "🚚 Your Order is on the Way!",
    body: "Hi {{name}},\n\nGreat news! Your order *#{{order_id}}* has been shipped.\n\nCarrier: *{{carrier}}*\nTracking: *{{tracking_number}}*\nETA: *{{eta}}*",
    footer: "Contact us if you have questions.",
    buttons: [
      { type: "url", label: "Track Package", value: "https://track.example.com" },
    ],
  },
  {
    id: 8,
    name: "Re-engagement",
    category: "Marketing",
    language: "English",
    status: "draft",
    lastEdited: "2026-03-01",
    usedInCampaigns: 3,
    thumbnail: "reengagement",
    headerType: "text",
    headerContent: "We miss you, {{name}}! 💔",
    body: "Hi {{name}},\n\nIt's been a while since we last heard from you.\n\nWe've added some exciting new products and offers just for you. Come back and take a look! 🎁",
    footer: "Reply STOP to unsubscribe",
    buttons: [
      { type: "url", label: "View Offers", value: "https://example.com/offers" },
      { type: "quick_reply", label: "Not Interested" },
    ],
  },
];

const CATEGORIES = ["All", "Utility", "Transactional", "Marketing", "Authentication"];

const THUMBNAIL_GRADIENTS = {
  welcome:      "from-green-500 to-teal-600",
  order:        "from-blue-500 to-indigo-600",
  sale:         "from-orange-400 to-red-500",
  otp:          "from-purple-500 to-violet-600",
  reminder:     "from-sky-400 to-cyan-500",
  feedback:     "from-amber-400 to-yellow-500",
  shipping:     "from-teal-500 to-green-600",
  reengagement: "from-pink-400 to-fuchsia-600",
};

const THUMBNAIL_ICONS = {
  welcome:      "👋",
  order:        "🛒",
  sale:         "🔥",
  otp:          "🔑",
  reminder:     "📅",
  feedback:     "⭐",
  shipping:     "🚚",
  reengagement: "💌",
};

const STATUS_COLORS = {
  approved: "bg-emerald-100 text-emerald-700",
  pending:  "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
  draft:    "bg-gray-100 text-gray-500",
};

const CATEGORY_COLORS = {
  Utility:        "bg-sky-100 text-sky-700",
  Transactional:  "bg-blue-100 text-blue-700",
  Marketing:      "bg-orange-100 text-orange-700",
  Authentication: "bg-purple-100 text-purple-700",
};

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ text, type = "category" }) {
  const colors = type === "status" ? STATUS_COLORS : CATEGORY_COLORS;
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${colors[text] || "bg-gray-100 text-gray-600"}`}>
      {text}
    </span>
  );
}

// ─── WhatsApp Phone Preview ───────────────────────────────────────────────────
function WhatsAppPreview({ template }) {
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return (
    <div className="flex flex-col items-center">
      {/* Phone shell */}
      <div className="w-64 rounded-3xl border-4 border-gray-800 bg-gray-800 shadow-2xl overflow-hidden">
        {/* Status bar */}
        <div className="bg-gray-800 flex justify-between items-center px-4 py-1 text-white text-xs">
          <span>9:41</span>
          <span>●●●</span>
        </div>
        {/* WhatsApp header */}
        <div className="bg-green-700 px-3 py-2 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
            {template.name[0]}
          </div>
          <div>
            <p className="text-white text-xs font-semibold leading-none">{template.name}</p>
            <p className="text-green-200 text-xs mt-0.5">Business Account</p>
          </div>
          <div className="ml-auto flex gap-2 text-white opacity-70">
            <span className="text-xs">📞</span>
            <span className="text-xs">⋮</span>
          </div>
        </div>
        {/* Chat area */}
        <div className="bg-[#e5ddd5] min-h-48 p-3 flex flex-col gap-2">
          {/* Message bubble */}
          <div className="bg-white rounded-xl rounded-tl-none shadow-sm max-w-full overflow-hidden">
            {/* Header */}
            {template.headerType === "image" && (
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-24 flex items-center justify-center text-3xl">
                {template.headerContent}
              </div>
            )}
            {template.headerType === "text" && template.headerContent && (
              <div className="px-3 pt-3 pb-1">
                <p className="text-gray-900 text-xs font-bold leading-snug">
                  {template.headerContent}
                </p>
              </div>
            )}
            {/* Body */}
            <div className="px-3 py-2">
              <p className="text-gray-700 text-xs leading-relaxed whitespace-pre-line">
                {template.body}
              </p>
            </div>
            {/* Footer */}
            {template.footer && (
              <div className="px-3 pb-2">
                <p className="text-gray-400 text-xs">{template.footer}</p>
              </div>
            )}
            {/* Timestamp */}
            <div className="px-3 pb-2 flex justify-end">
              <span className="text-gray-400 text-xs">{time} ✓✓</span>
            </div>
          </div>
          {/* Buttons */}
          {template.buttons && template.buttons.length > 0 && (
            <div className="flex flex-col gap-1">
              {template.buttons.map((btn, i) => (
                <div key={i} className="bg-white rounded-xl px-3 py-2 text-center shadow-sm">
                  <span className="text-green-600 text-xs font-semibold">
                    {btn.type === "url" ? "🔗 " : btn.type === "otp" ? "📋 " : "↩ "}
                    {btn.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Input bar */}
        <div className="bg-gray-100 px-2 py-2 flex items-center gap-1.5">
          <div className="flex-1 bg-white rounded-full px-3 py-1">
            <span className="text-gray-400 text-xs">Type a message</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center">
            <span className="text-white text-xs">🎤</span>
          </div>
        </div>
      </div>
    </div>
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
        {/* WhatsApp branding */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-0.5">
          <span className="text-white text-xs font-semibold">WhatsApp</span>
        </div>
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <Badge text={template.status} type="status" />
        </div>
        {/* 3-dot menu */}
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
          <Badge text={template.category} type="category" />
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{template.body}</p>
        {/* Buttons preview */}
        {template.buttons && template.buttons.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {template.buttons.slice(0, 2).map((btn, i) => (
              <span key={i} className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full font-medium">
                {btn.label}
              </span>
            ))}
            {template.buttons.length > 2 && (
              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">+{template.buttons.length - 2}</span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-2 border-t border-gray-100">
          <span>📅 {template.lastEdited}</span>
          <span>🚀 {template.usedInCampaigns}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex gap-2">
        <button
          onClick={() => onPreview(template)}
          className="flex-1 text-xs py-2 rounded-xl border border-green-200 text-green-600 hover:bg-green-50 font-semibold transition"
        >
          Preview
        </button>
        <button
          onClick={() => onEdit(template)}
          className="flex-1 text-xs py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 font-semibold transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

// ─── Preview Modal ────────────────────────────────────────────────────────────
function PreviewModal({ template, onClose }) {
  if (!template) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl flex flex-col overflow-hidden" style={{ maxHeight: "92vh" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-gray-900">{template.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge text={template.category} type="category" />
              <Badge text={template.status} type="status" />
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="flex flex-col items-center gap-6">
            <WhatsAppPreview template={template} />
            {/* Template details */}
            <div className="w-full bg-white rounded-xl border border-gray-200 p-4 space-y-3">
              <h3 className="text-sm font-bold text-gray-800">Template Details</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-400 font-medium">Language</span>
                  <p className="text-gray-700 mt-0.5 font-semibold">{template.language}</p>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Header Type</span>
                  <p className="text-gray-700 mt-0.5 font-semibold capitalize">{template.headerType}</p>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Buttons</span>
                  <p className="text-gray-700 mt-0.5 font-semibold">{template.buttons?.length || 0}</p>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Used in</span>
                  <p className="text-gray-700 mt-0.5 font-semibold">{template.usedInCampaigns} campaigns</p>
                </div>
              </div>
              {/* Variables */}
              {template.body.includes("{{") && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-2">Variables Used</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[...new Set((template.body + " " + template.headerContent).match(/\{\{[^}]+\}\}/g) || [])].map((v) => (
                      <span key={v} className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-lg font-mono">{v}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition">
            Close
          </button>
          <button className="px-5 py-2 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition">
            Use in Campaign
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Create / Edit Modal ──────────────────────────────────────────────────────
function CreateEditModal({ template, onClose, onSave }) {
  const isEdit = !!template;
  const [form, setForm] = useState(
    template
      ? { ...template, buttons: template.buttons ? [...template.buttons] : [] }
      : {
          name: "",
          category: "Utility",
          language: "English",
          status: "draft",
          thumbnail: "welcome",
          headerType: "text",
          headerContent: "",
          body: "Hi {{name}},\n\nYour message here.",
          footer: "",
          buttons: [],
        }
  );
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const addButton = () => {
    if (form.buttons.length >= 3) return;
    setForm((f) => ({ ...f, buttons: [...f.buttons, { type: "quick_reply", label: "" }] }));
  };

  const updateButton = (i, key, value) => {
    const btns = [...form.buttons];
    btns[i] = { ...btns[i], [key]: value };
    setForm((f) => ({ ...f, buttons: btns }));
  };

  const removeButton = (i) => {
    setForm((f) => ({ ...f, buttons: f.buttons.filter((_, idx) => idx !== i) }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden" style={{ maxHeight: "94vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-base font-bold text-gray-900">
            {isEdit ? "✏️ Edit Template" : "✨ Create WhatsApp Template"}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewOpen(!previewOpen)}
              className="text-xs px-3 py-1.5 rounded-xl border border-green-200 text-green-600 hover:bg-green-50 font-semibold transition"
            >
              {previewOpen ? "Hide Preview" : "👁️ Preview"}
            </button>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Form */}
          <div className={`${previewOpen ? "w-1/2" : "w-full"} flex-shrink-0 overflow-y-auto p-6 space-y-4`}>
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Template Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. Order Confirmed"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            {/* Category + Language */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white transition"
                >
                  {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Language</label>
                <select
                  value={form.language}
                  onChange={(e) => handleChange("language", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white transition"
                >
                  {["English", "Hindi", "Marathi", "Tamil", "Telugu", "Gujarati"].map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Header */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Header</label>
              <div className="flex gap-2 mb-2">
                {["none", "text", "image", "document"].map((t) => (
                  <button
                    key={t}
                    onClick={() => handleChange("headerType", t)}
                    className={`text-xs px-3 py-1.5 rounded-xl border font-semibold capitalize transition ${
                      form.headerType === t
                        ? "bg-green-600 text-white border-green-600"
                        : "border-gray-300 text-gray-600 hover:border-green-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {form.headerType === "text" && (
                <input
                  type="text"
                  value={form.headerContent}
                  onChange={(e) => handleChange("headerContent", e.target.value)}
                  placeholder="Header text (max 60 chars)"
                  maxLength={60}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              )}
              {(form.headerType === "image" || form.headerType === "document") && (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center text-sm text-gray-400">
                  <p>📁 Upload {form.headerType} or use variable <span className="font-mono bg-gray-100 px-1 rounded">{"{{header_url}}"}</span></p>
                </div>
              )}
            </div>

            {/* Body */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message Body *</label>
              <textarea
                value={form.body}
                onChange={(e) => handleChange("body", e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
                placeholder="Write your message here..."
              />
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-400">
                  Use <span className="font-mono bg-gray-100 px-1 rounded">*bold*</span>, <span className="font-mono bg-gray-100 px-1 rounded">_italic_</span> for formatting
                </p>
                <span className="text-xs text-gray-400">{form.body.length}/1024</span>
              </div>
              {/* Quick insert */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["{{name}}", "{{order_id}}", "{{amount}}", "{{date}}", "{{company_name}}", "{{otp_code}}"].map((v) => (
                  <button
                    key={v}
                    onClick={() => handleChange("body", form.body + v)}
                    className="text-xs px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition font-mono"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Footer <span className="font-normal text-gray-400">(optional)</span></label>
              <input
                type="text"
                value={form.footer}
                onChange={(e) => handleChange("footer", e.target.value)}
                placeholder="e.g. Reply STOP to unsubscribe"
                maxLength={60}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            {/* Buttons */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-gray-600">Buttons <span className="font-normal text-gray-400">(max 3)</span></label>
                {form.buttons.length < 3 && (
                  <button
                    onClick={addButton}
                    className="text-xs px-3 py-1.5 rounded-xl bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 font-semibold transition"
                  >
                    + Add Button
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {form.buttons.map((btn, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                    <select
                      value={btn.type}
                      onChange={(e) => updateButton(i, "type", e.target.value)}
                      className="text-xs px-2 py-1.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      <option value="quick_reply">Quick Reply</option>
                      <option value="url">URL</option>
                      <option value="phone">Phone</option>
                      <option value="otp">Copy OTP</option>
                    </select>
                    <input
                      type="text"
                      value={btn.label}
                      onChange={(e) => updateButton(i, "label", e.target.value)}
                      placeholder="Button label"
                      className="flex-1 text-xs px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    {(btn.type === "url" || btn.type === "phone") && (
                      <input
                        type="text"
                        value={btn.value || ""}
                        onChange={(e) => updateButton(i, "value", e.target.value)}
                        placeholder={btn.type === "url" ? "https://..." : "+91..."}
                        className="flex-1 text-xs px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                    )}
                    <button
                      onClick={() => removeButton(i)}
                      className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                {form.buttons.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-3 border border-dashed border-gray-200 rounded-xl">No buttons added yet</p>
                )}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
              <div className="flex gap-4">
                {["active", "draft"].map((s) => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" value={s} checked={form.status === s} onChange={() => handleChange("status", s)} className="accent-green-600" />
                    <span className="text-sm text-gray-700 capitalize">{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Panel */}
          {previewOpen && (
            <div className="w-1/2 flex-shrink-0 border-l border-gray-200 bg-gray-50 overflow-y-auto flex flex-col items-center justify-start p-6">
              <p className="text-xs font-semibold text-gray-500 mb-4 text-center">Live Preview</p>
              <WhatsAppPreview template={form} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition">
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
          >
            {isEdit ? "Save Changes" : "Submit for Approval"}
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
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-5 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function WhatsAppTemplates() {
  const [templates,       setTemplates]       = useState(MOCK_TEMPLATES);
  const [search,          setSearch]          = useState("");
  const [activeCategory,  setActiveCategory]  = useState("All");
  const [sortBy,          setSortBy]          = useState("lastEdited");
  const [viewMode,        setViewMode]        = useState("grid");
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [editTemplate,    setEditTemplate]    = useState(null);
  const [createOpen,      setCreateOpen]      = useState(false);
  const [deleteTarget,    setDeleteTarget]    = useState(null);

  // ── Filter + Sort ──────────────────────────────────────────────────────────
  const filtered = templates
    .filter((t) => {
      const matchCat    = activeCategory === "All" || t.category === activeCategory;
      const q           = search.toLowerCase();
      const matchSearch = t.name.toLowerCase().includes(q) || t.body.toLowerCase().includes(q);
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
          status: "pending",
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
        status: "draft",
      },
      ...ts,
    ]);
  };

  // ── Stats ──────────────────────────────────────────────────────────────────
  const stats = [
    { label: "Total",    value: templates.length,                                          icon: "📱", color: "from-green-500 to-teal-500"    },
    { label: "Approved", value: templates.filter((t) => t.status === "approved").length,   icon: "✅", color: "from-emerald-400 to-teal-500"  },
    { label: "Pending",  value: templates.filter((t) => t.status === "pending").length,    icon: "⏳", color: "from-amber-400 to-orange-500"  },
    { label: "Sent",     value: templates.reduce((a, t) => a + t.usedInCampaigns, 0),      icon: "🚀", color: "from-sky-400 to-cyan-500"      },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col bg-gray-50 rounded-xl overflow-hidden" style={{ height: "calc(100vh - 57px - 48px)" }}>

      {/* STICKY HEADER */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm rounded-t-xl">

        {/* Title row */}
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <span className="text-green-600">💬</span> WhatsApp Templates
            </h1>
            <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
              Create and manage approved WhatsApp Business message templates
            </p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 active:scale-95 transition-all shadow-sm whitespace-nowrap"
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
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition bg-white"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-gray-700 transition"
              >
                <option value="lastEdited">Last Edited</option>
                <option value="name">Name A–Z</option>
                <option value="campaigns">Most Used</option>
              </select>
              <div className="flex border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  title="Grid view"
                  className={`px-3 py-2 transition ${viewMode === "grid" ? "bg-green-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  title="List view"
                  className={`px-3 py-2 transition ${viewMode === "list" ? "bg-green-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
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
                    ? "bg-green-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* END STICKY HEADER */}

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">

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
              <div className="col-span-3">Template</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-3">Message Preview</div>
              <div className="col-span-1 text-center">Buttons</div>
              <div className="col-span-1 text-center">Used</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {filtered.map((t, i) => (
              <div
                key={t.id}
                className={`flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 items-start sm:items-center border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition ${i % 2 !== 0 ? "bg-gray-50/40" : ""}`}
              >
                <div className="col-span-3 flex items-center gap-3 w-full sm:w-auto">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${THUMBNAIL_GRADIENTS[t.thumbnail]} flex items-center justify-center text-base flex-shrink-0`}>
                    {THUMBNAIL_ICONS[t.thumbnail]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.language} · {t.lastEdited}</p>
                  </div>
                </div>
                <div className="col-span-2"><Badge text={t.category} type="category" /></div>
                <div className="col-span-3 text-xs text-gray-500 truncate">{t.body.split("\n")[0]}</div>
                <div className="col-span-1 text-center text-sm font-bold text-gray-700">{t.buttons?.length || 0}</div>
                <div className="col-span-1 text-center text-sm font-bold text-gray-700">{t.usedInCampaigns}</div>
                <div className="col-span-1 flex sm:justify-center"><Badge text={t.status} type="status" /></div>
                <div className="col-span-1 flex justify-end gap-1.5">
                  <button onClick={() => setPreviewTemplate(t)} className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition" title="Preview">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button onClick={() => setEditTemplate(t)} className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition" title="Edit">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => setDeleteTarget(t)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition" title="Delete">
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

        <div className="h-4" />
      </div>
      {/* END SCROLLABLE CONTENT */}

      {/* Modals */}
      {previewTemplate && (
        <PreviewModal template={previewTemplate} onClose={() => setPreviewTemplate(null)} />
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
    </div>
  );
}