import { useState } from 'react';
import { employees, Employee } from '@/data/mock';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Search, MoreVertical, Pencil, Trash2, UserCheck } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export default function EmployeesPage() {
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

  const companyEmployees = employees.filter(e => e.companyId === 'c1');
  const filtered = companyEmployees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  const handleSave = () => {
    toast.success(editEmployee ? 'Funcionário atualizado!' : 'Funcionário cadastrado!');
    setDialogOpen(false);
    setEditEmployee(null);
  };

  const handleDelete = (name: string) => {
    toast.success(`${name} removido com sucesso`);
  };

  const openEdit = (emp: Employee) => {
    setEditEmployee(emp);
    setDialogOpen(true);
  };

  const openNew = () => {
    setEditEmployee(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Funcionários</h1>
          <p className="text-muted-foreground">{companyEmployees.length} funcionários cadastrados</p>
        </div>
        <Button className="gradient-primary text-primary-foreground gap-2" onClick={openNew}>
          <Plus className="h-4 w-4" /> Novo Funcionário
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar por nome..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid gap-3">
        {filtered.map(emp => (
          <Card key={emp.id} className="hover:border-primary/20 transition-colors">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold">
                  {emp.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-medium">{emp.name}</p>
                  <p className="text-xs text-muted-foreground">{emp.role} • {emp.contractType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {emp.facialRegistered && (
                  <Badge variant="outline" className="border-accent/30 text-accent hidden sm:inline-flex">
                    <UserCheck className="h-3 w-3 mr-1" /> Facial
                  </Badge>
                )}
                <Badge variant={emp.active ? 'outline' : 'secondary'} className={emp.active ? 'border-accent/30 text-accent' : ''}>
                  {emp.active ? 'Ativo' : 'Inativo'}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEdit(emp)}>
                      <Pencil className="h-4 w-4 mr-2" /> Editar
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={e => e.preventDefault()} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" /> Excluir
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir funcionário?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir {emp.name}? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(emp.name)} className="bg-destructive text-destructive-foreground">
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={v => { setDialogOpen(v); if (!v) setEditEmployee(null); }}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editEmployee ? 'Editar Funcionário' : 'Novo Funcionário'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2"><Label>Nome completo</Label><Input defaultValue={editEmployee?.name} placeholder="João da Silva" /></div>
              <div className="space-y-2"><Label>CPF</Label><Input defaultValue={editEmployee?.cpf} placeholder="000.000.000-00" /></div>
              <div className="space-y-2"><Label>Email</Label><Input type="email" defaultValue={editEmployee?.email} placeholder="email@empresa.com" /></div>
              <div className="space-y-2"><Label>Telefone</Label><Input defaultValue={editEmployee?.phone} placeholder="(00) 00000-0000" /></div>
              <div className="space-y-2"><Label>Cargo</Label><Input defaultValue={editEmployee?.role} placeholder="Ex: Vendedor" /></div>
              <div className="space-y-2">
                <Label>Tipo de contrato</Label>
                <Select defaultValue={editEmployee?.contractType || 'CLT'}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CLT">CLT</SelectItem>
                    <SelectItem value="PJ">PJ</SelectItem>
                    <SelectItem value="Estágio">Estágio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Data de admissão</Label><Input type="date" defaultValue={editEmployee?.admissionDate} /></div>
              <div className="space-y-2"><Label>Jornada</Label><Input defaultValue={editEmployee?.workSchedule} placeholder="08:00 - 17:00" /></div>
              <div className="space-y-2 col-span-2">
                <Label>Foto (reconhecimento facial)</Label>
                <Input type="file" accept="image/*" />
              </div>
              <div className="flex items-center gap-3 col-span-2">
                <Switch defaultChecked={editEmployee?.active ?? true} />
                <Label>Funcionário ativo</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => { setDialogOpen(false); setEditEmployee(null); }}>Cancelar</Button>
              <Button className="gradient-primary text-primary-foreground" onClick={handleSave}>Salvar</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
