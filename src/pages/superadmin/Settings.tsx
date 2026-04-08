import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function SuperAdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações Globais</h1>
        <p className="text-muted-foreground">Configurações do sistema PontoSync</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-lg">Sistema</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Nome do sistema</Label><Input defaultValue="PontoSync" /></div>
            <div className="space-y-2"><Label>Email de suporte</Label><Input defaultValue="suporte@pontosync.com" /></div>
            <div className="flex items-center justify-between">
              <div><Label>Modo manutenção</Label><p className="text-xs text-muted-foreground">Desabilitar acesso ao sistema</p></div>
              <Switch />
            </div>
            <Button className="gradient-primary text-primary-foreground" onClick={() => toast.success('Configurações salvas!')}>Salvar</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Notificações</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Email para novas empresas</Label><Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Alertas de segurança</Label><Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Relatório semanal</Label><Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
