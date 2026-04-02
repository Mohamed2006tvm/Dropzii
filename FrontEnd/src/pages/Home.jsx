import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookingForm from "../components/BookingForm";
import { Shield, Clock, IndianRupee, Star, ChevronRight, UserCheck, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const routesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".hero-content > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      gsap.from(".hero-form", {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5
      });

      // Scroll Animations
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
      });
    });

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: <IndianRupee />, title: "Affordable Rates", desc: "No hidden charges, transparent pricing for every trip." },
    { icon: <Shield />, title: "Safe & Secure", desc: "Verified drivers and 24/7 emergency support." },
    { icon: <Clock />, title: "Always On Time", desc: "Reliable airport pickups and outstation rides." },
    { icon: <UserCheck />, title: "Verified Drivers", desc: "Professional, polite, and local-expertise drivers." },
  ];

  const routes = [
    { from: "Chennai", to: "Madurai", price: "4500" },
    { from: "Coimbatore", to: "Chennai", price: "5200" },
    { from: "Madurai", to: "Trichy", price: "2400" },
    { from: "Trichy", to: "Chennai", price: "3800" },
  ];

  const vehicles = [
    { type: "Hatchback", seats: "4+1", price: "₹12/km", img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=400" },
    { type: "Sedan", seats: "4+1", price: "₹14/km", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400" },
    { type: "SUV / Innova", seats: "7+1", price: "₹18/km", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-20 pb-12 px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <img 
            src="/assets/hero_taxi_highway.png" // This will be the generated image
            alt="Taxi background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-20">
          <div className="hero-content space-y-8 flex flex-col justify-center text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-1 rounded-full text-accent text-sm font-bold self-center lg:self-start mb-2">
              <Star size={14} fill="currentColor" className="animate-pulse" /> Premium Travel Service
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-7xl font-black leading-tight tracking-tighter font-black tracking-tighter leading-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">

              Book <span className="text-accent  decoration-white/10 italic">One-Way</span> Taxi in Tamil Nadu
            </h1>
            <p className="text-lg md:text-xl text-white/40 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Experience the pinnacle of reliable airport pickups, outstation trips, and one-way rides. 
              Safe, fast, and effortlessly professional travel across the state.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <button className="bg-accent text-luxury-charcoal font-black py-4 px-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-accent-glow active:scale-95 flex items-center justify-center gap-2 group">Book Your Journey <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
              <a href="#pricing" className="bg-white/5 text-white font-bold py-4 px-8 rounded-2xl border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20">View Pricing</a>

            </div>
          </div>

          <div className="hero-form flex justify-center lg:justify-end">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-4">The Standard</h2>
            <h3 className="text-4xl md:text-6xl font-black font-black tracking-tighter leading-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">Experience Premium Travel</h3>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="feature-card bg-glass backdrop-blur-xl border border-glass-border shadow-premium rounded-[2.5rem] p-8 transition-all duration-700 hover:border-accent/30 hover:translate-y-[-4px] group">

                <div className="bg-accent/10 p-5 rounded-2xl w-fit mb-8 text-accent group-hover:scale-110 group-hover:shadow-accent-glow transition-all duration-500">
                  {f.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4 tracking-tight">{f.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section ref={routesRef} id="pricing" className="py-32 px-6 bg-glass/60">

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
            <div>
              <h2 className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-4">Select Journeys</h2>
              <h3 className="text-4xl md:text-6xl font-black font-black tracking-tighter leading-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">Best Rates Guaranteed</h3>

            </div>
            <button className="bg-white/5 text-white font-bold py-4 px-8 rounded-2xl border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 group">Explore All Routes <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform"  /></button>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {routes.map((r, i) => (
              <div key={i} className="bg-glass backdrop-blur-xl border border-glass-border shadow-premium rounded-[2.5rem] p-8 transition-all duration-700 hover:border-accent/30 hover:translate-y-[-4px] flex flex-col justify-between hover:bg-glass-hover p-10">


                <div className="flex items-center gap-6 mb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 bg-accent rounded-full shadow-accent-glow" />
                    <div className="w-px h-12 bg-gradient-to-b from-accent to-white/5 my-1" />
                    <div className="w-2.5 h-2.5 border border-accent rounded-full" />
                  </div>
                  <div className="space-y-6">
                    <h5 className="font-black text-xl tracking-tight">{r.from}</h5>
                    <h5 className="font-black text-xl tracking-tight">{r.to}</h5>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/5">
                  <span className="text-white/20 text-xs font-bold uppercase tracking-widest">Starts at</span>
                  <span className="text-accent font-black text-2xl tracking-tighter">₹{r.price}*</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-4">Our Fleet</h2>
            <h3 className="text-4xl md:text-6xl font-black font-black tracking-tighter leading-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">Choose Your Comfort</h3>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {vehicles.map((v, i) => (
              <div key={i} className="bg-glass backdrop-blur-xl border border-glass-border shadow-premium rounded-[2.5rem] p-8 transition-all duration-700 hover:border-accent/30 hover:translate-y-[-4px] p-0 overflow-hidden group border-white/5">

                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60" />
                  <img src={v.img} alt={v.type} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-3xl font-black tracking-tighter">{v.type}</h4>
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-black uppercase border border-accent/20">{v.seats} Seats</span>
                  </div>
                  <p className="text-white/30 mb-8 italic text-sm leading-relaxed font-medium">Perfectly curated for discerning travelers and luxury outstation experiences.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black tracking-tighter">{v.price} <span className="text-xs font-bold text-white/20 uppercase">/ km</span></span>
                    <button className="text-accent text-sm font-black flex items-center gap-1 group/btn hover:text-white transition-colors uppercase tracking-widest">
                      Reserve <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 bg-glass/60">

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-4">Our Process</h2>
            <h3 className="text-4xl md:text-6xl font-black font-black tracking-tighter leading-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">Seamless Journey</h3>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { step: "01", title: "Instant Booking", desc: "Digital form with exact location intelligence." },
              { step: "02", title: "Direct Connect", desc: "Immediate WhatsApp confirmation from our team." },
              { step: "03", title: "Premium Pickup", desc: "Punctual arrival with professional driver protocol." },
              { step: "04", title: "Secure Arrival", desc: "Safe destination reach with multiple payment options." },
            ].map((s, i) => (
              <div key={i} className="text-center space-y-6 group">
                <div className="text-7xl font-black text-glass/50 group-hover:text-accent/5 transition-colors leading-none">

                  {s.step}
                </div>
                <h4 className="text-2xl font-black tracking-tight">{s.title}</h4>
                <p className="text-white/30 text-sm leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-4">Feedback</h2>
          <h3 className="text-4xl md:text-6xl font-black mb-20 font-black tracking-tighter leading-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">Trusted by Connoisseurs</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-glass backdrop-blur-xl border border-glass-border shadow-premium rounded-[2.5rem] p-8 transition-all duration-700 hover:border-accent/30 hover:translate-y-[-4px] p-10 space-y-6 hover:bg-glass">


                <div className="flex text-accent gap-1">
                  {[1, 2, 3, 4, 5].map(v => <Star key={v} size={14} fill="currentColor" />)}
                </div>
                <p className="text-white/50 italic leading-relaxed text-lg">
                  "The most sophisticated one-way taxi service in Tamil Nadu. Professional protocol, impeccable vehicles, and absolute reliability."
                </p>
                <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                  <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center font-black text-accent text-lg">RK</div>
                  <div>
                    <h5 className="font-bold text-lg tracking-tight">Rajesh Kumar</h5>
                    <p className="text-xs text-white/20 uppercase font-black tracking-widest">Chennai Airport</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto rounded-[3rem] bg-accent p-16 md:p-24 text-luxury-charcoal text-center space-y-10 relative overflow-hidden group shadow-accent-glow">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-white/20 rounded-full blur-[120px]" />
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">Ready to Begin Your Journey?</h2>
          <p className="text-xl md:text-2xl font-bold opacity-80 max-w-2xl mx-auto leading-relaxed">
            Reserve your premium one-way experience now. Impeccable service, guaranteed.
          </p>
          <div className="flex flex-wrap gap-6 justify-center pt-8">
            <button className="bg-luxury-charcoal text-white font-black px-12 py-5 rounded-2xl hover:scale-105 transition-all flex items-center gap-2 shadow-2xl">
              Book Journey Now <ChevronRight />
            </button>
            <a href="tel:+91XXXXXXXXXX" className="border-2 border-luxury-charcoal/20 font-black px-12 py-5 rounded-2xl hover:bg-luxury-charcoal/5 transition-all text-lg">
              Consult with Agent
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
