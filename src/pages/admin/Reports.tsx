import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, BarChart3, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function ReportsPage() {
  const reports = [
    { title: 'Relatório de Ponto', desc: 'Registros detalhados de entrada/saída', icon: Clock },
    { title: 'Horas Extras', desc: 'Horas trabalhadas além da jornada', icon: BarChart3 },
    { title: 'Faltas e Atrasos', desc: 'Histórico de ausências e atrasos', icon: Users },
    { title: 'Resumo Mensal', desc: 'Visão consolidada do mês', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">Exporte e visualize relatórios</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {reports.map(r => (
          <Card key={r.title} className="hover:border-primary/20 transition-colors">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <r.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1" onClick={() => toast.success('PDF gerado!')}>
                  <FileText className="h-3 w-3" /> PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-1" onClick={() => toast.success('Excel gerado!')}>
                  <Download className="h-3 w-3" /> Excel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
