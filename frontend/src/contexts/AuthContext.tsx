'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('shipshare_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call an API
    const mockUser: User = {
      id: '1',
      name: 'John Odallo',
      email: email,
      phone: '+254 712 345 678',
      location: 'Nairobi, CBD',
      joinDate: new Date(),
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('shipshare_user', JSON.stringify(mockUser));
    // Set cookie for middleware
    document.cookie = 'shipshare_user=true; path=/; max-age=86400';
    return true;
  };

  const signup = async (userData: Partial<User>): Promise<boolean> => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      location: userData.location || '',
      joinDate: new Date(),
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('shipshare_user', JSON.stringify(newUser));
    // Set cookie for middleware
    document.cookie = 'shipshare_user=true; path=/; max-age=86400';
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('shipshare_user');
    // Clear cookie
    document.cookie = 'shipshare_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};