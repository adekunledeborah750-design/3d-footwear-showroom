import React from 'react';
import { Html } from '@react-three/drei';
import { HOTSPOTS } from '../../data/products';
import { useCustomizer } from '../../context/CustomizerContext';
import { ChevronRight, X, Sparkles } from 'lucide-react';

export const Hotspots: React.FC = () => {
  const { showHotspots, activeHotspotId, setActiveHotspotId } = useCustomizer();

  if (!showHotspots) return null;

  return (
    <group>
      {HOTSPOTS.map((spot) => {
        const isActive = activeHotspotId === spot.id;

        return (
          <group key={spot.id} position={spot.position}>
            <Html center distanceFactor={8} zIndexRange={[10, 0]}>
              <div className="relative select-none pointer-events-auto">
                {/* Hotspot Trigger Pulse Ring */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspotId(isActive ? null : spot.id);
                  }}
                  aria-label={`Inspect ${spot.title}`}
                  className="group relative flex items-center justify-center w-7 h-7 focus:outline-none"
                >
                  <span
                    className={`absolute inline-flex h-5 w-5 rounded-full opacity-60 transition-all duration-300 ${
                      isActive ? 'bg-[#8CA8FF]/40 scale-125' : 'bg-white/20 group-hover:bg-[#8CA8FF]/30 group-hover:scale-125'
                    }`}
                  />
                  <span
                    className={`relative inline-flex items-center justify-center w-4 h-4 rounded-full border text-[9px] font-mono transition-all duration-300 shadow-md ${
                      isActive
                        ? 'bg-[#8CA8FF] border-white text-[#101114] font-bold scale-110 ring-2 ring-[#8CA8FF]/40'
                        : 'bg-[#17191E]/95 border-white/40 text-white/90 group-hover:border-[#8CA8FF] group-hover:text-white'
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Hotspot Floating Information Panel */}
                {isActive && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute left-7 -top-10 z-30 w-72 md:w-80 rounded-xl bg-[#17191E]/95 backdrop-blur-md p-4 border border-white/20 shadow-2xl text-left animate-in fade-in zoom-in-95 duration-200"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2.5 mb-2.5">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-[#8CA8FF]">
                          <Sparkles className="w-3 h-3" />
                          <span>{spot.subtitle}</span>
                        </div>
                        <h4 className="font-display text-sm font-bold text-[#F5F4F0] mt-0.5">
                          {spot.title}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveHotspotId(null)}
                        className="rounded-lg p-1 text-[#A4A6AE] hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Close hotspot information"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-[#A4A6AE] leading-relaxed mb-3">
                      {spot.description}
                    </p>

                    {spot.specs && spot.specs.length > 0 && (
                      <div className="bg-[#101114]/60 rounded-lg p-2.5 border border-white/5 space-y-1.5">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B6E7B]">
                          Technical Calibration:
                        </div>
                        <ul className="space-y-1">
                          {spot.specs.map((spec, sIdx) => (
                            <li key={sIdx} className="flex items-center text-[11px] text-[#F5F4F0] gap-1.5 font-mono">
                              <ChevronRight className="w-3 h-3 text-[#8CA8FF] shrink-0" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
