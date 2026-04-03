
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

const TRIGGER_LABELS = {
  user_signup: "User Signup",
  cart_abandoned: "Cart Abandoned",
  user_inactive: "User Inactive",
  purchase_complete: "Purchase Complete",
  link_clicked: "Link Clicked",
  form_submitted: "Form Submitted",
};

const TRIGGER_COLORS = {
  user_signup: { bg: "#d1fae5", text: "#065f46" },
  cart_abandoned: { bg: "#ffedd5", text: "#9a3412" },
  user_inactive: { bg: "#f1f5f9", text: "#475569" },
  purchase_complete: { bg: "#dbeafe", text: "#1e40af" },
  link_clicked: { bg: "#ede9fe", text: "#5b21b6" },
  form_submitted: { bg: "#fce7f3", text: "#9d174d" },
};

const STEP_TYPES = ["Send Email", "Wait", "Condition"];

const INITIAL_AUTOMATIONS = [
  {
    id: 1,
    name: "Welcome Series",
    trigger_event: "user_signup",
    is_active: true,
    created_at: "2026-03-01",
    created_by_name: "Rahul Sharma",
    steps: [
      { type: "Send Email", value: "Welcome Email Template" },
      { type: "Wait", value: "3" },
      { type: "Send Email", value: "Product Recommendation" },
      { type: "Wait", value: "7" },
      { type: "Send Email", value: "Discount Offer" },
    ],
    emails_sent: 1240,
  },
  {
    id: 2,
    name: "Abandoned Cart Recovery",
    trigger_event: "cart_abandoned",
    is_active: true,
    created_at: "2026-03-10",
    created_by_name: "Priya Mehta",
    steps: [
      { type: "Wait", value: "1" },
      { type: "Send Email", value: "Cart Reminder" },
      { type: "Wait", value: "3" },
      { type: "Send Email", value: "Discount Offer" },
    ],
    emails_sent: 530,
  },
  {
    id: 3,
    name: "Re-engagement Campaign",
    trigger_event: "user_inactive",
    is_active: false,
    created_at: "2026-02-20",
    created_by_name: "Amit Joshi",
    steps: [
      { type: "Send Email", value: "We Miss You" },
      { type: "Wait", value: "5" },
      { type: "Condition", value: "If not opened" },
      { type: "Send Email", value: "Final Offer" },
    ],
    emails_sent: 320,
  },
  {
    id: 4,
    name: "Post Purchase Follow-up",
    trigger_event: "purchase_complete",
    is_active: true,
    created_at: "2026-03-15",
    created_by_name: "Sneha Patil",
    steps: [
      { type: "Send Email", value: "Thank You Email" },
      { type: "Wait", value: "7" },
      { type: "Send Email", value: "Review Request" },
    ],
    emails_sent: 870,
  },
];

function StatCard({ icon, value, label, change, up }) {
  return (
    <div className="bg-white rounded-2xl p-3 md:p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-base md:text-lg bg-indigo-50">
          {icon}
        </div>
        {change && (
          <span className={`text-[10px] md:text-xs font-semibold px-1.5 md:px-2 py-0.5 rounded-full ${up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
            {up ? "↑" : "↓"} {change}
          </span>
        )}
      </div>
      <p className="text-xl md:text-2xl font-black text-slate-800 mb-0.5">{value}</p>
      <p className="text-[10px] md:text-xs text-slate-400 font-medium">{label}</p>
    </div>
  );
}

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex items-center w-10 h-5 md:w-11 md:h-6 rounded-full transition-all duration-200 ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
      style={{ background: checked ? "#6366f1" : "#e2e8f0" }}
    >
      <span
        className="inline-block w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-white shadow transition-transform duration-200"
        style={{ transform: checked ? "translateX(20px)" : "translateX(3px)" }}
      />
    </button>
  );
}

function WorkflowViewer({ steps }) {
  return (
    <div className="flex flex-col gap-2 py-1">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex flex-col items-center pt-0.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
              style={{
                background:
                  step.type === "Wait" ? "#f59e0b" :
                    step.type === "Condition" ? "#8b5cf6" : "#6366f1",
              }}
            >
              {step.type === "Wait" ? "⏱" : step.type === "Condition" ? "?" : i + 1}
            </div>
            {i < steps.length - 1 && <div className="w-px h-4 bg-slate-200 mt-1" />}
          </div>
          <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: step.type === "Wait" ? "#fef3c7" : step.type === "Condition" ? "#ede9fe" : "#e0e7ff",
                color: step.type === "Wait" ? "#92400e" : step.type === "Condition" ? "#5b21b6" : "#3730a3",
              }}
            >
              {step.type}
            </span>
            <span className="text-xs text-slate-500">
              {step.type === "Wait"
                ? `${step.value} day${step.value !== "1" ? "s" : ""}`
                : step.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function AutomationModal({ automation, onClose, onSave }) {
  const isEdit = !!automation?.id;

  const [form, setForm] = useState(
    automation
      ? { name: automation.name, trigger_event: automation.trigger_event }
      : { name: "", trigger_event: "user_signup" }
  );
  const [steps, setSteps] = useState(
    automation?.steps || [
      { type: "Send Email", value: "" },
      { type: "Wait", value: "3" },
      { type: "Send Email", value: "" },
    ]
  );

  const addStep = () => setSteps(p => [...p, { type: "Send Email", value: "" }]);
  const removeStep = (i) => setSteps(p => p.filter((_, idx) => idx !== i));
  const updateStep = (i, field, val) =>
    setSteps(p => p.map((s, idx) => idx === i ? { ...s, [field]: val } : s));

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave({ ...automation, ...form, steps });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,14,42,0.6)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col"
        style={{ maxHeight: "90vh" }}
      >
        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <h3 className="font-black text-slate-800 text-base">
            {isEdit ? "Edit Automation" : "Create Automation"}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl transition-colors">✕</button>
        </div>

        <div className="overflow-y-auto p-5 md:p-6 space-y-4 flex-1">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Automation Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Welcome Series"
              className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Trigger Event</label>
            <select
              value={form.trigger_event}
              onChange={e => setForm(p => ({ ...p, trigger_event: e.target.value }))}
              className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400 transition-colors"
            >
              {Object.entries(TRIGGER_LABELS).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-3">Workflow Steps</label>
            <div className="space-y-3">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="flex flex-col items-center pt-2 flex-shrink-0">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{
                        background:
                          step.type === "Wait" ? "#f59e0b" :
                            step.type === "Condition" ? "#8b5cf6" : "#6366f1",
                      }}
                    >
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && <div className="w-px h-4 bg-slate-200 mt-1" />}
                  </div>

                  <div className="flex-1 flex flex-wrap gap-2">
                    <select
                      value={step.type}
                      onChange={e => updateStep(i, "type", e.target.value)}
                      className="border border-slate-200 bg-slate-50 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-indigo-400"
                    >
                      {STEP_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>

                    {step.type === "Wait" ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number" min={1}
                          value={step.value}
                          onChange={e => updateStep(i, "value", e.target.value)}
                          className="border border-slate-200 bg-slate-50 rounded-xl px-3 py-2 text-xs w-16 outline-none focus:border-indigo-400 text-center"
                        />
                        <span className="text-xs text-slate-400 font-medium">days</span>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={step.value}
                        onChange={e => updateStep(i, "value", e.target.value)}
                        placeholder={step.type === "Send Email" ? "Template name..." : "Condition description..."}
                        className="flex-1 min-w-[120px] border border-slate-200 bg-slate-50 rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-400"
                      />
                    )}
                  </div>

                  <button
                    onClick={() => removeStep(i)}
                    className="text-slate-300 hover:text-red-400 transition-colors pt-2 flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addStep}
              className="mt-3 flex items-center gap-1.5 text-indigo-500 text-xs font-semibold hover:text-indigo-700 transition-colors"
            >
              <span className="w-5 h-5 rounded-full border-2 border-indigo-400 flex items-center justify-center text-xs leading-none">+</span>
              Add Step
            </button>
          </div>
        </div>

        <div className="flex gap-3 px-5 md:px-6 py-4 border-t border-slate-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
          >
            {isEdit ? "Save Changes" : "Create Automation"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ name, onClose, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,14,42,0.6)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-2xl mx-auto mb-4">🗑️</div>
        <h3 className="font-black text-slate-800 text-lg mb-2">Delete Automation?</h3>
        <p className="text-sm text-slate-500 mb-1 font-semibold">"{name}"</p>
        <p className="text-sm text-slate-400 mb-6">this automation permanently delete . do no delete .</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold bg-red-500 hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}


export default function Automation() {
  const { hasPerm } = useAuth();
  const canEdit = hasPerm("view_campaigns");

  const [automations, setAutomations] = useState(INITIAL_AUTOMATIONS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [modal, setModal] = useState(null);

  const filtered = automations.filter(a => {
    const q = search.toLowerCase();
    const matchSearch =
      a.name.toLowerCase().includes(q) ||
      (TRIGGER_LABELS[a.trigger_event] || "").toLowerCase().includes(q);
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && a.is_active) ||
      (filterStatus === "inactive" && !a.is_active);
    return matchSearch && matchStatus;
  });

  const stats = {
    total: automations.length,
    active: automations.filter(a => a.is_active).length,
    inactive: automations.filter(a => !a.is_active).length,
    emailsSent: automations.reduce((s, a) => s + a.emails_sent, 0),
  };

  const toggleActive = (id) =>
    setAutomations(p => p.map(a => a.id === id ? { ...a, is_active: !a.is_active } : a));

  const handleSave = (data) => {
    if (data.id) {
      setAutomations(p => p.map(a => a.id === data.id ? { ...a, ...data } : a));
    } else {
      setAutomations(p => [
        {
          ...data,
          id: Date.now(),
          is_active: true,
          created_at: new Date().toISOString().split("T")[0],
          created_by_name: "You",
          emails_sent: 0,
        },
        ...p,
      ]);
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    setAutomations(p => p.filter(a => a.id !== id));
    setModal(null);
  };

  return (
    <div className="space-y-5">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800">Automation</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Trigger-based automated email sequences manage
          </p>
        </div>
        {canEdit && (
          <button
            onClick={() => setModal({ type: "create" })}
            className="self-start sm:self-auto px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-white text-sm font-bold shadow-lg hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
          >
            + Create Automation
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        <StatCard icon="⚙️" value={stats.total} label="Total Automations" />
        <StatCard icon="✅" value={stats.active} label="Active" change="active" up />
        <StatCard icon="⏸️" value={stats.inactive} label="Inactive" />
        <StatCard icon="📧" value={stats.emailsSent.toLocaleString()} label="Total Emails Sent" change="12%" up />
      </div>

      <div
        className="relative rounded-2xl overflow-hidden p-4 md:p-5 text-white"
        style={{ background: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)" }}
      >
        <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-6xl md:text-7xl opacity-10 select-none pointer-events-none">
          ⚡
        </div>
        <p className="text-[11px] font-bold uppercase tracking-widest opacity-60 mb-1">How it Works</p>
        <h2 className="text-base md:text-lg font-black mb-1">Trigger → Steps → Automated Emails</h2>
        <p className="text-sm opacity-70 max-w-xs">
          User action (trigger) email sequence automclly start — without manual effort.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 md:p-4 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search automation name or trigger..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg text-sm outline-none focus:border-indigo-400 transition-colors"
        />
        <div className="flex gap-2">
          {["all", "active", "inactive"].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 md:px-4 py-2 rounded-lg text-xs font-semibold border-2 capitalize transition-all ${filterStatus === s
                  ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                  : "border-slate-100 text-slate-500 hover:border-slate-200"
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
          <div className="text-5xl mb-4">⚙️</div>
          <h3 className="font-black text-slate-700 text-lg mb-2">No automations found</h3>
          <p className="text-sm text-slate-400 mb-5">
            Search adjust or new automation create.
          </p>
          {canEdit && (
            <button
              onClick={() => setModal({ type: "create" })}
              className="px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
            >
              + Create Automation
            </button>
          )}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="hidden md:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Automation", "Trigger", "Steps", "Emails Sent", "Created By", "Date", "Status", ...(canEdit ? ["Actions"] : [])].map(h => (
                  <th key={h} className="px-4 md:px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => {
                const tc = TRIGGER_COLORS[a.trigger_event] || TRIGGER_COLORS.user_inactive;
                const expanded = expandedId === a.id;
                const isLast = i === filtered.length - 1;

                return (
                  <>
                    <tr
                      key={a.id}
                      onClick={() => setExpandedId(expanded ? null : a.id)}
                      className={`border-b transition-colors hover:bg-slate-50 cursor-pointer ${isLast && !expanded ? "border-b-0" : "border-slate-50"}`}
                    >
                      <td className="px-4 md:px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-300 text-xs select-none">{expanded ? "▼" : "▶"}</span>
                          <div>
                            <p className="font-semibold text-slate-700 text-sm">{a.name}</p>
                            <p className="text-[10px] text-slate-400">{a.steps.length} steps</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 md:px-5 py-3">
                        <span
                          className="px-2 py-1 rounded-full text-xs font-semibold"
                          style={{ background: tc.bg, color: tc.text }}
                        >
                          {TRIGGER_LABELS[a.trigger_event] || a.trigger_event}
                        </span>
                      </td>

                      <td className="px-4 md:px-5 py-3 text-slate-500 text-xs">{a.steps.length}</td>

                      <td className="px-4 md:px-5 py-3 font-semibold text-slate-700 text-xs">
                        {a.emails_sent.toLocaleString()}
                      </td>

                      <td className="px-4 md:px-5 py-3 text-slate-400 text-xs">{a.created_by_name}</td>

                      <td className="px-4 md:px-5 py-3 text-slate-400 text-xs">{a.created_at}</td>

                      <td className="px-4 md:px-5 py-3" onClick={e => e.stopPropagation()}>
                        <Toggle
                          checked={a.is_active}
                          onChange={() => toggleActive(a.id)}
                          disabled={!canEdit}
                        />
                      </td>

                      {canEdit && (
                        <td className="px-4 md:px-5 py-3" onClick={e => e.stopPropagation()}>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setModal({ type: "edit", data: a })}
                              className="text-xs px-2.5 py-1.5 rounded-lg font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setModal({ type: "delete", data: a })}
                              className="text-xs px-2.5 py-1.5 rounded-lg font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>

                    {expanded && (
                      <tr key={`${a.id}-wf`} className="bg-indigo-50/40">
                        <td
                          colSpan={canEdit ? 8 : 7}
                          className="px-10 md:px-12 py-4 border-b border-slate-50"
                        >
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                            Workflow Steps
                          </p>
                          <WorkflowViewer steps={a.steps} />
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="md:hidden space-y-3">
          {filtered.map(a => {
            const tc = TRIGGER_COLORS[a.trigger_event] || TRIGGER_COLORS.user_inactive;
            const expanded = expandedId === a.id;
            return (
              <div key={a.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div
                  className="flex items-start justify-between p-4 cursor-pointer"
                  onClick={() => setExpandedId(expanded ? null : a.id)}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="font-bold text-slate-800 text-sm">{a.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {a.created_by_name} · {a.created_at}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ background: tc.bg, color: tc.text }}
                      >
                        {TRIGGER_LABELS[a.trigger_event]}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500">
                        {a.steps.length} steps
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">
                        {a.emails_sent.toLocaleString()} sent
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex flex-col items-end gap-2 flex-shrink-0"
                    onClick={e => e.stopPropagation()}
                  >
                    <Toggle
                      checked={a.is_active}
                      onChange={() => toggleActive(a.id)}
                      disabled={!canEdit}
                    />
                    <span className="text-[10px] text-slate-300 select-none">
                      {expanded ? "▲ hide" : "▼ steps"}
                    </span>
                  </div>
                </div>

                {expanded && (
                  <div className="px-5 pb-4 bg-indigo-50/40 border-t border-indigo-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-3 pt-3">
                      Workflow
                    </p>
                    <WorkflowViewer steps={a.steps} />
                  </div>
                )}

                {canEdit && (
                  <div className="flex gap-2 p-3 border-t border-slate-50">
                    <button
                      onClick={() => setModal({ type: "edit", data: a })}
                      className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => setModal({ type: "delete", data: a })}
                      className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {modal?.type === "create" && (
        <AutomationModal
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
      {modal?.type === "edit" && (
        <AutomationModal
          automation={modal.data}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteModal
          name={modal.data.name}
          onClose={() => setModal(null)}
          onConfirm={() => handleDelete(modal.data.id)}
        />
      )}
    </div>
  );
}