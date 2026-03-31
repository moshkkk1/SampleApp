import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
  user: any;
  login: (login: string, password: string) => Promise<void>;
  register: (login: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  const login = async (login: string, password: string) => {
    // Ваша логика логина
    console.log('Login:', login, password);
  };

  const register = async (login: string, password: string) => {
    // Ваша логика регистрации
    console.log('Register:', login, password);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};