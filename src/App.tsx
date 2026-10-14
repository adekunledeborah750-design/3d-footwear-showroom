import React, { useState } from 'react';
import { CustomizerProvider } from './context/CustomizerContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { FeaturedProductSection } from './components/sections/FeaturedProductSection';
import { CustomizerSection } from './components/sections/CustomizerSection';
import { CollectionSection } from './components/sections/CollectionSection';
import { InspectionSection } from './components/sections/InspectionSection';
import { MaterialLabSection } from './components/sections/MaterialLabSection';
import { CraftSection } from './components/sections/CraftSection';
import { CtaSection } from './components/sections/CtaSection';
import { Footer } from './components/sections/Footer';
import { Product3DModal } from './components/3d/Product3DModal';
import { SearchModal } from './components/ui/SearchModal';
import { CartDrawer } from './components/ui/CartDrawer';
import { CheckoutModal } from './components/ui/CheckoutModal';
import { ToastNotification } from './components/ui/ToastNotification';
import { Product } from './types';
import { PRODUCTS } from './data/products';

export const AppContent: React.FC = () => {
  const [selectedProductFor3D, setSelectedProductFor3D] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0E11] text-[#F5F5F2] flex flex-col selection:bg-[#91ACFF] selection:text-[#0D0E11]">
      {/* Section A — Minimal Navigation (Brand-Free) */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Single-Page Showroom */}
      <main className="flex-1">
        {/* Animated Hero Section */}
        <HeroSection onOpen3DInspect={() => setSelectedProductFor3D(PRODUCTS[0])} />

        {/* Section B — Featured Shoe: DESIGNED TO BE DISCOVERED. */}
        <FeaturedProductSection onOpen3D={() => setSelectedProductFor3D(PRODUCTS[0])} />

        {/* Section C — Interactive 3D Shoe Configurator: MAKE EVERY DETAIL YOURS. */}
        <CustomizerSection onOpen3DInspect={() => setSelectedProductFor3D(PRODUCTS[0])} />

        {/* Section D — The Shoe Collection: FIND YOUR NEXT FAVORITE. */}
        <CollectionSection onOpenProductModal={(p) => setSelectedProductFor3D(p)} />

        {/* Section E — 360-Degree Product Inspection: EVERY ANGLE. EVERY DETAIL. */}
        <InspectionSection />

        {/* Section G — Material Laboratory: FEEL THE DIFFERENCE. */}
        <MaterialLabSection />

        {/* Section H — Craft and Construction: BUILT FROM THE DETAILS. */}
        <CraftSection />

        {/* Section K — Final Call to Action: YOUR NEXT STEP STARTS HERE. */}
        <CtaSection />
      </main>

      {/* Section L — Understated Footer */}
      <Footer />

      {/* Interactive Overlays */}
      <Product3DModal
        product={selectedProductFor3D}
        onClose={() => setSelectedProductFor3D(null)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProductFor3D(p)}
      />

      <CartDrawer />
      <CheckoutModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <CustomizerProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </CustomizerProvider>
  );
}
