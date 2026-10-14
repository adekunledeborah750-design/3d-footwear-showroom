import React, { useEffect, useRef } from 'react';
import { SneakerCanvas } from '../3d/SneakerCanvas';
import { useCustomizer } from '../../context/CustomizerContext';
import { ArrowDown, Rotate3d, Compass, Eye } from 'lucide-react';
import { CameraPreset } from '../../types';
import gsap from 'gsap';

export const HeroSection: React.FC<{ onOpen3DInspect: () => void }> = ({ onOpen3DInspect }) => {
  const { activePreset, setActivePreset } = useCustomizer();
  const heroContentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Choreographed entrance animation using GSAP
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-label',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          '.hero-title-line',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          '-=0.4'
        )
        .fromTo(
          '.hero-copy',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          '.hero-ctas',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          '.hero-hint',
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=0.4'
        );
    }, heroContentRef);

    return () => ctx.revert();
  }, []);

  const presets: { id: CameraPreset; label: string }[] = [
    { id: 'hero', label: 'Perspective' },
    { id: 'side', label: 'Profile' },
    { id: 'front', label: 'Toe Cap' },
    { id: 'rear', label: 'Heel' },
    { id: 'top', label: 'Aerial' },
  ];

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen w-full flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#0D0E11]">
      {/* Cinematic Studio Backdrop Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-[#91ACFF]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-[#1D2026]/70 rounded-full blur-[130px] pointer-events-none" />

      <div
        ref={heroContentRef}
        className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[75vh]"
      >
        {/* Left Column: Bold Editorial Typography */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 pt-4 lg:pt-0">
          <div className="hero-label inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#15171C] border border-white/10 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#91ACFF] animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-[#A3A6AE] uppercase">
              THE FOOTWEAR COLLECTION
            </span>
          </div>

          <div className="space-y-2">
            <h1
              ref={headlineRef}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F5F2] leading-[1.08]"
            >
              <span className="hero-title-line block">STEP INTO</span>
              <span className="hero-title-line block">A NEW</span>
              <span className="hero-title-line block text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F2] via-[#91ACFF] to-[#B5C7FF]">
                DIMENSION.
              </span>
            </h1>
            <p className="hero-copy text-sm sm:text-base text-[#A3A6AE] leading-relaxed max-w-md font-sans pt-2">
              Explore the shape, materials, and details of every shoe. Rotate the design, discover its construction, and make it your own.
            </p>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="hero-ctas flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href="#collections"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#91ACFF] hover:bg-[#B5C7FF] text-[#0D0E11] font-display font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-[#91ACFF]/20"
            >
              <span>EXPLORE SHOES</span>
              <Rotate3d className="w-4 h-4" />
            </a>
            <a
              href="#customizer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#15171C] hover:bg-[#1D2026] border border-white/15 text-[#F5F5F2] font-display font-medium text-xs uppercase tracking-widest transition-all"
            >
              <span>CUSTOMIZE YOUR PAIR</span>
            </a>
          </div>

          {/* Small Interaction Hint */}
          <div className="hero-hint flex items-center gap-3 pt-4 border-t border-white/10 text-xs font-mono text-[#666973]">
            <Compass className="w-4 h-4 text-[#91ACFF] animate-spin" style={{ animationDuration: '12s' }} />
            <span>DRAG TO ROTATE · SCROLL TO EXPLORE</span>
          </div>
        </div>

        {/* Right Column: 3D Footwear Canvas */}
        <div className="lg:col-span-7 relative h-[440px] sm:h-[520px] lg:h-[620px] w-full flex items-center justify-center">
          <SneakerCanvas isHero={true} modelType="runner" enableHotspots={true} className="w-full h-full" />

          {/* Camera View Angle Buttons */}
          <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-1.5 bg-[#15171C]/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-lg">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePreset(p.id)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all ${
                  activePreset === p.id
                    ? 'bg-[#91ACFF] text-[#0D0E11] font-bold'
                    : 'text-[#A3A6AE] hover:text-white hover:bg-white/5'
                }`}
              >
                {p.label}
              </button>
            ))}
            <button
              onClick={onOpen3DInspect}
              className="ml-1 p-1.5 rounded-lg text-[#A3A6AE] hover:text-white hover:bg-white/10 transition-colors"
              title="Fullscreen 360 Inspection"
              aria-label="Fullscreen 360 Inspection"
            >
              <Eye className="w-3.5 h-3.5 text-[#91ACFF]" />
            </button>
          </div>

          {/* Footwear Metadata Floating Badge (Brand-Free) */}
          <div className="absolute bottom-4 left-4 sm:left-auto sm:right-4 z-20 bg-[#15171C]/90 backdrop-blur-md border border-white/15 p-4 rounded-xl shadow-2xl max-w-xs">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#91ACFF]">
                OBJECT 01 · RUNNER
              </span>
              <span className="text-xs font-mono font-bold text-[#F5F5F2]">
                $195.00
              </span>
            </div>
            <div className="font-display text-sm font-bold text-[#F5F5F2]">
              PERFORMANCE RUNNER
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#A3A6AE] mt-0.5">
              AERODYNAMIC GEOMETRY
            </div>
          </div>
        </div>
      </div>

      {/* Down Scroll Anchor */}
      <a
        href="#featured"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 text-[#A3A6AE] hover:text-white transition-colors animate-bounce"
        aria-label="Scroll to featured footwear"
      >
        <ArrowDown className="w-4 h-4 text-[#91ACFF]" />
      </a>
    </section>
  );
};
