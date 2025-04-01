
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
  checkAdminRights: () => boolean;
  checkHRAccess: () => boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
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

    // Admin login check
    if (email === "admin@kamuthanga-farm.com" && password === "adminpassword") {
      const adminUser: User = {
        id: "admin1",
        name: "Admin User",
        email: email,
        role: "admin",
        permissions: ["all", "hr_manage", "product_edit", "user_manage"]
      };
      
      setUser(adminUser);
      setIsLoggedIn(true);
      setShowModal(false);
      
      toast({
        title: "Admin Login Successful",
        description: `Welcome back, Admin! You have full access to the system.`,
      });
      
      return true;
    }
    
    // HR manager login
    else if (email === "hr@kamuthanga-farm.com" && password === "hrpassword") {
      const hrUser: User = {
        id: "hr1",
        name: "HR Manager",
        email: email,
        role: "hr",
        permissions: ["hr_view", "hr_edit", "employee_manage"]
      };
      
      setUser(hrUser);
      setIsLoggedIn(true);
      setShowModal(false);
      
      toast({
        title: "HR Login Successful",
        description: `Welcome back, HR Manager!`,
      });
      
      return true;
    }
    
    // Regular user login
    else if (password === "password") { // Simple mock check
      const userData: User = {
        id: "1",
        name: email.split('@')[0],
        email: email,
        role: "customer",
        permissions: ["view_products", "place_orders"]
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
        description: "Invalid email or password. Try 'admin@kamuthanga-farm.com' with 'adminpassword' for admin access.",
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

  // Check if user has admin rights
  const checkAdminRights = () => {
    return user?.role === "admin";
  };
  
  // Check if user has HR access
  const checkHRAccess = () => {
    return user?.role === "admin" || user?.role === "hr";
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
              Please login to continue. Use admin credentials for admin access.
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
              <div className="text-xs text-muted-foreground space-y-1">
                <p>For demo use:</p>
                <ul className="list-disc list-inside pl-2">
                  <li><strong>Admin:</strong> admin@kamuthanga-farm.com / adminpassword</li>
                  <li><strong>HR Manager:</strong> hr@kamuthanga-farm.com / hrpassword</li>
                  <li><strong>Customer:</strong> Any email with password "password"</li>
                </ul>
              </div>
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
    LoginModal,
    checkAdminRights,
    checkHRAccess
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
