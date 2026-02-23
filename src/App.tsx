import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Designer from "./pages/Designer";
import Maker from "./pages/Maker";
import Community from "./pages/Community";
import Blog from "./pages/Blog";
import PrintMyDesign from "./pages/PrintMyDesign";
import StartCreating from "./pages/StartCreating";
import JoinAsMaker from "./pages/JoinAsMaker";
import NDATerms from "./pages/NDATerms";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import FoundersClub from "./pages/FoundersClub";
import Shipping from "./pages/Shipping";
import NotFound from "./pages/NotFound";
import DesignerTerms from "./pages/DesignerTerms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import RALEquivalents from "./pages/RALEquivalents";
import { lazy, Suspense } from "react";
const Tailored = lazy(() => import("./pages/Tailored"));
const TailoredConfigurator = lazy(() => import("./pages/TailoredConfigurator"));

// Hub pages
import HubLayout from "./pages/hub/HubLayout";
import HubOverview from "./pages/hub/HubOverview";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/designer" element={<Designer />} />
          <Route path="/maker" element={<Maker />} />
          <Route path="/community" element={<Community />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/make-my-design" element={<PrintMyDesign />} />
          <Route path="/start-creating" element={<StartCreating />} />
          <Route path="/join-as-maker" element={<JoinAsMaker />} />
          <Route path="/nda-terms" element={<NDATerms />} />
          <Route path="/designer-terms" element={<DesignerTerms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/founders-club" element={<FoundersClub />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/ral-equivalents" element={<RALEquivalents />} />
          <Route path="/tailored" element={<Suspense fallback={null}><Tailored /></Suspense>} />
          <Route path="/tailored/:product" element={<Suspense fallback={null}><TailoredConfigurator /></Suspense>} />
          {/* Community Hub */}
          <Route path="/hub" element={<HubLayout />}>
            <Route index element={<HubOverview />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);
export default App;
