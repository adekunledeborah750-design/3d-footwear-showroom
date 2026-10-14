import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { Search, X, ArrowRight, Box } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd/Ctrl + K and Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = PRODUCTS.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.materials.some((m) => m.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 md:pt-28 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#17191E] border border-white/15 rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Search Showroom"
      >
        {/* Search Bar Input */}
        <div className="p-4 md:p-6 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8CA8FF] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, materials, categories (e.g. Runner, Leather, Audio)..."
            className="w-full bg-transparent text-sm md:text-base text-[#F5F4F0] placeholder-[#A4A6AE]/60 focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A4A6AE] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 md:p-6 space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[#A4A6AE] space-y-2">
              <p className="text-sm">No products matched "{query}"</p>
              <p className="text-xs text-[#6B6E7B]">Try searching for "Footwear", "Audio", "Watch", or "Leather"</p>
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="group flex items-center justify-between p-3.5 rounded-xl hover:bg-[#202229] border border-transparent hover:border-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-[#101114] border border-white/10 overflow-hidden shrink-0 flex items-center justify-center p-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-[#8CA8FF] tracking-wider">
                        {product.category}
                      </span>
                      {product.has3DModel && (
                        <span className="flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white">
                          <Box className="w-2.5 h-2.5 text-[#8CA8FF]" /> 3D Model
                        </span>
                      )}
                    </div>
                    <h4 className="font-display text-sm font-semibold text-[#F5F4F0] group-hover:text-white transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#A4A6AE] line-clamp-1 max-w-md">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-[#8CA8FF] font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#101114] border border-white/10 flex items-center justify-center text-[#A4A6AE] group-hover:text-[#8CA8FF] group-hover:border-[#8CA8FF] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 border-t border-white/10 bg-[#101114]/60 px-6 flex items-center justify-between text-[11px] font-mono text-[#6B6E7B]">
          <span>Tip: Click any item to inspect in 3D</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
};
