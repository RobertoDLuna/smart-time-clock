import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  { name: 'Starter', price: 'R$ 99', features: ['Até 15 funcionários', 'Registro de ponto básico', 'Relatórios simples', 'Suporte por email'], current: false },
  { name: 'Pro', price: 'R$ 249', features: ['Até 50 funcionários', 'Reconhecimento facial', 'Geolocalização', 'Relatórios avançados', 'Suporte prioritário'], current: true },
  { name: 'Enterprise', price: 'R$ 599', features: ['Funcionários ilimitados', 'Todas as funcionalidades', 'API personalizada', 'Suporte 24/7', 'SLA garantido', 'Multi-unidades'], current: false },
];

export default function PlansPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Planos e Assinaturas</h1>
        <p className="text-muted-foreground">Gerencie os planos oferecidos</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {plans.map(plan => (
          <Card key={plan.name} className={plan.current ? 'border-primary ring-1 ring-primary' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                {plan.current && <Badge className="gradient-primary text-primary-foreground">Popular</Badge>}
              </div>
              <p className="text-3xl font-bold">{plan.price}<span className="text-sm text-muted-foreground font-normal">/mês</span></p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent" /> {f}
                  </li>
                ))}
              </ul>
              <Button className={plan.current ? 'gradient-primary text-primary-foreground w-full' : 'w-full'} variant={plan.current ? 'default' : 'outline'}>
                {plan.current ? 'Plano Atual' : 'Selecionar'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
