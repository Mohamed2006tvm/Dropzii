import { Plane, MapPin, Navigation, ArrowRight } from "lucide-react";
import BookingForm from "../components/BookingForm";

export default function Services() {
  const services = [
    {
      title: "One-way Taxi",
      tag: "Most Popular",
      icon: <Navigation className="w-10 h-10" />,
      desc: "Travel to your destination and pay only for the distance traveled. Ideal for outstation trips where you don't need a return cab.",
      features: ["Door-to-door pickup", "No hidden baggage fees", "24/7 Availability"]
    },
    {
      title: "Airport Pickup & Drop",
      tag: "Fast Track",
      icon: <Plane className="w-10 h-10" />,
      desc: "Stress-free airport transfers to and from Chennai, Madurai, Coimbatore, and Trichy airports. On-time guarantee.",
      features: ["Live flight tracking", "Meet & Greet service", "Fixed pricing"]
    },
    {
      title: "Local & Outstation Trips",
      tag: "Flexible",
      icon: <MapPin className="w-10 h-10" />,
      desc: "Book our premium cabs for local city travel or multi-day outstation packages across South India.",
      features: ["Customized itineraries", "Professional drivers", "Wait & Return options"]
    }
  ];

  return (
    <div className="pt-24 pb-12">
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-2xl mx-auto space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">Our <span className="text-accent underline decoration-white/5">Services</span></h1>
            <p className="text-white/50 text-lg">We provide a wide range of travel solutions tailored to your specific needs within and around Tamil Nadu.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
            {services.map((s, i) => (
              <div key={i} className="bg-glass backdrop-blur-xl border border-glass-border shadow-premium rounded-[2.5rem] p-8 transition-all duration-700 hover:border-accent/30 hover:translate-y-[-4px] flex flex-col justify-between group h-full">

                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="bg-accent/10 p-6 rounded-3xl text-accent group-hover:bg-accent group-hover:text-background transition-all duration-500">
                      {s.icon}
                    </div>
                    <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest text-accent">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black mb-4">{s.title}</h3>
                  <p className="text-white/40 mb-8 leading-relaxed italic">"{s.desc}"</p>
                  <ul className="space-y-3 mb-8">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                        <ArrowRight size={14} className="text-accent" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="bg-white/5 text-white font-bold py-4 px-8 rounded-2xl border border-white/10 transition-all duration-500 hover:bg-accent hover:text-luxury-charcoal w-full group-hover:bg-accent group-hover:text-background transition-all">

                  Book {s.title}
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-luxury-light/40 p-8 md:p-16 rounded-[3rem] border border-white/5">
            <div className="space-y-6">
              <h2 className="text-4xl font-black tracking-tighter">Looking for something specific?</h2>
              <p className="text-white/50">
                We also offer corporate travel, wedding transportation, and customized South India tour packages. Speak to our agent for a custom quote today.
              </p>
              <div className="flex gap-4">
                <a href="tel:+91XXXXXXXXXX" className="bg-accent text-luxury-charcoal font-black py-4 px-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-accent-glow active:scale-95 flex items-center justify-center gap-2">Call Now</a>
                <a href="/contact" className="bg-white/5 text-white font-bold py-4 px-8 rounded-2xl border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 border-none underline">Contact Us</a>

              </div>
            </div>
            <div className="flex justify-center">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
