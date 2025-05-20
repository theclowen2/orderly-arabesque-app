
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";
import Database from "./pages/Database";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Auth Guard component
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route path="/" element={<AuthRoute><Dashboard /></AuthRoute>} />
            <Route path="/users" element={<AuthRoute><Users /></AuthRoute>} />
            <Route path="/customers" element={<AuthRoute><Customers /></AuthRoute>} />
            <Route path="/products" element={<AuthRoute><Products /></AuthRoute>} />
            <Route path="/orders" element={<AuthRoute><Orders /></AuthRoute>} />
            <Route path="/reports" element={<AuthRoute><Reports /></AuthRoute>} />
            <Route path="/database" element={<AuthRoute><Database /></AuthRoute>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
