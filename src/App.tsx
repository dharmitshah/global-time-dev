
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "./components/Navigation";
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
import EventLinkPage from "./pages/EventLinkPage";
import EventLinkViewPage from "./pages/EventLinkViewPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import usePageMeta from "./hooks/usePageMeta";

const queryClient = new QueryClient();

// RouteChangeTracker for analytics and search engines
const RouteChangeTracker = () => {
  const location = useLocation();
  
  // Apply meta tags for the current route
  usePageMeta();
  
  useEffect(() => {
    // This helps search engines understand your SPA routes
    // by sending a special signal that content has changed
    const pushState = history.pushState;
    history.pushState = function() {
      pushState.apply(history, arguments);
      
      // Create and dispatch a custom popstate event
      // This can help some crawlers understand that the page content has changed
      const popStateEvent = new PopStateEvent('popstate', { state: {} });
      dispatchEvent(popStateEvent);
      
      // If Google Analytics is added, you can track page views here
      if (window.gtag) {
        window.gtag('config', 'G-L1608V417G', {
          page_path: location.pathname + location.search
        });
      }
    };
    
    return () => {
      history.pushState = pushState; // Restore the original function when unmounting
    };
  }, [location]);
  
  return null;
};

// Setup for prerendering optimization
const AppRoutes = () => {
  // Apply route tracking and meta updates
  return (
    <>
      <RouteChangeTracker />
      <Navigation />
      <main className="container max-w-6xl mx-auto px-4 py-8">
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
          <Route path="/eventlink" element={<EventLinkPage />} />
          <Route path="/eventlink/view/:id" element={<EventLinkViewPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
