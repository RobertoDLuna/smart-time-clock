import { employees } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SuperAdminUsers() {
  const [search, setSearch] = useState('');
  const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Usuários Globais</h1>
        <p className="text-muted-foreground">{employees.length} usuários no sistema</p>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left">
              <th className="p-4 font-medium text-muted-foreground">Nome</th>
              <th className="p-4 font-medium text-muted-foreground hidden sm:table-cell">Email</th>
              <th className="p-4 font-medium text-muted-foreground">Cargo</th>
              <th className="p-4 font-medium text-muted-foreground text-right">Status</th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {filtered.map(e => (
                <tr key={e.id} className="hover:bg-secondary/50">
                  <td className="p-4 font-medium">{e.name}</td>
                  <td className="p-4 text-muted-foreground hidden sm:table-cell">{e.email}</td>
                  <td className="p-4">{e.role}</td>
                  <td className="p-4 text-right">
                    <Badge variant="outline" className={e.active ? 'border-accent/30 text-accent' : ''}>
                      {e.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
