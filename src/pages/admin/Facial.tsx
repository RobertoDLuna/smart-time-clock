import { employees } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UserCheck, Camera, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function FacialPage() {
  const companyEmployees = employees.filter(e => e.companyId === 'c1' && e.active);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reconhecimento Facial</h1>
        <p className="text-muted-foreground">Gerencie o cadastro facial dos funcionários</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Configurações gerais</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Reconhecimento facial obrigatório</Label>
              <p className="text-xs text-muted-foreground">Exigir verificação facial em cada registro de ponto</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Nível de confiança mínimo</Label>
              <p className="text-xs text-muted-foreground">Porcentagem mínima de correspondência</p>
            </div>
            <Input type="number" defaultValue="85" className="w-20" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Status dos funcionários</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {companyEmployees.map(emp => (
              <div key={emp.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold">
                    {emp.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{emp.name}</p>
                    <p className="text-xs text-muted-foreground">{emp.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {emp.facialRegistered ? (
                    <Badge variant="outline" className="border-accent/30 text-accent gap-1">
                      <UserCheck className="h-3 w-3" /> Registrado
                    </Badge>
                  ) : (
                    <Button variant="outline" size="sm" className="gap-1" onClick={() => toast.info('Abrir câmera para cadastro facial')}>
                      <Camera className="h-3 w-3" /> Cadastrar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
