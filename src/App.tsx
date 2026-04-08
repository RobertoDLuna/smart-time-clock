import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";

// Super Admin
import SuperAdminDashboard from "./pages/superadmin/Dashboard";
import CompaniesPage from "./pages/superadmin/Companies";
import SuperAdminUsers from "./pages/superadmin/Users";
import PlansPage from "./pages/superadmin/Plans";
import LogsPage from "./pages/superadmin/Logs";
import SuperAdminSettings from "./pages/superadmin/Settings";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import EmployeesPage from "./pages/admin/Employees";
import SchedulesPage from "./pages/admin/Schedules";
import RecordsPage from "./pages/admin/Records";
import GeolocationPage from "./pages/admin/Geolocation";
import FacialPage from "./pages/admin/Facial";
import ApprovalsPage from "./pages/admin/Approvals";
import ReportsPage from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";

// Manager
import ManagerDashboard from "./pages/manager/Dashboard";
import TeamPage from "./pages/manager/Team";

// Employee (Mobile)
import EmployeeHome from "./pages/employee/Home";
import ClockInFlow from "./pages/employee/ClockIn";
import HistoryPage from "./pages/employee/History";
import SchedulePage from "./pages/employee/Schedule";
import NotificationsPage from "./pages/employee/Notifications";
import ProfilePage from "./pages/employee/Profile";
import AdjustmentRequest from "./pages/employee/AdjustmentRequest";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import MobileLayout from "./layouts/MobileLayout";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Redirect root based on role */}
      <Route path="/" element={
        <Navigate to={
          user?.role === 'super_admin' ? '/super-admin' :
          user?.role === 'admin' ? '/admin' :
          user?.role === 'manager' ? '/manager' : '/app'
        } replace />
      } />

      {/* Super Admin */}
      <Route path="/super-admin" element={<AdminLayout><SuperAdminDashboard /></AdminLayout>} />
      <Route path="/super-admin/companies" element={<AdminLayout><CompaniesPage /></AdminLayout>} />
      <Route path="/super-admin/users" element={<AdminLayout><SuperAdminUsers /></AdminLayout>} />
      <Route path="/super-admin/plans" element={<AdminLayout><PlansPage /></AdminLayout>} />
      <Route path="/super-admin/logs" element={<AdminLayout><LogsPage /></AdminLayout>} />
      <Route path="/super-admin/settings" element={<AdminLayout><SuperAdminSettings /></AdminLayout>} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/employees" element={<AdminLayout><EmployeesPage /></AdminLayout>} />
      <Route path="/admin/schedules" element={<AdminLayout><SchedulesPage /></AdminLayout>} />
      <Route path="/admin/records" element={<AdminLayout><RecordsPage /></AdminLayout>} />
      <Route path="/admin/geolocation" element={<AdminLayout><GeolocationPage /></AdminLayout>} />
      <Route path="/admin/facial" element={<AdminLayout><FacialPage /></AdminLayout>} />
      <Route path="/admin/approvals" element={<AdminLayout><ApprovalsPage /></AdminLayout>} />
      <Route path="/admin/reports" element={<AdminLayout><ReportsPage /></AdminLayout>} />
      <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

      {/* Manager */}
      <Route path="/manager" element={<AdminLayout><ManagerDashboard /></AdminLayout>} />
      <Route path="/manager/team" element={<AdminLayout><TeamPage /></AdminLayout>} />
      <Route path="/manager/approvals" element={<AdminLayout><ApprovalsPage /></AdminLayout>} />
      <Route path="/manager/reports" element={<AdminLayout><ReportsPage /></AdminLayout>} />

      {/* Employee (Mobile) */}
      <Route path="/app" element={<MobileLayout><EmployeeHome /></MobileLayout>} />
      <Route path="/app/clock-in" element={<ClockInFlow />} />
      <Route path="/app/history" element={<MobileLayout><HistoryPage /></MobileLayout>} />
      <Route path="/app/schedule" element={<MobileLayout><SchedulePage /></MobileLayout>} />
      <Route path="/app/notifications" element={<MobileLayout><NotificationsPage /></MobileLayout>} />
      <Route path="/app/profile" element={<MobileLayout><ProfilePage /></MobileLayout>} />
      <Route path="/app/adjustment" element={<AdjustmentRequest />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
