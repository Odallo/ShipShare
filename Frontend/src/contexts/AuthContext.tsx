'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { createBrowserSupabase } from '@/lib/supabase';

let _browserSupabase: ReturnType<typeof createBrowserSupabase> | null = null;

function getBrowserSupabase() {
  if (typeof window === 'undefined') return null;
  if (!_browserSupabase) _browserSupabase = createBrowserSupabase();
  return _browserSupabase;
}

interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  location?: string;
  userType?: 'individual' | 'business';
  businessName?: string;
  businessRegistration?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: SignupData) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'containershare_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    }
  }, []);

  const persistUser = (u: User) => {
    setUser(u);
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const { error: signInError } = await getBrowserSupabase()!.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error('Login error:', signInError.message);
      return false;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      persistUser(data.user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (userData: SignupData): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Signup error:', error.error);
        return false;
      }

      const data = await response.json();
      persistUser(data.user);

      const { error: signInError } = await getBrowserSupabase()!.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });

      if (signInError) {
        console.error('Auto sign-in after signup failed:', signInError.message);
      }

      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = async () => {
    await getBrowserSupabase()?.auth.signOut();
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }

    setUser(null);
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates, updatedAt: new Date().toISOString() };
    persistUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
