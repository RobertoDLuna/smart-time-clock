import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Fingerprint, MapPin, CheckCircle2, XCircle, ChevronRight, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { timeRecords } from '@/data/mock';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

type EmployeeStatus = 'working' | 'break' | 'off';

export default function EmployeeHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const myRecords = timeRecords.filter(r => r.employeeId === 'e1' && r.date === today);

  const lastRecord = myRecords[myRecords.length - 1];
  const status: EmployeeStatus = !lastRecord ? 'off' : lastRecord.type === 'break_start' ? 'break' : lastRecord.type === 'exit' ? 'off' : 'working';

  const statusConfig = {
    working: { label: 'Trabalhando', color: 'text-accent', bg: 'bg-accent/10', ring: 'ring-accent/30' },
    break: { label: 'Em pausa', color: 'text-warning', bg: 'bg-warning/10', ring: 'ring-warning/30' },
    off: { label: 'Fora do expediente', color: 'text-muted-foreground', bg: 'bg-secondary', ring: 'ring-border' },
  };

  const config = statusConfig[status];
  const now = new Date();
  const [time, setTime] = useState(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const typeLabels: Record<string, string> = {
    entry: 'Entrada', break_start: 'Início Pausa', break_end: 'Fim Pausa', exit: 'Saída'
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <p className="text-sm text-muted-foreground">Olá,</p>
          <h1 className="text-xl font-bold">{user?.name || 'Maria Santos'}</h1>
        </div>
        <Badge variant="outline" className={cn("gap-1", config.color)}>
          <span className={cn("h-2 w-2 rounded-full", status === 'working' ? 'bg-accent' : status === 'break' ? 'bg-warning' : 'bg-muted-foreground')} />
          {config.label}
        </Badge>
      </div>

      {/* Clock & Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 py-6"
      >
        <div>
          <p className="text-5xl font-bold tracking-tight">{time}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        {/* Big clock-in button */}
        <div className="relative inline-block">
          {status === 'working' && (
            <>
              <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse-ring" />
              <div className="absolute inset-0 rounded-full bg-accent/10 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
            </>
          )}
          <Button
            onClick={() => navigate('/app/clock-in')}
            className={cn(
              "relative h-32 w-32 rounded-full text-lg font-bold shadow-2xl transition-all active:scale-95",
              status === 'working' ? 'gradient-success text-accent-foreground' : 'gradient-primary text-primary-foreground'
            )}
          >
            <div className="flex flex-col items-center gap-1">
              <Fingerprint className="h-8 w-8" />
              <span className="text-xs font-medium">BATER PONTO</span>
            </div>
          </Button>
        </div>
      </motion.div>

      {/* Today records */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Hoje</h2>
        {myRecords.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhum registro hoje</p>
          </div>
        ) : (
          <div className="space-y-2">
            {myRecords.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center",
                    r.type === 'entry' ? 'bg-accent/10 text-accent'
                      : r.type === 'exit' ? 'bg-destructive/10 text-destructive'
                      : 'bg-warning/10 text-warning'
                  )}>
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{typeLabels[r.type]}</p>
                    <p className="text-xs text-muted-foreground">{r.withinRadius ? 'Dentro do raio' : 'Fora do raio'}</p>
                  </div>
                </div>
                <span className="text-sm font-mono font-semibold">{r.time}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
