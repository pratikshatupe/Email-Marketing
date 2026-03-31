// src/pages/settings/Settings.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useLanguage } from '../admin/Languagecontext';

// ─── Main Settings Component ───────────────────────────────────────────────
const Settings = () => {
  const { user } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading,   setLoading]   = useState(false);
  const [saved,     setSaved]     = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    name:     '',
    email:    '',
    company:  '',
    phone:    '',
    bio:      '',
    timezone: 'Asia/Kolkata',
    language: lang,
  });

  const userRole = user?.role || 'VIEWER';

  const tabs = [
    { id: 'profile',       labelKey: 'tab_profile',       icon: '👤', roles: null },
    { id: 'security',      labelKey: 'tab_security',       icon: '🔐', roles: null },
    { id: 'notifications', labelKey: 'tab_notifications',  icon: '🔔', roles: null },
    { id: 'team',          labelKey: 'tab_team',           icon: '👥', roles: ['SUPER_ADMIN','BUSINESS_ADMIN'] },
    { id: 'email',         labelKey: 'tab_email',          icon: '✉️', roles: ['SUPER_ADMIN','BUSINESS_ADMIN'] },
    { id: 'integrations',  labelKey: 'tab_integrations',   icon: '🔗', roles: ['SUPER_ADMIN','BUSINESS_ADMIN'] },
    { id: 'billing',       labelKey: 'tab_billing',        icon: '💳', roles: null },
    { id: 'system',        labelKey: 'tab_system',         icon: '⚙️', roles: ['SUPER_ADMIN'] },
  ].filter(tab => !tab.roles || tab.roles.includes(userRole));

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name:    user.name    || user.email?.split('@')[0] || 'User',
        email:   user.email   || '',
        company: user.company || 'My Company',
        phone:   user.phone   || '',
        bio:     user.bio     || '',
        language: lang,
      }));
    }
  }, [user]);

  // Sync language dropdown with global lang
  useEffect(() => {
    setProfileData(prev => ({ ...prev, language: lang }));
  }, [lang]);

  const handleSaveProfile = async () => {
    setLoading(true);
    // Apply language change from profile prefs
    if (profileData.language !== lang) {
      setLang(profileData.language);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setLoading(false);
  };

  const roleDescKey = {
    SUPER_ADMIN:       'full_platform_access',
    BUSINESS_ADMIN:    'company_management',
    MARKETING_MANAGER: 'campaign_management',
    VIEWER:            'read_only_access',
  };

  const activeTabObj = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-full">
      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-xl sm:text-2xl font-black text-slate-800">{t('settings_title')}</h1>
        <p className="text-sm text-slate-400 mt-0.5">{t('settings_subtitle')}</p>
      </div>

      {/* Mobile Tab Picker */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileNavOpen(o => !o)}
          className="w-full flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <span>{activeTabObj?.icon}</span>
            <span>{t(activeTabObj?.labelKey || 'tab_profile')}</span>
          </div>
          <span className={`text-slate-400 transition-transform duration-200 ${mobileNavOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>
        {mobileNavOpen && (
          <div className="mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-10 relative">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileNavOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm border-b border-slate-50 last:border-b-0 transition-colors ${
                  activeTab === tab.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{t(tab.labelKey)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Sidebar — Desktop only */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 sticky top-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">{t('nav_label')}</p>
            <nav className="space-y-0.5">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <span className="text-base flex-shrink-0">{tab.icon}</span>
                  <span className="text-sm">{t(tab.labelKey)}</span>
                  {activeTab === tab.id && <div className="ml-auto w-1.5 h-5 bg-indigo-500 rounded-full" />}
                </button>
              ))}
            </nav>

            {/* Role Badge */}
            <div className="mt-4 mx-2 p-3 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl border border-indigo-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('your_role')}</p>
              <p className="text-sm font-black text-indigo-700">{userRole.replace('_', ' ')}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{t(roleDescKey[userRole] || 'read_only_access')}</p>
            </div>

            {/* Quick Language Switcher in sidebar */}
            <div className="mt-3 mx-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('language')}</p>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { code: 'en', label: 'EN' },
                  { code: 'mr', label: 'मर' },
                  { code: 'hi', label: 'हि' },
                  { code: 'gu', label: 'ગુ' },
                  { code: 'ta', label: 'த' },
                  { code: 'te', label: 'తె' },
                ].map(l => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setProfileData(p => ({ ...p, language: l.code })); }}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      lang === l.code
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-5">
          {activeTab === 'profile'       && <ProfileTab profileData={profileData} setProfileData={setProfileData} onSave={handleSaveProfile} loading={loading} saved={saved} setLang={setLang} />}
          {activeTab === 'security'      && <SecurityTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'team'          && <TeamTab />}
          {activeTab === 'email'         && <EmailServiceTab />}
          {activeTab === 'integrations'  && <IntegrationsTab />}
          {activeTab === 'billing'       && <BillingTab userRole={userRole} />}
          {activeTab === 'system'        && <SystemTab />}
        </div>
      </div>
    </div>
  );
};

// ─── Profile Tab ───────────────────────────────────────────────────────────
const ProfileTab = ({ profileData, setProfileData, onSave, loading, saved, setLang }) => {
  const { t } = useLanguage();
  const handleChange = (e) => setProfileData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'mr', label: 'मराठी' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'te', label: 'తెలుగు' },
  ];

  return (
    <div className="space-y-5">
      {/* Avatar Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl sm:text-3xl font-black text-white">
                {profileData.name?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center text-sm shadow-sm hover:border-indigo-300 transition-colors">
              📷
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-slate-800 truncate">{profileData.name || 'Your Name'}</h2>
            <p className="text-sm text-slate-400 truncate">{profileData.email}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-3 py-1 rounded-full border border-indigo-100">
                🏢 {profileData.company || 'Company'}
              </span>
              <span className="text-xs bg-slate-50 text-slate-500 font-semibold px-3 py-1 rounded-full border border-slate-100">
                🌏 {profileData.timezone}
              </span>
            </div>
          </div>
          <button
            onClick={onSave}
            disabled={loading}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-sm ${
              saved ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90'
            } disabled:opacity-60`}
          >
            {loading ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>{t('saving')}</span></>
            ) : saved ? (
              <><span>✓</span><span>{t('saved')}</span></>
            ) : (
              <><span>💾</span><span>{t('save_profile')}</span></>
            )}
          </button>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center text-xs">👤</span>
          {t('personal_info')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: t('full_name'),    name: 'name',    type: 'text',  placeholder: t('name_placeholder')    },
            { label: t('email_address'),name: 'email',   type: 'email', placeholder: t('email_placeholder')   },
            { label: t('company_name'), name: 'company', type: 'text',  placeholder: t('company_placeholder') },
            { label: t('phone_number'), name: 'phone',   type: 'tel',   placeholder: t('phone_placeholder')   },
          ].map(field => (
            <div key={field.name}>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                value={profileData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t('bio_about')}</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              placeholder={t('bio_placeholder')}
              rows={3}
              className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center text-xs">🌐</span>
          {t('preferences')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t('timezone')}</label>
            <select
              name="timezone"
              value={profileData.timezone}
              onChange={handleChange}
              className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400 transition-all"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
              <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t('language')}</label>
            <select
              name="language"
              value={profileData.language}
              onChange={(e) => {
                handleChange(e);
                setLang(e.target.value); // ← immediate language switch
              }}
              className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400 transition-all"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Language preview cards */}
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setProfileData(p => ({ ...p, language: l.code }));
              }}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${
                profileData.language === l.code
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Security Tab ──────────────────────────────────────────────────────────
const SecurityTab = () => {
  const { t } = useLanguage();
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [show,      setShow]      = useState({ current: false, new: false, confirm: false });
  const [pwdLoading, setPwdLoading] = useState(false);
  const [twoFA,      setTwoFA]      = useState(false);
  const [sessions] = useState([
    { device: 'Chrome on Windows',  location: 'Pune, Maharashtra',     time: 'Now (current)', current: true  },
    { device: 'Safari on iPhone',   location: 'Mumbai, Maharashtra',   time: '2 hours ago',   current: false },
    { device: 'Firefox on Mac',     location: 'Bengaluru, Karnataka',  time: '3 days ago',    current: false },
  ]);

  const handleChangePassword = async () => {
    if (!passwords.current || !passwords.new || passwords.new !== passwords.confirm) return;
    setPwdLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setPwdLoading(false);
    setPasswords({ current: '', new: '', confirm: '' });
    alert('✅ ' + t('change_password') + ' successful!');
  };

  const strength = passwords.new.length === 0 ? 0 :
    passwords.new.length < 6 ? 1 :
    passwords.new.length < 10 ? 2 :
    /[A-Z]/.test(passwords.new) && /[0-9]/.test(passwords.new) ? 4 : 3;

  const strengthLabels = ['', t('pwd_weak'), t('pwd_fair'), t('pwd_good'), t('pwd_strong')];
  const strengthColors = ['', '#ef4444', '#f59e0b', '#10b981', '#6366f1'];

  return (
    <div className="space-y-5">
      {/* Change Password */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center text-xs">🔑</span>
          {t('change_password')}
        </h3>
        <div className="space-y-4 max-w-md">
          {[
            { label: t('current_password'), key: 'current' },
            { label: t('new_password'),     key: 'new' },
            { label: t('confirm_password'), key: 'confirm' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">{f.label}</label>
              <div className="relative">
                <input
                  type={show[f.key] ? 'text' : 'password'}
                  value={passwords[f.key]}
                  onChange={e => setPasswords(p => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 rounded-xl text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
                  placeholder={t('password_placeholder')}
                />
                <button
                  onClick={() => setShow(s => ({ ...s, [f.key]: !s[f.key] }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm"
                >
                  {show[f.key] ? '🙈' : '👁️'}
                </button>
              </div>
              {f.key === 'new' && passwords.new && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ background: i <= strength ? strengthColors[strength] : '#e2e8f0' }} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold" style={{ color: strengthColors[strength] }}>
                    {strengthLabels[strength]}
                  </span>
                </div>
              )}
              {f.key === 'confirm' && passwords.confirm && passwords.new !== passwords.confirm && (
                <p className="text-xs text-red-500 mt-1">{t('passwords_no_match')}</p>
              )}
            </div>
          ))}
          <button
            onClick={handleChangePassword}
            disabled={pwdLoading || !passwords.current || !passwords.new || passwords.new !== passwords.confirm}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            {pwdLoading
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>{t('changing')}</span></>
              : t('change_password_btn')
            }
          </button>
        </div>
      </div>

      {/* 2FA */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center text-xs">🛡️</span>
              {t('two_factor')}
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-sm">{t('two_factor_desc')}</p>
          </div>
          <button
            onClick={() => setTwoFA(v => !v)}
            className="relative inline-flex items-center w-12 h-6 rounded-full transition-all duration-200 flex-shrink-0"
            style={{ background: twoFA ? '#6366f1' : '#e2e8f0' }}
          >
            <span className="inline-block w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
              style={{ transform: twoFA ? 'translateX(26px)' : 'translateX(3px)' }} />
          </button>
        </div>
        {twoFA && (
          <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-sm font-semibold text-emerald-700">{t('two_fa_enabled')}</p>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-xs">💻</span>
            {t('active_sessions')}
          </h3>
          <button className="text-xs text-red-500 font-semibold hover:underline">{t('revoke_all')}</button>
        </div>
        <div className="divide-y divide-slate-50">
          {sessions.map((s, i) => (
            <div key={i} className="flex items-center justify-between px-5 sm:px-6 py-4 gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${s.current ? 'bg-indigo-50' : 'bg-slate-50'}`}>
                  {s.device.includes('iPhone') ? '📱' : s.device.includes('Mac') ? '🖥️' : '💻'}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-slate-700 truncate">{s.device}</p>
                    {s.current && <span className="text-[9px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded-full font-bold flex-shrink-0">{t('current_session')}</span>}
                  </div>
                  <p className="text-xs text-slate-400">{s.location} · {s.time}</p>
                </div>
              </div>
              {!s.current && (
                <button className="text-xs text-red-400 border border-red-100 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-semibold flex-shrink-0">
                  {t('revoke')}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Notifications Tab ─────────────────────────────────────────────────────
const NotificationsTab = () => {
  const { t } = useLanguage();
  const [prefs, setPrefs] = useState({
    email_campaigns: true,  email_reports: true,   email_billing: false, email_team: true,
    sms_otp: true,          sms_alerts: false,
    inapp_campaigns: true,  inapp_team: true,      inapp_system: false,
    digest_frequency: 'daily',
  });

  const toggle = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  const groups = [
    {
      titleKey: 'email_notif_group', icon: '📧', color: 'bg-blue-50',
      items: [
        { key: 'email_campaigns', labelKey: 'notif_campaign_updates', descKey: 'notif_campaign_desc' },
        { key: 'email_reports',   labelKey: 'notif_weekly_reports',   descKey: 'notif_weekly_desc'   },
        { key: 'email_billing',   labelKey: 'notif_billing_alerts',   descKey: 'notif_billing_desc'  },
        { key: 'email_team',      labelKey: 'notif_team_activity',    descKey: 'notif_team_desc'     },
      ],
    },
    {
      titleKey: 'sms_notif_group', icon: '📱', color: 'bg-green-50',
      items: [
        { key: 'sms_otp',    labelKey: 'notif_otp',      descKey: 'notif_otp_desc'      },
        { key: 'sms_alerts', labelKey: 'notif_critical', descKey: 'notif_critical_desc' },
      ],
    },
    {
      titleKey: 'inapp_notif_group', icon: '🔔', color: 'bg-amber-50',
      items: [
        { key: 'inapp_campaigns', labelKey: 'notif_campaign_status', descKey: 'notif_campaign_status_desc' },
        { key: 'inapp_team',      labelKey: 'notif_team_updates',    descKey: 'notif_team_updates_desc'    },
        { key: 'inapp_system',    labelKey: 'notif_system_notices',  descKey: 'notif_system_desc'          },
      ],
    },
  ];

  const freqKeys = ['freq_real_time', 'freq_daily', 'freq_weekly', 'freq_never'];
  const freqVals = ['real-time', 'daily', 'weekly', 'never'];

  return (
    <div className="space-y-5">
      {groups.map(group => (
        <div key={group.titleKey} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className={`px-5 sm:px-6 py-4 border-b border-slate-50 flex items-center gap-2 ${group.color}`}>
            <span className="text-lg">{group.icon}</span>
            <h3 className="font-bold text-slate-800">{t(group.titleKey)}</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {group.items.map(item => (
              <div key={item.key} className="flex items-center justify-between px-5 sm:px-6 py-4 hover:bg-slate-50 transition-colors gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-700">{t(item.labelKey)}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t(item.descKey)}</p>
                </div>
                <button
                  onClick={() => toggle(item.key)}
                  className="relative inline-flex items-center w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0"
                  style={{ background: prefs[item.key] ? '#6366f1' : '#e2e8f0' }}
                >
                  <span className="inline-block w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
                    style={{ transform: prefs[item.key] ? 'translateX(22px)' : 'translateX(3px)' }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Digest frequency */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <h3 className="font-bold text-slate-800 mb-4">{t('digest_frequency')}</h3>
        <div className="flex flex-wrap gap-2">
          {freqKeys.map((key, i) => (
            <button
              key={key}
              onClick={() => setPrefs(p => ({ ...p, digest_frequency: freqVals[i] }))}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                prefs.digest_frequency === freqVals[i]
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {t(key)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Team Tab ──────────────────────────────────────────────────────────────
const TEAM_MEMBERS = [
  { id:1, name:'Priya Patil',    email:'priya@acme.com',  role:'MARKETING_MANAGER', status:'Active',   joined:'Feb 2026' },
  { id:2, name:'Amit Desai',     email:'amit@acme.com',   role:'MARKETING_MANAGER', status:'Active',   joined:'Mar 2026' },
  { id:3, name:'Sneha Kulkarni', email:'sneha@acme.com',  role:'VIEWER',            status:'Inactive', joined:'Jan 2026' },
  { id:4, name:'Rohan Joshi',    email:'rohan@acme.com',  role:'VIEWER',            status:'Active',   joined:'Mar 2026' },
];

const roleColors = {
  SUPER_ADMIN:       { bg:'#ede9fe', text:'#6d28d9', label:'Super Admin'       },
  BUSINESS_ADMIN:    { bg:'#d1fae5', text:'#065f46', label:'Business Admin'    },
  MARKETING_MANAGER: { bg:'#fef3c7', text:'#92400e', label:'Marketing Manager' },
  VIEWER:            { bg:'#f1f5f9', text:'#475569', label:'Viewer'            },
};

const TeamTab = () => {
  const { t } = useLanguage();
  const [members,    setMembers]    = useState(TEAM_MEMBERS);
  const [showInvite, setShowInvite] = useState(false);
  const [invite,     setInvite]     = useState({ email:'', role:'VIEWER' });
  const [search,     setSearch]     = useState('');

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleInvite = () => {
    if (!invite.email) return;
    setMembers(prev => [{
      id: Date.now(),
      name:   invite.email.split('@')[0],
      email:  invite.email,
      role:   invite.role,
      status: 'Pending',
      joined: 'Just now',
    }, ...prev]);
    setInvite({ email:'', role:'VIEWER' });
    setShowInvite(false);
  };

  const statusStyle = (s) =>
    s === 'Active'   ? { bg:'#d1fae5', text:'#065f46' } :
    s === 'Pending'  ? { bg:'#fef3c7', text:'#92400e' } :
                       { bg:'#fee2e2', text:'#991b1b' };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-800">{t('team_members')}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{members.length} {t('members_in_team')}</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder={t('search_members')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 sm:flex-none border border-slate-200 bg-slate-50 px-3 py-2 rounded-xl text-sm outline-none focus:border-indigo-400 transition-all w-full sm:w-44"
          />
          <button
            onClick={() => setShowInvite(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap flex-shrink-0"
          >
            {t('invite')}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { labelKey:'total',    value: members.length,                                        color:'#6366f1' },
          { labelKey:'active',   value: members.filter(m => m.status==='Active').length,        color:'#10b981' },
          { labelKey:'inactive', value: members.filter(m => m.status==='Inactive').length,      color:'#f59e0b' },
          { labelKey:'pending',  value: members.filter(m => m.status==='Pending').length,       color:'#6b7280' },
        ].map(s => (
          <div key={s.labelKey} className="bg-white rounded-xl border border-slate-100 p-4 text-center">
            <p className="text-2xl font-black" style={{ color:s.color }}>{s.value}</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">{t(s.labelKey)}</p>
          </div>
        ))}
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-50 bg-slate-50">
                {[t('member_col'), t('role_col'), t('status_col'), t('joined_col'), t('actions_col')].map(h => (
                  <th key={h} className="px-4 sm:px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => {
                const rc = roleColors[m.role] || roleColors.VIEWER;
                const sc = statusStyle(m.status);
                return (
                  <tr key={m.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-4 sm:px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0"
                          style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                          {m.name[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-700 text-sm truncate">{m.name}</p>
                          <p className="text-xs text-slate-400 truncate">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap" style={{ background:rc.bg, color:rc.text }}>{rc.label}</span>
                    </td>
                    <td className="px-4 sm:px-5 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap" style={{ background:sc.bg, color:sc.text }}>{m.status}</span>
                    </td>
                    <td className="px-4 sm:px-5 py-3 text-xs text-slate-400 whitespace-nowrap">{m.joined}</td>
                    <td className="px-4 sm:px-5 py-3">
                      <div className="flex gap-2">
                        <button className="text-xs px-3 py-1.5 rounded-lg font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors whitespace-nowrap">{t('edit_btn')}</button>
                        <button onClick={() => setMembers(prev => prev.filter(x => x.id !== m.id))}
                          className="text-xs px-3 py-1.5 rounded-lg font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors whitespace-nowrap">{t('remove_btn')}</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background:'rgba(15,14,42,0.6)', backdropFilter:'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-black text-slate-800">{t('invite_title')}</h3>
              <button onClick={() => setShowInvite(false)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t('invite_email')}</label>
                <input type="email" value={invite.email} onChange={e => setInvite(p => ({...p, email:e.target.value}))}
                  placeholder={t('invite_email_placeholder')}
                  className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t('invite_role')}</label>
                <select value={invite.role} onChange={e => setInvite(p => ({...p, role:e.target.value}))}
                  className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400 transition-all">
                  <option value="MARKETING_MANAGER">Marketing Manager</option>
                  <option value="VIEWER">Viewer</option>
                </select>
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={() => setShowInvite(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold">{t('cancel')}</button>
                <button onClick={handleInvite} className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold" style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                  {t('send_invite')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Email Service Tab ─────────────────────────────────────────────────────
const EmailServiceTab = () => {
  const { t } = useLanguage();
  const [provider,   setProvider]   = useState('sendgrid');
  const [config,     setConfig]     = useState({ api_key:'', from_email:'', from_name:'MailDoll', reply_to:'', daily_limit:'50000', hourly_limit:'5000' });
  const [testing,    setTesting]    = useState(false);
  const [testResult, setTestResult] = useState(null);

  const providers = [
    { id:'sendgrid',   name:'SendGrid',    icon:'📧' },
    { id:'amazon_ses', name:'Amazon SES',  icon:'🌩️' },
    { id:'mailgun',    name:'Mailgun',     icon:'🔫' },
    { id:'postmark',   name:'Postmark',    icon:'📮' },
    { id:'smtp',       name:'Custom SMTP', icon:'⚙️' },
  ];

  const handleTest = async () => {
    setTesting(true); setTestResult(null);
    await new Promise(r => setTimeout(r, 2000));
    setTesting(false);
    setTestResult({ ok:true, msg:t('test_success') });
  };

  const configFields = [
    { label:t('api_key'),     key:'api_key',     type:'password', placeholder:'SG.xxxx or AWS_KEY' },
    { label:t('from_email'),  key:'from_email',  type:'email',    placeholder:'no-reply@yourapp.com' },
    { label:t('from_name'),   key:'from_name',   type:'text',     placeholder:'MailDoll' },
    { label:t('reply_to'),    key:'reply_to',    type:'email',    placeholder:'support@yourapp.com' },
    { label:t('daily_limit'), key:'daily_limit', type:'number',   placeholder:'50000' },
    { label:t('hourly_limit'),key:'hourly_limit',type:'number',   placeholder:'5000' },
  ];

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center text-xs">✉️</span>
          {t('email_provider')}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {providers.map(p => (
            <button key={p.id} onClick={() => setProvider(p.id)}
              className={`flex items-center gap-2 p-3 sm:p-4 rounded-xl border-2 transition-all text-left ${
                provider===p.id ? 'border-indigo-400 bg-indigo-50' : 'border-slate-100 hover:border-slate-200 bg-white'
              }`}>
              <span className="text-xl sm:text-2xl">{p.icon}</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-700">{p.name}</span>
              {provider===p.id && <span className="ml-auto text-indigo-500 text-xs">✓</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <h3 className="font-bold text-slate-800 mb-4">{t('configuration')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {configFields.map(f => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">{f.label}</label>
              <input type={f.type} value={config[f.key]} placeholder={f.placeholder}
                onChange={e => setConfig(p => ({...p, [f.key]:e.target.value}))}
                className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400 focus:bg-white transition-all" />
            </div>
          ))}
        </div>
        {testResult && (
          <div className={`mt-4 p-3 rounded-xl text-sm font-semibold ${testResult.ok ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            {testResult.ok ? '✅' : '❌'} {testResult.msg}
          </div>
        )}
        <div className="flex flex-wrap gap-3 mt-5">
          <button onClick={handleTest} disabled={testing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-all disabled:opacity-50">
            {testing ? <><div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" /><span>{t('testing')}</span></> : t('test_email')}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-opacity shadow-sm">
            {t('save_config')}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Integrations Tab ──────────────────────────────────────────────────────
const IntegrationsTab = () => {
  const { t } = useLanguage();
  const [connected, setConnected] = useState({ shopify:false, salesforce:false, hubspot:true, webhook:false, slack:false, zapier:false });

  const integrations = [
    { id:'shopify',    name:'Shopify',    icon:'🛍️', desc:'Sync customers and orders from your Shopify store',      category:'E-commerce'   },
    { id:'salesforce', name:'Salesforce', icon:'☁️', desc:'Sync leads and contacts from Salesforce CRM',           category:'CRM'           },
    { id:'hubspot',    name:'HubSpot',    icon:'🔶', desc:'Two-way sync with HubSpot contacts and lists',          category:'CRM'           },
    { id:'webhook',    name:'Webhooks',   icon:'🔗', desc:'Send real-time events to any endpoint you configure',   category:'Developer'     },
    { id:'slack',      name:'Slack',      icon:'💬', desc:'Get campaign notifications directly in Slack channels', category:'Communication' },
    { id:'zapier',     name:'Zapier',     icon:'⚡', desc:'Connect with 5,000+ apps through Zapier automation',   category:'Automation'    },
  ];

  const categories = [...new Set(integrations.map(i => i.category))];
  const activeCount = Object.values(connected).filter(Boolean).length;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-sm">🔗</div>
        <div>
          <p className="text-sm font-bold text-slate-700">{activeCount} {t('integrations_active')}</p>
          <p className="text-xs text-slate-400">{t('integrations_subtitle')}</p>
        </div>
      </div>

      {categories.map(cat => (
        <div key={cat}>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{cat}</p>
          <div className="space-y-3">
            {integrations.filter(i => i.category===cat).map(integration => (
              <div key={integration.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl sm:text-2xl border border-slate-100 flex-shrink-0">
                    {integration.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-slate-800 text-sm">{integration.name}</p>
                      {connected[integration.id] && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded-full font-bold">{t('connected_badge')}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{integration.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setConnected(prev => ({...prev, [integration.id]:!prev[integration.id]}))}
                  className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all ${
                    connected[integration.id]
                      ? 'border-red-200 text-red-500 bg-red-50 hover:bg-red-100'
                      : 'border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                  }`}
                >
                  {connected[integration.id] ? t('disconnect') : t('connect')}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Billing Tab ───────────────────────────────────────────────────────────
const BillingTab = ({ userRole }) => {
  const { t } = useLanguage();
  const [currentPlan] = useState('growth');

  const plans = [
    { id:'starter',   name:'Starter',    price:'₹999',   period:'/mo', emails:'10,000 emails/mo',   contacts:'1,000 contacts',   users:'2 users',       color:'#10b981' },
    { id:'growth',    name:'Growth',     price:'₹2,999', period:'/mo', emails:'1,00,000 emails/mo',  contacts:'10,000 contacts',  users:'10 users',      color:'#6366f1', popular:true },
    { id:'business',  name:'Business',   price:'₹7,999', period:'/mo', emails:'Unlimited emails',    contacts:'Unlimited',        users:'Unlimited',     color:'#8b5cf6' },
    { id:'enterprise',name:'Enterprise', price:'Custom', period:'',    emails:'Custom volume',       contacts:'Custom',           users:'Custom',        color:'#f59e0b' },
  ];

  const invoices = [
    { date:'Mar 1, 2026', amount:'₹2,999', status:'Paid', id:'INV-2026-03' },
    { date:'Feb 1, 2026', amount:'₹2,999', status:'Paid', id:'INV-2026-02' },
    { date:'Jan 1, 2026', amount:'₹2,999', status:'Paid', id:'INV-2026-01' },
    { date:'Dec 1, 2025', amount:'₹999',   status:'Paid', id:'INV-2025-12' },
  ];

  const usageItems = [
    { labelKey:'emails_sent',       used:64200, total:100000, color:'#6366f1' },
    { labelKey:'contacts',          used:7430,  total:10000,  color:'#10b981' },
    { labelKey:'team_members_usage',used:8,     total:10,     color:'#f59e0b' },
  ];

  return (
    <div className="space-y-5">
      {/* Current Plan Banner */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 sm:p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold opacity-70 mb-1">{t('current_plan')}</p>
            <h3 className="text-2xl sm:text-3xl font-black">Growth</h3>
            <p className="text-sm opacity-70 mt-1">{t('renews_on')}</p>
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">💳</div>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-5">
          {['1,00,000 emails/mo', '10,000 contacts', '10 users'].map(f => (
            <span key={f} className="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">✓ {f}</span>
          ))}
        </div>
      </div>

      {/* Usage */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <h3 className="font-bold text-slate-800 mb-4">{t('usage_this_month')}</h3>
        <div className="space-y-4">
          {usageItems.map(u => (
            <div key={u.labelKey}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold text-slate-700">{t(u.labelKey)}</span>
                <span className="text-xs text-slate-400">{u.used.toLocaleString()} / {u.total.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width:`${(u.used/u.total)*100}%`, background:u.color }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">{Math.round((u.used/u.total)*100)}% {t('used')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <h3 className="font-bold text-slate-800 mb-4">{t('available_plans')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {plans.map(plan => (
            <div key={plan.id} className={`relative p-4 sm:p-5 rounded-xl border-2 transition-all ${
              currentPlan===plan.id ? 'border-indigo-400 bg-indigo-50' : 'border-slate-100 hover:border-slate-200'
            }`}>
              {plan.popular && (
                <span className="absolute -top-2.5 left-4 text-[10px] bg-indigo-500 text-white px-2.5 py-0.5 rounded-full font-bold">{t('most_popular')}</span>
              )}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-black text-slate-800">{plan.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{plan.emails}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg sm:text-xl font-black" style={{ color:plan.color }}>{plan.price}</span>
                  <span className="text-xs text-slate-400">{plan.period}</span>
                </div>
              </div>
              <div className="space-y-1.5 mb-4">
                {[plan.emails, plan.contacts, plan.users].map(f => (
                  <p key={f} className="text-xs text-slate-600 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] flex-shrink-0">✓</span>
                    {f}
                  </p>
                ))}
              </div>
              <button disabled={currentPlan===plan.id}
                className={`w-full py-2 rounded-lg text-sm font-bold transition-all ${
                  currentPlan===plan.id ? 'bg-indigo-100 text-indigo-600 cursor-default' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}>
                {currentPlan===plan.id ? t('current_plan_btn') : plan.price==='Custom' ? t('contact_sales') : t('upgrade')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-slate-50">
          <h3 className="font-bold text-slate-800">{t('invoice_history')}</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {invoices.map((inv, i) => (
            <div key={i} className="flex items-center justify-between px-5 sm:px-6 py-3.5 hover:bg-slate-50 transition-colors gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-700">{inv.id}</p>
                <p className="text-xs text-slate-400">{inv.date}</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="font-bold text-slate-800 text-sm">{inv.amount}</span>
                <span className="text-xs bg-emerald-100 text-emerald-600 px-2.5 py-1 rounded-full font-semibold">{inv.status}</span>
                <button className="text-xs text-indigo-500 hover:underline font-semibold">{t('pdf')}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── System Settings Tab ───────────────────────────────────────────────────
const SystemTab = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState([
    { key:'maintenance_mode',    label:'Maintenance Mode',    desc:'Block all user logins temporarily',              value:false,        type:'toggle' },
    { key:'registration_open',   label:'Open Registration',   desc:'Allow new business signups',                    value:true,         type:'toggle' },
    { key:'email_verify_req',    label:'Email Verification',  desc:'Require verified email before login',            value:true,         type:'toggle' },
    { key:'rate_limiting',       label:'API Rate Limiting',   desc:'Limit API calls per user per hour',              value:true,         type:'toggle' },
    { key:'max_contacts',        label:'Max Contacts (Free)', desc:'Per business on free tier',                      value:'500',        type:'input'  },
    { key:'default_daily_limit', label:'Default Email Limit', desc:'Default daily send limit for new businesses',   value:'1000',       type:'input'  },
    { key:'platform_name',       label:'Platform Name',       desc:'Shown in emails and UI',                        value:'MailDoll',   type:'input'  },
    { key:'support_email',       label:'Support Email',       desc:'Shown on error pages and invoices',             value:'support@maildoll.com', type:'input' },
  ]);
  const [saved, setSaved] = useState(false);

  const toggle = (key) => setSettings(prev => prev.map(s => s.key===key ? {...s, value:!s.value} : s));
  const update = (key, val) => setSettings(prev => prev.map(s => s.key===key ? {...s, value:val} : s));

  const handleSave = async () => {
    await new Promise(r => setTimeout(r, 1000));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleSettings = settings.filter(s => s.type==='toggle');
  const inputSettings  = settings.filter(s => s.type==='input');

  return (
    <div className="space-y-5">
      {/* Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 sm:px-5 py-4 flex items-start sm:items-center gap-3">
        <span className="text-xl flex-shrink-0">⚠️</span>
        <div>
          <p className="text-sm font-bold text-amber-800">{t('super_admin_only')}</p>
          <p className="text-xs text-amber-600">{t('system_warning')}</p>
        </div>
      </div>

      {/* Toggle Settings */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-slate-50 bg-slate-50">
          <h3 className="font-bold text-slate-800">{t('platform_controls')}</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {toggleSettings.map(s => (
            <div key={s.key} className="flex items-center justify-between px-5 sm:px-6 py-4 hover:bg-slate-50 transition-colors gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-700">{s.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.desc}</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <span className={`text-xs font-bold hidden sm:block ${s.value ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {s.value ? t('on') : t('off')}
                </span>
                <button onClick={() => toggle(s.key)}
                  className="relative inline-flex items-center w-11 h-6 rounded-full transition-all duration-200"
                  style={{ background:s.value ? '#6366f1' : '#e2e8f0' }}>
                  <span className="inline-block w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
                    style={{ transform:s.value ? 'translateX(22px)' : 'translateX(3px)' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Settings */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <h3 className="font-bold text-slate-800 mb-4">{t('platform_config')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {inputSettings.map(s => (
            <div key={s.key}>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">{s.label}</label>
              <input type="text" value={s.value} onChange={e => update(s.key, e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-400 focus:bg-white transition-all" />
              <p className="text-[10px] text-slate-400 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
        <button onClick={handleSave}
          className={`mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-sm ${
            saved ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90'
          }`}>
          {saved ? '✓ ' + t('saved') : t('save_system')}
        </button>
      </div>
    </div>
  );
};

export default Settings;