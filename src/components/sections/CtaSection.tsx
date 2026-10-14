import React from 'react';
import { ArrowUp, ShoppingBag } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-28 bg-[#15171C] border-t border-white/10 relative overflow-hidden text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F5F2] tracking-tight leading-tight">
          YOUR NEXT STEP<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F2] via-[#91ACFF] to-[#B5C7FF]">
            STARTS HERE.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#A3A6AE] max-w-xl mx-auto font-sans leading-relaxed">
          Explore the collection. Discover the details. Find your fit.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#collections"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#91ACFF] hover:bg-[#B5C7FF] text-[#0D0E11] font-display font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-[#91ACFF]/20 flex items-center justify-center gap-2"
          >
            <span>EXPLORE THE COLLECTION</span>
            <ShoppingBag className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0D0E11] hover:bg-[#1D2026] border border-white/15 text-[#F5F5F2] font-display font-medium text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 text-[#91ACFF]" />
          </button>
        </div>
      </div>
    </section>
  );
};
