# Interactive 3D Footwear Showroom

> **"Step into a new dimension."**  
> Premium Interactive 3D Product Showroom, Configurator & Digital Footwear Atelier

A production-quality digital footwear showroom web application engineered with Three.js, React, and Tailwind CSS. Combines the visual presence of a luxury footwear campaign, the interaction of a real-time 3D product configurator, and the functional depth of a modern web application.

---

## 🌟 Key Features

### 1. Cinematic 3D Hero Experience
- **Photorealistic 3D Sneaker Display:** Centered real-time 3D athletic runner with three-point studio lighting (directional key, soft fill, cool rim light, and ambient bounce).
- **Physical Contact Shadows & Auto-Centering:** Dynamic contact ground shadows with auto-centered geometry bounding calculation.
- **Natural Interaction:** Smooth drag-to-orbit, pinch/scroll zoom, and subtle idle rotation that gently pauses during direct user manipulation.
- **Camera Presets:** Instant smooth camera position transitions (*Perspective*, *Profile*, *Toe Cap*, *Heel*, *Aerial*).
- **Interactive 3D Hotspots:** Five pinned annotations with micro-specifications (*Anatomical Upper*, *Engineered Ventilation*, *Dual-Density Midsole*, *Geodesic Outsole*, *Precision Stitching*).

### 2. Interactive 3D Product Customizer
- **Real-Time Material & Color Engine:** Instant 3D PBR shader and texture response without page reload.
  - **Upper Body (6 Colors):** Obsidian Black, Cloud White, Midnight Blue, Stone Grey, Volt Lime, Crimson Red.
  - **Sole Construction (4 Colors):** Cloud White, Obsidian Black, Vintage Cream, Slate Grey.
  - **Precision Laces (5 Colors):** Obsidian, White, Electric Blue, Stone Grey, Volt Lime.
  - **Tactile Materials (4 PBR Surfaces):** Full-grain Leather, Engineered Jacquard Mesh, Brushed Suede, Hydrophobic TPU Synthetic.
- **Sizing System:** Full range (US 7 to 13) with dedicated conversion toggle for US, UK, and EU scales.
- **Real-Time Wireframe Mode:** Toggle geometric wireframe mesh on and off.
- **Design Persistence & URL Sharing:** "Save Design" persists configurations to `localStorage`, synchronizes deep-link query parameters (`?upper=volt&sole=cream&mat=leather&size=10.5#customizer`), and copies shareable links to the clipboard.
- **Restoration & Reset:** Immediate factory default restoration.

### 3. Curated 3D Footwear Collection (6 Distinct Models)
1. **Performance Runner ($189):** Flagship architectural silhouette with carbon plate dynamics and engineered mesh.
2. **Urban Street Sneaker ($165):** Multi-layered retro-modern silhouette with paneled sidewalls and padded tongue.
3. **Court High-Top ($195):** Reinforced ankle collar, cupsole traction, and ankle strap harness.
4. **Minimal Leather Trainer ($145):** Clean cupsole profile, zero exterior seams, and unlined calfskin vamp.
5. **Trail Explorer ($210):** Lugged aggressive outsole, mudguard shielding, and technical corded lacing.
6. **Future Motion ($230):** Aerodynamic monocoque slip-on chassis with parametric segmented cushioning.

### 4. 360° Studio Inspection Lab
- Interactive turntable viewport with presets (*Front Beauty*, *Lateral Profile*, *Toe Box*, *Heel Collar*, *Top Down / Bird's Eye*).
- Switch dynamically between all footwear models in the collection.
- Lighting environment toggle (Dark Studio, Warm Sunset, High-Key Neutral).

### 5. Tactile Material Laboratory
- Interactive material exploration laboratory featuring Calfskin, Jacquard Aero-Mesh, Velour Suede, TPU Composite, and Carbon Rubber.
- **Bidirectional 3D Syncing:** Selecting a laboratory swatch updates the live 3D customizer model immediately.

### 6. Full Client-Side Shopping Bag & Checkout Flow
- **Shopping Bag Drawer:** Slide-over cart displaying thumbnails, exact custom variant specs, size, unit price, quantity adjustments, item removal, and subtotal.
- **Free Courier Delivery Threshold:** Live indicator for complimentary shipping on orders over $150.
- **Demonstration Checkout Flow:** Form validation (Email, Full Name, Street, City, Postal Code, Country), simulated payment processing, and celebratory confetti confirmation.

### 7. Real-Time Search & Navigation
- Global search overlay filtering footwear titles, categories, materials, and descriptions in real time.
- Keyboard shortcuts (`Cmd/Ctrl+K` to search, `Esc` to close).
- One-click launch from search results straight into 3D inspection modals.

---

## 🛠 Technology Stack

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 5](https://vitejs.dev/)
- **3D Graphics:** [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Celebration Effects:** [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Automated QA:** [Puppeteer Core](https://pptr.dev/) driving headless Chrome

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/adekunledeborah750-design/3d-footwear-showroom.git
cd 3d-footwear-showroom

# Install dependencies
npm install
```

### Running Locally
```bash
# Start development server
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production Build
```bash
# Typecheck and build optimized bundle
npm run build

# Preview production build
npm run preview
```

### Running Automated QA Test Suite
```bash
node scripts/test-showroom.js
```

---

## 📄 License & Attribution
- **3D Footwear Assets:** `MaterialsVariantsShoe.glb` provided by [Khronos Group](https://github.com/KhronosGroup/glTF-Sample-Models) under CC0 1.0 Universal / Public Domain.
- **License:** MIT License.
