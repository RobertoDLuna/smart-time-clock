import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, Users, Building2, Settings, LogOut,
  Clock, FileText, MapPin, Shield, ChevronLeft, Menu, Bell,
  CalendarDays, UserCheck, ClipboardList
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const superAdminNav: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/super-admin' },
  { label: 'Empresas', icon: Building2, path: '/super-admin/companies' },
  { label: 'Usuários', icon: Users, path: '/super-admin/users' },
  { label: 'Planos', icon: Shield, path: '/super-admin/plans' },
  { label: 'Logs', icon: FileText, path: '/super-admin/logs' },
  { label: 'Configurações', icon: Settings, path: '/super-admin/settings' },
];

const adminNav: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Funcionários', icon: Users, path: '/admin/employees' },
  { label: 'Jornadas', icon: CalendarDays, path: '/admin/schedules' },
  { label: 'Registros', icon: Clock, path: '/admin/records' },
  { label: 'Geolocalização', icon: MapPin, path: '/admin/geolocation' },
  { label: 'Reconhecimento Facial', icon: UserCheck, path: '/admin/facial' },
  { label: 'Aprovações', icon: ClipboardList, path: '/admin/approvals' },
  { label: 'Relatórios', icon: FileText, path: '/admin/reports' },
  { label: 'Configurações', icon: Settings, path: '/admin/settings' },
];

const managerNav: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/manager' },
  { label: 'Minha Equipe', icon: Users, path: '/manager/team' },
  { label: 'Aprovações', icon: ClipboardList, path: '/manager/approvals' },
  { label: 'Relatórios', icon: FileText, path: '/manager/reports' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = user?.role === 'super_admin' ? superAdminNav
    : user?.role === 'admin' ? adminNav
    : managerNav;

  const roleLabel = user?.role === 'super_admin' ? 'Super Admin'
    : user?.role === 'admin' ? 'Administrador' : 'Gestor';

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className={cn("flex items-center gap-3 border-b border-border px-4 h-16", collapsed && "justify-center px-2")}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-primary">
            <Clock className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="text-lg font-bold tracking-tight">PontoSync</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-3">
          {!collapsed && (
            <div className="mb-2 px-2">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{roleLabel}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
            onClick={() => { logout(); navigate('/'); }}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && 'Sair'}
          </Button>
        </div>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 hidden lg:flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className={cn("h-3 w-3 transition-transform", collapsed && "rotate-180")} />
        </button>
      </aside>

      {/* Main */}
      <div className={cn("flex-1 flex flex-col transition-all duration-300", collapsed ? "lg:pl-16" : "lg:pl-64")}>
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card/50 backdrop-blur-md px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">3</span>
            </Button>
            <Badge variant="outline" className="hidden sm:inline-flex">{user?.companyName || 'PontoSync'}</Badge>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
