import { useState } from 'react';
import { workSchedules } from '@/data/mock';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, CalendarDays } from 'lucide-react';
import { toast } from 'sonner';

const dayLabels = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];

export default function SchedulesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Jornadas de Trabalho</h1>
          <p className="text-muted-foreground">Configure os horários e escalas</p>
        </div>
        <Button className="gradient-primary text-primary-foreground gap-2" onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" /> Nova Jornada
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workSchedules.map(ws => (
          <Card key={ws.id} className="hover:border-primary/20 transition-colors cursor-pointer">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{ws.name}</p>
                  <p className="text-xs text-muted-foreground">{ws.entryTime} — {ws.exitTime}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Intervalo: {ws.breakMinutes}min</span>
                <span className="text-muted-foreground">Tolerância: {ws.toleranceMinutes}min</span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {dayLabels.map(d => (
                  <Badge key={d} variant={ws.days.includes(d) ? 'default' : 'secondary'} className="text-[10px] h-5 px-1.5 capitalize">
                    {d}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Nova Jornada</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2"><Label>Nome da jornada</Label><Input placeholder="Ex: Comercial" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Entrada</Label><Input type="time" defaultValue="08:00" /></div>
              <div className="space-y-2"><Label>Saída</Label><Input type="time" defaultValue="17:00" /></div>
              <div className="space-y-2"><Label>Intervalo (min)</Label><Input type="number" defaultValue="60" /></div>
              <div className="space-y-2"><Label>Tolerância (min)</Label><Input type="number" defaultValue="10" /></div>
            </div>
            <div className="space-y-2">
              <Label>Dias da semana</Label>
              <div className="flex gap-3 flex-wrap">
                {dayLabels.map(d => (
                  <label key={d} className="flex items-center gap-1.5 text-sm capitalize">
                    <Checkbox defaultChecked={!['sab', 'dom'].includes(d)} /> {d}
                  </label>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button className="gradient-primary text-primary-foreground" onClick={() => { toast.success('Jornada criada!'); setDialogOpen(false); }}>Salvar</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
