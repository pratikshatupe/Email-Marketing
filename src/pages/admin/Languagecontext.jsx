// src/context/LanguageContext.jsx
import { createContext, useContext, useState } from "react";

const T = {
  en: {
    group_main: "Main", group_management: "Management", group_finance: "Finance",
    group_config: "Configuration", group_analytics: "Analytics", group_system: "System",
    dashboard: "Dashboard", user_management: "User Management", campaigns: "Campaigns",
    subscription_plans: "Subscription Plans", billing_payments: "Billing & Payments",
    email_config: "Email Service Config", global_analytics: "Global Analytics",
    system_settings: "System Settings", audit_logs: "Audit Logs",
    profile: "My Profile", settings: "Settings", logout: "Logout",
    welcome_back: "Welcome back", search: "Search...",
    dashboard_overview: "Dashboard Overview", welcome_msg: "Welcome back, Admin 👋",
    total_users: "Total Users", total_contacts: "Total Contacts",
    total_campaigns: "Total Campaigns", emails_sent_today: "Emails Sent Today",
    email_analytics: "Email Analytics", last_5_months: "Last 5 months",
    campaign_report: "Campaign Report", last_campaign_stats: "Last campaign stats",
    sent_this_month: "Sent This Month", bounced: "Bounced",
    subscribers: "Subscribers", sms_sent: "SMS Sent",
    recent_campaigns: "Recent Campaigns", view_all: "View All →",
    campaign_col: "Campaign", status: "Status", open_rate: "Open Rate", click_rate: "Click Rate",
    manage_prefs: "Manage your account preferences",
    account: "Account", notifications_lbl: "Notifications", preferences: "Preferences",
    email_notif: "Email Notifications", email_notif_desc: "Campaign reports via email",
    sms_notif: "SMS Notifications", sms_notif_desc: "Alerts via SMS",
    browser_notif: "Browser Notifications", browser_notif_desc: "In-app push notifications",
    language: "Language", timezone: "Timezone",
    dark_mode: "Dark Mode", dark_mode_desc: "Switch to dark theme",
    save_changes: "Save Changes", saved_success: "✓ Saved Successfully!",
    email_address: "Email Address", current_password: "Current Password", new_password: "New Password",
    enter_email: "Enter email", enter_curr_pass: "Enter current password", enter_new_pass: "Enter new password",
    my_profile: "My Profile", joined: "Joined March 2026", full_name: "Full Name",
    role_lbl: "Role", super_admin: "Super Admin", account_info: "Account Info",
    activity: "Activity", edit_profile: "Edit Profile", save: "Save",
    logged_in: "Logged in", just_now: "Just now",
    sent_emails_act: "Sent 24 emails", created_campaign: "Created campaign", updated_settings: "Updated settings",
    coming_soon: "This page is coming soon.",
  },
  mr: {
    group_main: "मुख्य", group_management: "व्यवस्थापन", group_finance: "वित्त",
    group_config: "कॉन्फिगरेशन", group_analytics: "विश्लेषण", group_system: "सिस्टम",
    dashboard: "डॅशबोर्ड", user_management: "यूजर व्यवस्थापन", campaigns: "मोहिमा",
    subscription_plans: "सदस्यता योजना", billing_payments: "बिलिंग आणि पेमेंट",
    email_config: "ईमेल सेवा सेटअप", global_analytics: "ग्लोबल विश्लेषण",
    system_settings: "सिस्टम सेटिंग्ज", audit_logs: "ऑडिट नोंदी",
    profile: "माझी प्रोफाइल", settings: "सेटिंग्ज", logout: "लॉगआउट",
    welcome_back: "परत स्वागत आहे", search: "शोधा...",
    dashboard_overview: "डॅशबोर्ड आढावा", welcome_msg: "परत स्वागत आहे, Admin 👋",
    total_users: "एकूण यूजर", total_contacts: "एकूण संपर्क",
    total_campaigns: "एकूण मोहिमा", emails_sent_today: "आज पाठवलेले ईमेल",
    email_analytics: "ईमेल विश्लेषण", last_5_months: "मागील ५ महिने",
    campaign_report: "मोहीम अहवाल", last_campaign_stats: "मागील मोहीम आकडेवारी",
    sent_this_month: "या महिन्यात पाठवले", bounced: "परत आले",
    subscribers: "सदस्य", sms_sent: "SMS पाठवले",
    recent_campaigns: "अलीकडील मोहिमा", view_all: "सर्व पहा →",
    campaign_col: "मोहीम", status: "स्थिती", open_rate: "उघडण्याचे प्रमाण", click_rate: "क्लिक प्रमाण",
    manage_prefs: "तुमच्या खात्याची प्राधान्ये व्यवस्थापित करा",
    account: "खाते", notifications_lbl: "सूचना", preferences: "प्राधान्ये",
    email_notif: "ईमेल सूचना", email_notif_desc: "ईमेलद्वारे मोहीम अहवाल",
    sms_notif: "SMS सूचना", sms_notif_desc: "SMS द्वारे अलर्ट",
    browser_notif: "ब्राउझर सूचना", browser_notif_desc: "अ‍ॅपमधील पुश सूचना",
    language: "भाषा", timezone: "टाइमझोन",
    dark_mode: "डार्क मोड", dark_mode_desc: "डार्क थीमवर बदला",
    save_changes: "बदल जतन करा", saved_success: "✓ यशस्वीरित्या जतन केले!",
    email_address: "ईमेल पत्ता", current_password: "सध्याचा पासवर्ड", new_password: "नवीन पासवर्ड",
    enter_email: "ईमेल टाका", enter_curr_pass: "सध्याचा पासवर्ड टाका", enter_new_pass: "नवीन पासवर्ड टाका",
    my_profile: "माझी प्रोफाइल", joined: "मार्च २०२६ रोजी सामील झाले", full_name: "पूर्ण नाव",
    role_lbl: "भूमिका", super_admin: "सुपर अ‍ॅडमिन", account_info: "खाते माहिती",
    activity: "क्रियाकलाप", edit_profile: "प्रोफाइल संपादित करा", save: "जतन करा",
    logged_in: "लॉगिन केले", just_now: "आत्ताच",
    sent_emails_act: "२४ ईमेल पाठवले", created_campaign: "मोहीम तयार केली", updated_settings: "सेटिंग्ज अपडेट केल्या",
    coming_soon: "हे पेज लवकरच येईल.",
  },
};

const LC = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = (key) => T[lang]?.[key] ?? T.en?.[key] ?? key;
  return <LC.Provider value={{ lang, setLang, t }}>{children}</LC.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LC);
  if (!ctx) throw new Error("useLanguage must be inside <LanguageProvider>");
  return ctx;
}