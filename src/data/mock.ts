export type UserRole = 'super_admin' | 'admin' | 'manager' | 'employee';

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  segment: string;
  address: string;
  responsible: string;
  email: string;
  plan: 'starter' | 'pro' | 'enterprise';
  employeeCount: number;
  active: boolean;
  createdAt: string;
}

export interface Employee {
  id: string;
  companyId: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  role: string;
  contractType: 'CLT' | 'PJ' | 'Estágio';
  admissionDate: string;
  workSchedule: string;
  photoUrl: string;
  active: boolean;
  facialRegistered: boolean;
}

export interface TimeRecord {
  id: string;
  employeeId: string;
  companyId: string;
  date: string;
  type: 'entry' | 'break_start' | 'break_end' | 'exit';
  time: string;
  lat: number;
  lng: number;
  withinRadius: boolean;
  facialMatch: boolean;
  status: 'approved' | 'pending' | 'rejected';
}

export interface AdjustmentRequest {
  id: string;
  employeeId: string;
  date: string;
  type: 'entry' | 'exit';
  correctTime: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface WorkSchedule {
  id: string;
  companyId: string;
  name: string;
  entryTime: string;
  exitTime: string;
  breakMinutes: number;
  toleranceMinutes: number;
  days: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
}

// ---- COMPANIES ----
export const companies: Company[] = [
  {
    id: 'c1', name: 'TechStore Ltda', cnpj: '12.345.678/0001-90', segment: 'Varejo',
    address: 'Av. Paulista, 1000 - São Paulo, SP', responsible: 'Carlos Silva',
    email: 'admin@techstore.com.br', plan: 'pro', employeeCount: 24, active: true, createdAt: '2024-01-15',
  },
  {
    id: 'c2', name: 'Construtora Horizonte', cnpj: '98.765.432/0001-10', segment: 'Construção',
    address: 'Rua das Obras, 500 - Rio de Janeiro, RJ', responsible: 'Ana Oliveira',
    email: 'rh@horizonte.com.br', plan: 'enterprise', employeeCount: 87, active: true, createdAt: '2023-08-20',
  },
  {
    id: 'c3', name: 'Clínica Vida Saudável', cnpj: '11.222.333/0001-44', segment: 'Saúde',
    address: 'Rua da Saúde, 200 - Belo Horizonte, MG', responsible: 'Dr. Pedro Costa',
    email: 'admin@vidasaudavel.com.br', plan: 'starter', employeeCount: 12, active: true, createdAt: '2024-06-01',
  },
];

// ---- EMPLOYEES ----
export const employees: Employee[] = [
  { id: 'e1', companyId: 'c1', name: 'Maria Santos', cpf: '123.456.789-00', email: 'maria@techstore.com.br', phone: '(11) 99999-1234', role: 'Vendedora', contractType: 'CLT', admissionDate: '2023-03-10', workSchedule: '08:00 - 17:00', photoUrl: '', active: true, facialRegistered: true },
  { id: 'e2', companyId: 'c1', name: 'João Ferreira', cpf: '987.654.321-00', email: 'joao@techstore.com.br', phone: '(11) 98888-5678', role: 'Gerente', contractType: 'CLT', admissionDate: '2022-01-05', workSchedule: '09:00 - 18:00', photoUrl: '', active: true, facialRegistered: true },
  { id: 'e3', companyId: 'c1', name: 'Ana Lima', cpf: '456.789.123-00', email: 'ana@techstore.com.br', phone: '(11) 97777-9012', role: 'Caixa', contractType: 'CLT', admissionDate: '2024-02-20', workSchedule: '08:00 - 17:00', photoUrl: '', active: true, facialRegistered: false },
  { id: 'e4', companyId: 'c2', name: 'Roberto Alves', cpf: '321.654.987-00', email: 'roberto@horizonte.com.br', phone: '(21) 96666-3456', role: 'Engenheiro', contractType: 'CLT', admissionDate: '2021-07-15', workSchedule: '07:00 - 16:00', photoUrl: '', active: true, facialRegistered: true },
  { id: 'e5', companyId: 'c2', name: 'Juliana Mendes', cpf: '654.321.987-00', email: 'juliana@horizonte.com.br', phone: '(21) 95555-7890', role: 'Mestre de Obras', contractType: 'CLT', admissionDate: '2022-11-01', workSchedule: '06:00 - 15:00', photoUrl: '', active: true, facialRegistered: true },
  { id: 'e6', companyId: 'c3', name: 'Fernanda Costa', cpf: '789.123.456-00', email: 'fernanda@vidasaudavel.com.br', phone: '(31) 94444-1234', role: 'Enfermeira', contractType: 'CLT', admissionDate: '2024-01-10', workSchedule: '07:00 - 19:00', photoUrl: '', active: true, facialRegistered: true },
  { id: 'e7', companyId: 'c3', name: 'Lucas Pereira', cpf: '147.258.369-00', email: 'lucas@vidasaudavel.com.br', phone: '(31) 93333-5678', role: 'Recepcionista', contractType: 'Estágio', admissionDate: '2024-09-01', workSchedule: '08:00 - 14:00', photoUrl: '', active: true, facialRegistered: false },
  { id: 'e8', companyId: 'c1', name: 'Patricia Rocha', cpf: '258.369.147-00', email: 'patricia@techstore.com.br', phone: '(11) 92222-9012', role: 'Estoquista', contractType: 'CLT', admissionDate: '2023-09-15', workSchedule: '08:00 - 17:00', photoUrl: '', active: false, facialRegistered: true },
];

// ---- TIME RECORDS ----
const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

export const timeRecords: TimeRecord[] = [
  { id: 'tr1', employeeId: 'e1', companyId: 'c1', date: today, type: 'entry', time: '07:58', lat: -23.5505, lng: -46.6333, withinRadius: true, facialMatch: true, status: 'approved' },
  { id: 'tr2', employeeId: 'e1', companyId: 'c1', date: today, type: 'break_start', time: '12:01', lat: -23.5505, lng: -46.6333, withinRadius: true, facialMatch: true, status: 'approved' },
  { id: 'tr3', employeeId: 'e1', companyId: 'c1', date: today, type: 'break_end', time: '13:00', lat: -23.5505, lng: -46.6333, withinRadius: true, facialMatch: true, status: 'approved' },
  { id: 'tr4', employeeId: 'e2', companyId: 'c1', date: today, type: 'entry', time: '09:15', lat: -23.5505, lng: -46.6333, withinRadius: true, facialMatch: true, status: 'approved' },
  { id: 'tr5', employeeId: 'e3', companyId: 'c1', date: today, type: 'entry', time: '08:02', lat: -23.5505, lng: -46.6333, withinRadius: true, facialMatch: true, status: 'approved' },
  { id: 'tr6', employeeId: 'e4', companyId: 'c2', date: today, type: 'entry', time: '06:55', lat: -22.9068, lng: -43.1729, withinRadius: true, facialMatch: true, status: 'approved' },
  { id: 'tr7', employeeId: 'e5', companyId: 'c2', date: today, type: 'entry', time: '06:10', lat: -22.9068, lng: -43.1729, withinRadius: false, facialMatch: true, status: 'pending' },
  { id: 'tr8', employeeId: 'e6', companyId: 'c3', date: today, type: 'entry', time: '07:00', lat: -19.9167, lng: -43.9345, withinRadius: true, facialMatch: true, status: 'approved' },
  // Yesterday
  { id: 'tr9', employeeId: 'e1', companyId: 'c1', date: yesterday, type: 'entry', time: '08:00', lat: -23.5505, lng: -46.6333, withinRadius: true, facialMatch: true, status: 'approved' },
  { id: 'tr10', employeeId: 'e1', companyId: 'c1', date: yesterday, type: 'break_start', time: '12:00', lat: -23.5505, lng: -46.6333, withinRadius: true, facialMatch: true, status: 'approved' },
  { id: 'tr11', employeeId: 'e1', companyId: 'c1', date: yesterday, type: 'break_end', time: '13:00', lat: -23.5505, lng: -46.6333, withinRadius: true, facialMatch: true, status: 'approved' },
  { id: 'tr12', employeeId: 'e1', companyId: 'c1', date: yesterday, type: 'exit', time: '17:05', lat: -23.5505, lng: -46.6333, withinRadius: true, facialMatch: true, status: 'approved' },
];

export const adjustmentRequests: AdjustmentRequest[] = [
  { id: 'ar1', employeeId: 'e1', date: yesterday, type: 'entry', correctTime: '07:55', reason: 'Relógio do ponto estava com problema', status: 'pending', createdAt: today },
  { id: 'ar2', employeeId: 'e4', date: yesterday, type: 'exit', correctTime: '16:30', reason: 'Esqueci de registrar saída', status: 'approved', createdAt: yesterday },
];

export const workSchedules: WorkSchedule[] = [
  { id: 'ws1', companyId: 'c1', name: 'Comercial', entryTime: '08:00', exitTime: '17:00', breakMinutes: 60, toleranceMinutes: 10, days: ['seg', 'ter', 'qua', 'qui', 'sex'] },
  { id: 'ws2', companyId: 'c2', name: 'Obra', entryTime: '06:00', exitTime: '15:00', breakMinutes: 60, toleranceMinutes: 15, days: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab'] },
  { id: 'ws3', companyId: 'c3', name: 'Plantão 12h', entryTime: '07:00', exitTime: '19:00', breakMinutes: 60, toleranceMinutes: 5, days: ['seg', 'qua', 'sex'] },
];

export const notifications: Notification[] = [
  { id: 'n1', title: 'Ponto registrado', message: 'Entrada registrada às 07:58', type: 'success', read: false, createdAt: today + 'T07:58:00' },
  { id: 'n2', title: 'Solicitação de ajuste', message: 'Maria Santos solicitou ajuste de ponto', type: 'info', read: false, createdAt: today + 'T09:00:00' },
  { id: 'n3', title: 'Atraso detectado', message: 'João Ferreira chegou 15 min atrasado', type: 'warning', read: true, createdAt: today + 'T09:16:00' },
  { id: 'n4', title: 'Fora da área', message: 'Juliana Mendes registrou ponto fora do raio', type: 'error', read: false, createdAt: today + 'T06:11:00' },
];

// Stats helpers
export const getCompanyStats = (companyId: string) => {
  const emps = employees.filter(e => e.companyId === companyId && e.active);
  const todayRecords = timeRecords.filter(r => r.companyId === companyId && r.date === today);
  const presentToday = new Set(todayRecords.map(r => r.employeeId)).size;
  const lateToday = todayRecords.filter(r => {
    if (r.type !== 'entry') return false;
    const hour = parseInt(r.time.split(':')[0]);
    const min = parseInt(r.time.split(':')[1]);
    return hour > 8 || (hour === 8 && min > 10);
  }).length;

  return {
    totalEmployees: emps.length,
    presentToday,
    absentToday: emps.length - presentToday,
    lateToday,
    recordsToday: todayRecords.length,
  };
};

export const getSuperAdminStats = () => ({
  totalCompanies: companies.length,
  totalUsers: employees.length,
  monthlyRevenue: 12580,
  growth: 18.5,
  activeCompanies: companies.filter(c => c.active).length,
});
