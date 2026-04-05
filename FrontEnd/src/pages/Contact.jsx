import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "../utils/animations";
import { useToast } from "../context/ToastContext";
import SEO from "../components/SEO";

export default function Contact() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionData = {
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "94152d23-0038-4451-bd19-93dddae345f5",
      ...formData,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();
      if (result.success) {
        showToast("Message sent successfully!", "success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      showToast("Something went wrong.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-32 px-6 bg-background">
      <SEO 
        title="Contact Us - 24/7 Customer Support" 
        description="Have questions or need a specialized taxi quote? Contact the Dropzii team 24/7 for instant assistance and luxury one-way travel support." 
      />
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-5 py-2 rounded-full text-accent text-[11px] font-bold uppercase tracking-[0.3em] backdrop-blur-md">
            Get in Touch
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-white leading-none">
            Direct <span className="text-accent">Access</span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">
            Questions or specialized requests? Our team is ready 24/7.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="space-y-8"
          >
            {[
              { icon: <Phone />, title: "Call Hotline", text: "+91 94420 59952", link: "tel:+919442059952" },
              { icon: <Mail />, title: "Concierge Email", text: "dropziitaxi@gmail.com", link: "mailto:dropziitaxi@gmail.com" },
              { icon: <MessageCircle />, title: "WhatsApp Support", text: "Instant Support", link: "https://wa.me/919442059952" },
            ].map((item, i) => (
              <motion.a 
                key={i} 
                href={item.link}
                variants={fadeInUp}
                className="group flex items-center gap-6 bg-glass p-8 rounded-[2.5rem] border border-white/5 hover:border-accent/40 transition-all"
                target={item.link.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-luxury-charcoal transition-all">
                  <item.icon.type {...item.icon.props} size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">{item.title}</h3>
                  <p className="text-xl font-black text-white group-hover:text-accent transition-colors">{item.text}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportConfig}
            className="bg-glass border border-white/5 rounded-[3rem] p-10 md:p-14 shadow-luxury"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent/40"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  required
                  type="tel"
                  placeholder="Phone"
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent/40"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <input
                required
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent/40"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <textarea
                required
                rows={4}
                placeholder="Message"
                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent/40 resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-luxury-charcoal font-black py-4 rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
              >
                {isSubmitting ? "Sending..." : "Send Message"} <ChevronRight size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
