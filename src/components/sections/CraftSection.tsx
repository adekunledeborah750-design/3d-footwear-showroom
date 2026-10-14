import React from 'react';
import { Sparkles, Compass, Feather, Activity } from 'lucide-react';

export const CraftSection: React.FC = () => {
  const craftStories = [
    {
      number: '01',
      title: 'SILHOUETTE & PROPORTION',
      subtitle: 'Aerodynamic Line Balance',
      description:
        'Every profile curve is drawn to minimize aerodynamic drag and eliminate unnecessary structural weight. The low-profile toe rocker guides kinetic cadence forward smoothly across each stride cycle.',
      highlight: 'Zoned lateral stabilization with zero excess weight.',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',
    },
    {
      number: '02',
      title: 'STITCHING & MATERIALS',
      subtitle: 'Artisanal Assembly Tolerances',
      description:
        'Bonded double-needle nylon threading sewn with 12 stitches per inch ensures permanent panel integrity without rigid stiffness. Full-grain calfskin marries seamlessly with engineered jacquard weave.',
      highlight: 'Micro-calibrated tensioning resistant to 180 N sheer stress.',
      icon: Feather,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
    },
    {
      number: '03',
      title: 'SOLE CONSTRUCTION',
      subtitle: 'Dual-Density Supercritical Rebound',
      description:
        'The midsole features nitrogen-infused supercritical elastomer surrounded by a high-abrasion carbon rubber outsole. Siping grooves channel water away while providing multi-angle flexure.',
      highlight: '74% kinetic energy return tested over 500,000 gait cycles.',
      icon: Activity,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  return (
    <section id="story" className="py-28 bg-[#0D0E11] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#91ACFF] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Craft & Construction</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight leading-tight">
            BUILT FROM THE DETAILS.
          </h2>
          <p className="mt-4 text-base text-[#A3A6AE] leading-relaxed">
            From computational sole engineering to micro-stitched leather panels, every shoe is constructed through rigorous discipline and purposeful craftsmanship.
          </p>
        </div>

        {/* Editorial Chapters */}
        <div className="space-y-24">
          {craftStories.map((story, idx) => {
            const Icon = story.icon;
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={story.number}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual */}
                <div
                  className={`lg:col-span-7 relative group ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative aspect-[16/10] rounded-2xl bg-[#15171C] border border-white/10 overflow-hidden shadow-2xl">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11]/80 via-transparent to-transparent" />

                    <div className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-widest text-[#91ACFF] bg-[#0D0E11]/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
                      Phase {story.number} · {story.title}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#91ACFF]/50">
                      {story.number}
                    </span>
                    <div className="w-10 h-px bg-white/20" />
                    <span className="font-display text-sm font-bold tracking-widest text-[#F5F5F2] uppercase">
                      {story.subtitle}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F2] leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-sm text-[#A3A6AE] leading-relaxed font-sans">
                    {story.description}
                  </p>

                  <div className="p-4 rounded-xl bg-[#15171C] border border-white/10 flex items-start gap-3">
                    <Icon className="w-5 h-5 text-[#91ACFF] shrink-0 mt-0.5" />
                    <span className="text-xs font-mono text-[#F5F5F2]">
                      {story.highlight}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
