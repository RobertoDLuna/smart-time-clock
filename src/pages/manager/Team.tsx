import { employees } from '@/data/mock';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TeamPage() {
  const team = employees.filter(e => e.companyId === 'c1' && e.active);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Equipe</h1>
        <p className="text-muted-foreground">{team.length} membros</p>
      </div>
      <div className="grid gap-3">
        {team.map(emp => (
          <Card key={emp.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold">
                  {emp.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-medium">{emp.name}</p>
                  <p className="text-xs text-muted-foreground">{emp.role} • {emp.contractType} • {emp.workSchedule}</p>
                </div>
              </div>
              <Badge variant="outline" className="border-accent/30 text-accent">Ativo</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
