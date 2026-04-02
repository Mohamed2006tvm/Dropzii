import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Car } from "lucide-react";
import { cn } from "../utils/cn";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-accent p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Car className="text-background w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            TAMIL<span className="text-accent">TAXI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                location.pathname === link.path ? "text-accent" : "text-white/70"
              )}
            >
              {link.name}
            </Link>
          ))}
          <a href="tel:+91XXXXXXXXXX" className="bg-accent text-luxury-charcoal font-black py-2 px-4 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-accent-glow active:scale-95 flex items-center gap-2 text-sm">

            <Phone className="w-4 h-4" /> Call Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-background/95 z-40 flex flex-col items-center justify-center gap-8 md:hidden transition-transform duration-500",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold hover:text-accent"
          >
            {link.name}
          </Link>
        ))}
        <a href="tel:+91XXXXXXXXXX" className="bg-accent text-luxury-charcoal font-black py-4 px-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-accent-glow active:scale-95 flex items-center gap-2 mt-4">

          <Phone /> Call Now
        </a>
      </div>
    </nav>
  );
}
