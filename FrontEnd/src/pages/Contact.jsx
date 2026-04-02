import { Phone, Mail, MessageCircle, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully! Our team will contact you shortly.");
    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <div className="pt-24 pb-12">
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter">Get in <span className="text-accent underline decoration-white/5">Touch</span></h1>
                <p className="text-white/50 text-lg max-w-mdital">Have questions about our rates or coverage? We're here to help you 24/7.</p>
              </div>

              <div className="space-y-8">
                <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-6 group">
                  <div className="bg-primary p-5 rounded-2xl border border-white/5 group-hover:border-accent/50 transition-colors">
                    <Phone className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase font-black tracking-widest">Call Us</p>
                    <p className="text-xl font-bold">+91 XXXXX XXXXX</p>
                  </div>
                </a>
                
                <a href="mailto:info@tamiltaxi.in" className="flex items-center gap-6 group">
                  <div className="bg-primary p-5 rounded-2xl border border-white/5 group-hover:border-accent/50 transition-colors">
                    <Mail className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase font-black tracking-widest">Email Us</p>
                    <p className="text-xl font-bold">info@tamiltaxi.in</p>
                  </div>
                </a>

                <a href="https://wa.me/91XXXXXXXXXX" className="flex items-center gap-6 group">
                  <div className="bg-primary p-5 rounded-2xl border border-white/5 group-hover:border-accent/50 transition-colors">
                    <MessageCircle className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase font-black tracking-widest">WhatsApp</p>
                    <p className="text-xl font-bold">+91 XXXXX XXXXX</p>
                  </div>
                </a>

                <div className="flex items-center gap-6 group">
                  <div className="bg-primary p-5 rounded-2xl border border-white/5">
                    <MapPin className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase font-black tracking-widest">Our Office</p>
                    <p className="text-xl font-bold">Madurai, Tamil Nadu</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-glass backdrop-blur-xl border border-glass-border shadow-premium rounded-[2.5rem] p-8 transition-all duration-700 hover:border-accent/30 hover:translate-y-[-4px] p-10 h-fit bg-luxury-light/50">

              <h3 className="text-3xl font-black mb-8 italic">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block ml-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="bg-glass border border-glass-border rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/40 focus:bg-glass-hover transition-all duration-300 w-full text-white placeholder:text-white/20 py-4" 
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block ml-1">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    className="bg-glass border border-glass-border rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/40 focus:bg-glass-hover transition-all duration-300 w-full text-white placeholder:text-white/20 py-4" 
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 block ml-1">Message</label>
                  <textarea 
                    required
                    className="bg-glass border border-glass-border rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/40 focus:bg-glass-hover transition-all duration-300 w-full text-white placeholder:text-white/20 py-4 min-h-[150px] resize-none" 
                    placeholder="Tell us about your requirement..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="bg-accent text-luxury-charcoal font-black py-4 px-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-accent-glow active:scale-95 flex items-center justify-center gap-2 w-full py-5 text-lg flex items-center justify-center gap-3">
                  Send Message <Send size={20} />
                </button>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Map Section Placeholder */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto h-[400px] rounded-[3rem] overflow-hidden grayscale border border-white/5 opacity-50 contrast-125">
          <iframe 
            title="Tamil Nadu Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.12345678!2d78.11!3d9.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b118c533%3A0x7ef1010c2d3ea9c9!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
