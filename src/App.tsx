
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import Appointment from "./pages/Appointment";
import Medicines from "./pages/Medicines";
import Chatbot from "./pages/Chatbot";
import Map from "./pages/Map";
import Prescriptions from "./pages/Prescriptions";
import MedicineReminders from "./pages/MedicineReminders";
import SchemeDetails from "./pages/SchemeDetails";
import DoctorForms from "./pages/DoctorForms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Public Route component (for login page)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={
      <PublicRoute>
        <Login />
      </PublicRoute>
    } />
    <Route path="/home" element={
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    } />
    <Route path="/doctors" element={
      <ProtectedRoute>
        <Doctors />
      </ProtectedRoute>
    } />
    <Route path="/doctor/:doctorId" element={
      <ProtectedRoute>
        <DoctorProfile />
      </ProtectedRoute>
    } />
    <Route path="/appointment" element={
      <ProtectedRoute>
        <Appointment />
      </ProtectedRoute>
    } />
    <Route path="/medicines" element={
      <ProtectedRoute>
        <Medicines />
      </ProtectedRoute>
    } />
    <Route path="/prescriptions" element={
      <ProtectedRoute>
        <Prescriptions />
      </ProtectedRoute>
    } />
    <Route path="/medicine-reminders" element={
      <ProtectedRoute>
        <MedicineReminders />
      </ProtectedRoute>
    } />
    <Route path="/chatbot" element={
      <ProtectedRoute>
        <Chatbot />
      </ProtectedRoute>
    } />
    <Route path="/scheme-details" element={
      <ProtectedRoute>
        <SchemeDetails />
      </ProtectedRoute>
    } />
    <Route path="/map" element={
      <ProtectedRoute>
        <Map />
      </ProtectedRoute>
    } />
    <Route path="/doctor-forms" element={
      <ProtectedRoute>
        <DoctorForms />
      </ProtectedRoute>
    } />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
