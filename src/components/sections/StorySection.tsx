import React from 'react';
import { Sparkles, Compass, Feather, Activity } from 'lucide-react';

export const StorySection: React.FC = () => {
  const stories = [
    {
      number: '01',
      title: 'FORM',
      subtitle: 'Aerodynamic Proportion & Silhouette',
      description:
        'Every contour is drawn with computational precision to balance tension and release. By paring back superfluous ornamental overlays, the silhouette reveals pure directional kinetic energy.',
      highlight: 'Zoned lateral stabilization with zero excess weight.',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',
    },
    {
      number: '02',
      title: 'MATERIAL',
      subtitle: 'Tactile Integrity & Organic Depth',
      description:
        'We select full-grain calfskins from carbon-neutral Tuscan tanneries paired with high-tensile jacquard mesh from Kyoto. Each texture interacts with light distinctly, offering continuous visual dialogue.',
      highlight: 'Full PBR refractive depth and natural micro-grain breathing.',
      icon: Feather,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
    },
    {
      number: '03',
      title: 'FUNCTION',
      subtitle: 'Ergonomic Kinetics & Zero-Point Comfort',
      description:
        'Engineered for all-day metropolitan movement. Nitrogen-infused supercritical foam cushioning attenuates foot strike velocity while returning 72% of kinetic rebound energy across the stride cycle.',
      highlight: 'Dual-density impact dampening tested over 500,000 cycles.',
      icon: Activity,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  return (
    <section id="story" className="py-28 bg-[#101114] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8CA8FF] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Design Methodology</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F4F0] tracking-tight leading-tight">
            DESIGNED IN EVERY DIMENSION.
          </h2>
          <p className="mt-4 text-base text-[#A4A6AE] leading-relaxed">
            We reject the disposable paradigm. Every object is conceptualized through architectural rigor, material honesty, and human ergonomics.
          </p>
        </div>

        {/* 3 Editorial Story Chapters */}
        <div className="space-y-24">
          {stories.map((story, idx) => {
            const Icon = story.icon;
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={story.number}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Image */}
                <div
                  className={`lg:col-span-7 relative group ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative aspect-[16/10] rounded-2xl bg-[#17191E] border border-white/10 overflow-hidden shadow-2xl">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101114]/80 via-transparent to-transparent" />

                    <div className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-widest text-[#8CA8FF] bg-[#101114]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                      Studio Chapter {story.number}
                    </div>
                  </div>
                </div>

                {/* Editorial Content */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#8CA8FF]/50">
                      {story.number}
                    </span>
                    <div className="w-10 h-px bg-white/20" />
                    <span className="font-display text-xl font-bold tracking-widest text-[#F5F4F0] uppercase">
                      {story.title}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F4F0] leading-snug">
                    {story.subtitle}
                  </h3>

                  <p className="text-sm text-[#A4A6AE] leading-relaxed font-sans">
                    {story.description}
                  </p>

                  <div className="p-4 rounded-xl bg-[#17191E] border border-white/10 flex items-start gap-3">
                    <Icon className="w-5 h-5 text-[#8CA8FF] shrink-0 mt-0.5" />
                    <span className="text-xs font-mono text-[#F5F4F0]">
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
