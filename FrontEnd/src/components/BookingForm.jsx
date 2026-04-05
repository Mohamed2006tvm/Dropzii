import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { MapPin, Calendar, Clock, User, Phone, Navigation, Locate, ChevronRight, X, MessageCircle, RotateCcw } from "lucide-react";
import { cn } from "../utils/cn";
import { useToast } from "../context/ToastContext";

const WHATSAPP_NUMBER = "919442059952";

function buildWhatsAppMessage(data, isRoutine) {
  const pickupText = data.pickupLink
    ? `${data.pickup}\nPickup Map: ${data.pickupLink}`
    : data.pickup;
  if (isRoutine) {
    return encodeURIComponent(
      `Hello Dropzii! I'd like to book a Routine Trip.\n\nName: ${data.name}\nPhone: ${data.phone}\nPickup: ${pickupText}\nDrop: ${data.drop}\nStart Date & Time: ${data.date ? data.date + (data.time ? " at " + data.time : "") : ""}\nReturn Date: ${data.returnDate || "N/A"}\n\nPlease confirm my booking.`
    );
  }
  return encodeURIComponent(
    `Hello Dropzii! I'd like to book a taxi.\n\nName: ${data.name}\nPhone: ${data.phone}\nPickup: ${pickupText}\nDrop: ${data.drop}\nDate & Time: ${data.date ? data.date + (data.time ? " at " + data.time : "") : ""}\n\nPlease confirm my booking.`
  );
}

export default function BookingForm({ isSticky = false }) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("oneway");

  const emptyForm = {
    name: "",
    phone: "",
    pickup: "",
    pickupLink: "",
    drop: "",
    date: "",
    time: "",
    returnDate: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const formRef = useRef(null);

  useEffect(() => {
    const p = searchParams.get("pickup");
    const d = searchParams.get("drop");
    if (p || d) {
      setFormData(prev => ({
        ...prev,
        ...(p && { pickup: p }),
        ...(d && { drop: d })
      }));
      // Scroll to form when auto-filling
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [searchParams]);

  const [showPopup, setShowPopup] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleUseCurrentLocation = (field) => {
    if ("geolocation" in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            const address =
              data.display_name ||
              `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
            setFormData((prev) => ({
              ...prev,
              [field]: address,
              ...(field === "pickup" && { pickupLink: googleMapsLink }),
            }));
          } catch {
            setFormData((prev) => ({
              ...prev,
              [field]: `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
              ...(field === "pickup" && { pickupLink: googleMapsLink }),
            }));
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.error("Location error:", error);
          setIsLocating(false);
          showToast("Unable to retrieve location. Please enter manually.", "error");
        },
        { timeout: 10000 }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isRoutine = activeTab === "routine";

    const submissionData = {
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "94152d23-0038-4451-bd19-93dddae345f5",
      name: formData.name,
      phone: formData.phone,
      pickup: formData.pickup,
      pickup_map_link: formData.pickupLink || "",
      drop: formData.drop,
      date: formData.date,
      time: formData.time,
      trip_type: isRoutine ? "Routine Trip" : "One Way / Airport",
      ...(isRoutine && { return_date: formData.returnDate }),
      from_name: "Dropzii Booking",
      to: "dropziitaxi@gmail.com",
      subject: `New ${isRoutine ? "Routine Trip" : "Taxi"} Booking from ${formData.name}`,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      // Optional: Send to Google Sheets via Google Apps Script Webhook
      const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      if (scriptUrl) {
        fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        }).catch(err => console.warn("Google Sheets failed:", err));
      }

      const result = await response.json();
      if (result.success) {
        setSubmittedData({ ...formData, isRoutine });
        setShowPopup(true);
        setFormData(emptyForm);
      } else {
        showToast("Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      showToast("Error sending booking request. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRoutine = activeTab === "routine";

  return (
    <>
      <div
        ref={formRef}
        className={cn(
          "bg-luxury-charcoal/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-luxury max-w-md w-full relative overflow-hidden group/form hover:shadow-accent-glow hover:border-accent/20 transition-all duration-700",
          isSticky ? "hidden lg:block sticky top-24" : ""
        )}
      >
        {/* Decorative background element */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-[60px] group-hover/form:bg-accent/10 transition-colors duration-700" />

        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-5 flex items-center gap-3 tracking-tight leading-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent italic">
            <Navigation className="text-accent animate-float w-6 h-6" />
            Book Your Journey
          </h3>

          {/* Tabs */}
          <div className="flex bg-white/5 p-1 rounded-xl mb-6 md:mb-8 gap-0.5">
            <button
              type="button"
              onClick={() => setActiveTab("oneway")}
              className={cn(
                "flex-1 py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300",
                activeTab === "oneway"
                  ? "bg-accent text-luxury-charcoal shadow-lg shadow-accent/20"
                  : "text-white/50 hover:text-white"
              )}
            >
              One Way
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("routine")}
              className={cn(
                "flex-1 py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-1",
                activeTab === "routine"
                  ? "bg-accent text-luxury-charcoal shadow-lg shadow-accent/20"
                  : "text-white/50 hover:text-white"
              )}
            >
              <RotateCcw size={12} className={cn(activeTab === "routine" ? "animate-spin-slow" : "")} />
              Routine Trip
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Phone */}
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 group-focus-within:text-accent transition-all duration-300" />
                  <input
                    required
                    type="text"
                    placeholder="Enter Full Name"
                    className="bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] transition-all duration-500 w-full text-white placeholder:text-white/30 pl-11 text-sm font-medium"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Mobile Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 group-focus-within:text-accent transition-all duration-300" />
                  <input
                    required
                    type="tel"
                    placeholder="Enter Mobile Number"
                    className="bg-white/[0.02] border border-white/5 rounded-xl px-5 py-3.5 focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] transition-all duration-500 w-full text-white placeholder:text-white/30 pl-11 text-sm font-medium"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Pickup & Drop */}
            <div className="space-y-2 pt-1">
              {/* Pickup */}
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 group-focus-within:text-accent transition-all duration-300" />
                <input
                  required
                  type="text"
                  placeholder="Pickup Location"
                  className="bg-white/[0.02] border border-white/5 rounded-xl px-5 py-3.5 focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] transition-all duration-500 w-full text-white placeholder:text-white/50 pl-11 text-sm font-medium"
                  value={formData.pickup}
                  onChange={(e) => setFormData({ ...formData, pickup: e.target.value, pickupLink: "" })}
                />
              </div>

              {/* Use current location link */}
              <p
                onClick={() => handleUseCurrentLocation("pickup")}
                className={cn(
                  "text-[11px] text-accent hover:text-white cursor-pointer flex items-center gap-1 ml-1 w-fit transition-colors select-none pb-1 font-bold",
                  isLocating ? "opacity-60 pointer-events-none" : ""
                )}
              >
                <Locate size={11} className={isLocating ? "animate-spin" : ""} />
                {isLocating ? "Detecting location..." : "Use current location"}
                {formData.pickupLink && !isLocating && (
                  <span className="text-green-400 ml-1">✓ GPS saved</span>
                )}
              </p>

              {/* Drop */}
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 group-focus-within:text-accent transition-all duration-300" />
                <input
                  required
                  type="text"
                  placeholder="Drop Location"
                  className="bg-white/[0.02] border border-white/5 rounded-xl px-5 py-3.5 focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] transition-all duration-500 w-full text-white placeholder:text-white/50 pl-11 text-sm font-medium"
                  value={formData.drop}
                  onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                />
              </div>
            </div>

            {/* Date / Time */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1 text-[9px] md:text-[10px]">Pickup Date</label>
                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within:text-accent transition-all duration-300 pointer-events-none" />
                  <input
                    required
                    type="date"
                    className="bg-white/[0.02] border border-white/5 rounded-xl pl-9 pr-3 py-3 md:py-4 focus:outline-none focus:border-accent/40 focus:bg-white/[0.04] transition-all duration-300 w-full text-white placeholder:text-white/20 text-sm appearance-none"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
              {/* Time */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1 text-[9px] md:text-[10px]">Pickup Time</label>
                <div className="relative group">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within:text-accent transition-all duration-300 pointer-events-none" />
                  <input
                    required
                    type="time"
                    className="bg-white/[0.02] border border-white/5 rounded-xl pl-9 pr-3 py-3 md:py-4 focus:outline-none focus:border-accent/40 focus:bg-white/[0.04] transition-all duration-300 w-full text-white placeholder:text-white/20 text-sm appearance-none"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {/* Return Date — only for Routine Trip */}
            {isRoutine && (
              <div className="space-y-1.5 pt-1">
                <label className="text-[10px] text-accent/60 font-bold uppercase tracking-widest ml-1">Return Date</label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/60 w-4 h-4 group-focus-within:text-accent transition-all duration-300" />
                  <input
                    required
                    type="date"
                    placeholder="Select Return Date"
                    className="bg-white/[0.02] border border-accent/20 rounded-xl px-5 py-3.5 focus:outline-none focus:border-accent/40 focus:bg-white/[0.04] transition-all duration-500 w-full text-white placeholder:text-white/20 pl-11 text-sm font-medium appearance-none"
                    value={formData.returnDate}
                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "bg-accent text-luxury-charcoal font-bold py-3.5 px-6 md:py-4 md:px-8 rounded-xl transition-all duration-700 hover:scale-[1.02] hover:shadow-accent-glow active:scale-95 flex items-center justify-center gap-3 w-full mt-4 text-sm md:text-base uppercase tracking-wider overflow-hidden relative",
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              )}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-luxury-charcoal/30 border-t-luxury-charcoal rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Confirm Booking
                  <ChevronRight className="w-5 h-5 group-hover/form:translate-x-1 transition-transform" />
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </button>
          </form>
        </div>
      </div>

      {/* WhatsApp Confirmation Popup */}
      {showPopup && submittedData && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          />

          {/* Modal */}
          <div className="relative bg-luxury-charcoal border border-white/10 rounded-[2rem] p-8 max-w-sm w-full shadow-luxury animate-fade-in z-10">
            {/* Close */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shadow-inner">
                <MessageCircle className="text-[#25D366] w-10 h-10 drop-shadow-sm" />
              </div>
            </div>

            <h4 className="text-xl md:text-2xl font-bold text-center tracking-tight mb-2">
              Booking Received! 🥳
            </h4>
            <p className="text-white/50 text-[13px] text-center leading-relaxed mb-8 px-1">
              Your request has been sent. Tap below to confirm via WhatsApp and get instant assistance.
            </p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(submittedData, submittedData.isRoutine)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 px-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl transition-all duration-300 w-full text-[13px] md:text-sm uppercase tracking-wide relative overflow-hidden group/btn white-space-nowrap flex-nowrap"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              <MessageCircle size={18} className="relative z-10 shrink-0" />
              <span className="relative z-10 whitespace-nowrap">Connect on WhatsApp</span>
            </a>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 text-white/30 hover:text-white/60 text-[9px] font-bold w-full py-2 transition-colors uppercase tracking-[0.25em] pt-4 opacity-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
