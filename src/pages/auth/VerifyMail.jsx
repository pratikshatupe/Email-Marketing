import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputs = useRef([]);

  useEffect(() => { inputs.current[0]?.focus(); }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) inputs.current[idx - 1]?.focus();
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (paste.length === 6) { setOtp(paste.split("")); inputs.current[5]?.focus(); }
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (otp.join("").length < 6) { setError("6-digit OTP ."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/login"); }, 1500);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setResent(true);
    setTimer(30);
    setOtp(["", "", "", "", "", ""]);
    inputs.current[0]?.focus();
    setTimeout(() => setResent(false), 3000);
  };

  const filled = otp.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 flex flex-col items-center text-center">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg">M</div>
            <span className="text-slate-800 text-xl font-bold">MailDoll</span>
          </div>

          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-4xl mb-6">📧</div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Verify your email</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
            We've sent a 6-digit verification code to your email. Enter it below.
          </p>

          {error && <div className="w-full bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}
          {resent && <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl px-4 py-3 text-sm mb-5">✅ Code resent successfully!</div>}

          <form onSubmit={handleSubmit} className="w-full space-y-6" onPaste={handlePaste}>
            {/* OTP Boxes */}
            <div className="flex gap-2.5 justify-center">
              {otp.map((digit, i) => (
                <input key={i} ref={(el) => (inputs.current[i] = el)}
                  type="text" inputMode="numeric" maxLength={1} value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`w-12 h-14 text-center text-xl font-black border-2 rounded-xl outline-none transition-all duration-200
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
                    ${digit ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-slate-50 text-slate-800"}`}
                />
              ))}
            </div>

            <p className="text-xs text-slate-400">{filled}/6 digits entered</p>

            <button type="submit" disabled={loading || filled < 6}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer">
              {loading ? (<><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Verifying...</>) : "Verify Email →"}
            </button>
          </form>

          <div className="flex flex-col items-center gap-1.5 mt-6">
            <span className="text-sm text-slate-400">Didn't receive the code?</span>
            <button onClick={handleResend} disabled={timer > 0}
              className={`text-sm font-bold transition-colors ${timer > 0 ? "text-slate-300 cursor-not-allowed" : "text-indigo-600 hover:underline cursor-pointer"}`}>
              {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
            </button>
          </div>

          <Link to="/login" className="mt-8 text-sm text-indigo-600 font-semibold hover:underline">← Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}