import { timeRecords } from '@/data/mock';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HistoryPage() {
  const myRecords = timeRecords.filter(r => r.employeeId === 'e1');
  const typeLabels: Record<string, string> = { entry: 'Entrada', break_start: 'Pausa', break_end: 'Retorno', exit: 'Saída' };

  // Group by date
  const grouped = myRecords.reduce<Record<string, typeof myRecords>>((acc, r) => {
    (acc[r.date] = acc[r.date] || []).push(r);
    return acc;
  }, {});

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold pt-2">Histórico de Ponto</h1>

      {Object.entries(grouped).sort(([a], [b]) => b.localeCompare(a)).map(([date, records]) => (
        <div key={date} className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' })}
          </p>
          <div className="space-y-1.5">
            {records.map(r => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center",
                    r.type === 'entry' ? 'bg-accent/10 text-accent'
                      : r.type === 'exit' ? 'bg-destructive/10 text-destructive'
                      : 'bg-warning/10 text-warning'
                  )}>
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{typeLabels[r.type]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono">{r.time}</span>
                  <Badge variant="outline" className={cn("text-[10px]", r.withinRadius ? 'border-accent/30 text-accent' : 'border-destructive/30 text-destructive')}>
                    {r.withinRadius ? 'OK' : 'Fora'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
