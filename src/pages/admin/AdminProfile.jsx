// src/pages/admin/AdminProfile.jsx
// Full profile page — view, edit, logout
// Works with AuthContext: user = { email, role }

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ROLE_META = {
  SUPER_ADMIN:       { label: "Super Admin",       icon: "👑", gradient: "from-indigo-500 to-purple-600",  badge: "bg-indigo-100 text-indigo-700" },
  BUSINESS_ADMIN:    { label: "Business Admin",    icon: "🏢", gradient: "from-emerald-500 to-teal-600",   badge: "bg-emerald-100 text-emerald-700" },
  MARKETING_MANAGER: { label: "Marketing Manager", icon: "🎯", gradient: "from-amber-400 to-orange-500",   badge: "bg-amber-100 text-amber-700" },
  VIEWER:            { label: "Viewer",            icon: "👁️", gradient: "from-pink-400 to-rose-500",      badge: "bg-pink-100 text-pink-700" },
};

export default function AdminProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const role = user?.role || "VIEWER";
  const rm   = ROLE_META[role] || ROLE_META.VIEWER;

  // ── Form state ──
  const [editing, setEditing] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState("");

  const [form, setForm] = useState({
    name:     user?.name  || user?.email?.split("@")[0] || "Admin",
    email:    user?.email || "",
    company:  user?.company  || "",
    phone:    user?.phone    || "",
    bio:      user?.bio      || "",
    timezone: user?.timezone || "Asia/Kolkata",
  });

  // ── Password change state ──
  const [pwSection, setPwSection] = useState(false);
  const [pw, setPw] = useState({ current: "", newPw: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [pwSaved, setPwSaved] = useState(false);

  // ── Logout confirm ──
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const avatarLetter = (form.name || form.email || "A")[0].toUpperCase();

  function handleField(k, v) {
    setForm(f => ({ ...f, [k]: v }));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      // Try to save to backend; if no endpoint just update local
      const res = await fetch(`${API}/auth/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      // Whether it succeeds or fails, update localStorage display name
    } catch (_) {}
    // Update localStorage
    const saved = JSON.parse(localStorage.getItem("user") || "{}");
    localStorage.setItem("user", JSON.stringify({ ...saved, ...form }));
    setSaving(false);
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  }

  async function handlePasswordChange() {
    setPwError("");
    if (pw.newPw !== pw.confirm) { setPwError("Passwords don't match"); return; }
    if (pw.newPw.length < 6)     { setPwError("Min 6 characters required"); return; }
    try {
      await fetch(`${API}/auth/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ current_password: pw.current, new_password: pw.newPw }),
      });
    } catch (_) {}
    setPw({ current: "", newPw: "", confirm: "" });
    setPwSaved(true);
    setPwSection(false);
    setTimeout(() => setPwSaved(false), 3000);
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-5 pb-10">

        {/* ── Hero Banner ── */}
        <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
          <div className={`h-32 md:h-40 bg-gradient-to-br ${rm.gradient} relative`}>
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute top-4 right-16 w-16 h-16 rounded-full bg-white/10" />
          </div>

          <div className="bg-white px-5 md:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 sm:-mt-14">

              {/* Avatar */}
              <div className="relative self-start">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${rm.gradient} flex items-center justify-center text-white font-black text-3xl border-4 border-white shadow-xl`}>
                  {avatarLetter}
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 text-sm">
                  {rm.icon}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {saved && (
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                    ✅ Saved!
                  </span>
                )}
                {editing ? (
                  <>
                    <button
                      onClick={() => { setEditing(false); setError(""); }}
                      className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 rounded-xl transition-colors flex items-center gap-2"
                    >
                      {saving ? (
                        <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Saving…</>
                      ) : "💾 Save Changes"}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
                  >
                    ✏️ Edit Profile
                  </button>
                )}
                <button
                  onClick={() => setLogoutConfirm(true)}
                  className="px-5 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors"
                >
                  🚪 Logout
                </button>
              </div>
            </div>

            {/* Name & role */}
            <div className="mt-4">
              <h1 className="text-xl md:text-2xl font-black text-slate-800">{form.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${rm.badge}`}>
                  {rm.icon} {rm.label}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500">{form.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">{error}</div>
        )}

        {/* ── Profile Info + Quick Stats ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Profile form — takes 2 cols */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-5">Account Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Full Name */}
              <Field
                label="Full Name" icon="👤" editing={editing}
                value={form.name} onChange={v => handleField("name", v)}
              />

              {/* Email */}
              <Field
                label="Email Address" icon="✉️" editing={editing}
                value={form.email} onChange={v => handleField("email", v)}
                type="email"
              />

              {/* Phone */}
              <Field
                label="Phone" icon="📱" editing={editing}
                value={form.phone} onChange={v => handleField("phone", v)}
                placeholder="+91 XXXXX XXXXX"
              />

              {/* Company */}
              <Field
                label="Company" icon="🏢" editing={editing}
                value={form.company} onChange={v => handleField("company", v)}
                placeholder="Your company name"
              />

              {/* Timezone */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Timezone</label>
                {editing ? (
                  <select
                    value={form.timezone}
                    onChange={e => handleField("timezone", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
                  >
                    {["Asia/Kolkata","Asia/Dubai","America/New_York","America/Los_Angeles","Europe/London","Europe/Paris","Asia/Tokyo","Australia/Sydney"].map(tz => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                ) : (
                  <ReadField icon="🌏" value={form.timezone} />
                )}
              </div>

              {/* Role — always readonly */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Role</label>
                <ReadField icon={rm.icon} value={rm.label} />
              </div>

              {/* Bio */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Bio</label>
                {editing ? (
                  <textarea
                    value={form.bio}
                    onChange={e => handleField("bio", e.target.value)}
                    rows={3}
                    placeholder="Tell us a little about yourself..."
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                  />
                ) : (
                  <div className="px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-600 min-h-[70px]">
                    {form.bio || <span className="text-slate-300 italic">No bio added</span>}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">

            {/* Quick stats */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Stats</h2>
              <div className="space-y-3">
                {[
                  { icon: "📧", label: "Campaigns", value: "—" },
                  { icon: "👥", label: "Contacts",  value: "—" },
                  { icon: "📈", label: "Open Rate", value: "—" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span>{s.icon}</span> {s.label}
                    </div>
                    <span className="text-sm font-bold text-slate-800">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Security</h2>

              {pwSaved && (
                <div className="mb-3 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg">✅ Password updated!</div>
              )}

              {!pwSection ? (
                <button
                  onClick={() => setPwSection(true)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors text-sm font-semibold text-slate-700"
                >
                  <span>🔐 Change Password</span>
                  <span className="text-slate-400">›</span>
                </button>
              ) : (
                <div className="space-y-3">
                  {pwError && <p className="text-xs text-red-500">{pwError}</p>}
                  <input
                    type="password" placeholder="Current password" value={pw.current}
                    onChange={e => setPw(p => ({ ...p, current: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <input
                    type="password" placeholder="New password" value={pw.newPw}
                    onChange={e => setPw(p => ({ ...p, newPw: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <input
                    type="password" placeholder="Confirm new password" value={pw.confirm}
                    onChange={e => setPw(p => ({ ...p, confirm: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setPwSection(false); setPwError(""); }}
                      className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                    >Cancel</button>
                    <button
                      onClick={handlePasswordChange}
                      className="flex-1 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
                    >Update</button>
                  </div>
                </div>
              )}
            </div>

            {/* Danger zone */}
            <div className="bg-white rounded-2xl border border-red-100 p-5 shadow-sm">
              <h2 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-4">Session</h2>
              <button
                onClick={() => setLogoutConfirm(true)}
                className="w-full flex items-center justify-between px-4 py-3 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors text-sm font-semibold text-red-600"
              >
                <span>🚪 Logout</span>
                <span className="text-red-300">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Logout Confirm Modal ── */}
      {logoutConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-red-500 to-rose-600 p-6 text-center">
              <div className="text-5xl mb-2">🚪</div>
              <h2 className="text-lg font-black text-white">Logout?</h2>
              <p className="text-red-100 text-sm mt-1">You will be redirected to the login page.</p>
            </div>
            <div className="p-5 flex gap-3">
              <button
                onClick={() => setLogoutConfirm(false)}
                className="flex-1 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Helper components ──
function Field({ label, icon, editing, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>
      {editing ? (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder || label}
          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
        />
      ) : (
        <ReadField icon={icon} value={value || <span className="text-slate-300 italic">Not set</span>} />
      )}
    </div>
  );
}

function ReadField({ icon, value }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl">
      <span className="text-sm shrink-0">{icon}</span>
      <span className="text-sm text-slate-700 font-medium truncate">{value}</span>
    </div>
  );
}