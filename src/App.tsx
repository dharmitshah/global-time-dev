
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MeetingSchedulerPage from "./pages/MeetingSchedulerPage";
import UTCtoIST from "./pages/UTCtoIST";
import UTCtoEST from "./pages/UTCtoEST";
import TimeZoneConverterForDevelopers from "./pages/TimeZoneConverterForDevelopers";
import WorldClockSyncTool from "./pages/WorldClockSyncTool";
import TimeZoneTravelPlanner from "./pages/TimeZoneTravelPlanner";
import TimeZoneHistory from "./pages/TimeZoneHistory";
import BusinessHoursCalculator from "./pages/BusinessHoursCalculator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/meeting-scheduler" element={<MeetingSchedulerPage />} />
          <Route path="/utc-to-ist" element={<UTCtoIST />} />
          <Route path="/utc-to-est" element={<UTCtoEST />} />
          <Route path="/time-zone-converter-for-developers" element={<TimeZoneConverterForDevelopers />} />
          <Route path="/world-clock-sync-tool" element={<WorldClockSyncTool />} />
          <Route path="/time-zone-travel-planner" element={<TimeZoneTravelPlanner />} />
          <Route path="/time-zone-history" element={<TimeZoneHistory />} />
          <Route path="/business-hours-calculator" element={<BusinessHoursCalculator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
