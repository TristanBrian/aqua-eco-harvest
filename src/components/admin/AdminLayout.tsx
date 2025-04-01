
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, Settings, Home, LogOut, Menu, X, 
  Fish, BarChart, FileText, Image, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admin" },
    { icon: Users, label: "HR Management", path: "/admin/hr" },
    { icon: Fish, label: "Production", path: "/admin/production" },
    { icon: BarChart, label: "Analytics", path: "/admin/analytics" },
    { icon: FileText, label: "Reports", path: "/admin/reports" },
    { icon: Image, label: "Gallery", path: "/admin/gallery" },
    { icon: Phone, label: "Inquiries", path: "/admin/inquiries" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];
  
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-aqua-950 text-white z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-aqua-800">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Kamuthanga</span>
              <span className="text-sm font-medium text-aqua-300">Admin</span>
            </Link>
          </div>
          
          <div className="py-6 flex-1 overflow-y-auto">
            <nav className="px-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                    location.pathname === item.path
                      ? "bg-aqua-800 text-white"
                      : "text-aqua-100 hover:bg-aqua-900 hover:text-white"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-aqua-800">
            <Button
              variant="ghost"
              className="w-full justify-start text-aqua-100 hover:text-white hover:bg-aqua-900"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <div className="ml-auto flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-slate-500">admin@kamuthanga-farm.com</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-aqua-100 flex items-center justify-center">
              <span className="text-primary font-medium text-sm">AU</span>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
