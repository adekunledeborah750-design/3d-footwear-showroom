import React from 'react';
import { Sparkles, Eye, ShieldCheck } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section className="py-28 bg-[#101114] border-t border-white/10 relative overflow-hidden">
      {/* Visual background atmospheric illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#8CA8FF]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17191E] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#8CA8FF]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Manifesto</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F4F0] tracking-tight leading-[1.12]">
          LESS NOISE.<br />
          MORE INTENTION.
        </h2>

        <p className="text-base sm:text-lg text-[#A4A6AE] leading-relaxed max-w-2xl mx-auto font-sans">
          "We believe the best products reveal their quality through the details. Interactive 3D visualization brings those details closer, turning product discovery into something you can see, explore, and make your own."
        </p>

        {/* Minimalist Editorial Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-3xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-[#17191E]/60 border border-white/5 space-y-1">
            <div className="text-xs font-mono uppercase text-[#6B6E7B]">Precision Tolerances</div>
            <div className="font-display text-xl font-bold text-[#F5F4F0]">0.05 mm</div>
            <p className="text-[11px] text-[#A4A6AE]">Micron calibration across stitch margins.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#17191E]/60 border border-white/5 space-y-1">
            <div className="text-xs font-mono uppercase text-[#6B6E7B]">Physical Longevity</div>
            <div className="font-display text-xl font-bold text-[#F5F4F0]">10+ Years</div>
            <p className="text-[11px] text-[#A4A6AE]">Modular architecture built for repairability.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#17191E]/60 border border-white/5 space-y-1">
            <div className="text-xs font-mono uppercase text-[#6B6E7B]">Carbon Footprint</div>
            <div className="font-display text-xl font-bold text-[#8CA8FF]">Net Neutral</div>
            <p className="text-[11px] text-[#A4A6AE]">100% circular certified origin tanneries.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
