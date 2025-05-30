import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "@/hooks/toast-provider";
import { AuthProvider } from "@/context/AuthContext";
import { CRMProvider } from "@/context/CRMContext";
import MainLayout from "@/components/common/MainLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import CaseDetails from "./pages/CaseDetails";
import NewLeadIntake from "./pages/NewLeadIntake";
import Contacts from "./pages/Contacts";
import CreateContact from "./pages/CreateContact";
import Properties from "./pages/Properties";
import Documents from "./pages/Documents";
import CalendarPage from "./pages/CalendarPage";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Toaster />
          <Sonner />
          <TooltipProvider>
            <AuthProvider>
              <CRMProvider>
                <BrowserRouter>
                  <Routes>
                    {/* Auth Routes */}
                    <Route path="/login" element={<Login />} />
                    
                    {/* App Routes - All wrapped in MainLayout */}
                    <Route element={<MainLayout />}>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/cases" element={<Cases />} />
                      <Route path="/cases/:id" element={<CaseDetails />} />
                      <Route path="/cases/:id/edit" element={<NewLeadIntake />} />
                      <Route path="/new-lead" element={<NewLeadIntake />} />
                      <Route path="/contacts" element={<Contacts />} />
                      <Route path="/contacts/new/:type" element={<CreateContact />} />
                      <Route path="/properties" element={<Properties />} />
                      <Route path="/documents" element={<Documents />} />
                      <Route path="/calendar" element={<CalendarPage />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/settings" element={<Settings />} />
                      {/* Redirect /notifications to dashboard for now */}
                      <Route path="/notifications" element={<Navigate to="/" replace />} />
                    </Route>
                    
                    {/* Fallback Routes */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </CRMProvider>
            </AuthProvider>
          </TooltipProvider>
        </ToastProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;