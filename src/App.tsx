
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CRMProvider } from "@/context/CRMContext";
import MainLayout from "@/components/common/MainLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import CaseDetails from "./pages/CaseDetails";
import NewLeadIntake from "./pages/NewLeadIntake";
import Contacts from "./pages/Contacts";
import Properties from "./pages/Properties";
import CalendarPage from "./pages/CalendarPage";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CRMProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* App Routes - All wrapped in MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/cases/:id" element={<CaseDetails />} />
              <Route path="/new-lead" element={<NewLeadIntake />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            
            {/* Fallback Routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CRMProvider>
  </QueryClientProvider>
);

export default App;
