// src/contexts/AuthContext.tsx
import React, { useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { 
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase/firebase";

// Types pour TypeScript
interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Créer le contexte avec un type par défaut
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Provider du contexte d'authentification
export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fonction d'inscription - Firebase v9 syntax
  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Fonction de connexion - Firebase v9 syntax
  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Fonction de déconnexion - Firebase v9 syntax
  function logout() {
    return signOut(auth);
  }

  // Fonction de réinitialisation du mot de passe - Firebase v9 syntax
  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  // Fonction de mise à jour de l'email - Firebase v9 syntax
  function updateUserEmail(email: string) {
    if (!currentUser) {
      throw new Error("No user is currently signed in");
    }
    return updateEmail(currentUser, email);
  }

  // Fonction de mise à jour du mot de passe - Firebase v9 syntax
  function updateUserPassword(password: string) {
    if (!currentUser) {
      throw new Error("No user is currently signed in");
    }
    return updatePassword(currentUser, password);
  }

  // Effect pour écouter les changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup function
    return unsubscribe;
  }, []);

  // Valeurs à fournir au contexte
  const value: AuthContextType = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail: updateUserEmail,
    updatePassword: updateUserPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}