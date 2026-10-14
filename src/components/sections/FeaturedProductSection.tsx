import React from 'react';
import { PRODUCTS, UPPER_COLORS } from '../../data/products';
import { Box, SlidersHorizontal, ShoppingBag, Sparkles } from 'lucide-react';
import { useCustomizer } from '../../context/CustomizerContext';
import { useCart } from '../../context/CartContext';

export const FeaturedProductSection: React.FC<{ onOpen3D: () => void }> = ({ onOpen3D }) => {
  const runner = PRODUCTS[0];
  const { setUpperColor, config } = useCustomizer();
  const { addToCart } = useCart();

  return (
    <section id="featured" className="py-24 bg-[#15171C] border-y border-white/10 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#91ACFF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#91ACFF] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Footwear</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight leading-tight">
            DESIGNED TO BE DISCOVERED.
          </h2>
          <p className="mt-4 text-base text-[#A3A6AE] leading-relaxed">
            Constructed with intention. Built around the micro-details. Made to be explored through every angle.
          </p>
        </div>

        {/* Featured Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Product Visualization */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[4/3] rounded-2xl bg-[#0D0E11] border border-white/10 overflow-hidden flex items-center justify-center p-8">
              <img
                src={runner.image}
                alt={runner.name}
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11]/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-[#15171C]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-mono text-[#F5F5F2]">
                <span className="w-2 h-2 rounded-full bg-status-success" />
                <span>3D Verified Architecture · Supercritical Nitrogen Foam</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#A3A6AE] mb-1">
                <span>{runner.category} Footwear</span>
                <span className="text-[#91ACFF] font-bold text-sm">${runner.price.toFixed(2)}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F2]">
                {runner.name}
              </h3>
            </div>

            <p className="text-sm text-[#A3A6AE] leading-relaxed">
              {runner.longDescription}
            </p>

            {/* Color Swatches */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#A3A6AE]">Available Colors:</span>
                <span className="text-[#F5F5F2] font-semibold">{config.upperColorName}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {UPPER_COLORS.map((c) => {
                  const isSelected = config.upperColor === c.hex;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setUpperColor(c.id)}
                      className={`relative w-8 h-8 rounded-full border transition-all ${
                        isSelected
                          ? 'border-[#91ACFF] scale-110 ring-2 ring-[#91ACFF]/40'
                          : 'border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={`Select ${c.name} for Upper`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Material Information */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono uppercase text-[#666973]">Material Information:</div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#0D0E11] border border-white/5 text-[#A3A6AE]">
                  <span className="text-[#F5F5F2] block font-semibold mb-0.5">Dual-Density</span>
                  Elastomer Midsole
                </div>
                <div className="p-2.5 rounded-lg bg-[#0D0E11] border border-white/5 text-[#A3A6AE]">
                  <span className="text-[#F5F5F2] block font-semibold mb-0.5">Full-Grain</span>
                  Calfskin Saddle
                </div>
              </div>
            </div>

            {/* CTAs: View in 3D, Customize, Add to Bag */}
            <div className="space-y-2.5 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onOpen3D}
                  className="py-3 px-4 rounded-xl bg-[#1D2026] hover:bg-white/10 border border-white/15 text-[#F5F5F2] font-display font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Box className="w-4 h-4 text-[#91ACFF]" />
                  <span>View in 3D</span>
                </button>

                <a
                  href="#customizer"
                  className="py-3 px-4 rounded-xl bg-[#91ACFF] hover:bg-[#B5C7FF] text-[#0D0E11] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Customize</span>
                </a>
              </div>

              <button
                onClick={() => addToCart(runner, config)}
                className="w-full py-3 px-4 rounded-xl bg-[#0D0E11] hover:bg-[#15171C] border border-white/15 text-[#F5F5F2] font-display font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#91ACFF]" />
                <span>Add to Bag · ${runner.price.toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
