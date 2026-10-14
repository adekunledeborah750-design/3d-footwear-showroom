export type MaterialType = 'leather' | 'mesh' | 'suede' | 'synthetic';

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

export interface MaterialOption {
  id: MaterialType;
  name: string;
  description: string;
  textureHint: string;
  roughness: number;
  metalness: number;
}

export interface ShoeConfiguration {
  upperColor: string;
  upperColorName: string;
  soleColor: string;
  soleColorName: string;
  laceColor: string;
  laceColorName: string;
  material: MaterialType;
  materialName: string;
  size: number;
  sizeSystem: 'US' | 'UK' | 'EU';
}

export interface HotspotItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  position: [number, number, number];
  specs?: string[];
}

export type ShoeModelType = 
  | 'runner'
  | 'street'
  | 'hightop'
  | 'minimal'
  | 'trail'
  | 'future';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Running' | 'Street' | 'Court' | 'Minimal' | 'Trail' | 'Performance';
  price: number;
  description: string;
  longDescription: string;
  colors: string[];
  materials: string[];
  dimensions?: string;
  weight?: string;
  isCustomizable?: boolean;
  has3DModel: boolean;
  modelType: ShoeModelType;
  image: string;
  badge?: string;
  rating?: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: number;
  sizeSystem?: 'US' | 'UK' | 'EU';
  configuration?: {
    upperColorName: string;
    upperColor: string;
    soleColorName: string;
    soleColor: string;
    laceColorName: string;
    laceColor: string;
    materialName: string;
  };
}

export type CameraPreset = 'hero' | 'side' | 'front' | 'rear' | 'top' | 'close';
