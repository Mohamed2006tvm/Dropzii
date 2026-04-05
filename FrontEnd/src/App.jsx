import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import { MessageCircle, Phone } from "lucide-react";

// Lazy Load Pages for Production Performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const PopularRoutes = lazy(() => import("./pages/PopularRoutes"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ScrollToTop component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-background text-white selection:bg-accent selection:text-background">
          <Navbar />
          
          <main>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/popular-routes" element={<PopularRoutes />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>


        <footer className="bg-primary/50 py-12 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-4 col-span-1 md:col-span-2">
              <Link to="/" className="block">
                <img src="/assets/logo1.png" alt="Dropzii" className="h-20 md:h-24 object-contain -ml-2" />
              </Link>
              <p className="text-white/50 max-w-sm">
                Premium one-way taxi service across South India (TN, KL, KA, AP). Safe, reliable, and affordable rides for all your travel needs.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li><Link to="/" className="hover:text-accent">Home</Link></li>
                <li><Link to="/popular-routes" className="hover:text-accent">Popular Routes</Link></li>
                <li><Link to="/services" className="hover:text-accent">Services</Link></li>
                <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Coverage</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li>Chennai • Madurai</li>
                <li>Coimbatore • Trichy</li>
                <li>Bangalore • Kochi</li>
                <li>Hyderabad • Pondicherry</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-white/30 text-xs">
            © {new Date().getFullYear()} Dropzii Taxi Service. All rights reserved.
          </div>
        </footer>

        {/* Global Floating Actions */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
          <a 
            href="https://wa.me/919442059952" 
            target="_blank" 
            className="bg-green-500 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
          >
            <MessageCircle className="text-white w-6 h-6" />
          </a>
          <a 
            href="tel:+919442059952" 
            className="bg-accent p-4 rounded-full shadow-2xl hover:scale-110 transition-transform md:hidden"
          >
            <Phone className="text-background w-6 h-6" />
          </a>
        </div>
      </div>
    </Router>
  </ToastProvider>
</ErrorBoundary>
);
}

export default App;
