
import { useState, useMemo, useRef } from "react";
import { useAuth } from "../auth/AuthContext";


const INITIAL_SEGMENTS = [
  { id: 1, name: "New Customers", contact_count: 340 },
  { id: 2, name: "Active Users", contact_count: 1820 },
  { id: 3, name: "Newsletter Subscribers", contact_count: 4102 },
  { id: 4, name: "Returning Customers", contact_count: 890 },
];

const INITIAL_CONTACTS = [
  { id: 1, name: "Aarav Sharma", email: "aarav@example.com", phone: "9876543210", segment_id: 1, segment_name: "New Customers", status: "active", created_at: "2026-01-10" },
  { id: 2, name: "Priya Patil", email: "priya@acme.com", phone: "9123456789", segment_id: 2, segment_name: "Active Users", status: "active", created_at: "2026-01-15" },
  { id: 3, name: "Rahul Mehta", email: "rahul@techcorp.com", phone: "9000011122", segment_id: 3, segment_name: "Newsletter Subscribers", status: "active", created_at: "2026-02-01" },
  { id: 4, name: "Sneha Kulkarni", email: "sneha@gmail.com", phone: "9988776655", segment_id: 1, segment_name: "New Customers", status: "unsubscribed", created_at: "2026-02-14" },
  { id: 5, name: "Amit Desai", email: "amit@startup.io", phone: "9871234560", segment_id: 4, segment_name: "Returning Customers", status: "active", created_at: "2026-02-20" },
  { id: 6, name: "Neha Joshi", email: "neha@bizmail.com", phone: "9765432100", segment_id: 2, segment_name: "Active Users", status: "active", created_at: "2026-03-02" },
  { id: 7, name: "Vijay Rao", email: "vijay@example.net", phone: "9654321098", segment_id: 3, segment_name: "Newsletter Subscribers", status: "inactive", created_at: "2026-03-05" },
  { id: 8, name: "Kavya Singh", email: "kavya@domain.com", phone: "9543210987", segment_id: 4, segment_name: "Returning Customers", status: "active", created_at: "2026-03-10" },
  { id: 9, name: "Rohan Verma", email: "rohan@company.in", phone: "9432109876", segment_id: 2, segment_name: "Active Users", status: "active", created_at: "2026-03-12" },
  { id: 10, name: "Anjali Nair", email: "anjali@mailbox.com", phone: "9321098765", segment_id: 3, segment_name: "Newsletter Subscribers", status: "active", created_at: "2026-03-15" },
  { id: 11, name: "Suresh Kumar", email: "suresh@example.com", phone: "9210987654", segment_id: 1, segment_name: "New Customers", status: "active", created_at: "2026-03-18" },
  { id: 12, name: "Divya Reddy", email: "divya@techmail.io", phone: "9109876543", segment_id: 4, segment_name: "Returning Customers", status: "inactive", created_at: "2026-03-20" },
];

const STATUS_META = {
  active: { bg: "#d1fae5", text: "#065f46", label: "Active" },
  inactive: { bg: "#f1f5f9", text: "#475569", label: "Inactive" },
  unsubscribed: { bg: "#fee2e2", text: "#991b1b", label: "Unsubscribed" },
};

const AVATAR_COLORS = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#10b981,#059669)",
  "linear-gradient(135deg,#f59e0b,#d97706)",
  "linear-gradient(135deg,#ec4899,#be185d)",
  "linear-gradient(135deg,#06b6d4,#0284c7)",
];

const FILE_TYPES = {
  csv: { accept: ".csv", label: "CSV", icon: "📊", color: "#10b981", bg: "#d1fae5", hint: "Contacts import CSV upload" },
  image: { accept: "image/png,image/jpeg,image/jpg,image/webp,image/gif", label: "Image / SS", icon: "🖼️", color: "#6366f1", bg: "#ede9fe", hint: "Screenshots, business cards image upload" },
  pdf: { accept: ".pdf", label: "PDF", icon: "📄", color: "#f59e0b", bg: "#fef3c7", hint: "Contact lists or PDF documents upload" },
};

const EMPTY_FORM = { name: "", email: "", phone: "", segment_id: "", status: "active" };


export default function Contacts() {
  const { user, hasPerm } = useAuth();
  const role = user?.role || "VIEWER";
  const canEdit = role === "SUPER_ADMIN" || role === "BUSINESS_ADMIN" || role === "MARKETING_MANAGER";
  const canDelete = role === "SUPER_ADMIN" || role === "BUSINESS_ADMIN";

  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [segments] = useState(INITIAL_SEGMENTS);
  const [search, setSearch] = useState("");
  const [segFilter, setSegFilter] = useState("ALL");
  const [statFilter, setStatFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const [showAdd, setShowAdd] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [addForm, setAddForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const [showUpload, setShowUpload] = useState(false);
  const [activeTab, setActiveTab] = useState("csv");
  const [uploadedFiles, setUploadedFiles] = useState({ csv: null, image: null, pdf: null });
  const [previews, setPreviews] = useState({ image: null, pdf: null });
  const [uploadErrors, setUploadErrors] = useState({});
  const [uploadSuccess, setUploadSuccess] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const csvInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const inputRefs = { csv: csvInputRef, image: imageInputRef, pdf: pdfInputRef };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return contacts.filter(c => {
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || (c.phone || "").includes(q);
      const matchSeg = segFilter === "ALL" || String(c.segment_id) === String(segFilter);
      const matchSt = statFilter === "ALL" || c.status === statFilter;
      return matchQ && matchSeg && matchSt;
    });
  }, [contacts, search, segFilter, statFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const totalActive = contacts.filter(c => c.status === "active").length;
  const totalUnsub = contacts.filter(c => c.status === "unsubscribed").length;
  const totalInactive = contacts.filter(c => c.status === "inactive").length;

  function validate(form) {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    return e;
  }

  function handleAdd() {
    const e = validate(addForm);
    if (Object.keys(e).length) { setErrors(e); return; }
    const seg = segments.find(s => String(s.id) === String(addForm.segment_id));
    setContacts(prev => [{
      ...addForm, id: Date.now(), segment_name: seg?.name || "—",
      created_at: new Date().toISOString().slice(0, 10),
    }, ...prev]);
    setShowAdd(false); setAddForm(EMPTY_FORM); setErrors({}); setPage(1);
  }

  function handleEditSave() {
    const e = validate(editContact);
    if (Object.keys(e).length) { setErrors(e); return; }
    const seg = segments.find(s => String(s.id) === String(editContact.segment_id));
    setContacts(prev => prev.map(c =>
      c.id === editContact.id ? { ...editContact, segment_name: seg?.name || c.segment_name } : c
    ));
    setEditContact(null); setErrors({});
  }

  function handleDelete() {
    setContacts(prev => prev.filter(c => c.id !== deleteId));
    setDeleteId(null);
  }

  function clearFileState(type) {
    setUploadErrors(p => { const n = { ...p }; delete n[type]; return n; });
    setUploadSuccess(p => { const n = { ...p }; delete n[type]; return n; });
  }

  function handleFileSelect(type, file) {
    if (!file) return;
    clearFileState(type);
    const maxBytes = 10 * 1024 * 1024;
    if (type === "csv" && !file.name.toLowerCase().endsWith(".csv")) {
      setUploadErrors(p => ({ ...p, csv: "Please select a CSV file" })); return;
    }
    if (type === "image" && !file.type.startsWith("image/")) {
      setUploadErrors(p => ({ ...p, image: "Please select an image file (PNG, JPG, WebP, GIF)" })); return;
    }
    if (type === "pdf" && file.type !== "application/pdf") {
      setUploadErrors(p => ({ ...p, pdf: "Please select a PDF file" })); return;
    }
    if (file.size > maxBytes) {
      setUploadErrors(p => ({ ...p, [type]: "File size must be under 10 MB" })); return;
    }
    setUploadedFiles(prev => ({ ...prev, [type]: file }));
    if (type === "image") {
      const reader = new FileReader();
      reader.onload = e => setPreviews(prev => ({ ...prev, image: e.target.result }));
      reader.readAsDataURL(file);
    }
    if (type === "pdf") {
      const url = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, pdf: url }));
    }
  }

  function handleInputChange(type, e) { handleFileSelect(type, e.target.files[0]); }

  function handleDrop(e) {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    let detectedType = activeTab;
    if (file.type.startsWith("image/")) detectedType = "image";
    else if (file.type === "application/pdf") detectedType = "pdf";
    else if (file.name.toLowerCase().endsWith(".csv")) detectedType = "csv";
    setActiveTab(detectedType);
    handleFileSelect(detectedType, file);
  }

  function removeFile(type) {
    setUploadedFiles(prev => ({ ...prev, [type]: null }));
    setPreviews(prev => ({ ...prev, [type]: null }));
    clearFileState(type);
    if (inputRefs[type]?.current) inputRefs[type].current.value = "";
  }

  function handleCsvUpload() {
    const file = uploadedFiles.csv;
    if (!file) { setUploadErrors(p => ({ ...p, csv: "Please select a CSV file" })); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      const lines = text.trim().split("\n").filter(Boolean);
      if (lines.length < 2) { setUploadErrors(p => ({ ...p, csv: "CSV must contain at least one data row" })); return; }
      const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
      const nameIdx = headers.indexOf("name");
      const emailIdx = headers.indexOf("email");
      const phoneIdx = headers.indexOf("phone");
      const segIdx = headers.indexOf("segment_id");
      if (emailIdx === -1) { setUploadErrors(p => ({ ...p, csv: "CSV must have an 'email' column" })); return; }
      const newContacts = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",").map(c => c.trim());
        const email = cols[emailIdx];
        if (!email || !/\S+@\S+\.\S+/.test(email)) continue;
        const segment_id = segIdx !== -1 ? cols[segIdx] : "";
        const seg = segments.find(s => String(s.id) === String(segment_id));
        newContacts.push({
          id: Date.now() + i,
          name: nameIdx !== -1 ? (cols[nameIdx] || "Unknown") : "Unknown",
          email, phone: phoneIdx !== -1 ? (cols[phoneIdx] || "") : "",
          segment_id: segment_id || "", segment_name: seg?.name || "—",
          status: "active", created_at: new Date().toISOString().slice(0, 10),
        });
      }
      if (newContacts.length === 0) { setUploadErrors(p => ({ ...p, csv: "No valid contacts found. Check email column." })); return; }
      setContacts(prev => [...newContacts, ...prev]);
      setUploadSuccess(p => ({ ...p, csv: `✅ ${newContacts.length} contacts imported successfully!` }));
      setUploadedFiles(prev => ({ ...prev, csv: null }));
      if (csvInputRef.current) csvInputRef.current.value = "";
      setPage(1);
    };
    reader.readAsText(file);
  }

  function handleMediaUpload(type) {
    const file = uploadedFiles[type];
    if (!file) return;
    setUploadSuccess(p => ({ ...p, [type]: `✅ "${file.name}" uploaded successfully!` }));
    setUploadedFiles(prev => ({ ...prev, [type]: null }));
    setPreviews(prev => ({ ...prev, [type]: null }));
    if (inputRefs[type]?.current) inputRefs[type].current.value = "";
  }

  function closeUpload() {
    setShowUpload(false);
    setUploadedFiles({ csv: null, image: null, pdf: null });
    setPreviews({ image: null, pdf: null });
    setUploadErrors({}); setUploadSuccess({}); setIsDragging(false);
    Object.values(inputRefs).forEach(r => { if (r?.current) r.current.value = ""; });
  }

  const currentFile = uploadedFiles[activeTab];
  const currentErr = uploadErrors[activeTab];
  const currentOk = uploadSuccess[activeTab];
  const tabMeta = FILE_TYPES[activeTab];

  return (
    <div className="space-y-5">
      <style>{`
        @media (max-width: 767px) {
          .contacts-table-wrapper { display: none !important; }
          .contacts-card-list { display: flex !important; }
        }
        @media (min-width: 768px) {
          .contacts-table-wrapper { display: block !important; }
          .contacts-card-list { display: none !important; }
        }
        .contact-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          padding: 16px;
          transition: box-shadow 0.2s;
        }
        .contact-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.10); }
      `}</style>

      <input ref={csvInputRef} type="file" accept=".csv" className="hidden" onChange={e => handleInputChange("csv", e)} />
      <input ref={imageInputRef} type="file" accept="image/png,image/jpeg,image/jpg,image/webp,image/gif" className="hidden" onChange={e => handleInputChange("image", e)} />
      <input ref={pdfInputRef} type="file" accept=".pdf" className="hidden" onChange={e => handleInputChange("pdf", e)} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Contacts</h1>
          <p className="text-sm text-slate-400 mt-0.5">{contacts.length} total contacts</p>
        </div>
        {canEdit && (
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setShowUpload(true)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold border-2 border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center gap-2">
              <span>📤</span> Upload File
            </button>
            <button onClick={() => { setShowAdd(true); setAddForm(EMPTY_FORM); setErrors({}); }}
              className="px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              + Add Contact
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Contacts", value: contacts.length, icon: "👥", bg: "#ede9fe" },
          { label: "Active", value: totalActive, icon: "✅", bg: "#d1fae5" },
          { label: "Inactive", value: totalInactive, icon: "💤", bg: "#f1f5f9" },
          { label: "Unsubscribed", value: totalUnsub, icon: "🚫", bg: "#fee2e2" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3" style={{ background: s.bg }}>{s.icon}</div>
            <p className="text-2xl font-black text-slate-800 mb-0.5">{s.value.toLocaleString()}</p>
            <p className="text-xs text-slate-400 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-sm">🔍</span>
          <input type="text" placeholder="Search name, email, phone..."
            value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-slate-50 rounded-lg text-sm outline-none focus:border-indigo-400" />
        </div>
        <select value={segFilter} onChange={e => { setSegFilter(e.target.value); setPage(1); }}
          className="border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg text-sm outline-none focus:border-indigo-400">
          <option value="ALL">All Segments</option>
          {segments.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select value={statFilter} onChange={e => { setStatFilter(e.target.value); setPage(1); }}
          className="border border-slate-200 bg-slate-50 px-4 py-2 rounded-lg text-sm outline-none focus:border-indigo-400">
          <option value="ALL">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="unsubscribed">Unsubscribed</option>
        </select>
        {(search || segFilter !== "ALL" || statFilter !== "ALL") && (
          <button onClick={() => { setSearch(""); setSegFilter("ALL"); setStatFilter("ALL"); setPage(1); }}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors whitespace-nowrap">
            ✕ Clear
          </button>
        )}
      </div>

      <div className="flex items-center justify-between px-1">
        <p className="text-sm font-semibold text-slate-600">
          Showing <span className="text-indigo-600 font-bold">{filtered.length}</span> contacts
        </p>
        <span className="text-xs text-slate-400">Page {page} of {totalPages || 1}</span>
      </div>

      <div className="contacts-table-wrapper bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
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
                      <p className="text-slate-500 font-semibold">No contacts found</p>
                    </div>
                  </td>
                </tr>
              ) : paginated.map(c => {
                const sm = STATUS_META[c.status] || STATUS_META.inactive;
                const av = AVATAR_COLORS[c.id % AVATAR_COLORS.length];
                return (
                  <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0" style={{ background: av }}>
                          {c.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-700 text-sm">{c.name}</p>
                          <p className="text-xs text-slate-400">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">{c.segment_name || "—"}</span>
                    </td>
                    <td className="px-5 py-3 text-slate-500 text-xs">{c.phone || "—"}</td>
                    <td className="px-5 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: sm.bg, color: sm.text }}>{sm.label}</span>
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{c.created_at}</td>
                    {canEdit && (
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditContact({ ...c }); setErrors({}); }}
                            className="text-xs px-3 py-1.5 rounded-lg font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">Edit</button>
                          {canDelete && (
                            <button onClick={() => setDeleteId(c.id)}
                              className="text-xs px-3 py-1.5 rounded-lg font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors">Delete</button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-slate-50">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">← Previous</button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${page === p ? "text-white shadow" : "text-slate-500 hover:bg-slate-100"}`}
                  style={page === p ? { background: "linear-gradient(135deg,#6366f1,#8b5cf6)" } : {}}>{p}</button>
              ))}
            </div>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Next →</button>
          </div>
        )}
      </div>

      <div className="contacts-card-list flex-col gap-3">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12">
            <span className="text-5xl">🔍</span>
            <p className="text-slate-500 font-semibold">No contacts found</p>
          </div>
        ) : paginated.map(c => {
          const sm = STATUS_META[c.status] || STATUS_META.inactive;
          const av = AVATAR_COLORS[c.id % AVATAR_COLORS.length];
          return (
            <div key={c.id} className="contact-card">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0" style={{ background: av }}>
                    {c.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">{c.name}</p>
                    <p className="text-xs text-slate-400 truncate">{c.email}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0" style={{ background: sm.bg, color: sm.text }}>{sm.label}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 bg-slate-50 rounded-lg px-2.5 py-1.5">
                  <span className="text-slate-400 text-xs">📞</span>
                  <span className="text-xs text-slate-600 font-medium">{c.phone || "No phone"}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-indigo-50 rounded-lg px-2.5 py-1.5">
                  <span className="text-indigo-400 text-xs">🎯</span>
                  <span className="text-xs text-indigo-600 font-medium">{c.segment_name || "—"}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 rounded-lg px-2.5 py-1.5">
                  <span className="text-slate-400 text-xs">📅</span>
                  <span className="text-xs text-slate-500">{c.created_at}</span>
                </div>
              </div>

              {canEdit && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                  <button onClick={() => { setEditContact({ ...c }); setErrors({}); }}
                    className="flex-1 py-2 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">✏️ Edit</button>
                  {canDelete && (
                    <button onClick={() => setDeleteId(c.id)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 transition-colors">🗑️ Delete</button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Mobile Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">← Prev</button>
            <span className="text-xs text-slate-500 font-semibold">{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">Next →</button>
          </div>
        )}
      </div>

      {showAdd && (
        <Modal title="Add New Contact" onClose={() => { setShowAdd(false); setErrors({}); }}>
          <ContactForm form={addForm} setForm={setAddForm} segments={segments} errors={errors}
            onSubmit={handleAdd} onCancel={() => { setShowAdd(false); setErrors({}); }} submitLabel="Add Contact" />
        </Modal>
      )}

      {editContact && (
        <Modal title="Edit Contact" onClose={() => { setEditContact(null); setErrors({}); }}>
          <ContactForm form={editContact} setForm={setEditContact} segments={segments} errors={errors}
            onSubmit={handleEditSave} onCancel={() => { setEditContact(null); setErrors({}); }} submitLabel="Save Changes" showStatus />
        </Modal>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(15,14,42,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-2xl mx-auto mb-4">🗑️</div>
            <h3 className="font-black text-slate-800 text-lg mb-2">Delete Contact?</h3>
            <p className="text-sm text-slate-400 mb-6">This contact will be permanently deleted. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50">Cancel</button>
              <button onClick={handleDelete}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold bg-red-500 hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(15,14,42,0.65)", backdropFilter: "blur(6px)" }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full flex flex-col" style={{ maxWidth: "520px", maxHeight: "92vh" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
              <div>
                <h3 className="font-black text-slate-800 text-base">File Upload</h3>
                <p className="text-xs text-slate-400 mt-0.5">CSV, Image / Screenshot & PDF upload</p>
              </div>
              <button onClick={closeUpload} className="text-slate-400 hover:text-slate-600 text-xl leading-none transition-colors">✕</button>
            </div>
            <div className="flex gap-1.5 px-6 pt-4 flex-shrink-0">
              {Object.entries(FILE_TYPES).map(([key, meta]) => (
                <button key={key} onClick={() => setActiveTab(key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border-2 transition-all relative ${activeTab === key ? "border-transparent text-white shadow-md" : "border-slate-100 text-slate-500 hover:border-slate-200 bg-white"}`}
                  style={activeTab === key ? { background: `linear-gradient(135deg,${meta.color},${meta.color}bb)` } : {}}>
                  <span className="text-sm">{meta.icon}</span>
                  <span>{meta.label}</span>
                  {uploadedFiles[key] && activeTab !== key && (
                    <span className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <div
                className={`border-2 border-dashed rounded-2xl transition-all duration-150 cursor-pointer select-none
                  ${isDragging ? "border-indigo-400 bg-indigo-50 scale-[1.01]"
                    : currentFile ? "border-emerald-300 bg-emerald-50/60"
                    : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/40"}`}
                onClick={() => inputRefs[activeTab]?.current?.click()}
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}>
                {activeTab === "image" && previews.image && (
                  <div className="p-3">
                    <img src={previews.image} alt="preview" className="w-full max-h-52 object-contain rounded-xl border border-slate-100 bg-white shadow-sm" />
                    <div className="flex items-center justify-between mt-2.5 px-1">
                      <p className="text-xs font-semibold text-emerald-700 truncate max-w-[300px]">✅ {uploadedFiles.image?.name}</p>
                      <button onClick={e => { e.stopPropagation(); removeFile("image"); }}
                        className="text-xs text-red-400 hover:text-red-600 font-semibold ml-2 flex-shrink-0 border border-red-200 px-2 py-0.5 rounded-lg transition-colors">✕ Remove</button>
                    </div>
                  </div>
                )}
                {activeTab === "pdf" && previews.pdf && (
                  <div className="p-3">
                    <div className="w-full h-52 rounded-xl overflow-hidden border border-slate-100 bg-white shadow-sm">
                      <iframe src={previews.pdf} title="pdf-preview" className="w-full h-full" />
                    </div>
                    <div className="flex items-center justify-between mt-2.5 px-1">
                      <p className="text-xs font-semibold text-emerald-700 truncate max-w-[300px]">✅ {uploadedFiles.pdf?.name}</p>
                      <button onClick={e => { e.stopPropagation(); removeFile("pdf"); }}
                        className="text-xs text-red-400 hover:text-red-600 font-semibold ml-2 flex-shrink-0 border border-red-200 px-2 py-0.5 rounded-lg transition-colors">✕ Remove</button>
                    </div>
                  </div>
                )}
                {!(activeTab === "image" && previews.image) && !(activeTab === "pdf" && previews.pdf) && (
                  <div className="flex flex-col items-center gap-3 py-9 px-4 text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm" style={{ background: currentFile ? "#d1fae5" : tabMeta.bg }}>
                      {currentFile ? "✅" : tabMeta.icon}
                    </div>
                    {currentFile ? (
                      <>
                        <div>
                          <p className="font-bold text-slate-700 text-sm break-all px-4">{currentFile.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{(currentFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <button onClick={e => { e.stopPropagation(); removeFile(activeTab); }}
                          className="text-xs text-red-400 hover:text-red-600 font-semibold border border-red-200 px-3 py-1 rounded-lg transition-colors">✕ Remove</button>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="font-semibold text-slate-700 text-sm">{tabMeta.label} file drag & drop</p>
                          <p className="text-xs text-slate-400 mt-0.5">or click to browse</p>
                        </div>
                        <button onClick={e => { e.stopPropagation(); inputRefs[activeTab]?.current?.click(); }}
                          className="px-5 py-2 rounded-xl text-white text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
                          style={{ background: `linear-gradient(135deg,${tabMeta.color},${tabMeta.color}bb)` }}>Browse File</button>
                        <p className="text-[10px] text-slate-300">Max file size: 10 MB</p>
                      </>
                    )}
                  </div>
                )}
              </div>
              {currentErr && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs font-semibold text-red-600 flex items-start gap-2">
                  <span className="flex-shrink-0">❌</span><span>{currentErr}</span>
                </div>
              )}
              {currentOk && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-xs font-semibold text-emerald-700 flex items-start gap-2">
                  <span>{currentOk}</span>
                </div>
              )}
              {activeTab === "csv" && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">CSV Format</p>
                  <code className="text-xs text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg block font-mono">name, email, phone, segment_id</code>
                  <p className="text-[11px] text-slate-400 mt-2">First row must be header. <strong>email</strong> column is mandatory.</p>
                </div>
              )}
              {activeTab === "image" && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Supported Formats</p>
                  <div className="flex gap-2 flex-wrap">
                    {["PNG", "JPG", "JPEG", "WebP", "GIF"].map(f => (
                      <span key={f} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600">{f}</span>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "pdf" && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">PDF Upload</p>
                  <p className="text-[11px] text-slate-400">Upload contact lists, reports and PDF documents. Preview shown on file select.</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-slate-100 flex-shrink-0">
              <button onClick={closeUpload}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
              <button disabled={!currentFile}
                onClick={() => {
                  if (activeTab === "csv") handleCsvUpload();
                  else if (activeTab === "image") handleMediaUpload("image");
                  else if (activeTab === "pdf") handleMediaUpload("pdf");
                }}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                style={{ background: `linear-gradient(135deg,${tabMeta.color},${tabMeta.color}bb)` }}>
                {activeTab === "csv" ? "Import Contacts" : "Upload File"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Modal({ title, onClose, children, maxW = "max-w-md" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,14,42,0.6)", backdropFilter: "blur(4px)" }}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${maxW} overflow-hidden max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-black text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function ContactForm({ form, setForm, segments, errors, onSubmit, onCancel, submitLabel, showStatus = false }) {
  const field = (label, name, type = "text", placeholder = "") => (
    <div key={name}>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
      <input type={type} value={form[name] || ""} placeholder={placeholder}
        onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
        className={`w-full border bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none transition-colors ${errors[name] ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-indigo-400"}`} />
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );
  return (
    <div className="space-y-4">
      {field("Full Name *", "name", "text", "Rahul Sharma")}
      {field("Email *", "email", "email", "rahul@example.com")}
      {field("Phone", "phone", "tel", "9876543210")}
      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Segment</label>
        <select value={form.segment_id || ""} onChange={e => setForm(p => ({ ...p, segment_id: e.target.value }))}
          className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400">
          <option value="">— Select Segment —</option>
          {segments.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
      {showStatus && (
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2">Status</label>
          <div className="flex gap-2">
            {["active", "inactive", "unsubscribed"].map(s => {
              const meta = STATUS_META[s];
              return (
                <button key={s} onClick={() => setForm(p => ({ ...p, status: s }))}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all"
                  style={form.status === s ? { borderColor: meta.text, background: meta.bg, color: meta.text } : { borderColor: "#e2e8f0", color: "#94a3b8" }}>
                  {meta.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div className="flex gap-3 pt-2">
        <button onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
        <button onClick={onSubmit}
          className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>{submitLabel}</button>
      </div>
    </div>
  );
}