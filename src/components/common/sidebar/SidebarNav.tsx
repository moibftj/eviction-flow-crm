
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  FileText, 
  Home,
  Users,
  Database,
  ChartBar,
  Bell,
  LogOut,
  Settings,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@supabase/supabase-js";

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
  
  return (
    <div 
      className={`bg-sidebar text-sidebar-foreground ${
        sidebarOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out flex-shrink-0`}
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
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-2'} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
                onClick={() => navigate("/")}
              >
                <Home size={20} />
                {sidebarOpen && <span className="ml-3">Dashboard</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-2'} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
                onClick={() => navigate("/cases")}
              >
                <FileText size={20} />
                {sidebarOpen && <span className="ml-3">Cases</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-2'} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
                onClick={() => navigate("/contacts")}
              >
                <Users size={20} />
                {sidebarOpen && <span className="ml-3">Contacts</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-2'} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
                onClick={() => navigate("/properties")}
              >
                <Database size={20} />
                {sidebarOpen && <span className="ml-3">Properties</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-2'} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
                onClick={() => navigate("/calendar")}
              >
                <Calendar size={20} />
                {sidebarOpen && <span className="ml-3">Calendar</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-2'} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
                onClick={() => navigate("/reports")}
              >
                <ChartBar size={20} />
                {sidebarOpen && <span className="ml-3">Reports</span>}
              </Button>
            </li>
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
                className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-2'} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
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
    </div>
  );
};

export default SidebarNav;
