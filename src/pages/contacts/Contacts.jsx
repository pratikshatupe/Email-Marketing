// frontend/pages/contacts/Contacts.jsx
// Full Contacts page — matches AdminLayout design system
// Features: List, Search, Filter by Segment, Add Contact Modal, Edit Modal, Delete Confirm, CSV Upload hint

import { useState, useMemo } from "react";
import { useAuth } from "../auth/AuthContext";

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────
const INITIAL_SEGMENTS = [
  { id: 1, name: "New Customers",          contact_count: 340  },
  { id: 2, name: "Active Users",           contact_count: 1820 },
  { id: 3, name: "Newsletter Subscribers", contact_count: 4102 },
  { id: 4, name: "Returning Customers",    contact_count: 890  },
];

const INITIAL_CONTACTS = [
  { id: 1,  name: "Aarav Sharma",    email: "aarav@example.com",    phone: "9876543210", segment_id: 1, segment_name: "New Customers",          status: "active",       created_at: "2026-01-10" },
  { id: 2,  name: "Priya Patil",     email: "priya@acme.com",       phone: "9123456789", segment_id: 2, segment_name: "Active Users",           status: "active",       created_at: "2026-01-15" },
  { id: 3,  name: "Rahul Mehta",     email: "rahul@techcorp.com",   phone: "9000011122", segment_id: 3, segment_name: "Newsletter Subscribers", status: "active",       created_at: "2026-02-01" },
  { id: 4,  name: "Sneha Kulkarni",  email: "sneha@gmail.com",      phone: "9988776655", segment_id: 1, segment_name: "New Customers",          status: "unsubscribed", created_at: "2026-02-14" },
  { id: 5,  name: "Amit Desai",      email: "amit@startup.io",      phone: "9871234560", segment_id: 4, segment_name: "Returning Customers",    status: "active",       created_at: "2026-02-20" },
  { id: 6,  name: "Neha Joshi",      email: "neha@bizmail.com",     phone: "9765432100", segment_id: 2, segment_name: "Active Users",           status: "active",       created_at: "2026-03-02" },
  { id: 7,  name: "Vijay Rao",       email: "vijay@example.net",    phone: "9654321098", segment_id: 3, segment_name: "Newsletter Subscribers", status: "inactive",     created_at: "2026-03-05" },
  { id: 8,  name: "Kavya Singh",     email: "kavya@domain.com",     phone: "9543210987", segment_id: 4, segment_name: "Returning Customers",    status: "active",       created_at: "2026-03-10" },
  { id: 9,  name: "Rohan Verma",     email: "rohan@company.in",     phone: "9432109876", segment_id: 2, segment_name: "Active Users",           status: "active",       created_at: "2026-03-12" },
  { id: 10, name: "Anjali Nair",     email: "anjali@mailbox.com",   phone: "9321098765", segment_id: 3, segment_name: "Newsletter Subscribers", status: "active",       created_at: "2026-03-15" },
  { id: 11, name: "Suresh Kumar",    email: "suresh@example.com",   phone: "9210987654", segment_id: 1, segment_name: "New Customers",          status: "active",       created_at: "2026-03-18" },
  { id: 12, name: "Divya Reddy",     email: "divya@techmail.io",    phone: "9109876543", segment_id: 4, segment_name: "Returning Customers",    status: "inactive",     created_at: "2026-03-20" },
];

const STATUS_META = {
  active:       { bg: "#d1fae5", text: "#065f46", label: "Active"       },
  inactive:     { bg: "#f1f5f9", text: "#475569", label: "Inactive"     },
  unsubscribed: { bg: "#fee2e2", text: "#991b1b", label: "Unsubscribed" },
};

const AVATAR_COLORS = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#10b981,#059669)",
  "linear-gradient(135deg,#f59e0b,#d97706)",
  "linear-gradient(135deg,#ec4899,#be185d)",
  "linear-gradient(135deg,#06b6d4,#0284c7)",
];

// ─────────────────────────────────────────────────────────────────────────────
// EMPTY FORM
// ─────────────────────────────────────────────────────────────────────────────
const EMPTY_FORM = { name: "", email: "", phone: "", segment_id: "", status: "active" };

// ─────────────────────────────────────────────────────────────────────────────
// CONTACTS PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Contacts() {
  const { user, hasPerm } = useAuth();
  const role    = user?.role || "VIEWER";
  const canEdit = role === "SUPER_ADMIN" || role === "BUSINESS_ADMIN" || role === "MARKETING_MANAGER";
  const canDelete = role === "SUPER_ADMIN" || role === "BUSINESS_ADMIN";

  // ── State ──
  const [contacts,   setContacts]   = useState(INITIAL_CONTACTS);
  const [segments]                  = useState(INITIAL_SEGMENTS);
  const [search,     setSearch]     = useState("");
  const [segFilter,  setSegFilter]  = useState("ALL");
  const [statFilter, setStatFilter] = useState("ALL");
  const [page,       setPage]       = useState(1);
  const PER_PAGE = 8;

  const [showAdd,    setShowAdd]    = useState(false);
  const [editContact,setEditContact]= useState(null);
  const [deleteId,   setDeleteId]   = useState(null);
  const [addForm,    setAddForm]    = useState(EMPTY_FORM);
  const [errors,     setErrors]     = useState({});
  const [showImport, setShowImport] = useState(false);

  // ── Filtered list ──
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return contacts.filter((c) => {
      const matchQ   = !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || (c.phone||"").includes(q);
      const matchSeg = segFilter === "ALL" || String(c.segment_id) === String(segFilter);
      const matchSt  = statFilter === "ALL" || c.status === statFilter;
      return matchQ && matchSeg && matchSt;
    });
  }, [contacts, search, segFilter, statFilter]);

  const totalPages  = Math.ceil(filtered.length / PER_PAGE);
  const paginated   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // ── Summary cards ──
  const totalActive       = contacts.filter(c => c.status === "active").length;
  const totalUnsub        = contacts.filter(c => c.status === "unsubscribed").length;
  const totalInactive     = contacts.filter(c => c.status === "inactive").length;

  // ── Validation ──
  function validate(form) {
    const e = {};
    if (!form.name.trim())              e.name  = "Name आवश्यक आहे";
    if (!form.email.trim())             e.email = "Email आवश्यक आहे";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email टाका";
    return e;
  }

  // ── Add ──
  function handleAdd() {
    const e = validate(addForm);
    if (Object.keys(e).length) { setErrors(e); return; }
    const seg = segments.find(s => String(s.id) === String(addForm.segment_id));
    setContacts(prev => [{
      ...addForm,
      id: Date.now(),
      segment_name: seg?.name || "—",
      created_at: new Date().toISOString().slice(0,10),
    }, ...prev]);
    setShowAdd(false);
    setAddForm(EMPTY_FORM);
    setErrors({});
    setPage(1);
  }

  // ── Edit save ──
  function handleEditSave() {
    const e = validate(editContact);
    if (Object.keys(e).length) { setErrors(e); return; }
    const seg = segments.find(s => String(s.id) === String(editContact.segment_id));
    setContacts(prev => prev.map(c =>
      c.id === editContact.id ? { ...editContact, segment_name: seg?.name || c.segment_name } : c
    ));
    setEditContact(null);
    setErrors({});
  }

  // ── Delete ──
  function handleDelete() {
    setContacts(prev => prev.filter(c => c.id !== deleteId));
    setDeleteId(null);
  }

  // ─── Render ───
  return (
    <div className="space-y-5">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Contacts</h1>
          <p className="text-sm text-slate-400 mt-0.5">{contacts.length} total contacts</p>
        </div>
        {canEdit && (
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setShowImport(true)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold border-2 border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center gap-2"
            >
              <span>📤</span> CSV Upload
            </button>
            <button
              onClick={() => { setShowAdd(true); setAddForm(EMPTY_FORM); setErrors({}); }}
              className="px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
            >
              + Add Contact
            </button>
          </div>
        )}
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Contacts",   value: contacts.length, icon: "👥", color: "#6366f1", bg: "#ede9fe" },
          { label: "Active",           value: totalActive,     icon: "✅", color: "#10b981", bg: "#d1fae5" },
          { label: "Inactive",         value: totalInactive,   icon: "💤", color: "#94a3b8", bg: "#f1f5f9" },
          { label: "Unsubscribed",     value: totalUnsub,      icon: "🚫", color: "#ef4444", bg: "#fee2e2" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: s.bg }}>
                {s.icon}
              </div>
            </div>
            <p className="text-2xl font-black text-slate-800 mb-0.5">{s.value.toLocaleString()}</p>
            <p className="text-xs text-slate-400 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search name, email, phone..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-slate-50 rounded-lg text-sm outline-none focus:border-indigo-400"
          />
        </div>
        {/* Segment Filter */}
        <select
          value={segFilter}
          onChange={e => { setSegFilter(e.target.value); setPage(1); }}
          className="border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg text-sm outline-none focus:border-indigo-400"
        >
          <option value="ALL">All Segments</option>
          {segments.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        {/* Status Filter */}
        <select
          value={statFilter}
          onChange={e => { setStatFilter(e.target.value); setPage(1); }}
          className="border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg text-sm outline-none focus:border-indigo-400"
        >
          <option value="ALL">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="unsubscribed">Unsubscribed</option>
        </select>
        {/* Clear */}
        {(search || segFilter !== "ALL" || statFilter !== "ALL") && (
          <button
            onClick={() => { setSearch(""); setSegFilter("ALL"); setStatFilter("ALL"); setPage(1); }}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors whitespace-nowrap"
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
          <p className="text-sm font-semibold text-slate-600">
            Showing <span className="text-indigo-600 font-bold">{filtered.length}</span> contacts
          </p>
          <span className="text-xs text-slate-400">Page {page} of {totalPages || 1}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Contact", "Segment", "Phone", "Status", "Added", canEdit ? "Actions" : ""].filter(Boolean).map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={canEdit ? 6 : 5} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-5xl">🔍</span>
                      <p className="text-slate-500 font-semibold">कोणताही contact सापडला नाही</p>
                      <p className="text-xs text-slate-400">Filter बदला किंवा नवीन contact add करा</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((c, idx) => {
                  const sm = STATUS_META[c.status] || STATUS_META.inactive;
                  const av = AVATAR_COLORS[c.id % AVATAR_COLORS.length];
                  return (
                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      {/* Contact */}
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0"
                            style={{ background: av }}
                          >
                            {c.name[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-700 text-sm">{c.name}</p>
                            <p className="text-xs text-slate-400">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      {/* Segment */}
                      <td className="px-5 py-3">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">
                          {c.segment_name || "—"}
                        </span>
                      </td>
                      {/* Phone */}
                      <td className="px-5 py-3 text-slate-500 text-xs">{c.phone || "—"}</td>
                      {/* Status */}
                      <td className="px-5 py-3">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{ background: sm.bg, color: sm.text }}
                        >
                          {sm.label}
                        </span>
                      </td>
                      {/* Date */}
                      <td className="px-5 py-3 text-slate-400 text-xs">{c.created_at}</td>
                      {/* Actions */}
                      {canEdit && (
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setEditContact({ ...c }); setErrors({}); }}
                              className="text-xs px-3 py-1.5 rounded-lg font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                            >
                              Edit
                            </button>
                            {canDelete && (
                              <button
                                onClick={() => setDeleteId(c.id)}
                                className="text-xs px-3 py-1.5 rounded-lg font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-slate-50">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                    page === p
                      ? "text-white shadow"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                  style={page === p ? { background: "linear-gradient(135deg,#6366f1,#8b5cf6)" } : {}}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* ─────────────── ADD MODAL ─────────────── */}
      {showAdd && (
        <Modal title="Add New Contact" onClose={() => { setShowAdd(false); setErrors({}); }}>
          <ContactForm
            form={addForm}
            setForm={setAddForm}
            segments={segments}
            errors={errors}
            onSubmit={handleAdd}
            onCancel={() => { setShowAdd(false); setErrors({}); }}
            submitLabel="Add Contact"
          />
        </Modal>
      )}

      {/* ─────────────── EDIT MODAL ─────────────── */}
      {editContact && (
        <Modal title="Edit Contact" onClose={() => { setEditContact(null); setErrors({}); }}>
          <ContactForm
            form={editContact}
            setForm={setEditContact}
            segments={segments}
            errors={errors}
            onSubmit={handleEditSave}
            onCancel={() => { setEditContact(null); setErrors({}); }}
            submitLabel="Save Changes"
            showStatus
          />
        </Modal>
      )}

      {/* ─────────────── DELETE CONFIRM ─────────────── */}
      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(15,14,42,0.6)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-2xl mx-auto mb-4">🗑️</div>
            <h3 className="font-black text-slate-800 text-lg mb-2">Delete Contact?</h3>
            <p className="text-sm text-slate-400 mb-6">हा contact permanently delete होईल. ही action undo करता येणार नाही.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold bg-red-500 hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────── CSV IMPORT HINT MODAL ─────────────── */}
      {showImport && (
        <Modal title="CSV Upload" onClose={() => setShowImport(false)} maxW="max-w-md">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-indigo-200 rounded-xl p-8 flex flex-col items-center gap-3 bg-indigo-50">
              <span className="text-4xl">📂</span>
              <p className="font-semibold text-slate-700 text-sm">CSV file drag & drop करा</p>
              <p className="text-xs text-slate-400">किंवा browse करा</p>
              <button className="px-5 py-2 rounded-xl text-white text-xs font-bold" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                Browse File
              </button>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">CSV Format</p>
              <code className="text-xs text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg block font-mono">
                name, email, phone, segment_id
              </code>
              <p className="text-[11px] text-slate-400 mt-2">
                पहिली row header असणे आवश्यक आहे. Email column mandatory आहे.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowImport(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold"
              >
                Cancel
              </button>
              <button className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                Upload
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE MODAL WRAPPER
// ─────────────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, maxW = "max-w-md" }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,14,42,0.6)", backdropFilter: "blur(4px)" }}
    >
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${maxW} overflow-hidden`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-black text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT FORM (Add + Edit shared)
// ─────────────────────────────────────────────────────────────────────────────
function ContactForm({ form, setForm, segments, errors, onSubmit, onCancel, submitLabel, showStatus = false }) {
  const field = (label, name, type = "text", placeholder = "") => (
    <div key={name}>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
      <input
        type={type}
        value={form[name] || ""}
        placeholder={placeholder}
        onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
        className={`w-full border bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none transition-colors
          ${errors[name] ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-indigo-400"}`}
      />
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="space-y-4">
      {field("Full Name *", "name", "text", "Rahul Sharma")}
      {field("Email *",     "email", "email", "rahul@example.com")}
      {field("Phone",       "phone", "tel",   "9876543210")}

      {/* Segment */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Segment</label>
        <select
          value={form.segment_id || ""}
          onChange={e => setForm(p => ({ ...p, segment_id: e.target.value }))}
          className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400"
        >
          <option value="">— Segment निवडा —</option>
          {segments.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      {/* Status — edit only */}
      {showStatus && (
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2">Status</label>
          <div className="flex gap-2">
            {["active", "inactive", "unsubscribed"].map(s => {
              const meta = STATUS_META[s];
              return (
                <button
                  key={s}
                  onClick={() => setForm(p => ({ ...p, status: s }))}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all`}
                  style={
                    form.status === s
                      ? { borderColor: meta.text, background: meta.bg, color: meta.text }
                      : { borderColor: "#e2e8f0", color: "#94a3b8" }
                  }
                >
                  {meta.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}