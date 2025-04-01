
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  showLoginModal: () => void;
  LoginModal: React.FC;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { toast } = useToast();

  // Mock login function - in a real app this would call an API
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return false;
    }

    // In a real app, this would be an API call to validate credentials
    if (password === "password") { // Simple mock check
      const userData: User = {
        id: "1",
        name: email.split('@')[0],
        email: email,
        role: "customer"
      };
      
      setUser(userData);
      setIsLoggedIn(true);
      setShowModal(false);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name}!`,
      });
      
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Hint: password is 'password'",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const showLoginModal = () => {
    setShowModal(true);
  };

  // Login Modal Component
  const LoginModal: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
      setIsLoading(true);
      await login(email, password);
      setIsLoading(false);
    };

    return (
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              Please login to continue with your order.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                For demo: use any email with password "password"
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  // Provide the context value
  const contextValue: AuthContextType = {
    isLoggedIn,
    user,
    login,
    logout,
    showLoginModal,
    LoginModal
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
