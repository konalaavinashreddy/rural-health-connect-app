
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Index />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctor/:doctorId" element={<DoctorProfile />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/medicine-reminders" element={<MedicineReminders />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/scheme-details" element={<SchemeDetails />} />
            <Route path="/map" element={<Map />} />
            <Route path="/doctor-forms" element={<DoctorForms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
