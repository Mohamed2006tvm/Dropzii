import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy Load Pages for Production Performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-background text-white selection:bg-accent selection:text-background">
          <Navbar />
          
          <main>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>


        <footer className="bg-primary/50 py-12 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-4 col-span-1 md:col-span-2">
              <h3 className="text-2xl font-black italic tracking-tighter">TAMIL<span className="text-accent">TAXI</span></h3>
              <p className="text-white/50 max-w-sm">
                Premium one-way taxi service across Tamil Nadu. Safe, reliable, and affordable rides for your outstation needs.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li><a href="/" className="hover:text-accent">Home</a></li>
                <li><a href="/services" className="hover:text-accent">Services</a></li>
                <li><a href="/about" className="hover:text-accent">About Us</a></li>
                <li><a href="/contact" className="hover:text-accent">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Coverage</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li>Chennai • Madurai</li>
                <li>Coimbatore • Trichy</li>
                <li>Salem • Tirupur</li>
                <li>Nagpur • Pondicherry</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-white/30 text-xs">
            © {new Date().getFullYear()} Tamil Taxi Travel Service. All rights reserved.
          </div>
        </footer>

        {/* Global Floating Actions */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
          <a 
            href="https://wa.me/91XXXXXXXXXX" 
            target="_blank" 
            className="bg-green-500 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
          >
            <MessageCircle className="text-white w-6 h-6" />
          </a>
          <a 
            href="tel:+91XXXXXXXXXX" 
            className="bg-accent p-4 rounded-full shadow-2xl hover:scale-110 transition-transform md:hidden"
          >
            <Phone className="text-background w-6 h-6" />
          </a>
        </div>
      </div>
    </Router>
  </ErrorBoundary>
);
}

export default App;
