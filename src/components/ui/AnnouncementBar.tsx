import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative z-40 bg-[#17191E] border-b border-white/10 px-4 py-2 text-center text-[11px] font-mono tracking-widest uppercase text-[#A4A6AE] flex items-center justify-center transition-all">
      <div className="flex items-center gap-2">
        <Sparkles className="w-3 h-3 text-[#8CA8FF]" />
        <span className="text-[#F5F4F0] font-medium">A NEW DIMENSION OF PRODUCT DISCOVERY</span>
        <span className="hidden sm:inline text-white/30">|</span>
        <span className="hidden sm:inline text-[#A4A6AE]">INTERACTIVE 3D · COMPLIMENTARY COURIER OVER $150</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A4A6AE] hover:text-[#F5F4F0] transition-colors p-1"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
