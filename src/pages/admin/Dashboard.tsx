import { motion } from 'framer-motion';
import { Users, Clock, AlertTriangle, UserX, ArrowUpRight, MapPin } from 'lucide-react';
import { getCompanyStats, employees, timeRecords } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const stats = getCompanyStats('c1');
  const today = new Date().toISOString().split('T')[0];
  const todayRecords = timeRecords.filter(r => r.companyId === 'c1' && r.date === today);
  const companyEmployees = employees.filter(e => e.companyId === 'c1' && e.active);

  const cards = [
    { label: 'Funcionários Ativos', value: stats.totalEmployees, icon: Users, accent: false },
    { label: 'Registros Hoje', value: stats.recordsToday, icon: Clock, accent: false },
    { label: 'Atrasos', value: stats.lateToday, icon: AlertTriangle, accent: true },
    { label: 'Ausentes', value: stats.absentToday, icon: UserX, accent: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">TechStore Ltda — Visão geral</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Live status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status em tempo real</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {companyEmployees.map(emp => {
              const records = todayRecords.filter(r => r.employeeId === emp.id);
              const lastRecord = records[records.length - 1];
              const status = !lastRecord ? 'absent' : lastRecord.type === 'break_start' ? 'break' : lastRecord.type === 'exit' ? 'left' : 'working';
              const statusMap = {
                working: { label: 'Trabalhando', color: 'border-accent/30 text-accent' },
                break: { label: 'Em pausa', color: 'border-warning/30 text-warning' },
                left: { label: 'Saiu', color: 'border-muted-foreground/30 text-muted-foreground' },
                absent: { label: 'Ausente', color: 'border-destructive/30 text-destructive' },
              };

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
                    {lastRecord && (
                      <span className="text-xs text-muted-foreground">{lastRecord.time}</span>
                    )}
                    <Badge variant="outline" className={statusMap[status].color}>
                      {statusMap[status].label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Mock map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><MapPin className="h-5 w-5" /> Mapa de check-ins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 rounded-xl bg-secondary/50 border border-border flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">Mapa interativo</p>
              <p className="text-xs text-muted-foreground">São Paulo, SP — 3 check-ins hoje</p>
              <div className="flex gap-2 justify-center">
                <div className="h-3 w-3 rounded-full bg-accent animate-pulse" />
                <div className="h-3 w-3 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="h-3 w-3 rounded-full bg-warning animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
