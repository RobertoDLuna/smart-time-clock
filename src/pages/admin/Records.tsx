import { timeRecords, employees } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Download, Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RecordsPage() {
  const [search, setSearch] = useState('');
  const companyRecords = timeRecords.filter(r => r.companyId === 'c1');

  const typeLabels: Record<string, string> = { entry: 'Entrada', break_start: 'Início Pausa', break_end: 'Fim Pausa', exit: 'Saída' };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Registros de Ponto</h1>
          <p className="text-muted-foreground">Todos os registros da empresa</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => toast.success('PDF exportado!')}>
            <FileText className="h-4 w-4" /> PDF
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => toast.success('Excel exportado!')}>
            <Download className="h-4 w-4" /> Excel
          </Button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="p-4 font-medium text-muted-foreground">Funcionário</th>
                  <th className="p-4 font-medium text-muted-foreground">Data</th>
                  <th className="p-4 font-medium text-muted-foreground">Tipo</th>
                  <th className="p-4 font-medium text-muted-foreground">Horário</th>
                  <th className="p-4 font-medium text-muted-foreground">Local</th>
                  <th className="p-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {companyRecords.map(r => {
                  const emp = employees.find(e => e.id === r.employeeId);
                  return (
                    <tr key={r.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="p-4 font-medium">{emp?.name}</td>
                      <td className="p-4 text-muted-foreground">{r.date}</td>
                      <td className="p-4">{typeLabels[r.type]}</td>
                      <td className="p-4 font-mono">{r.time}</td>
                      <td className="p-4">
                        <Badge variant={r.withinRadius ? 'outline' : 'destructive'} className={r.withinRadius ? 'border-accent/30 text-accent' : ''}>
                          {r.withinRadius ? 'No raio' : 'Fora do raio'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={r.status === 'approved' ? 'outline' : r.status === 'pending' ? 'secondary' : 'destructive'}
                          className={r.status === 'approved' ? 'border-accent/30 text-accent' : ''}>
                          {r.status === 'approved' ? 'Aprovado' : r.status === 'pending' ? 'Pendente' : 'Rejeitado'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
