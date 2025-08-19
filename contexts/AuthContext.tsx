import { GoogleAuthService } from "@/services/googleAuth";
import { User } from "@/types/user";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (authCode: string) => void;
  signOut: () => void;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
  isLoading: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const googleAuthService = GoogleAuthService.getInstance();

  useEffect(() => {
    checkStoredAuth();
  }, []);

  const checkStoredAuth = async () => {
    try {
      setIsLoading(true);
      const storedToken = await googleAuthService.getStoredToken();
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      const isValid = await googleAuthService.validateToken(storedToken);
      if (!isValid) {
        await googleAuthService.removeStoredToken();
        setIsLoading(false);
        return;
      }

      const userData = await googleAuthService.getUserData(storedToken);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Error checking stored auth:", err);
      setError('Failed to check authentication');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const demoSignIn = () => {
    console.log("Demo sign-in initiated");
    setIsLoading(true);

    setTimeout(() => {
      const demoUser: User = {
      id: "demo-user-id",
      name: "Demo User",
      email: "demo@example.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUser(demoUser);
    setIsLoading(false);
    setIsAuthenticated(true);
      console.log("Demo sign-in completed");
    }, 1000);


  };

  const signIn = async (authCode: string) => {
    demoSignIn();
    // try {
    //   setIsLoading(true);
    //   setError(null);

    //   const authResponse = await googleAuthService.exchangeCodeForToken(authCode);

    //   if (!authResponse.success) {
    //     throw new Error(authResponse.message || 'Sign-in failed');
    //   }

    //   await googleAuthService.storeToken(authResponse.token);
    // } catch (err) {
    //   console.error("Error during sign-in:", err);
    //   setError('Sign-in failed');
    //   return;
    // }
  };

  const signOut = () => {
    console.log("Signing out...");
    setUser(null);
    setIsAuthenticated(false);
  };

  const fetchWithAuth = async (url: string, options?: RequestInit) => Promise.resolve(new Response());

  const value: AuthContextType = {
    isAuthenticated,
    user,
    signIn,
    signOut,
    fetchWithAuth,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
