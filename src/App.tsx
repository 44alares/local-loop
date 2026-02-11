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
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import FoundersClub from "./pages/FoundersClub";
import NotFound from "./pages/NotFound";

// Hub pages
import HubLayout from "./pages/hub/HubLayout";
import HubOverview from "./pages/hub/HubOverview";
import HubGroupBuys from "./pages/hub/HubGroupBuys";
import HubDeals from "./pages/hub/HubDeals";
import HubSuppliers from "./pages/hub/HubSuppliers";
import HubResources from "./pages/hub/HubResources";
import HubCommunity from "./pages/hub/HubCommunity";
import HubMembership from "./pages/hub/HubMembership";
import HubFaq from "./pages/hub/HubFaq";

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
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/founders-club" element={<FoundersClub />} />
          {/* Member Hub */}
          <Route path="/hub" element={<HubLayout />}>
            <Route index element={<HubOverview />} />
            <Route path="group-buys" element={<HubGroupBuys />} />
            <Route path="deals" element={<HubDeals />} />
            <Route path="suppliers" element={<HubSuppliers />} />
            <Route path="resources" element={<HubResources />} />
            <Route path="community" element={<HubCommunity />} />
            <Route path="membership" element={<HubMembership />} />
            <Route path="faq" element={<HubFaq />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
