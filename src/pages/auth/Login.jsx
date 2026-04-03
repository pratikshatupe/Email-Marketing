import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const USER_ROLE_MAP = {
  "superadmin@test.com": "SUPER_ADMIN",
  "admin@test.com": "BUSINESS_ADMIN",
  "manager@test.com": "MARKETING_MANAGER",
  "viewer@test.com": "VIEWER",
};

const DEMO_PASSWORD = "123456";

const inputCls =
  "w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-400 transition-all placeholder-slate-400";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const urlMode = new URLSearchParams(location.search).get("mode");

  const [mode, setMode] = useState(urlMode === "forgot" ? "forgot" : "login");

  useEffect(() => {
    if (urlMode === "forgot") setMode("forgot");
  }, [urlMode]);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password");
      return;
    }
    if (form.password !== DEMO_PASSWORD) {
      setError(" wrong Password .");
      return;
    }
    const role = USER_ROLE_MAP[form.email.toLowerCase().trim()];
    if (!role) {
      setError("Email is not register.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ email: form.email, role }));
      login(form.email, role);
      navigate("/admin");
      setLoading(false);
    }, 800);
  }

  const [fpEmail, setFpEmail] = useState("");
  const [fpError, setFpError] = useState("");
  const [fpLoading, setFpLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetError, setResetError] = useState("");

  function handleSendOtp(e) {
    e.preventDefault();
    setFpError("");

    const emailLower = fpEmail.toLowerCase().trim();
    if (!emailLower) { setFpError("Email address ."); return; }
    if (!/\S+@\S+\.\S+/.test(emailLower)) { setFpError("Valid email address ."); return; }
    if (!USER_ROLE_MAP[emailLower]) { setFpError("Email registered ."); return; }

    setFpLoading(true);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);

    setTimeout(() => {
      setFpLoading(false);
      setMode("otp");
      alert(`[DEMO] तुमचा OTP: ${code}\n\nReal app मध्ये हे email वर येईल.`);
    }, 900);
  }

  function handleOtpChange(index, value) {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  }

  function handleVerifyOtp(e) {
    e.preventDefault();
    setOtpError("");
    const entered = otp.join("");
    if (entered.length < 6) { setOtpError("6-digit OTP ."); return; }
    if (entered !== generatedOtp) { setOtpError("OTP ."); return; }
    setMode("reset");
  }

  function handleResendOtp() {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    alert(`[DEMO] new  OTP: ${code}`);
  }

  function handleResetPassword(e) {
    e.preventDefault();
    setResetError("");
    if (!newPassword) { setResetError("New password ."); return; }
    if (newPassword.length < 6) { setResetError("Password  6 characters ."); return; }
    if (newPassword !== confirmPassword) { setResetError("Passwords ."); return; }

    setFpLoading(true);
    setTimeout(() => {
      setFpLoading(false);
      setMode("success");
    }, 800);
  }

  function getStrength(pw) {
    if (!pw) return { level: 0, label: "", color: "" };
    if (pw.length < 4) return { level: 1, label: " ⚠️", color: "bg-red-400" };
    if (pw.length < 7) return { level: 2, label: "🔶", color: "bg-yellow-400" };
    if (pw.length < 10) return { level: 3, label: "🔵", color: "bg-blue-400" };
    return { level: 4, label: " ✅", color: "bg-green-400" };
  }

  function goBackToLogin() {
    setMode("login");
    setFpEmail(""); setFpError(""); setFpLoading(false); setGeneratedOtp("");
    setOtp(["", "", "", "", "", ""]); setOtpError("");
    setNewPassword(""); setConfirmPassword(""); setResetError("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 bg-indigo-300" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-20 bg-purple-200" />
      </div>

      <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md mx-4">

        {mode === "login" && (
          <>
            <div className="text-center mb-7">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white text-2xl mb-3 shadow-lg">
                ✉️
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">Admin Login</h2>
              <p className="text-xs text-slate-400">Role-based Access System</p>
            </div>

            <div className="mb-5 p-3 rounded-xl text-[11px] bg-indigo-50 border border-indigo-100 text-indigo-600 space-y-1">
              <div className="font-bold mb-1">Demo (password: 123456)</div>
              {Object.entries(USER_ROLE_MAP).map(([email, role]) => (
                <div key={email} className="flex justify-between">
                  <span>{email}</span>
                  <span className="opacity-70 font-medium">{role}</span>
                </div>
              ))}
            </div>

            {error && (
              <div className="mb-4 text-red-500 text-xs bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email</label>
                <input type="email" name="email" placeholder="admin@test.com"
                  value={form.email} onChange={handleChange} className={inputCls} required />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-500">Password</label>
                  {/* ✅ Forgot Password trigger */}
                  <button type="button" onClick={() => setMode("forgot")}
                    className="text-xs text-indigo-500 hover:text-indigo-700 font-semibold hover:underline transition-colors">
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password" placeholder="123456"
                    value={form.password} onChange={handleChange}
                    className={inputCls} required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-sm text-white transition-all
                  ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg cursor-pointer"}`}>
                {loading ? "Checking..." : "Login →"}
              </button>
            </form>

            <p className="text-sm mt-5 text-center text-slate-400">
              no Account {" "}
              <Link to="/register" className="text-indigo-500 font-semibold hover:underline">Register</Link>
            </p>
          </>
        )}


        {mode === "forgot" && (
          <>
            <div className="text-center mb-7">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 text-2xl mb-3 shadow">
                🔑
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">Forgot Password?</h2>
              <p className="text-xs text-slate-400">Registered email — OTP </p>
            </div>

            {fpError && (
              <div className="mb-4 text-red-500 text-xs bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                ❌ {fpError}
              </div>
            )}

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email Address</label>
                <input type="email" placeholder="admin@test.com"
                  value={fpEmail} onChange={e => setFpEmail(e.target.value)}
                  className={inputCls} required />
              </div>

              <button type="submit" disabled={fpLoading}
                className={`w-full py-3 rounded-xl font-bold text-sm text-white transition-all
                  ${fpLoading ? "bg-amber-300 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600 shadow-lg cursor-pointer"}`}>
                {fpLoading ? "OTP send ..." : "Send OTP →"}
              </button>
            </form>

            <button onClick={goBackToLogin}
              className="w-full mt-4 text-xs text-slate-400 hover:text-indigo-500 transition-colors font-medium text-center block">
              ← Login
            </button>
          </>
        )}


        {mode === "otp" && (
          <>
            <div className="text-center mb-7">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-600 text-2xl mb-3 shadow">
                📱
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">OTP Verify </h2>
              <p className="text-xs text-slate-400">
                <span className="font-semibold text-slate-600">{fpEmail}</span> otp send
              </p>
            </div>

            {otpError && (
              <div className="mb-4 text-red-500 text-xs bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                ❌ {otpError}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {/* 6 OTP boxes */}
              <div className="flex justify-center gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    className="w-11 h-12 text-center text-lg font-bold border-2 border-slate-200 bg-slate-50 rounded-xl outline-none focus:border-indigo-500 transition-all"
                  />
                ))}
              </div>

              <button type="submit"
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg cursor-pointer transition-all">
                Verify OTP →
              </button>
            </form>

            <div className="mt-4 text-center">
              <button onClick={handleResendOtp}
                className="text-xs text-indigo-500 hover:underline font-semibold">
                OTP  Resend
              </button>
            </div>

            <button onClick={() => setMode("forgot")}
              className="w-full mt-3 text-xs text-slate-400 hover:text-indigo-500 transition-colors font-medium text-center block">
              ← return
            </button>
          </>
        )}


        {mode === "reset" && (
          <>
            <div className="text-center mb-7">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 text-green-600 text-2xl mb-3 shadow">
                🔒
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">New Password</h2>
              <p className="text-xs text-slate-400"> 6 characters </p>
            </div>

            {resetError && (
              <div className="mb-4 text-red-500 text-xs bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                ❌ {resetError}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="new  password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className={inputCls} required
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    {showNew ? "🙈" : "👁️"}
                  </button>
                </div>

                {newPassword && (() => {
                  const s = getStrength(newPassword);
                  return (
                    <div className="mt-2 space-y-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= s.level ? s.color : "bg-slate-200"
                            }`} />
                        ))}
                      </div>
                      <p className="text-xs text-slate-400">{s.label}</p>
                    </div>
                  );
                })()}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="return add password "
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className={`${inputCls} ${confirmPassword && confirmPassword !== newPassword ? "border-red-300" : confirmPassword ? "border-green-300" : ""}`}
                    required
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    {showConfirm ? "🙈" : "👁️"}
                  </button>
                </div>
                {confirmPassword && confirmPassword !== newPassword && (
                  <p className="mt-1 text-xs text-red-400">Passwords is not same </p>
                )}
                {confirmPassword && confirmPassword === newPassword && (
                  <p className="mt-1 text-xs text-green-500">✓ Passwords is same </p>
                )}
              </div>

              <button type="submit" disabled={fpLoading}
                className={`w-full py-3 rounded-xl font-bold text-sm text-white transition-all
                  ${fpLoading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 shadow-lg cursor-pointer"}`}>
                {fpLoading ? "Saving..." : "Password Reset  ✓"}
              </button>
            </form>
          </>
        )}


        {mode === "success" && (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-5 relative">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <div className="absolute inset-0 rounded-full border-4 border-green-300 animate-ping opacity-40" />
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-2">Password Reset  🎉</h2>
            <p className="text-sm text-slate-400 mb-2">
              <span className="font-semibold text-slate-600">{fpEmail}</span> password set .
            </p>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 text-xs text-indigo-600 mb-6 text-left">
              💡 <strong>Demo Note:</strong> Password change save <br />
              Login <strong>123456</strong>
            </div>

            <button onClick={goBackToLogin}
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition-all cursor-pointer">
              Login Page
            </button>
          </div>
        )}

      </div>
    </div>
  );
}