import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, MapPin, CheckCircle2, XCircle, ArrowLeft, Camera, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Step = 'start' | 'facial' | 'geo' | 'success' | 'error_geo' | 'error_facial';

export default function ClockInFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('start');
  const [scanProgress, setScanProgress] = useState(0);
  const [geoProgress, setGeoProgress] = useState(0);

  // Simulate facial scan
  useEffect(() => {
    if (step === 'facial') {
      setScanProgress(0);
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // 80% chance success
            setTimeout(() => setStep(Math.random() > 0.2 ? 'geo' : 'error_facial'), 300);
            return 100;
          }
          return prev + 4;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Simulate geo check
  useEffect(() => {
    if (step === 'geo') {
      setGeoProgress(0);
      const interval = setInterval(() => {
        setGeoProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(Math.random() > 0.15 ? 'success' : 'error_geo'), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => step === 'start' ? navigate('/app') : setStep('start')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold">Registrar Ponto</h1>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {/* STEP: Start */}
          {step === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
            >
              <div className="space-y-2">
                <Fingerprint className="h-16 w-16 text-primary mx-auto" />
                <h2 className="text-xl font-bold">Registrar Ponto</h2>
                <p className="text-sm text-muted-foreground">Iremos verificar sua identidade e localização</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Camera className="h-4 w-4" /> <span>Reconhecimento facial</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> <span>Verificação de localização</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" /> <span>Registro seguro</span>
                </div>
              </div>
              <Button
                className="w-full h-14 text-lg font-semibold gradient-primary text-primary-foreground rounded-2xl"
                onClick={() => setStep('facial')}
              >
                Iniciar Verificação
              </Button>
            </motion.div>
          )}

          {/* STEP: Facial scan */}
          {step === 'facial' && (
            <motion.div
              key="facial"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6 w-full"
            >
              <h2 className="text-lg font-bold">Reconhecimento Facial</h2>
              <p className="text-sm text-muted-foreground">Posicione seu rosto no centro</p>

              {/* Fake camera view */}
              <div className="relative mx-auto w-64 h-64 rounded-3xl bg-foreground/5 border-2 border-border overflow-hidden">
                {/* Face outline */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={cn(
                    "w-40 h-52 rounded-[50%] border-2 transition-colors duration-500",
                    scanProgress > 80 ? "border-accent" : "border-primary/40"
                  )} />
                </div>
                {/* Scan line */}
                <div
                  className="absolute left-0 right-0 h-0.5 bg-primary/60"
                  style={{ top: `${(scanProgress % 100)}%`, transition: 'top 0.06s linear' }}
                />
                {/* Corner markers */}
                {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-6 h-6`}>
                    <div className={cn(
                      "w-full h-full rounded-sm",
                      i === 0 ? 'border-t-2 border-l-2' : i === 1 ? 'border-t-2 border-r-2' : i === 2 ? 'border-b-2 border-l-2' : 'border-b-2 border-r-2',
                      scanProgress > 80 ? 'border-accent' : 'border-primary/40'
                    )} />
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full gradient-primary"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Analisando... {scanProgress}%</p>
              </div>
            </motion.div>
          )}

          {/* STEP: Geolocation */}
          {step === 'geo' && (
            <motion.div
              key="geo"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6 w-full"
            >
              <h2 className="text-lg font-bold">Verificando Localização</h2>
              <p className="text-sm text-muted-foreground">Confirmando que você está na área permitida</p>

              {/* Mock map */}
              <div className="relative mx-auto w-64 h-64 rounded-3xl bg-foreground/5 border-2 border-border overflow-hidden">
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(circle at center, hsl(var(--accent) / 0.15) 0%, transparent 70%)'
                }} />
                {/* Radius circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-32 h-32 rounded-full border-2 border-dashed border-accent/40"
                  />
                </div>
                {/* Pin */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <MapPin className="h-10 w-10 text-primary fill-primary/20" />
                  </motion.div>
                </div>
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute bg-foreground" style={{
                      [i < 4 ? 'left' : 'top']: `${(i % 4 + 1) * 20}%`,
                      [i < 4 ? 'top' : 'left']: 0,
                      [i < 4 ? 'width' : 'height']: '1px',
                      [i < 4 ? 'height' : 'width']: '100%',
                    }} />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div className="h-full rounded-full gradient-success" style={{ width: `${geoProgress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">Localizando... {geoProgress}%</p>
              </div>
            </motion.div>
          )}

          {/* STEP: Success */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <CheckCircle2 className="h-24 w-24 text-accent mx-auto" />
              </motion.div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Ponto Registrado!</h2>
                <p className="text-muted-foreground">
                  {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} — Dentro da área
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Tipo</span><span className="font-medium">Entrada</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Facial</span><span className="text-accent font-medium">✓ Verificado</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Localização</span><span className="text-accent font-medium">✓ No raio</span></div>
              </div>
              <Button className="w-full h-12 gradient-primary text-primary-foreground rounded-2xl font-semibold" onClick={() => navigate('/app')}>
                Voltar ao Início
              </Button>
            </motion.div>
          )}

          {/* STEP: Error - Geo */}
          {step === 'error_geo' && (
            <motion.div
              key="error_geo"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                <XCircle className="h-24 w-24 text-destructive mx-auto" />
              </motion.div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Fora da Área</h2>
                <p className="text-muted-foreground">Você está fora do raio permitido para registrar ponto.</p>
              </div>
              <div className="flex gap-3 w-full">
                <Button variant="outline" className="flex-1 h-12 rounded-2xl" onClick={() => setStep('start')}>
                  Tentar Novamente
                </Button>
                <Button variant="ghost" className="flex-1 h-12 rounded-2xl" onClick={() => navigate('/app')}>
                  Voltar
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP: Error - Facial */}
          {step === 'error_facial' && (
            <motion.div
              key="error_facial"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                <XCircle className="h-24 w-24 text-destructive mx-auto" />
              </motion.div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Falha no Reconhecimento</h2>
                <p className="text-muted-foreground">Não foi possível verificar sua identidade. Tente novamente com boa iluminação.</p>
              </div>
              <div className="flex gap-3 w-full">
                <Button variant="outline" className="flex-1 h-12 rounded-2xl" onClick={() => setStep('start')}>
                  Tentar Novamente
                </Button>
                <Button variant="ghost" className="flex-1 h-12 rounded-2xl" onClick={() => navigate('/app')}>
                  Voltar
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
