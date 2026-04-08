import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Clock, Calendar, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Início', icon: Home, path: '/app' },
  { label: 'Histórico', icon: Clock, path: '/app/history' },
  { label: 'Jornada', icon: Calendar, path: '/app/schedule' },
  { label: 'Alertas', icon: Bell, path: '/app/notifications' },
  { label: 'Perfil', icon: User, path: '/app/profile' },
];

export default function MobileLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen bg-background max-w-md mx-auto relative">
      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto border-t border-border bg-card/95 backdrop-blur-xl safe-area-bottom z-50">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-[56px]",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", active && "stroke-[2.5]")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
