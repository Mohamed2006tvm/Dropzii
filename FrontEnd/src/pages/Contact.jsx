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
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none">
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
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                ),
                title: "WhatsApp Support",
                text: "Instant Support",
                link: "https://wa.me/919442059952"
              },
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
