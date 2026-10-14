import React, { useState } from 'react';
import { LAB_MATERIALS, LabMaterial } from '../../data/materials';
import { useCustomizer } from '../../context/CustomizerContext';
import { Microscope, ArrowUpRight, Check, Layers } from 'lucide-react';

export const MaterialLabSection: React.FC = () => {
  const { config, setMaterial, setToastMessage } = useCustomizer();
  const [activeMaterial, setActiveMaterial] = useState<LabMaterial>(LAB_MATERIALS[0]);

  const handleApplyMaterial = (item: LabMaterial) => {
    setActiveMaterial(item);
    if (item.customizerTarget) {
      setMaterial(item.customizerTarget);
      setToastMessage(`Applied ${item.name} to 3D Footwear Model.`);
    } else {
      setToastMessage(`${item.name} selected for inspection.`);
    }
  };

  return (
    <section id="materials" className="py-24 bg-[#15171C] border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#91ACFF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#91ACFF] mb-2">
              <Microscope className="w-3.5 h-3.5" />
              <span>Material Laboratory</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F2] tracking-tight">
              FEEL THE DIFFERENCE.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A3A6AE] max-w-xl">
              An exploration of tactile depth: woven mesh, smooth leather, velour suede, textured rubber, and engineered foam. Selecting a swatch updates the 3D model.
            </p>
          </div>

          <div className="bg-[#0D0E11] px-4 py-2.5 rounded-xl border border-white/10 text-xs font-mono text-[#A3A6AE] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            <span>Interactive PBR Shader Synchronization</span>
          </div>
        </div>

        {/* Material Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Swatches */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LAB_MATERIALS.map((item) => {
              const isSelected = activeMaterial.id === item.id;
              const isConfigActive =
                item.customizerTarget && config.material === item.customizerTarget;

              return (
                <div
                  key={item.id}
                  onClick={() => handleApplyMaterial(item)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                    isSelected
                      ? 'bg-[#1D2026] border-[#91ACFF] ring-2 ring-[#91ACFF]/40 shadow-xl'
                      : 'bg-[#0D0E11] border-white/10 hover:border-white/25 hover:bg-[#13151A]'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-40 group-hover:opacity-60 transition-opacity`} />

                  <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#91ACFF] px-2 py-0.5 rounded bg-white/5 border border-white/5">
                        {item.category}
                      </span>
                      {isConfigActive && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-status-success/20 text-status-success border border-status-success/30 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Active on 3D
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-display text-base font-bold text-[#F5F5F2] group-hover:text-white transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#A3A6AE] mt-1 line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#666973]">
                      <span>Roughness: {Math.round(item.roughness * 100)}%</span>
                      <span className="text-[#91ACFF] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        Test Material <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Material Dossier */}
          <div className="lg:col-span-5 bg-[#0D0E11] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#91ACFF]">
                  Material Dossier · {activeMaterial.origin}
                </span>
                <h3 className="font-display text-2xl font-bold text-[#F5F5F2] mt-1">
                  {activeMaterial.name}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#1D2026] border border-white/15 flex items-center justify-center text-[#91ACFF]">
                <Layers className="w-5 h-5" />
              </div>
            </div>

            <p className="text-sm text-[#A3A6AE] leading-relaxed">
              {activeMaterial.description}
            </p>

            <div className="space-y-3 font-mono text-xs bg-[#15171C] p-4 rounded-xl border border-white/5">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-[#666973]">Tactile Feel</span>
                <span className="text-[#F5F5F2]">{activeMaterial.tactileNote}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-[#666973]">PBR Specular</span>
                <span className="text-[#F5F5F2]">{activeMaterial.specular}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-[#666973]">Roughness Index</span>
                <span className="text-[#91ACFF] font-semibold">{activeMaterial.roughness}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#666973]">Metallic Reflectance</span>
                <span className="text-[#91ACFF] font-semibold">{activeMaterial.metalness}</span>
              </div>
            </div>

            {activeMaterial.customizerTarget ? (
              <a
                href="#customizer"
                onClick={() => setMaterial(activeMaterial.customizerTarget!)}
                className="w-full py-3 px-6 rounded-xl bg-[#91ACFF] hover:bg-[#B5C7FF] text-[#0D0E11] font-display font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <span>Apply to 3D Configurator</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ) : (
              <div className="text-center p-3 rounded-xl bg-[#15171C] border border-white/5 text-xs font-mono text-[#A3A6AE]">
                Engineered for High-Traction Outsole Base
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
