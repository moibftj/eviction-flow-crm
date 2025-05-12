
import React, { useState } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import SidebarNav from "@/components/common/sidebar/SidebarNav";
import HeaderNav from "@/components/common/header/HeaderNav";
import LoadingState from "@/components/common/layout/LoadingState";

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  
  // Redirect to login if not authenticated
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  // Show loading state while checking auth
  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarNav 
        user={user}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <HeaderNav />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
