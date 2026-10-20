/**
 * CHEETA JEWELS / ICON LIVIN: App Router & Root Providers
 * Radical luxury minimalism with dedicated art-directed collection destinations.
 */
import { useEffect, Suspense, lazy } from "react";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import SmoothScroll from "./components/SmoothScroll";
import VIPGatekeeper from "./components/VIPGatekeeper";

const Home = lazy(() => import("./pages/Home"));
const CollectionDetail = lazy(() => import("./pages/CollectionDetail"));
const Retail = lazy(() => import("./pages/Retail"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Philosophy = lazy(() => import("./pages/Philosophy"));
const Hayrat = lazy(() => import("./pages/Hayrat"));
const Cart = lazy(() => import("./pages/Cart"));
const Founder = lazy(() => import("./pages/Founder"));
const Film = lazy(() => import("./pages/Film"));
const House = lazy(() => import("./pages/House"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Returns = lazy(() => import("./pages/Returns"));
const Care = lazy(() => import("./pages/Care"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-[#F4F1E8]" />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/collection/:id" component={CollectionDetail} />
          <Route path="/collection" component={CollectionDetail} />
          <Route path="/retail" component={Retail} />
          <Route path="/eyewear" component={Retail} />
          <Route path="/product/:slug" component={ProductDetail} />
          <Route path="/philosophy" component={Philosophy} />
          <Route path="/story" component={Philosophy} />
          <Route path="/founder" component={Founder} />
          <Route path="/hayrat" component={Hayrat} />
          <Route path="/cart" component={Cart} />
          <Route path="/film" component={Film} />
          <Route path="/house" component={House} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/returns" component={Returns} />
          <Route path="/care" component={Care} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/accessibility" component={Accessibility} />
          {/* Fallback route */}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <ThemeProvider defaultTheme="light">
          <CartProvider>
            <TooltipProvider>
              <Toaster position="bottom-right" />
              <SmoothScroll>
                <VIPGatekeeper>
                  <Router />
                </VIPGatekeeper>
              </SmoothScroll>
            </TooltipProvider>
          </CartProvider>
        </ThemeProvider>
      </MotionConfig>
    </ErrorBoundary>
  );
}

export default App;
