import React, { useState } from 'react';
import { SneakerCanvas } from '../3d/SneakerCanvas';
import { useCustomizer } from '../../context/CustomizerContext';
import { useCart } from '../../context/CartContext';
import { PRODUCTS, UPPER_COLORS, SOLE_COLORS, LACE_COLORS, MATERIALS } from '../../data/products';
import { CameraPreset } from '../../types';
import {
  Sliders,
  RotateCcw,
  Bookmark,
  ShoppingBag,
  Maximize2,
  Layers,
  Check,
} from 'lucide-react';

export const CustomizerSection: React.FC<{ onOpen3DInspect: () => void }> = ({ onOpen3DInspect }) => {
  const runner = PRODUCTS[0];
  const {
    config,
    setUpperColor,
    setSoleColor,
    setLaceColor,
    setMaterial,
    setSize,
    setSizeSystem,
    resetConfig,
    saveDesign,
    activePreset,
    setActivePreset,
    showHotspots,
    setShowHotspots,
    wireframeMode,
    setWireframeMode,
    useGlbModel,
    setUseGlbModel,
  } = useCustomizer();

  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'colors' | 'materials' | 'sizing'>('colors');
  const [isAdded, setIsAdded] = useState(false);

  const sizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];

  const presets: { id: CameraPreset; label: string }[] = [
    { id: 'hero', label: 'Perspective' },
    { id: 'side', label: 'Profile' },
    { id: 'front', label: 'Front' },
    { id: 'rear', label: 'Heel' },
    { id: 'top', label: 'Top-down' },
    { id: 'close', label: 'Close-up' },
  ];

  const handleAddCustomToBag = () => {
    addToCart(runner, config);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="customizer" className="py-24 bg-[#0D0E11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#91ACFF] mb-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>3D Product Configurator</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight">
              MAKE EVERY DETAIL YOURS.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A3A6AE] max-w-xl">
              Every curve, material, and color is under your control. Craft the exact silhouette that defines your movement.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHotspots(!showHotspots)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                showHotspots
                  ? 'border-[#91ACFF] bg-[#91ACFF]/10 text-[#91ACFF]'
                  : 'border-white/10 text-[#A3A6AE] hover:text-white'
              }`}
            >
              {showHotspots ? 'Hotspots: Active' : 'Hotspots: Hidden'}
            </button>
            <button
              onClick={onOpen3DInspect}
              className="px-3 py-1.5 rounded-lg border border-white/15 bg-[#15171C] hover:bg-white/10 text-xs font-mono text-[#F5F5F2] flex items-center gap-1.5 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#91ACFF]" />
              <span>360° Inspection</span>
            </button>
          </div>
        </div>

        {/* 3D Configurator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Viewport */}
          <div className="lg:col-span-8 bg-[#15171C] border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl flex flex-col h-[520px] sm:h-[620px] lg:h-[700px]">
            {/* Viewport Badge */}
            <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
              <div className="bg-[#0D0E11]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-[#A3A6AE]">
                <span className="w-2 h-2 rounded-full bg-[#91ACFF] animate-pulse" />
                <span>Real-Time 3D Engine · PBR Shaders</span>
              </div>
            </div>

            {/* Camera Presets */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-[#0D0E11]/85 backdrop-blur-md p-1 rounded-xl border border-white/10">
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
            </div>

            {/* 3D Canvas */}
            <div className="w-full flex-1 relative">
              <SneakerCanvas className="w-full h-full" modelType="runner" enableHotspots={showHotspots} />
            </div>

            {/* Bottom Viewport Controls */}
            <div className="p-4 bg-[#0D0E11]/90 border-t border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 z-20">
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-[#A3A6AE]">3D Engine Mode:</span>
                <button
                  onClick={() => setUseGlbModel(false)}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                    !useGlbModel ? 'bg-[#91ACFF] text-[#0D0E11] font-bold' : 'bg-white/5 text-[#A3A6AE]'
                  }`}
                >
                  Multi-Part PBR
                </button>
                <button
                  onClick={() => setUseGlbModel(true)}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                    useGlbModel ? 'bg-[#91ACFF] text-[#0D0E11] font-bold' : 'bg-white/5 text-[#A3A6AE]'
                  }`}
                >
                  Khronos GLTF
                </button>
              </div>

              <button
                onClick={() => setWireframeMode(!wireframeMode)}
                className={`px-2.5 py-1 rounded-md border text-xs font-mono transition-colors flex items-center gap-1.5 ${
                  wireframeMode
                    ? 'border-[#91ACFF] bg-[#91ACFF]/10 text-[#91ACFF]'
                    : 'border-white/10 text-[#A3A6AE] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Wireframe</span>
              </button>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-4 bg-[#15171C] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Category Tabs */}
              <div className="flex border-b border-white/10 pb-2 gap-4">
                <button
                  onClick={() => setActiveTab('colors')}
                  className={`text-xs font-mono uppercase tracking-wider pb-2 transition-colors ${
                    activeTab === 'colors'
                      ? 'text-[#91ACFF] font-bold border-b-2 border-[#91ACFF]'
                      : 'text-[#A3A6AE] hover:text-white'
                  }`}
                >
                  Colors
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`text-xs font-mono uppercase tracking-wider pb-2 transition-colors ${
                    activeTab === 'materials'
                      ? 'text-[#91ACFF] font-bold border-b-2 border-[#91ACFF]'
                      : 'text-[#A3A6AE] hover:text-white'
                  }`}
                >
                  Materials
                </button>
                <button
                  onClick={() => setActiveTab('sizing')}
                  className={`text-xs font-mono uppercase tracking-wider pb-2 transition-colors ${
                    activeTab === 'sizing'
                      ? 'text-[#91ACFF] font-bold border-b-2 border-[#91ACFF]'
                      : 'text-[#A3A6AE] hover:text-white'
                  }`}
                >
                  Sizes
                </button>
              </div>

              {/* Tab 1: Colors */}
              {activeTab === 'colors' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  {/* Upper Color */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[#A3A6AE]">Upper Color:</span>
                      <span className="text-[#F5F5F2] font-semibold">{config.upperColorName}</span>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {UPPER_COLORS.map((c) => {
                        const isSelected = config.upperColor === c.hex;
                        return (
                          <button
                            key={c.id}
                            onClick={() => setUpperColor(c.id)}
                            className={`h-9 rounded-xl border flex items-center justify-center transition-all ${
                              isSelected
                                ? 'border-[#91ACFF] ring-2 ring-[#91ACFF]/50 scale-105'
                                : 'border-white/15 hover:border-white/40'
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                            aria-label={`Select ${c.name} for Upper`}
                          >
                            {isSelected && (
                              <Check
                                className={`w-3.5 h-3.5 ${
                                  c.id === 'cloud' || c.id === 'volt' ? 'text-black' : 'text-white'
                                }`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sole Color */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[#A3A6AE]">Sole Color:</span>
                      <span className="text-[#F5F5F2] font-semibold">{config.soleColorName}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {SOLE_COLORS.map((c) => {
                        const isSelected = config.soleColor === c.hex;
                        return (
                          <button
                            key={c.id}
                            onClick={() => setSoleColor(c.id)}
                            className={`h-9 rounded-xl border flex items-center justify-center transition-all ${
                              isSelected
                                ? 'border-[#91ACFF] ring-2 ring-[#91ACFF]/50 scale-105'
                                : 'border-white/15 hover:border-white/40'
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                            aria-label={`Select ${c.name} for Sole`}
                          >
                            {isSelected && (
                              <Check
                                className={`w-3.5 h-3.5 ${
                                  c.id === 'white' || c.id === 'cream' ? 'text-black' : 'text-white'
                                }`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lace Color */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[#A3A6AE]">Lace Color:</span>
                      <span className="text-[#F5F5F2] font-semibold">{config.laceColorName}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {LACE_COLORS.map((c) => {
                        const isSelected = config.laceColor === c.hex;
                        return (
                          <button
                            key={c.id}
                            onClick={() => setLaceColor(c.id)}
                            className={`h-9 rounded-xl border flex items-center justify-center transition-all ${
                              isSelected
                                ? 'border-[#91ACFF] ring-2 ring-[#91ACFF]/50 scale-105'
                                : 'border-white/15 hover:border-white/40'
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                            aria-label={`Select ${c.name} for Laces`}
                          >
                            {isSelected && (
                              <Check
                                className={`w-3.5 h-3.5 ${
                                  c.id === 'white' ? 'text-black' : 'text-white'
                                }`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Materials */}
              {activeTab === 'materials' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="text-xs font-mono text-[#A3A6AE] mb-1">
                    Tactile Finish (Updates 3D PBR Properties):
                  </div>
                  {MATERIALS.map((m) => {
                    const isSelected = config.material === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setMaterial(m.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#1D2026] border-[#91ACFF] ring-1 ring-[#91ACFF]/30'
                            : 'bg-[#0D0E11] border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display text-sm font-semibold text-[#F5F5F2]">
                            {m.name}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#91ACFF]" />}
                        </div>
                        <p className="text-xs text-[#A3A6AE] mt-1 leading-relaxed">
                          {m.description}
                        </p>
                        <div className="mt-2 text-[10px] font-mono text-[#91ACFF] uppercase">
                          {m.textureHint}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab 3: Sizing */}
              {activeTab === 'sizing' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-[#A3A6AE]">Sizing Scale:</span>
                    <div className="flex bg-[#0D0E11] rounded-lg p-0.5 border border-white/10">
                      {(['US', 'UK', 'EU'] as const).map((sys) => (
                        <button
                          key={sys}
                          onClick={() => setSizeSystem(sys)}
                          className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                            config.sizeSystem === sys
                              ? 'bg-[#91ACFF] text-[#0D0E11] font-bold'
                              : 'text-[#A3A6AE] hover:text-white'
                          }`}
                        >
                          {sys}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#A3A6AE]">Select Size:</span>
                      <span className="text-[#F5F5F2] font-bold">
                        {config.sizeSystem} {config.size}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {sizes.map((s) => {
                        const isSelected = config.size === s;
                        return (
                          <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={`py-2 rounded-lg text-xs font-mono border transition-all ${
                              isSelected
                                ? 'bg-[#91ACFF] border-[#91ACFF] text-[#0D0E11] font-bold'
                                : 'bg-[#0D0E11] border-white/10 text-[#F5F5F2] hover:border-white/30'
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Summary & Action Buttons */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="p-3 rounded-xl bg-[#0D0E11] border border-white/5 space-y-1 text-xs font-mono">
                <div className="flex justify-between text-[#A3A6AE]">
                  <span>Upper: {config.upperColorName}</span>
                  <span>Sole: {config.soleColorName}</span>
                </div>
                <div className="flex justify-between text-[#A3A6AE]">
                  <span>Lace: {config.laceColorName}</span>
                  <span>Finish: {config.materialName}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-sm text-[#F5F5F2] border-t border-white/5">
                  <span>Size {config.sizeSystem} {config.size}</span>
                  <span className="text-[#91ACFF]">${runner.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleAddCustomToBag}
                  className={`w-full py-3.5 px-6 rounded-xl font-display font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-lg ${
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
                      <span>ADD TO BAG · ${runner.price.toFixed(2)}</span>
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => saveDesign()}
                    className="py-2.5 px-3 rounded-xl bg-[#1D2026] hover:bg-white/10 border border-white/15 text-xs font-mono uppercase tracking-wider text-[#F5F5F2] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-[#91ACFF]" />
                    <span>Save Design</span>
                  </button>

                  <button
                    onClick={resetConfig}
                    className="py-2.5 px-3 rounded-xl bg-[#1D2026] hover:bg-white/10 border border-white/15 text-xs font-mono uppercase tracking-wider text-[#A3A6AE] hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
