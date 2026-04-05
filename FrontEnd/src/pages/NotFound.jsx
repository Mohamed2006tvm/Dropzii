import { Link } from 'react-router-dom';
import { Home, MoveRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center relative overflow-hidden">
      <SEO 
        title="404 - Page Not Found" 
        description="The page you are looking for does not exist. Return to Dropzii home for premium taxi bookings." 
      />
      {/* Background Glows */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />

      <div className="max-w-lg w-full space-y-12 relative z-10">
        <div className="space-y-4">
          <h1 className="text-[12rem] font-bold leading-none tracking-tight bg-gradient-to-b from-white to-slate-800 bg-clip-text text-transparent opacity-20">
            404
          </h1>
          <h2 className="text-5xl font-bold tracking-tight -mt-20 leading-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Page Not Found
          </h2>
          <p className="text-xl text-white/50 max-w-sm mx-auto leading-relaxed">
            The premium journey you're looking for doesn't exist or has been moved to a new destination.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/" 
            className="bg-accent text-luxury-charcoal font-bold py-4 px-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-accent-glow active:scale-95 flex items-center justify-center gap-2 group w-full sm:w-auto"
          >
            <Home size={20} /> Back to Home
          </Link>
          <Link 
            to="/contact" 
            className="bg-white/5 text-white font-bold py-4 px-8 rounded-2xl border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 flex items-center justify-center gap-2 group w-full sm:w-auto"
          >
            Contact Concierge <MoveRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
