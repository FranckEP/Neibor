import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config'; // Adjust the import based on your project structure
import { onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  user: any; // Replace 'any' with your user type if you have one
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser ] = useState<any>(null); // Replace 'any' with your user type if you have one
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser (user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
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