import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/data/mock';
import { motion } from 'framer-motion';
import { Clock, Building2, Users, UserCheck, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const roles: { role: UserRole; label: string; desc: string; icon: React.ElementType; path: string }[] = [
  { role: 'super_admin', label: 'Super Admin', desc: 'Painel SaaS completo', icon: Building2, path: '/super-admin' },
  { role: 'admin', label: 'Administrador', desc: 'Gestão da empresa', icon: Users, path: '/admin' },
  { role: 'manager', label: 'Gestor', desc: 'Gestão de equipe', icon: UserCheck, path: '/manager' },
  { role: 'employee', label: 'Funcionário', desc: 'App mobile (PWA)', icon: Smartphone, path: '/app' },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!selectedRole) return;
    setLoading(true);
    setTimeout(() => {
      login(selectedRole);
      const target = roles.find(r => r.role === selectedRole)!.path;
      navigate(target);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary mb-4">
            <Clock className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">PontoSync</h1>
          <p className="text-muted-foreground">Controle de ponto inteligente</p>
        </div>

        {/* Login form */}
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <div className="space-y-2">
            <Label>Email ou CPF</Label>
            <Input placeholder="seu@email.com" defaultValue="demo@pontosync.com" />
          </div>
          <div className="space-y-2">
            <Label>Senha</Label>
            <Input type="password" placeholder="••••••••" defaultValue="demo1234" />
          </div>

          {/* Role selector (demo) */}
          <div className="space-y-2 pt-2">
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">Modo de demonstração — selecione o perfil</Label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map(r => (
                <button
                  key={r.role}
                  onClick={() => setSelectedRole(r.role)}
                  className={cn(
                    "flex flex-col items-start gap-1 rounded-xl border-2 p-3 text-left transition-all",
                    selectedRole === r.role
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <r.icon className={cn("h-5 w-5", selectedRole === r.role ? "text-primary" : "text-muted-foreground")} />
                  <span className="text-sm font-semibold">{r.label}</span>
                  <span className="text-[11px] text-muted-foreground">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <Button
            className="w-full gradient-primary text-primary-foreground h-11 font-semibold"
            onClick={handleLogin}
            disabled={!selectedRole || loading}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              />
            ) : 'Entrar'}
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Versão demo — dados simulados
        </p>
      </motion.div>
    </div>
  );
}
