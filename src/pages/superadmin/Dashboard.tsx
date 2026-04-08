import { motion } from 'framer-motion';
import { Building2, Users, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';
import { getSuperAdminStats, companies } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SuperAdminDashboard() {
  const stats = getSuperAdminStats();

  const cards = [
    { label: 'Empresas Ativas', value: stats.activeCompanies, icon: Building2, change: '+2 este mês' },
    { label: 'Total de Usuários', value: stats.totalUsers, icon: Users, change: '+12 este mês' },
    { label: 'Receita Mensal', value: `R$ ${stats.monthlyRevenue.toLocaleString('pt-BR')}`, icon: DollarSign, change: '+8.2%' },
    { label: 'Crescimento', value: `${stats.growth}%`, icon: TrendingUp, change: 'vs mês anterior' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema PontoSync</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-accent" />
                  {card.change}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Companies table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Empresas cadastradas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-medium text-muted-foreground">Empresa</th>
                  <th className="pb-3 font-medium text-muted-foreground hidden sm:table-cell">Segmento</th>
                  <th className="pb-3 font-medium text-muted-foreground">Plano</th>
                  <th className="pb-3 font-medium text-muted-foreground text-right">Funcionários</th>
                  <th className="pb-3 font-medium text-muted-foreground text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {companies.map(c => (
                  <tr key={c.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="py-3 font-medium">{c.name}</td>
                    <td className="py-3 text-muted-foreground hidden sm:table-cell">{c.segment}</td>
                    <td className="py-3">
                      <Badge variant={c.plan === 'enterprise' ? 'default' : 'secondary'} className="capitalize">
                        {c.plan}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">{c.employeeCount}</td>
                    <td className="py-3 text-right">
                      <Badge variant="outline" className="border-accent/30 text-accent">Ativo</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
