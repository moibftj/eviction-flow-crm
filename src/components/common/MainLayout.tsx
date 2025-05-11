
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { 
  Calendar, 
  FileText, 
  Home,
  Users,
  Database,
  ChartBar,
  Bell,
  Menu,
  X,
  LogOut,
  Settings,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading, signOut } = useAuth();
  
  // Redirect to login if not authenticated
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="space-y-4">
          <Skeleton className="h-12 w-12 rounded-full mx-auto" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px] mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Eviction Consultation CRM</h2>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => navigate("/new-lead")}
                >
                  + Add New Lead
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/settings")}
                >
                  <User size={20} />
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
