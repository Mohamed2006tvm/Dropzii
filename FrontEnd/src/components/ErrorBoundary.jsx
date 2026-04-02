import React from 'react';
import { ShieldAlert, RotateCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-glass backdrop-blur-xl border border-glass-border p-12 rounded-[3rem] shadow-premium space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="bg-red-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
              <ShieldAlert className="text-red-500 w-12 h-12" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter leading-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              Something went wrong
            </h1>
            <p className="text-white/50 leading-relaxed">
              We encountered an unexpected error while processing your request. Please try refreshing the page.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-accent text-luxury-charcoal font-black py-4 px-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-accent-glow active:scale-95 flex items-center justify-center gap-2 w-full"
            >
              <RotateCcw size={20} /> Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
