import React, { createContext, useContext, useState, useEffect } from 'react';
import { CameraPreset, MaterialType, ShoeConfiguration } from '../types';
import { UPPER_COLORS, SOLE_COLORS, LACE_COLORS, MATERIALS } from '../data/products';

interface CustomizerContextType {
  config: ShoeConfiguration;
  setUpperColor: (colorId: string) => void;
  setSoleColor: (colorId: string) => void;
  setLaceColor: (colorId: string) => void;
  setMaterial: (matId: MaterialType) => void;
  setSize: (size: number) => void;
  setSizeSystem: (sys: 'US' | 'UK' | 'EU') => void;
  resetConfig: () => void;
  saveDesign: () => { url: string; success: boolean };
  activePreset: CameraPreset;
  setActivePreset: (preset: CameraPreset) => void;
  showHotspots: boolean;
  setShowHotspots: (show: boolean) => void;
  activeHotspotId: string | null;
  setActiveHotspotId: (id: string | null) => void;
  isInspectOpen: boolean;
  setIsInspectOpen: (open: boolean) => void;
  wireframeMode: boolean;
  setWireframeMode: (enabled: boolean) => void;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
  useGlbModel: boolean;
  setUseGlbModel: (use: boolean) => void;
}

const DEFAULT_CONFIG: ShoeConfiguration = {
  upperColor: UPPER_COLORS[0].hex, // Obsidian Black
  upperColorName: UPPER_COLORS[0].name,
  soleColor: SOLE_COLORS[0].hex, // Cloud White
  soleColorName: SOLE_COLORS[0].name,
  laceColor: LACE_COLORS[0].hex, // Obsidian Black
  laceColorName: LACE_COLORS[0].name,
  material: 'leather',
  materialName: 'Premium Leather',
  size: 9.5,
  sizeSystem: 'US',
};

const CustomizerContext = createContext<CustomizerContextType | undefined>(undefined);

export const CustomizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ShoeConfiguration>(() => {
    // Check URL parameters first
    try {
      const params = new URLSearchParams(window.location.search);
      const urlUpper = params.get('upper');
      const urlSole = params.get('sole');
      const urlLace = params.get('lace');
      const urlMat = params.get('mat') as MaterialType;
      const urlSize = params.get('size');

      const foundUpper = UPPER_COLORS.find(c => c.id === urlUpper);
      const foundSole = SOLE_COLORS.find(c => c.id === urlSole);
      const foundLace = LACE_COLORS.find(c => c.id === urlLace);
      const foundMat = MATERIALS.find(m => m.id === urlMat);

      if (foundUpper || foundSole || foundLace || foundMat) {
        return {
          upperColor: foundUpper ? foundUpper.hex : DEFAULT_CONFIG.upperColor,
          upperColorName: foundUpper ? foundUpper.name : DEFAULT_CONFIG.upperColorName,
          soleColor: foundSole ? foundSole.hex : DEFAULT_CONFIG.soleColor,
          soleColorName: foundSole ? foundSole.name : DEFAULT_CONFIG.soleColorName,
          laceColor: foundLace ? foundLace.hex : DEFAULT_CONFIG.laceColor,
          laceColorName: foundLace ? foundLace.name : DEFAULT_CONFIG.laceColorName,
          material: foundMat ? foundMat.id : DEFAULT_CONFIG.material,
          materialName: foundMat ? foundMat.name : DEFAULT_CONFIG.materialName,
          size: urlSize ? parseFloat(urlSize) : DEFAULT_CONFIG.size,
          sizeSystem: 'US',
        };
      }

      // Check localStorage
      const saved = localStorage.getItem('footwear_showroom_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.upperColor && parsed.soleColor) {
          return parsed;
        }
      }
    } catch {
      // Fallback to default
    }
    return DEFAULT_CONFIG;
  });

  const [activePreset, setActivePreset] = useState<CameraPreset>('hero');
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [isInspectOpen, setIsInspectOpen] = useState<boolean>(false);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [useGlbModel, setUseGlbModel] = useState<boolean>(true); // Use photorealistic GLB shoe by default!

  const setUpperColor = (colorId: string) => {
    const color = UPPER_COLORS.find(c => c.id === colorId);
    if (!color) return;
    setConfig(prev => ({
      ...prev,
      upperColor: color.hex,
      upperColorName: color.name,
    }));
  };

  const setSoleColor = (colorId: string) => {
    const color = SOLE_COLORS.find(c => c.id === colorId);
    if (!color) return;
    setConfig(prev => ({
      ...prev,
      soleColor: color.hex,
      soleColorName: color.name,
    }));
  };

  const setLaceColor = (colorId: string) => {
    const color = LACE_COLORS.find(c => c.id === colorId);
    if (!color) return;
    setConfig(prev => ({
      ...prev,
      laceColor: color.hex,
      laceColorName: color.name,
    }));
  };

  const setMaterial = (matId: MaterialType) => {
    const mat = MATERIALS.find(m => m.id === matId);
    if (!mat) return;
    setConfig(prev => ({
      ...prev,
      material: mat.id,
      materialName: mat.name,
    }));
  };

  const setSize = (size: number) => {
    setConfig(prev => ({ ...prev, size }));
  };

  const setSizeSystem = (sizeSystem: 'US' | 'UK' | 'EU') => {
    setConfig(prev => ({ ...prev, sizeSystem }));
  };

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    localStorage.removeItem('footwear_showroom_config');
    setToastMessage('Design restored to factory default.');
  };

  const saveDesign = () => {
    try {
      localStorage.setItem('footwear_showroom_config', JSON.stringify(config));
      
      const upperObj = UPPER_COLORS.find(c => c.hex === config.upperColor);
      const soleObj = SOLE_COLORS.find(c => c.hex === config.soleColor);
      const laceObj = LACE_COLORS.find(c => c.hex === config.laceColor);

      const params = new URLSearchParams();
      if (upperObj) params.set('upper', upperObj.id);
      if (soleObj) params.set('sole', soleObj.id);
      if (laceObj) params.set('lace', laceObj.id);
      params.set('mat', config.material);
      params.set('size', config.size.toString());

      const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}#customizer`;
      window.history.replaceState({}, '', `?${params.toString()}#customizer`);

      // Try copying to clipboard
      navigator.clipboard?.writeText(shareUrl).catch(() => {});
      
      setToastMessage('Design saved! Shareable link generated & copied to clipboard.');
      return { url: shareUrl, success: true };
    } catch {
      setToastMessage('Design saved to local studio session.');
      return { url: window.location.href, success: true };
    }
  };

  // Clear toast after 4s
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  return (
    <CustomizerContext.Provider
      value={{
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
        activeHotspotId,
        setActiveHotspotId,
        isInspectOpen,
        setIsInspectOpen,
        wireframeMode,
        setWireframeMode,
        toastMessage,
        setToastMessage,
        useGlbModel,
        setUseGlbModel,
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
};

export const useCustomizer = () => {
  const context = useContext(CustomizerContext);
  if (!context) {
    throw new Error('useCustomizer must be used within a CustomizerProvider');
  }
  return context;
};
