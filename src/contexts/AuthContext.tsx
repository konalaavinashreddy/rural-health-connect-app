
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor';
  specialty?: string;
  hospital?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'patient' | 'doctor') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'patient' | 'doctor'): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simple demo authentication - check against demo accounts
      if (role === 'patient' && email === 'patient@example.com' && password === '1234') {
        const patientUser: User = {
          id: '1',
          email: 'patient@example.com',
          name: 'Demo Patient',
          role: 'patient'
        };
        setUser(patientUser);
        localStorage.setItem('user', JSON.stringify(patientUser));
        return true;
      } else if (role === 'doctor' && email === 'doctor@example.com' && password === '1234') {
        const doctorUser: User = {
          id: '1',
          email: 'doctor@example.com',
          name: 'Dr. Demo Doctor',
          role: 'doctor',
          specialty: 'General Physician',
          hospital: 'Demo Hospital'
        };
        setUser(doctorUser);
        localStorage.setItem('user', JSON.stringify(doctorUser));
        return true;
      }
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
