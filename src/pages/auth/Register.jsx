import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", company: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthConfig = [
    { label: "", color: "bg-slate-200" },
    { label: "Weak",   color: "bg-red-500" },
    { label: "Fair",   color: "bg-amber-500" },
    { label: "Good",   color: "bg-emerald-500" },
    { label: "Strong", color: "bg-indigo-600" },
  ][passwordStrength];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirm) { setError("fill all fields ."); return; }
    if (form.password !== form.confirm) { setError("Passwords match is not match ."); return; }
    if (form.password.length < 8) { setError("Password min 8 characters ."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/verify-email"); }, 1500);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-gradient-to-br from-indigo-950 via-indigo-800 to-indigo-600 p-14 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute bottom-10 -right-20 w-72 h-72 bg-white/5 rounded-full" />
        <div className="flex items-center gap-3 z-10">
          <div className="w-11 h-11 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center text-white font-black text-xl">M</div>
          <span className="text-white text-xl font-bold">MailDoll</span>
        </div>
        <div className="z-10">
          <h1 className="text-5xl font-black text-white leading-tight mb-5">Start Growing<br />Your Audience.</h1>
          <p className="text-indigo-200 text-base leading-relaxed max-w-sm">Join thousands of businesses using MailDoll to reach customers effectively.</p>
        </div>
        <div className="flex flex-col gap-3 z-10">
          {["✅ Free plan — no credit card needed", "✅ 100 emails/month on free tier", "✅ Drag & drop template builder", "✅ Real-time analytics dashboard"].map((f) => (
            <div key={f} className="text-indigo-100/80 text-sm">{f}</div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 lg:w-[520px] lg:flex-none items-center justify-center bg-slate-50 px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black">M</div>
            <span className="text-slate-800 text-lg font-bold">MailDoll</span>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900 mb-1.5">Create your account</h2>
              <p className="text-slate-500 text-sm">Free forever. No credit card required.</p>
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                  <span className="pl-4 text-slate-400">👤</span>
                  <input type="text" name="name" placeholder="Pratiksha Tupe" value={form.name} onChange={handleChange}
                    className="flex-1 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Work Email</label>
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                  <span className="pl-4 text-slate-400">✉</span>
                  <input type="email" name="email" placeholder="you@company.com" value={form.email} onChange={handleChange}
                    className="flex-1 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
                </div>
              </div>
              {/* Company */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company Name (Optional)</label>
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                  <span className="pl-4 text-slate-400">🏢</span>
                  <input type="text" name="company" placeholder="Acme Inc." value={form.company} onChange={handleChange}
                    className="flex-1 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                  <span className="pl-4 text-slate-400">🔒</span>
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="Min 8 characters" value={form.password} onChange={handleChange}
                    className="flex-1 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="pr-4 text-slate-400 hover:text-slate-600 cursor-pointer">
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= passwordStrength ? strengthConfig.color : "bg-slate-200"}`} />
                      ))}
                    </div>
                    <span className={`text-xs font-semibold ${passwordStrength === 1 ? "text-red-500" : passwordStrength === 2 ? "text-amber-500" : passwordStrength === 3 ? "text-emerald-500" : "text-indigo-600"}`}>
                      {strengthConfig.label}
                    </span>
                  </div>
                )}
              </div>
              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password</label>
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                  <span className="pl-4 text-slate-400">🔒</span>
                  <input type="password" name="confirm" placeholder="Repeat password" value={form.confirm} onChange={handleChange}
                    className="flex-1 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-indigo-600 font-semibold hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-indigo-600 font-semibold hover:underline">Privacy Policy</a>.
              </p>
              <button type="submit" disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer">
                {loading ? (<><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Creating account...</>) : "Create Free Account →"}
              </button>
            </form>
            <p className="text-center text-sm text-slate-500 mt-5">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign in →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}