import React, { useState } from 'react';
import { SneakerCanvas } from '../3d/SneakerCanvas';
import { useCustomizer } from '../../context/CustomizerContext';
import { PRODUCTS } from '../../data/products';
import { ShoeModelType, CameraPreset } from '../../types';
import { RotateCcw, ZoomIn, Eye, Sparkles, Layers, Box } from 'lucide-react';

export const InspectionSection: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<ShoeModelType>('runner');
  const { activePreset, setActivePreset, wireframeMode, setWireframeMode, resetConfig } = useCustomizer();

  const presets: { id: CameraPreset; label: string }[] = [
    { id: 'hero', label: '3/4 Perspective' },
    { id: 'front', label: 'Front View' },
    { id: 'side', label: 'Side Profile' },
    { id: 'rear', label: 'Rear Heel' },
    { id: 'top', label: 'Top View' },
    { id: 'close', label: 'Close-Up' },
  ];

  return (
    <section id="inspection" className="py-24 bg-[#0D0E11] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#91ACFF] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dedicated 360° Studio</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight">
              EVERY ANGLE. EVERY DETAIL.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A3A6AE] max-w-xl">
              Distraction-free 3D product examination. Rotate through 360 degrees, inspect material textures, and switch between camera presets.
            </p>
          </div>

          {/* Model Switcher */}
          <div className="flex flex-wrap gap-1.5 bg-[#15171C] p-1.5 rounded-xl border border-white/10">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedModel(p.modelType)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all ${
                  selectedModel === p.modelType
                    ? 'bg-[#91ACFF] text-[#0D0E11] font-bold shadow'
                    : 'text-[#A3A6AE] hover:text-white'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* 360 Inspection Viewport */}
        <div className="relative w-full h-[540px] sm:h-[640px] rounded-2xl bg-[#15171C] border border-white/10 overflow-hidden shadow-2xl flex flex-col">
          {/* Top Camera Presets Overlay */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            <div className="bg-[#0D0E11]/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-[#A3A6AE] pointer-events-auto flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
              <span>Full 360° Orbital Freedom</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#0D0E11]/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10 pointer-events-auto">
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePreset(p.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                    activePreset === p.id
                      ? 'bg-[#91ACFF] text-[#0D0E11] font-bold'
                      : 'text-[#A3A6AE] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="w-full flex-1 relative">
            <SneakerCanvas className="w-full h-full" modelType={selectedModel} enableHotspots={true} />
          </div>

          {/* Bottom Controls Bar */}
          <div className="p-4 bg-[#0D0E11]/90 border-t border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 z-20">
            <div className="flex items-center gap-2 text-xs font-mono text-[#666973]">
              <Eye className="w-4 h-4 text-[#91ACFF]" />
              <span>Drag to Orbit · Scroll to Zoom · Click Hotspots for Specs</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setWireframeMode(!wireframeMode)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1.5 ${
                  wireframeMode
                    ? 'border-[#91ACFF] bg-[#91ACFF]/10 text-[#91ACFF]'
                    : 'border-white/10 text-[#A3A6AE] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Wireframe</span>
              </button>

              <button
                onClick={() => {
                  setActivePreset('hero');
                  resetConfig();
                }}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-[#A3A6AE] hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset View</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
