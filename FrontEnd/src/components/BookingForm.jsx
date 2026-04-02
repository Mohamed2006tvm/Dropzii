import { useState, useEffect } from "react";
import { MapPin, Calendar, Clock, User, Phone, Navigation, ExternalLink } from "lucide-react";
import { cn } from "../utils/cn";

export default function BookingForm({ isSticky = false }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup: "",
    pickupLink: "",
    drop: "",
    dropLink: "",
    date: "",
    time: "",
  });

  const [isLocating, setIsLocating] = useState(false);

  const handleUseCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          
          setFormData(prev => ({ 
            ...prev, 
            pickup: `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
            pickupLink: googleMapsLink
          }));
          setIsLocating(false);
        },
        (error) => {
          console.error("Location error:", error);
          setIsLocating(false);
          alert("Unable to retrieve location. Please enter manually.");
        },
        { timeout: 10000 }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. WhatsApp Redirection
    const message = `New Booking:
Name: ${formData.name}
Phone: ${formData.phone}
Pickup: ${formData.pickup}${formData.pickupLink ? ` (${formData.pickupLink})` : ""}
Drop: ${formData.drop}${formData.dropLink ? ` (${formData.dropLink})` : ""}
Date & Time: ${formData.date} at ${formData.time}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${encodedMessage}`;
    
    // 2. Logic for Web3Forms and Google Sheets would go here
    // For now, open WhatsApp
    window.open(whatsappUrl, "_blank");
    
    // Reset or show success
    alert("Redirecting to WhatsApp for confirmation...");
  };

  return (
    <div className={cn(
      "bg-glass backdrop-blur-xl border border-glass-border rounded-[2rem] p-8 shadow-2xl max-w-md w-full",
      isSticky ? "hidden lg:block sticky top-24" : ""
    )}>

      <h3 className="text-2xl font-black mb-6 flex items-center gap-2 font-black tracking-tighter leading-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
        <Navigation className="text-accent [animation:float_6s_ease-in-out_infinite]" /> Book Your Ride
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 group-focus-within:text-accent transition-colors" />
          <input
            required
            type="text"
            placeholder="Your Name"
            className="bg-glass border border-glass-border rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/40 focus:bg-glass-hover transition-all duration-300 w-full text-white placeholder:text-white/20 pl-12"

            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="relative group">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 group-focus-within:text-accent transition-colors" />
          <input
            required
            type="tel"
            placeholder="Phone Number"
            className="bg-glass border border-glass-border rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/40 focus:bg-glass-hover transition-all duration-300 w-full text-white placeholder:text-white/20 pl-12"

            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        
        <div className="space-y-3">
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 group-focus-within:text-accent transition-colors" />
            <input
              required
              type="text"
              placeholder="Pickup Location"
              className="bg-glass border border-glass-border rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/40 focus:bg-glass-hover transition-all duration-300 w-full text-white placeholder:text-white/20 pl-12"

              value={formData.pickup}
              onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
            />
          </div>
          <button 
            type="button"
            onClick={handleUseCurrentLocation}
            className={cn(
              "text-xs font-bold text-accent flex items-center gap-2 hover:brightness-125 transition-all ml-2",
              isLocating ? "animate-pulse" : ""
            )}
          >
            <div className={cn("w-2 h-2 rounded-full bg-accent", isLocating ? "[animation:pulse-soft_2s_infinite]" : "")} />
            {isLocating ? "Retrieving Exact Address..." : "Use Current Location"}

          </button>
          
          <div className="relative group/link">
            <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 w-4 h-4 group-focus-within/link:text-accent transition-colors" />
            <input
              type="url"
              placeholder="Exact Pickup Google Map Link (Optional)"
              className="bg-glass border border-glass-border rounded-2xl px-5 py-3 focus:outline-none focus:border-accent/40 focus:bg-glass-hover transition-all duration-300 w-full text-white placeholder:text-white/20 pl-11 text-xs h-auto opacity-60 focus:opacity-100"

              value={formData.pickupLink}
              onChange={(e) => setFormData({ ...formData, pickupLink: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 group-focus-within:text-accent transition-colors" />
            <input
              required
              type="text"
              placeholder="Drop Location"
              className="bg-glass border border-glass-border rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/40 focus:bg-glass-hover transition-all duration-300 w-full text-white placeholder:text-white/20 pl-12"

              value={formData.drop}
              onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
            />
          </div>
          <div className="relative group/link">
            <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 w-4 h-4 group-focus-within/link:text-accent transition-colors" />
            <input
              type="url"
              placeholder="Exact Drop Google Map Link (Optional)"
              className="bg-glass border border-glass-border rounded-2xl px-5 py-3 focus:outline-none focus:border-accent/40 focus:bg-glass-hover transition-all duration-300 w-full text-white placeholder:text-white/20 pl-11 text-xs h-auto opacity-60 focus:opacity-100"

              value={formData.dropLink}
              onChange={(e) => setFormData({ ...formData, dropLink: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative group">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within:text-accent transition-colors" />
            <input
              required
              type="date"
              className="bg-glass border border-glass-border rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/40 focus:bg-glass-hover transition-all duration-300 w-full text-white placeholder:text-white/20 pl-11 text-sm appearance-none"

              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div className="relative group">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within:text-accent transition-colors" />
            <input
              required
              type="time"
              className="bg-glass border border-glass-border rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/40 focus:bg-glass-hover transition-all duration-300 w-full text-white placeholder:text-white/20 pl-11 text-sm"

              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
        </div>

        <button type="submit" className="bg-accent text-luxury-charcoal font-black py-4 px-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-accent-glow active:scale-95 flex items-center justify-center gap-2 w-full mt-4 group">
          Confirm Booking 
          <Navigation className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>

      </form>
    </div>
  );
}
