import { motion } from 'framer-motion';
import { Users, Clock, AlertTriangle } from 'lucide-react';
import { employees, timeRecords } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ManagerDashboard() {
  const team = employees.filter(e => e.companyId === 'c1' && e.active);
  const today = new Date().toISOString().split('T')[0];
  const todayRecords = timeRecords.filter(r => r.companyId === 'c1' && r.date === today);
  const presentIds = new Set(todayRecords.map(r => r.employeeId));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Minha Equipe</h1>
        <p className="text-muted-foreground">Acompanhe a presença da sua equipe</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Equipe', value: team.length, icon: Users },
          { label: 'Presentes', value: presentIds.size, icon: Clock },
          { label: 'Alertas', value: 2, icon: AlertTriangle },
        ].map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
                <c.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent><div className="text-2xl font-bold">{c.value}</div></CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Presença do dia</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {team.map(emp => {
              const present = presentIds.has(emp.id);
              const records = todayRecords.filter(r => r.employeeId === emp.id);
              const lastTime = records[records.length - 1]?.time;
              return (
                <div key={emp.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold">
                      {emp.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{emp.name}</p>
                      <p className="text-xs text-muted-foreground">{emp.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {lastTime && <span className="text-xs text-muted-foreground">{lastTime}</span>}
                    <Badge variant="outline" className={present ? 'border-accent/30 text-accent' : 'border-destructive/30 text-destructive'}>
                      {present ? 'Presente' : 'Ausente'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
