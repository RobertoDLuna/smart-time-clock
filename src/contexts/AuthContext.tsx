import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '@/data/mock';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId?: string;
  companyName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const mockUsers: Record<UserRole, User> = {
  super_admin: { id: 'u0', name: 'Admin Sistema', email: 'superadmin@pontosync.com', role: 'super_admin' },
  admin: { id: 'u1', name: 'Carlos Silva', email: 'admin@techstore.com.br', role: 'admin', companyId: 'c1', companyName: 'TechStore Ltda' },
  manager: { id: 'u2', name: 'João Ferreira', email: 'joao@techstore.com.br', role: 'manager', companyId: 'c1', companyName: 'TechStore Ltda' },
  employee: { id: 'e1', name: 'Maria Santos', email: 'maria@techstore.com.br', role: 'employee', companyId: 'c1', companyName: 'TechStore Ltda' },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => setUser(mockUsers[role]);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
