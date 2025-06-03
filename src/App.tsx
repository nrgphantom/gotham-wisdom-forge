
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import Justice from "./pages/Justice";
import Finance from "./pages/Finance";
import Health from "./pages/Health";
import AskBatman from "./pages/AskBatman";
import Missions from "./pages/Missions";
import Donate from "./pages/Donate";
import Tools from "./pages/Tools";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on server errors, redirect to home instead
        if (error instanceof Error && error.message.includes('Server error')) {
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
          return false;
        }
        return failureCount < 2;
      }
    }
  }
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/justice" element={<Justice />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/health" element={<Health />} />
            <Route path="/askbatman" element={<AskBatman />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/tools" element={<Tools />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
