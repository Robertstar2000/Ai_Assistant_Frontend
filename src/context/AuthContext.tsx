import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserMetadata } from '../types/auth';
import * as authService from '../lib/auth';

interface AuthContextType {
  user: { id: string; email: string; user_metadata: UserMetadata } | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: UserMetadata) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser({
        id: currentUser.id,
        email: currentUser.email,
        user_metadata: currentUser.metadata,
      });
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, userData: UserMetadata) => {
    await authService.signUp(email, password, userData);
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser({
        id: currentUser.id,
        email: currentUser.email,
        user_metadata: currentUser.metadata,
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    const currentUser = await authService.signIn(email, password);
    setUser({
      id: currentUser.id,
      email: currentUser.email,
      user_metadata: currentUser.metadata,
    });
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {!loading && children}
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