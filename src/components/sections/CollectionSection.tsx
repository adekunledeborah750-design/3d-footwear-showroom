import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Box, ShoppingBag, Check, Sparkles } from 'lucide-react';

interface CollectionSectionProps {
  onOpenProductModal: (product: Product) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({ onOpenProductModal }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Running', 'Street', 'Court', 'Minimal', 'Trail', 'Performance'];

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleQuickAdd = (product: Product) => {
    addToCart(product);
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  return (
    <section id="collections" className="py-24 bg-[#15171C] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#91ACFF] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Shoe Collection</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight">
              FIND YOUR NEXT FAVORITE.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A3A6AE] max-w-xl">
              Six distinct footwear silhouettes engineered with genuine 3D geometry, high-performance materials, and dedicated traction soles.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-[#0D0E11]/60 p-1.5 rounded-xl border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#91ACFF] text-[#0D0E11] font-bold shadow-md'
                    : 'text-[#A3A6AE] hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Footwear Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isAdded = !!addedItemMap[product.id];

            return (
              <div
                key={product.id}
                className="group rounded-2xl bg-[#0D0E11] border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Visual Area */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#16181E] flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5">
                    {product.badge && (
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#15171C]/90 backdrop-blur-md border border-white/15 text-[#F5F5F2]">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider px-2 py-1 rounded-full bg-[#91ACFF]/20 text-[#91ACFF] border border-[#91ACFF]/30 backdrop-blur-md">
                      <Box className="w-3 h-3" />
                      <span>3D Model</span>
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#A3A6AE] uppercase tracking-wider">
                        {product.category}
                      </span>
                      <span className="font-mono text-sm font-bold text-[#91ACFF]">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-[#F5F5F2] group-hover:text-white transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#A3A6AE] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Available Colors */}
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] font-mono text-[#666973] uppercase">Colors:</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {product.colors.slice(0, 4).map((c, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1D2026] border border-white/10 text-[#F5F5F2]"
                        >
                          {c}
                        </span>
                      ))}
                      {product.colors.length > 4 && (
                        <span className="text-[10px] font-mono text-[#A3A6AE]">
                          +{product.colors.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenProductModal(product)}
                      className="py-2.5 px-3 rounded-xl bg-[#1D2026] hover:bg-white/10 border border-white/15 text-xs font-mono uppercase tracking-wider text-[#F5F5F2] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Box className="w-3.5 h-3.5 text-[#91ACFF]" />
                      <span>View in 3D</span>
                    </button>

                    <button
                      onClick={() => handleQuickAdd(product)}
                      className={`py-2.5 px-3 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 ${
                        isAdded
                          ? 'bg-status-success text-[#0D0E11] font-bold'
                          : 'bg-[#91ACFF] hover:bg-[#B5C7FF] text-[#0D0E11] font-semibold'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
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
