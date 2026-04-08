import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function GeolocationPage() {
  const [radius, setRadius] = useState([200]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Geolocalização</h1>
        <p className="text-muted-foreground">Configure a área permitida para registro de ponto</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-lg">Configuração</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Endereço base</Label>
              <Input defaultValue="Av. Paulista, 1000 - São Paulo, SP" />
            </div>
            <div className="space-y-3">
              <Label>Raio permitido: {radius[0]}m</Label>
              <Slider value={radius} onValueChange={setRadius} min={50} max={1000} step={10} />
              <p className="text-xs text-muted-foreground">Funcionários devem estar dentro deste raio para registrar ponto</p>
            </div>
            <Button className="gradient-primary text-primary-foreground" onClick={() => toast.success('Configuração salva!')}>
              Salvar configuração
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Mapa</CardTitle></CardHeader>
          <CardContent>
            <div className="h-80 rounded-xl bg-secondary/50 border border-border flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{
                background: 'radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 60%)'
              }} />
              <div className="text-center space-y-3 relative z-10">
                <div className="relative mx-auto w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40 animate-spin" style={{ animationDuration: '20s' }} />
                  <div className="absolute inset-4 rounded-full border border-primary/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Raio: {radius[0]}m</p>
                <p className="text-xs text-muted-foreground">-23.5505, -46.6333</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
