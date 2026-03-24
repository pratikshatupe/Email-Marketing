import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("Email address भरा."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 flex flex-col items-center text-center">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg">M</div>
            <span className="text-slate-800 text-xl font-bold">MailDoll</span>
          </div>

          {!sent ? (
            <>
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-4xl mb-6">🔑</div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Forgot your password?</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
                No worries! Enter your email and we'll send you a reset link.
              </p>
              {error && <div className="w-full bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="text-left">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                    <span className="pl-4 text-slate-400">✉</span>
                    <input type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer">
                  {loading ? (<><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Sending...</>) : "Send Reset Link →"}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-4xl mb-6">📬</div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Check your inbox!</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-5 max-w-xs">
                We've sent a reset link to <span className="font-bold text-slate-700">{email}</span>.
              </p>
              <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-xl px-5 py-3 text-sm mb-6">
                ⏱ Link expires in <strong>15 minutes</strong>
              </div>
              <button onClick={() => setSent(false)}
                className="border border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors cursor-pointer">
                Didn't receive? Resend →
              </button>
            </>
          )}

          <Link to="/login" className="mt-8 text-sm text-indigo-600 font-semibold hover:underline">← Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}