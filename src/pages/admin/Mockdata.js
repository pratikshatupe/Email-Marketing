// admin/mockData.js

export const MOCK_STATS = {
  SUPER_ADMIN: [
    { label: "Total Companies",   value: "142",   change: "+12",   up: true,  icon: "🏢", color: "#6366f1" },
    { label: "Total Users",       value: "3,847", change: "+234",  up: true,  icon: "👥", color: "#10b981" },
    { label: "Emails Sent Today", value: "1.2M",  change: "+18%",  up: true,  icon: "📧", color: "#06b6d4" },
    { label: "Active Plans",      value: "89",    change: "-3",    up: false, icon: "💳", color: "#f59e0b" },
    { label: "Monthly Revenue",   value: "₹4.2L", change: "+22%",  up: true,  icon: "💰", color: "#8b5cf6" },
    { label: "System Uptime",     value: "99.9%", change: "stable",up: true,  icon: "🔧", color: "#ec4899" },
  ],
  BUSINESS_ADMIN: [
    { label: "Campaigns",          value: "24",     change: "+3",   up: true, icon: "📢", color: "#6366f1" },
    { label: "Contacts",           value: "12,430", change: "+890", up: true, icon: "👤", color: "#10b981" },
    { label: "Emails Sent",        value: "98,210", change: "+12%", up: true, icon: "📧", color: "#06b6d4" },
    { label: "Open Rate",          value: "44%",    change: "+6%",  up: true, icon: "📬", color: "#f59e0b" },
    { label: "Team Members",       value: "8",      change: "+1",   up: true, icon: "🧑‍💼", color: "#8b5cf6" },
    { label: "Automations Active", value: "5",      change: "+2",   up: true, icon: "⚙️", color: "#ec4899" },
  ],
  MARKETING_MANAGER: [
    { label: "My Campaigns",     value: "9",      change: "+2",   up: true, icon: "📢", color: "#6366f1" },
    { label: "Contacts Managed", value: "4,200",  change: "+310", up: true, icon: "👤", color: "#10b981" },
    { label: "Emails Sent",      value: "41,000", change: "+8%",  up: true, icon: "📧", color: "#06b6d4" },
    { label: "Click Rate",       value: "11%",    change: "+2%",  up: true, icon: "🖱️", color: "#f59e0b" },
  ],
  VIEWER: [
    { label: "Total Campaigns", value: "24",     change: "", up: true, icon: "📊", color: "#6366f1" },
    { label: "Total Sent",      value: "98,210", change: "", up: true, icon: "📧", color: "#06b6d4" },
    { label: "Avg Open Rate",   value: "44%",    change: "", up: true, icon: "📬", color: "#10b981" },
    { label: "Avg CTR",         value: "11%",    change: "", up: true, icon: "🖱️", color: "#f59e0b" },
  ],
};

export const MOCK_CAMPAIGNS = [
  { name: "Summer Sale 2026",  status: "Sent",      sent: 12400, opened: 5488, ctr: "11.2%", date: "20 Mar 2026" },
  { name: "Welcome Series",    status: "Active",    sent: 3200,  opened: 1920, ctr: "8.4%",  date: "18 Mar 2026" },
  { name: "Product Launch",    status: "Scheduled", sent: 0,     opened: 0,    ctr: "—",     date: "28 Mar 2026" },
  { name: "Re-engagement Q1",  status: "Draft",     sent: 0,     opened: 0,    ctr: "—",     date: "—"           },
  { name: "Newsletter March",  status: "Sent",      sent: 8900,  opened: 3916, ctr: "9.8%",  date: "15 Mar 2026" },
];

export const MOCK_AUDIT = [
  { user: "rahul@acme.com", action: "Campaign Created",     module: "Campaigns",  time: "2 min ago"  },
  { user: "priya@acme.com", action: "Contacts Uploaded",    module: "Contacts",   time: "15 min ago" },
  { user: "superadmin",     action: "Plan Updated",         module: "Billing",    time: "1 hr ago"   },
  { user: "amit@acme.com",  action: "Template Saved",       module: "Templates",  time: "2 hr ago"   },
  { user: "rahul@acme.com", action: "Automation Activated", module: "Automation", time: "3 hr ago"   },
];

export const MOCK_TEAM = [
  { name: "Priya Patil",    email: "priya@acme.com", role: "MARKETING_MANAGER", status: "Active"   },
  { name: "Amit Desai",     email: "amit@acme.com",  role: "MARKETING_MANAGER", status: "Active"   },
  { name: "Sneha Kulkarni", email: "sneha@acme.com", role: "VIEWER",            status: "Inactive" },
];

export const INITIAL_USERS = [
  { id:1, name:"Rajesh Mehta",    email:"superadmin@test.com", role:"SUPER_ADMIN",       company:"MailDoll HQ", status:"Active",   joined:"Jan 2025" },
  { id:2, name:"Rahul Sharma",    email:"admin@test.com",      role:"BUSINESS_ADMIN",    company:"Acme Corp",   status:"Active",   joined:"Feb 2026" },
  { id:3, name:"Priya Patil",     email:"manager@test.com",    role:"MARKETING_MANAGER", company:"Acme Corp",   status:"Active",   joined:"Feb 2026" },
  { id:4, name:"Sneha Kulkarni",  email:"viewer@test.com",     role:"VIEWER",            company:"Acme Corp",   status:"Inactive", joined:"Mar 2026" },
  { id:5, name:"Amit Desai",      email:"amit@techstart.com",  role:"BUSINESS_ADMIN",    company:"TechStart",   status:"Active",   joined:"Jan 2026" },
  { id:6, name:"Neha Joshi",      email:"neha@techstart.com",  role:"MARKETING_MANAGER", company:"TechStart",   status:"Active",   joined:"Mar 2026" },
];

export const ROLES_LIST = ["SUPER_ADMIN", "BUSINESS_ADMIN", "MARKETING_MANAGER", "VIEWER"];

export const statusColors = {
  Sent:      { bg: "#d1fae5", text: "#065f46" },
  Active:    { bg: "#dbeafe", text: "#1e40af" },
  Scheduled: { bg: "#fef3c7", text: "#92400e" },
  Draft:     { bg: "#f1f5f9", text: "#475569" },
  Inactive:  { bg: "#fee2e2", text: "#991b1b" },
};

export const roleBanners = {
  SUPER_ADMIN:       { title: "Platform Overview",  subtitle: "Full control over the entire MailDoll platform.",       gradient: "linear-gradient(135deg,#4f46e5,#7c3aed)", icon: "👑" },
  BUSINESS_ADMIN:    { title: "Business Dashboard", subtitle: "Manage your company's campaigns, contacts, and team.",  gradient: "linear-gradient(135deg,#10b981,#059669)", icon: "🏢" },
  MARKETING_MANAGER: { title: "Campaign Hub",       subtitle: "Create, schedule, and track your marketing campaigns.", gradient: "linear-gradient(135deg,#f59e0b,#d97706)", icon: "🎯" },
  VIEWER:            { title: "Analytics View",     subtitle: "Read-only access to reports and campaign analytics.",   gradient: "linear-gradient(135deg,#ec4899,#be185d)", icon: "📊" },
};

export const PERM_GROUPS = [
  { group:"Dashboard",      icon:"📊", perms:[
    { key:"view_stats",        label:"View Stats Cards"        },
    { key:"view_charts",       label:"View Charts & Graphs"    },
    { key:"view_earnings",     label:"View Revenue & Earnings" },
  ]},
  { group:"Campaigns",      icon:"📢", perms:[
    { key:"view_campaigns",      label:"View Campaigns"        },
    { key:"view_last_campaigns", label:"View Recent Campaigns" },
  ]},
  { group:"Email & SMS",    icon:"📧", perms:[
    { key:"view_last_mails",   label:"View Last Emails"    },
    { key:"view_last_sms",     label:"View Last SMS"       },
    { key:"view_gateway",      label:"View Email Gateway"  },
  ]},
  { group:"Reports",        icon:"📈", perms:[
    { key:"view_limit_report", label:"View Limit Report"       },
    { key:"view_purchase",     label:"View Purchase / Billing" },
  ]},
  { group:"Sidebar Access", icon:"🗂️", perms:[
    { key:"sidebar_subscribers", label:"Contacts / Subscribers" },
    { key:"sidebar_templates",   label:"Templates"              },
    { key:"sidebar_reports",     label:"Reports"                },
    { key:"sidebar_settings",    label:"Settings"               },
    { key:"sidebar_roles",       label:"Roles & Permissions"    },
  ]},
  { group:"Administration", icon:"⚙️", perms:[
    { key:"can_edit_roles", label:"Can Edit Roles" },
  ]},
];