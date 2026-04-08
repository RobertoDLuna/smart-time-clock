import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Configurações da empresa</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-lg">Dados da empresa</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Nome</Label><Input defaultValue="TechStore Ltda" /></div>
            <div className="space-y-2"><Label>CNPJ</Label><Input defaultValue="12.345.678/0001-90" /></div>
            <div className="space-y-2"><Label>Email</Label><Input defaultValue="admin@techstore.com.br" /></div>
            <Button className="gradient-primary text-primary-foreground" onClick={() => toast.success('Salvo!')}>Salvar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Preferências</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div><Label>Notificações de atraso</Label><p className="text-xs text-muted-foreground">Receber alerta quando funcionário atrasar</p></div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div><Label>Ponto por foto obrigatório</Label><p className="text-xs text-muted-foreground">Exigir reconhecimento facial</p></div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div><Label>Geolocalização obrigatória</Label><p className="text-xs text-muted-foreground">Exigir localização no registro</p></div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
