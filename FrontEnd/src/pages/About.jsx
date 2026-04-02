import BookingForm from "../components/BookingForm";
import { ShieldCheck, Map, Users, Award } from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 pb-12">
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
              We Travel <span className="text-accent underline decoration-white/5">Further</span> For You
            </h1>
            <p className="text-xl text-white/50 leading-relaxed">
              Tamil Taxi is the leading provider of one-way outstation taxi services in Tamil Nadu. We specialize in providing safe, reliable, and luxury travel experiences at the most affordable prices.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              {[
                { icon: <ShieldCheck className="text-accent" />, label: "Safety First" },
                { icon: <Map className="text-accent" />, label: "State Coverage" },
                { icon: <Users className="text-accent" />, label: "Expert Drivers" },
                { icon: <Award className="text-accent" />, label: "Premium Fleet" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-glass backdrop-blur-xl border border-glass-border shadow-premium rounded-[2.5rem] p-8 transition-all duration-700 hover:border-accent/30 hover:translate-y-[-4px] p-4">

                  {item.icon}
                  <span className="font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
            <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800" 
              alt="Luxury car" 
              className="relative z-10 rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-luxury-light/20 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-black">Our Coverage</h2>
          <p className="text-white/50">
            We operate across all major cities and towns in Tamil Nadu, including Chennai, Madurai, Coimbatore, Trichy, Salem, Tirupur, Erode, Vellore, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Chennai", "Madurai", "Coimbatore", "Trichy", "Salem", "Tirupur", "Vellore", "Kanyakumari", "Ooty", "Pondicherry"].map(city => (
              <span key={city} className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-bold">{city}</span>
            ))}
          </div>
        </div>
      </section>
      
      <div className="flex justify-center py-12 px-6">
         <BookingForm />
      </div>
    </div>
  );
}
