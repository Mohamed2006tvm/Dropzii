import { motion } from "framer-motion";
import { ShieldCheck, Map, Users, Award, ChevronRight } from "lucide-react";
import { fadeInUp, staggerContainer, viewportConfig } from "../utils/animations";
import SEO from "../components/SEO";

export default function About() {
  return (
    <div className="pt-24 pb-12">
      <SEO 
        title="About Us - South India's Leading Taxi Service" 
        description="Learn more about Dropzii, our mission to provide the most reliable and affordable one-way taxi service across South India (TN, KL, KA, AP)." 
      />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              We Travel <span className="text-accent underline decoration-white/5">Further</span> For You
            </h1>
            <p className="text-xl text-white/50 leading-relaxed">
              Dropzii is the leading provider of one-way outstation taxi services across South India (TN, KL, KA, AP). We specialize in providing safe, reliable, and luxury travel experiences at the most affordable prices.
            </p>
            
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-2 gap-6 pt-4"
            >
              {[
                { icon: <ShieldCheck className="text-accent" />, label: "Safety First" },
                { icon: <Map className="text-accent" />, label: "State Coverage" },
                { icon: <Users className="text-accent" />, label: "Expert Drivers" },
                { icon: <Award className="text-accent" />, label: "Premium Fleet" },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className="about-card flex items-center gap-3 bg-glass backdrop-blur-xl border border-glass-border shadow-premium rounded-[2.5rem] p-8 hover:border-accent/30 hover:translate-y-[-4px] transition-transform duration-500"
                >
                  {item.icon}
                  <span className="font-bold">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
            <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800" 
              alt="Luxury car" 
              className="relative z-10 rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="bg-glass backdrop-blur-xl border border-glass-border rounded-[2.5rem] p-10 text-center"
          >
            <h3 className="text-3xl font-bold text-white mb-4"> Coverage Area</h3>
            <p className="text-white/50 mb-8 max-w-xl mx-auto leading-relaxed">
              We serve all major and tier-2 cities across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh, making us the most comprehensive outstation taxi service in South India.
            </p>
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-4"
            >
              {["Chennai", "Bangalore", "Madurai", "Coimbatore", "Kochi", "Hyderabad", "Pondicherry", "Tirupati"].map((city) => (
                <motion.span 
                  key={city}
                  variants={fadeInUp}
                  className="bg-accent/10 text-accent px-4 py-2 rounded-xl text-sm font-bold border border-accent/20"
                >
                  {city}
                </motion.span>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-10">
              <a 
                href="/#booking"
                className="bg-accent text-luxury-charcoal font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                Book a Ride <ChevronRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
