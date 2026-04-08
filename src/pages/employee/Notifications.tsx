import { notifications } from '@/data/mock';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotificationsPage() {
  const iconMap = {
    success: CheckCircle2,
    warning: AlertTriangle,
    info: Info,
    error: XCircle,
  };
  const colorMap = {
    success: 'text-accent bg-accent/10',
    warning: 'text-warning bg-warning/10',
    info: 'text-primary bg-primary/10',
    error: 'text-destructive bg-destructive/10',
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold pt-2">Notificações</h1>

      <div className="space-y-2">
        {notifications.map(n => {
          const Icon = iconMap[n.type];
          return (
            <div key={n.id} className={cn("p-3 rounded-xl border bg-card", !n.read && "border-primary/20")}>
              <div className="flex items-start gap-3">
                <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", colorMap[n.type])}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{n.title}</p>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{n.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
