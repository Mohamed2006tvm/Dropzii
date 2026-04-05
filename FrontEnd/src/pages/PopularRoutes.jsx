import { MapPin, Clock, IndianRupee, Shield, Zap, ChevronRight, Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from "../utils/animations";
import SEO from "../components/SEO";

export default function PopularRoutes() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const routes = [
    { from: "Chennai", to: "Pondicherry", distance: "150 km", price: "2500", time: "3 hrs", tag: "Coastal Scenic" },
    { from: "Chennai", to: "Bangalore", distance: "350 km", price: "5500", time: "6 hrs", tag: "Business Hub" },
    { from: "Coimbatore", to: "Ooty", distance: "85 km", price: "1800", time: "3 hrs", tag: "Hill Station" },
    { from: "Madurai", to: "Rameswaram", distance: "170 km", price: "3000", time: "4 hrs", tag: "Pilgrimage" },
    { from: "Trichy", to: "Chennai", distance: "330 km", price: "5000", time: "6 hrs", tag: "State Capital" },
    { from: "Bangalore", to: "Mysore", distance: "145 km", price: "2200", time: "3 hrs", tag: "Heritage" },
    { from: "Chennai", to: "Tirupati", distance: "135 km", price: "2400", time: "3 hrs", tag: "Pilgrimage" },
    { from: "Coimbatore", to: "Kodaikanal", distance: "175 km", price: "3200", time: "5 hrs", tag: "Popular Hilltop" }
  ];

  const filteredRoutes = routes.filter(r =>
    r.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookRoute = (route) => {
    navigate(`/?pickup=${encodeURIComponent(route.from)}&drop=${encodeURIComponent(route.to)}#booking`);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-background">
      <SEO 
        title="Popular Taxi Routes - Best Prices in South India" 
        description="Browse our most popular taxi routes across Chennai, Bangalore, Madurai, and more. Transparent pricing and instant WhatsApp booking for all South India travels." 
      />
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-7xl mx-auto text-center space-y-6 relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight balance">
            Popular Taxi <span className="text-accent underline decoration-white/5">Routes</span> in South India
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Book the most travelled routes at the best price with verified drivers across TN, KL, KA, and AP.
          </p>

          <div className="max-w-md mx-auto relative pt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your city/route..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent/40 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>
      </section>

      {/* Routes Grid */}
      <section className="py-12 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredRoutes.map((route, i) => (
                <motion.div
                  layout
                  key={`${route.from}-${route.to}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="route-item group bg-[#0A0F1A] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl flex flex-col relative overflow-hidden hover:border-accent/40 hover:bg-[#0D1424] transition-colors duration-500"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[60px] group-hover:bg-accent/10 transition-colors pointer-events-none" />

                  <div className="flex justify-between items-center mb-8">
                    <span className="bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] text-accent">
                      {route.tag}
                    </span>
                    <div className="bg-white/5 p-2 rounded-lg text-white/20 group-hover:text-accent transition-colors">
                      <MapPin size={16} />
                    </div>
                  </div>

                  <div className="flex gap-4 mb-8">
                    <div className="flex flex-col items-center py-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                      <div className="w-px flex-1 bg-gradient-to-b from-accent to-white/10 my-1" />
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-white/20" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Pickup</h4>
                        <p className="text-xl font-bold text-white leading-none">{route.from}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Destination</h4>
                        <p className="text-xl font-bold text-white leading-none">{route.to}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-8 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-accent/60" />
                      <span className="text-sm font-medium text-white/60">{route.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-accent/60" />
                      <span className="text-sm font-medium text-white/60">{route.distance}</span>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Starting from</span>
                      <span className="text-3xl font-bold text-white tracking-tight italic">₹{route.price}<span className="text-accent text-sm not-italic">*</span></span>
                    </div>

                    <button
                      onClick={() => handleBookRoute(route)}
                      className="w-full bg-accent text-luxury-charcoal font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-accent-glow flex items-center justify-center gap-2 group/btn uppercase text-xs tracking-widest"
                    >
                      Select Route
                      <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredRoutes.length === 0 && (
            <div className="text-center py-20 opacity-30">
              <p className="text-xl font-bold italic">No routes found for your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-glass/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-12"
          >
            {[
              { icon: <Clock />, title: "24/7 Service", desc: "Available anytime for your travel." },
              { icon: <Shield />, title: "Verified Drivers", desc: "Background checked & professional." },
              { icon: <IndianRupee />, title: "Transparent Pricing", desc: "No hidden costs, fixed fares." },
              { icon: <Zap />, title: "Fast Booking", desc: "Instant confirmation via WhatsApp." }
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="text-center space-y-4 group"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto group-hover:scale-110 group-hover:bg-accent group-hover:text-luxury-charcoal transition-all duration-500 shadow-inner">
                  {f.icon}
                </div>
                <h4 className="text-xl font-bold tracking-tight">{f.title}</h4>
                <p className="text-white/30 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-24 px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          variants={scaleIn}
          className="max-w-5xl mx-auto rounded-[2.5rem] md:rounded-[3rem] bg-accent p-8 md:p-16 text-luxury-charcoal text-center space-y-6 md:space-y-8 relative overflow-hidden group shadow-accent-glow"
        >
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-white/20 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight leading-none">Ready to Ride?</h2>
          <p className="text-lg md:text-2xl font-bold opacity-80 max-w-xl mx-auto leading-relaxed">
            Experience the smoothest long-distance travel in South India. One-way or Routine.
          </p>
          <button
            onClick={() => navigate('/#booking')}
            className="bg-luxury-charcoal text-white font-bold px-6 py-4 md:px-10 md:py-5 rounded-2xl hover:scale-105 transition-all inline-flex items-center gap-2 shadow-2xl text-base md:text-lg uppercase tracking-wider w-full md:w-auto justify-center"
          >
            Book Your Journey Now <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </motion.div>
      </section>
    </div>
  );
}
