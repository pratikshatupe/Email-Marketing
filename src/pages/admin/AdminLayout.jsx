// frontend/pages/admin/AdminLayout.jsx

import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

import AdminSidebar         from "../admin/AdminSidebar";
import TopHeader            from "../admin/Topheader";
import { AccessDenied, PlaceholderPage } from "../admin/Accessdenied";

import DashboardPage        from "../admin/Dashboardpage";
import UserManagementPage   from "../admin/Usermanagementpage";
import RolesPermissionsPage from "../admin/Rolespermissionspage";

import EmailCampaigns       from "../campagins/EmailCampagins";
import WhatsAppCampaigns    from "../campagins/WhatsappCampagins";
import EmailTemplates       from "../templates/Tamplates";
import WhatsAppTemplates    from "../templates/WhatsappTamplates";
import Settings             from "../settings/Settings";
import Contacts             from "../contacts/Contacts";

export default function AdminLayout() {
  const { user, hasPerm } = useAuth();
  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar — Desktop */}
      <div className="hidden md:flex h-full">
        <AdminSidebar collapsed={collapsed} />
      </div>

      {/* Sidebar — Mobile Drawer */}
      <div
        className={`fixed left-0 top-0 h-full z-50 md:hidden transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ width: "236px" }}
      >
        <AdminSidebar collapsed={false} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopHeader onMenuToggle={() => {
          if (window.innerWidth < 768) setMobileOpen(o => !o);
          else setCollapsed(c => !c);
        }} />

        <main className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6">
          <Routes>
            <Route index element={<DashboardPage />} />

            {/* Campaigns */}
            <Route path="campaigns" element={
              hasPerm("view_campaigns") ? <Navigate to="/admin/campaigns/email" replace /> : <AccessDenied />
            } />
            <Route path="campaigns/email" element={
              hasPerm("view_campaigns") ? <EmailCampaigns /> : <AccessDenied />
            } />
            <Route path="campaigns/whatsapp" element={
              hasPerm("view_campaigns") ? <WhatsAppCampaigns /> : <AccessDenied />
            } />

            {/* Templates */}
            <Route path="templates" element={
              hasPerm("sidebar_templates") ? <Navigate to="/admin/templates/email" replace /> : <AccessDenied />
            } />
            <Route path="templates/email" element={
              hasPerm("sidebar_templates") ? <EmailTemplates /> : <AccessDenied />
            } />
            <Route path="templates/whatsapp" element={
              hasPerm("sidebar_templates") ? <WhatsAppTemplates /> : <AccessDenied />
            } />

            {/* Contacts */}
            <Route path="contacts" element={
              hasPerm("sidebar_subscribers") ? <Contacts /> : <AccessDenied />
            } />

            {/* Placeholder pages */}
            <Route path="automation"   element={hasPerm("view_campaigns")  ? <PlaceholderPage title="Automation"   icon="⚙️" /> : <AccessDenied />} />
            <Route path="reports"      element={hasPerm("sidebar_reports") ? <PlaceholderPage title="Reports"      icon="📈" /> : <AccessDenied />} />
            <Route path="subscription" element={hasPerm("view_purchase")   ? <PlaceholderPage title="Subscription" icon="💳" /> : <AccessDenied />} />

            {/* Management pages */}
            <Route path="users"    element={hasPerm("sidebar_roles")    ? <UserManagementPage />   : <AccessDenied />} />
            <Route path="roles"    element={hasPerm("sidebar_roles")    ? <RolesPermissionsPage /> : <AccessDenied />} />
            <Route path="settings" element={hasPerm("sidebar_settings") ? <Settings />             : <AccessDenied />} />

            <Route path="*" element={<AccessDenied />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}