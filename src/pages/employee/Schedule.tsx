import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const schedule = [
  { day: 'Seg', entry: '08:00', exit: '17:00', worked: '8h32', status: 'ok' },
  { day: 'Ter', entry: '07:58', exit: '17:05', worked: '8h47', status: 'ok' },
  { day: 'Qua', entry: '08:15', exit: '17:00', worked: '8h25', status: 'late' },
  { day: 'Qui', entry: '08:00', exit: '17:00', worked: '8h40', status: 'ok' },
  { day: 'Sex', entry: '--:--', exit: '--:--', worked: '--', status: 'today' },
  { day: 'Sáb', entry: '--', exit: '--', worked: '--', status: 'off' },
  { day: 'Dom', entry: '--', exit: '--', worked: '--', status: 'off' },
];

export default function SchedulePage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold pt-2">Jornada Semanal</h1>
      <p className="text-sm text-muted-foreground">Semana atual — 08:00 às 17:00</p>

      <div className="space-y-2">
        {schedule.map(d => (
          <div key={d.day} className={cn(
            "flex items-center justify-between p-3 rounded-xl border",
            d.status === 'today' ? 'border-primary bg-primary/5' : 'border-border bg-card'
          )}>
            <div className="flex items-center gap-3">
              <span className={cn("text-sm font-bold w-8", d.status === 'today' && 'text-primary')}>{d.day}</span>
              <div className="text-xs text-muted-foreground">
                {d.entry} → {d.exit}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono">{d.worked}</span>
              {d.status === 'ok' && <Badge variant="outline" className="border-accent/30 text-accent text-[10px]">OK</Badge>}
              {d.status === 'late' && <Badge variant="outline" className="border-warning/30 text-warning text-[10px]">Atraso</Badge>}
              {d.status === 'today' && <Badge className="gradient-primary text-primary-foreground text-[10px]">Hoje</Badge>}
              {d.status === 'off' && <Badge variant="secondary" className="text-[10px]">Folga</Badge>}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-4 space-y-2">
        <h3 className="font-semibold text-sm">Resumo da semana</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-muted-foreground">Horas trabalhadas</span><p className="font-bold">34h24</p></div>
          <div><span className="text-muted-foreground">Horas esperadas</span><p className="font-bold">40h00</p></div>
          <div><span className="text-muted-foreground">Saldo</span><p className="font-bold text-destructive">-5h36</p></div>
          <div><span className="text-muted-foreground">Atrasos</span><p className="font-bold text-warning">1</p></div>
        </div>
      </div>
    </div>
  );
}
