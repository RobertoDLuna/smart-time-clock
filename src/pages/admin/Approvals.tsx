import { adjustmentRequests, employees } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';

export default function ApprovalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Aprovações</h1>
        <p className="text-muted-foreground">Solicitações de ajuste de ponto pendentes</p>
      </div>

      <div className="grid gap-3">
        {adjustmentRequests.map(req => {
          const emp = employees.find(e => e.id === req.employeeId);
          return (
            <Card key={req.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{emp?.name}</p>
                      <Badge variant={req.status === 'pending' ? 'secondary' : req.status === 'approved' ? 'outline' : 'destructive'}
                        className={req.status === 'approved' ? 'border-accent/30 text-accent' : ''}>
                        {req.status === 'pending' ? 'Pendente' : req.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {req.date} — {req.type === 'entry' ? 'Entrada' : 'Saída'} → {req.correctTime}
                    </p>
                    <p className="text-sm text-muted-foreground">{req.reason}</p>
                  </div>
                  {req.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-accent hover:bg-accent/10" onClick={() => toast.success('Aprovado!')}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => toast.success('Rejeitado')}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
