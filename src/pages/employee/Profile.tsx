import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, Camera, MapPin, Bell, Shield } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6">
      <div className="text-center pt-4 space-y-3">
        <div className="h-20 w-20 rounded-full bg-secondary mx-auto flex items-center justify-center text-2xl font-bold">
          MS
        </div>
        <div>
          <h1 className="text-xl font-bold">{user?.name || 'Maria Santos'}</h1>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
          <Badge variant="outline" className="mt-1">{user?.companyName}</Badge>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-4 rounded-xl bg-card border border-border space-y-4">
          <h3 className="font-semibold text-sm">Informações</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Cargo</span><span>Vendedora</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Contrato</span><span>CLT</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Jornada</span><span>08:00 — 17:00</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Admissão</span><span>10/03/2023</span></div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border space-y-4">
          <h3 className="font-semibold text-sm">Verificações</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm"><Camera className="h-4 w-4 text-muted-foreground" /> Facial cadastrado</div>
            <Badge variant="outline" className="border-accent/30 text-accent">Ativo</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" /> Geolocalização</div>
            <Badge variant="outline" className="border-accent/30 text-accent">Ativo</Badge>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border space-y-4">
          <h3 className="font-semibold text-sm">Preferências</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm"><Bell className="h-4 w-4 text-muted-foreground" /> Notificações push</div>
            <Switch defaultChecked />
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full gap-2 text-destructive hover:text-destructive"
          onClick={() => { logout(); navigate('/'); }}
        >
          <LogOut className="h-4 w-4" /> Sair da conta
        </Button>
      </div>
    </div>
  );
}
