// src/admin/AdminSetting.jsx
import React, { useState } from "react";
import { Save, Eye, EyeOff, Bell, Moon, Globe, Shield } from "lucide-react";
import { useLanguage } from "../admin/Languagecontext";

export default function AdminSetting() {
  const { t, lang, setLang } = useLanguage(); // ← lang बदलला की सगळं app बदलतं
  const [showPass, setShowPass]       = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [saved, setSaved]             = useState(false);
  const [darkMode, setDarkMode]       = useState(false);
  const [notifs, setNotifs]           = useState({ email: true, sms: false, browser: true });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const inp = "w-full border border-slate-200 bg-slate-50 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-400 transition-all";

  return (
    <div className="p-4 sm:p-6 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-4">

        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">{t("settings")}</h1>
          <p className="text-xs text-slate-400 mt-0.5">{t("manage_prefs")}</p>
        </div>

        {/* Account */}
        <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-5">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Shield size={12} /> {t("account")}
          </h2>
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t("email_address")}</label>
              <input type="email" className={inp} defaultValue="admin@gmail.com" placeholder={t("enter_email")} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t("current_password")}</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} className={inp} placeholder={t("enter_curr_pass")} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t("new_password")}</label>
              <div className="relative">
                <input type={showNew ? "text" : "password"} className={inp} placeholder={t("enter_new_pass")} />
                <button type="button" onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-5">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Bell size={12} /> {t("notifications_lbl")}
          </h2>
          <div className="space-y-3">
            {[
              { key: "email",   labelKey: "email_notif",   descKey: "email_notif_desc"   },
              { key: "sms",     labelKey: "sms_notif",     descKey: "sms_notif_desc"     },
              { key: "browser", labelKey: "browser_notif", descKey: "browser_notif_desc" },
            ].map(n => (
              <div key={n.key} className="flex items-center justify-between py-1">
                <div className="min-w-0 mr-3">
                  <div className="text-sm font-semibold text-slate-700">{t(n.labelKey)}</div>
                  <div className="text-[11px] text-slate-400">{t(n.descKey)}</div>
                </div>
                <button
                  onClick={() => setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                  className={`relative w-10 h-5 rounded-full transition-all duration-200 flex-shrink-0 border-0 cursor-pointer
                    ${notifs[n.key] ? "bg-indigo-500" : "bg-slate-200"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200
                    ${notifs[n.key] ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences — Language बदलल्यावर सगळं app translate होतं */}
        <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-5">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Globe size={12} /> {t("preferences")}
          </h2>
          <div className="space-y-3.5">

            {/* 🌐 LANGUAGE SELECT — हे बदललं की useLanguage() hook द्वारे सगळं app translate होतं */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t("language")}</label>
              <div className="flex gap-2">
                {[
                  { code: "en", label: "🇬🇧 English"  },
                  { code: "mr", label: "🇮🇳 मराठी"    },
                ].map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold border transition-all cursor-pointer
                      ${lang === l.code
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"
                      }`}>
                    {l.label}
                  </button>
                ))}
              </div>
              {lang === "mr" && (
                <p className="text-[11px] text-indigo-500 mt-1.5 flex items-center gap-1">
                  ✓ संपूर्ण app मराठीत बदलला आहे
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t("timezone")}</label>
              <select className={`${inp} cursor-pointer`}>
                <option>Asia/Kolkata (IST)</option>
                <option>UTC</option>
                <option>America/New_York</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-1">
              <div>
                <div className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <Moon size={13} /> {t("dark_mode")}
                </div>
                <div className="text-[11px] text-slate-400">{t("dark_mode_desc")}</div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-10 h-5 rounded-full transition-all duration-200 flex-shrink-0 border-0 cursor-pointer
                  ${darkMode ? "bg-indigo-500" : "bg-slate-200"}`}>
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200
                  ${darkMode ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Save */}
        <button onClick={handleSave}
          className={`w-full py-3 rounded-2xl font-bold text-sm text-white transition-all cursor-pointer flex items-center justify-center gap-2
            ${saved ? "bg-emerald-500" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20"}`}>
          <Save size={14} />
          {saved ? t("saved_success") : t("save_changes")}
        </button>

      </div>
    </div>
  );
}