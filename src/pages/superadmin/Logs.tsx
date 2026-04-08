import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const logs = [
  { time: '14:32', user: 'Admin Sistema', action: 'Login realizado', type: 'info' as const },
  { time: '14:15', user: 'Carlos Silva', action: 'Empresa TechStore atualizada', type: 'info' as const },
  { time: '13:50', user: 'Sistema', action: 'Backup automático concluído', type: 'success' as const },
  { time: '12:00', user: 'João Ferreira', action: 'Tentativa de acesso negada', type: 'warning' as const },
  { time: '11:30', user: 'Sistema', action: 'Novo usuário registrado', type: 'info' as const },
  { time: '10:00', user: 'Admin Sistema', action: 'Plano da Clínica Vida alterado', type: 'info' as const },
];

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Logs do Sistema</h1>
        <p className="text-muted-foreground">Atividades recentes</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground w-12">{log.time}</span>
                  <div>
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.user}</p>
                  </div>
                </div>
                <Badge variant={log.type === 'warning' ? 'destructive' : 'secondary'} className="text-xs">
                  {log.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
