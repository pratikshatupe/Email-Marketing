// src/admin/AdminProfile.jsx
import React, { useState } from "react";
import { Camera, Shield, Calendar, Edit3, Check } from "lucide-react";
import { useLanguage } from "../admin/Languagecontext";

export default function AdminProfile() {
  const { t }             = useLanguage();
  const [editing, setEdit] = useState(false);
  const [name, setName]    = useState("Admin");
  const [email, setEmail]  = useState("admin@gmail.com");

  const activities = [
    { actKey: "logged_in",        timeKey: "just_now",      color: "bg-emerald-500" },
    { actKey: "sent_emails_act",  time:    "15 Mar, 2026",  color: "bg-indigo-500"  },
    { actKey: "created_campaign", time:    "13 Mar, 2026",  color: "bg-purple-500"  },
    { actKey: "updated_settings", time:    "10 Mar, 2026",  color: "bg-amber-500"   },
  ];

  return (
    <div className="p-4 sm:p-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden mb-4">
        <div className="h-24 sm:h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        <div className="px-4 sm:px-6 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 -mt-10 sm:-mt-12">
            <div className="relative self-start">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold border-4 border-white shadow-lg">
                A
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center border-2 border-white">
                <Camera size={11} className="text-white" />
              </button>
            </div>
            <button
              onClick={() => setEdit(!editing)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all self-start sm:self-auto cursor-pointer
                ${editing ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {editing ? <><Check size={14} /> {t("save")}</> : <><Edit3 size={14} /> {t("edit_profile")}</>}
            </button>
          </div>
          <div className="mt-3">
            {editing ? (
              <input value={name} onChange={e => setName(e.target.value)}
                className="text-lg font-bold text-slate-800 border-b-2 border-indigo-400 outline-none bg-transparent w-full max-w-xs" />
            ) : (
              <h1 className="text-lg sm:text-xl font-bold text-slate-800">{name}</h1>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="flex items-center gap-1 text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-semibold">
                <Shield size={10} /> {t("super_admin")}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar size={10} /> {t("joined")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info + Activity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-5">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t("account_info")}</h2>
          <div className="space-y-4">
            {[
              { labelKey: "full_name", value: name,          icon: "👤", editable: true,  setter: setName  },
              { labelKey: "email_address", value: email,     icon: "✉️", editable: true,  setter: setEmail },
              { labelKey: "role_lbl",  value: t("super_admin"), icon: "🔐", editable: false },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">{t(f.labelKey)}</label>
                {editing && f.editable ? (
                  <input value={f.value} onChange={e => f.setter(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-400 bg-slate-50" />
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm">{f.icon}</span>
                    <span className="text-sm text-slate-700 font-medium">{f.value}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-5">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t("activity")}</h2>
          <div className="space-y-3">
            {activities.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.color}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-700 font-medium truncate">{t(a.actKey)}</div>
                </div>
                <div className="text-[11px] text-slate-400 flex-shrink-0">
                  {a.timeKey ? t(a.timeKey) : a.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}