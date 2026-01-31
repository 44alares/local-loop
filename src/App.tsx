import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Designer from "./pages/Designer";
import Maker from "./pages/Maker";
import Community from "./pages/Community";
import PrintMyDesign from "./pages/PrintMyDesign";
import StartCreating from "./pages/StartCreating";
import JoinAsMaker from "./pages/JoinAsMaker";
import NDATerms from "./pages/NDATerms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/designer" element={<Designer />} />
          <Route path="/maker" element={<Maker />} />
          <Route path="/community" element={<Community />} />
          <Route path="/make-my-design" element={<PrintMyDesign />} />
          <Route path="/start-creating" element={<StartCreating />} />
          <Route path="/join-as-maker" element={<JoinAsMaker />} />
          <Route path="/nda-terms" element={<NDATerms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
