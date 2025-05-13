
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Calendar, 
  FileText, 
  Home,
  Users,
  Building,
  ChartBar,
  Bell,
  LogOut,
  Settings,
  Menu,
  X,
  FileUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@supabase/supabase-js";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarNavProps {
  user: User | null;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ 
  user, 
  sidebarOpen, 
  toggleSidebar,
  handleLogout 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/cases", label: "Cases", icon: FileText },
    { path: "/contacts", label: "Contacts", icon: Users },
    { path: "/properties", label: "Properties", icon: Building },
    { path: "/documents", label: "Documents", icon: FileUp },
    { path: "/calendar", label: "Calendar", icon: Calendar },
    { path: "/reports", label: "Reports", icon: ChartBar },
  ];
  
  const isPathActive = (path: string) => {
    // For exact match
    if (location.pathname === path) return true;
    
    // For nested routes (except for root path)
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    
    return false;
  };
  
  return (
    <aside 
      className={`bg-sidebar text-sidebar-foreground flex flex-col h-full transition-all duration-300 ease-in-out ${
        sidebarOpen ? "w-64" : isMobile ? "w-0 overflow-hidden" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold text-sidebar-foreground">Eviction CRM</h1>
          ) : (
            <h1 className="text-xl font-bold text-sidebar-foreground">CRM</h1>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            className="text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        
        {/* User profile */}
        <div className={`p-4 border-b border-sidebar-border ${sidebarOpen ? 'flex items-center' : 'flex flex-col items-center'}`}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name || user?.email} />
            <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          {sidebarOpen && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.user_metadata?.full_name || 'User'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          )}
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Button 
                  variant={isPathActive(item.path) ? "secondary" : "ghost"}
                  className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-2'} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                    isPathActive(item.path) ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon size={20} />
                  {sidebarOpen && <span className="ml-3">{item.label}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <ul className="space-y-2">
            <li>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-2'} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
                onClick={() => navigate("/notifications")}
              >
                <Bell size={20} />
                {sidebarOpen && <span className="ml-3">Notifications</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-2'} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                  isPathActive("/settings") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                }`}
                onClick={() => navigate("/settings")}
              >
                <Settings size={20} />
                {sidebarOpen && <span className="ml-3">Settings</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-2'} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
                onClick={handleLogout}
              >
                <LogOut size={20} />
                {sidebarOpen && <span className="ml-3">Log Out</span>}
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;
