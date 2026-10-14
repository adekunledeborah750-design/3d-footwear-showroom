import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0D0E11] border-t border-white/10 py-16 text-[#A3A6AE] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          {/* Col 1 */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#F5F5F2] font-semibold">
              3D FOOTWEAR SHOWROOM
            </div>
            <p className="text-xs text-[#A3A6AE] max-w-sm leading-relaxed">
              An interactive product showroom exploring physical footwear geometry, materials, and real-time 3D customization.
            </p>
          </div>

          {/* Navigation Col */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono uppercase tracking-widest text-[#F5F5F2] text-xs font-semibold">
              Navigation
            </div>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <a href="#collections" className="hover:text-white transition-colors">Collections</a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-white transition-colors">Customize</a>
              </li>
              <li>
                <a href="#inspection" className="hover:text-white transition-colors">Inspection</a>
              </li>
              <li>
                <a href="#materials" className="hover:text-white transition-colors">Materials</a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">Our Story</a>
              </li>
            </ul>
          </div>

          {/* Legal / Contact Col */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-mono uppercase tracking-widest text-[#F5F5F2] text-xs font-semibold">
              Information
            </div>
            <p className="text-xs leading-relaxed text-[#666973]">
              Demonstration prototype built with Three.js, React Three Fiber, and WebGL. All footwear specifications and checkout workflows are simulated for interactive evaluation.
            </p>
            <div className="flex gap-4 pt-2 font-mono text-[11px] text-[#A3A6AE]">
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              <span>·</span>
              <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
              <span>·</span>
              <a href="#terms" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#666973]">
          <div>
            © {new Date().getFullYear()} 3D FOOTWEAR SHOWROOM. ALL RIGHTS RESERVED.
          </div>
          <div>
            ENGINEERED WITH REACT, THREE.JS &amp; WEBGL
          </div>
        </div>
      </div>
    </footer>
  );
};
