import React, { useState } from 'react';
import { Product } from '../../types';
import { SneakerCanvas } from './SneakerCanvas';
import { useCustomizer } from '../../context/CustomizerContext';
import { useCart } from '../../context/CartContext';
import { X, Check, ShoppingBag, Eye, Layers } from 'lucide-react';

interface Product3DModalProps {
  product: Product | null;
  onClose: () => void;
}

export const Product3DModal: React.FC<Product3DModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { config, wireframeMode, setWireframeMode } = useCustomizer();
  const [activeTab, setActiveTab] = useState<'3d' | 'specs'>('3d');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, product.isCustomizable ? config : undefined);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl h-[88vh] bg-[#15171C] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-shoe-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-xl bg-[#1D2026]/80 border border-white/10 text-[#A3A6AE] hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: 3D Canvas */}
        <div className="relative w-full md:w-3/5 h-1/2 md:h-full bg-[#0D0E11] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
          <SneakerCanvas
            className="w-full h-full"
            modelType={product.modelType}
            enableHotspots={true}
          />

          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-[#15171C]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-[#A3A6AE]">
            <span className="w-2 h-2 rounded-full bg-[#91ACFF] animate-pulse" />
            <span>360° Real-time 3D Engine · {product.category}</span>
            <button
              onClick={() => setWireframeMode(!wireframeMode)}
              className={`ml-2 px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                wireframeMode ? 'bg-[#91ACFF] text-[#0D0E11] font-bold' : 'bg-white/10 text-white'
              }`}
            >
              Wireframe
            </button>
          </div>
        </div>

        {/* Right Column: Editorial Details */}
        <div className="w-full md:w-2/5 h-1/2 md:h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-[#15171C]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#91ACFF] mb-2">
              <span>{product.category}</span>
              <span>·</span>
              <span>{product.badge || 'Showroom Edition'}</span>
            </div>

            <h2 id="modal-shoe-title" className="font-display text-2xl md:text-3xl font-bold text-[#F5F5F2] tracking-tight">
              {product.name}
            </h2>

            <div className="text-xl font-mono text-[#91ACFF] font-semibold mt-2">
              ${product.price.toFixed(2)}
            </div>

            {/* Tab switch */}
            <div className="flex gap-4 border-b border-white/10 mt-6 pb-2">
              <button
                onClick={() => setActiveTab('3d')}
                className={`text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeTab === '3d'
                    ? 'text-[#91ACFF] font-semibold border-b-2 border-[#91ACFF] pb-2'
                    : 'text-[#A3A6AE] hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeTab === 'specs'
                    ? 'text-[#91ACFF] font-semibold border-b-2 border-[#91ACFF] pb-2'
                    : 'text-[#A3A6AE] hover:text-white'
                }`}
              >
                Specifications
              </button>
            </div>

            {activeTab === '3d' ? (
              <div className="mt-4 space-y-4">
                <p className="text-sm text-[#A3A6AE] leading-relaxed">
                  {product.longDescription}
                </p>

                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-[#666973]">Available Finishes:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.colors.map((c, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-md bg-[#1D2026] border border-white/10 text-[#F5F5F2]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-[#666973]">Material Palette:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.materials.map((m, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-md bg-[#1D2026] border border-white/10 text-[#F5F5F2]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3 font-mono text-xs">
                {product.dimensions && (
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#A3A6AE]">Sizing</span>
                    <span className="text-[#F5F5F2]">{product.dimensions}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#A3A6AE]">Weight</span>
                    <span className="text-[#F5F5F2]">{product.weight}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-[#A3A6AE]">Traction Rating</span>
                  <span className="text-[#F5F5F2]">Shore A 68 Carbon Rubber</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-[#A3A6AE]">Assembly</span>
                  <span className="text-[#F5F5F2]">Artisanal 12 SPI Double-Needle</span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 px-6 rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                isAdded
                  ? 'bg-status-success text-[#0D0E11]'
                  : 'bg-[#91ACFF] hover:bg-[#B5C7FF] text-[#0D0E11]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Shopping Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag · ${product.price.toFixed(2)}</span>
                </>
              )}
            </button>

            {product.isCustomizable && (
              <a
                href="#customizer"
                onClick={onClose}
                className="w-full block text-center py-2.5 px-4 rounded-xl border border-white/15 hover:border-[#91ACFF] text-xs font-mono uppercase tracking-wider text-[#F5F5F2] hover:text-[#91ACFF] transition-colors"
              >
                Open in 3D Configurator
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
