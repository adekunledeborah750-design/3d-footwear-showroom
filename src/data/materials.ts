import { MaterialType } from '../types';

export interface LabMaterial {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: 'Organic' | 'Technical' | 'Metallic' | 'Polymer';
  customizerTarget?: MaterialType;
  roughness: number;
  metalness: number;
  specular: string;
  tactileNote: string;
  origin: string;
  gradient: string;
}

export const LAB_MATERIALS: LabMaterial[] = [
  {
    id: 'mat-leather',
    name: 'Full-Grain Calfskin',
    subtitle: 'Supple Architectural Leather',
    description: 'Tanned in small batches using non-toxic vegetable extracts. Develops a personal patina over years of use without losing structural stability.',
    category: 'Organic',
    customizerTarget: 'leather',
    roughness: 0.35,
    metalness: 0.05,
    specular: 'Warm satin reflection',
    tactileNote: 'Natural micro-grain elasticity',
    origin: 'Tuscany, Italy',
    gradient: 'from-[#2b241e] via-[#1a1613] to-[#0e0c0b]',
  },
  {
    id: 'mat-mesh',
    name: 'Jacquard Aero-Mesh',
    subtitle: 'High-Tensile Aeration Weave',
    description: 'Precision-knit monofilament grid optimized through computational thermal modeling. Channels heat away from the foot while resisting lateral torsion.',
    category: 'Technical',
    customizerTarget: 'mesh',
    roughness: 0.85,
    metalness: 0.0,
    specular: 'Micro-perforated light dispersion',
    tactileNote: 'Ultra-pliable honeycomb texture',
    origin: 'Kyoto, Japan',
    gradient: 'from-[#1e2530] via-[#141820] to-[#0d1015]',
  },
  {
    id: 'mat-suede',
    name: 'Brushed Velour Suede',
    subtitle: 'Deep Matte Texture',
    description: 'Abrasion-resistant reverse split cowhide buffed to a silky velvet nap. Absorbs ambient glare and introduces tactile warmth to crisp lines.',
    category: 'Organic',
    customizerTarget: 'suede',
    roughness: 0.95,
    metalness: 0.0,
    specular: 'Total diffuse soft-glow',
    tactileNote: 'Feathered tactile nap',
    origin: 'Porto, Portugal',
    gradient: 'from-[#332e2c] via-[#201d1c] to-[#121010]',
  },
  {
    id: 'mat-synthetic',
    name: 'Hydrophobic TPU Composite',
    subtitle: 'Weather-Shield Aerodynamic Polymer',
    description: 'Bonded ultra-thin thermoplastic elastomer resisting grit, rain, and mechanical shear while preserving featherweight agility.',
    category: 'Polymer',
    customizerTarget: 'synthetic',
    roughness: 0.45,
    metalness: 0.15,
    specular: 'Crisp synthetic sheen',
    tactileNote: 'Silky non-stick finish',
    origin: 'Freiburg, Germany',
    gradient: 'from-[#1c2429] via-[#11171a] to-[#0a0e10]',
  },
  {
    id: 'mat-metal',
    name: 'Anodized 6061-T6 Aluminum',
    subtitle: 'Milled Structural Metal',
    description: 'Aerospace-grade billet alloy CNC machined to 5-micron tolerances and finished with a hard-coat 25-micron matte anodized layer.',
    category: 'Metallic',
    roughness: 0.2,
    metalness: 0.9,
    specular: 'High metallic anisotropic highlight',
    tactileNote: 'Cold, razor-sharp edge precision',
    origin: 'Grenoble, France',
    gradient: 'from-[#2e313b] via-[#1a1c22] to-[#0e1014]',
  },
  {
    id: 'mat-rubber',
    name: 'Vulcanized Carbon Rubber',
    subtitle: 'High-Friction Dynamic Outsole',
    description: 'Formulated with sustainable natural Hevea latex and carbon black for exceptional abrasion life and high wet-surface coefficient of friction.',
    category: 'Polymer',
    roughness: 0.7,
    metalness: 0.0,
    specular: 'Low specular matte bounce',
    tactileNote: 'High grip, micro-flex dampening',
    origin: 'Selangor, Malaysia',
    gradient: 'from-[#252528] via-[#151518] to-[#0c0c0e]',
  },
];
