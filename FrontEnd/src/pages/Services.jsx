import React from "react";
import { Shield, Clock, Award, Target, ChevronRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "../utils/animations";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function Services() {
  const handleScrollToBooking = () => {
    window.location.href = "/#booking";
  };

  return (
    <div className="pt-24 pb-12">
      <SEO 
        title="Our Taxi Services - One-Way, Round Trip & Airport" 
        description="Explore our range of premium taxi services. From one-way outstation travel to airport transfers and round trips, we offer the best rates in South India." 
      />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4">What We Offer</h2>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Our Services</h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
              Reliable, comfortable, and affordable taxi services across South India for every travel need.
            </p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: "One-Way Outstation",
                desc: "Book a one-way taxi for intercity travel. You only pay for the one-way distance — no return charges.",
                features: ["Fixed Pricing", "Door-to-Door", "Luggage Support"]
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Round Trip",
                desc: "Round trip bookings with driver allowance included. Perfect for day outings and business trips.",
                features: ["Driver Allowance Included", "Flexible Timings", "Multiple Stops"]
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Airport Transfer",
                desc: "Reliable airport pickup and drop service with real-time flight tracking and punctual arrivals.",
                features: ["Flight Tracking", "Meet & Greet", "24/7 Available"]
              }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="bg-glass backdrop-blur-xl border border-glass-border shadow-premium rounded-[2.5rem] p-8 hover:border-accent/30 transition-all duration-700 hover:translate-y-[-4px] group"
              >
                <div className="bg-accent/10 p-4 rounded-2xl w-fit mb-6 text-accent group-hover:bg-accent group-hover:text-background transition-colors duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((f, j) => (
                    <li key={j} className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1 h-1 bg-accent rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Coverage Section */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="bg-glass backdrop-blur-xl border border-glass-border rounded-[2.5rem] p-10 text-center"
          >
            <h3 className="text-3xl font-bold text-white mb-4">Our Coverage</h3>
            <p className="text-white/50 mb-8 max-w-xl mx-auto">We operate across all major cities in South India — Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {["Chennai", "Bangalore", "Madurai", "Coimbatore", "Kochi", "Hyderabad", "Pondicherry", "Tirupati"].map((city) => (
                <span key={city} className="bg-accent/10 text-accent px-4 py-2 rounded-xl text-sm font-bold border border-accent/20">{city}</span>
              ))}
            </div>
            <button 
              onClick={handleScrollToBooking}
              className="bg-accent text-luxury-charcoal font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
              Book a Ride <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
