import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collections', href: '#collections' },
    { label: 'Customize', href: '#customizer' },
    { label: 'Inspection', href: '#inspection' },
    { label: 'Materials', href: '#materials' },
    { label: 'Our Story', href: '#story' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D0E11]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Minimal Typographic Nav Label (NO BRAND NAME OR LOGO) */}
        <a
          href="#"
          className="text-xs font-mono uppercase tracking-[0.25em] text-[#F5F5F2] hover:text-[#91ACFF] transition-colors focus:outline-none focus:ring-1 focus:ring-[#91ACFF] py-1"
        >
          FOOTWEAR SHOWROOM
        </a>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-mono uppercase tracking-widest text-[#A3A6AE] hover:text-[#F5F5F2] transition-colors py-1 focus:outline-none focus:ring-1 focus:ring-[#91ACFF] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-2 rounded-xl text-[#A3A6AE] hover:text-white hover:bg-[#1D2026] border border-transparent hover:border-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-[#91ACFF]"
            aria-label="Search collection"
            title="Search (Cmd+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-xl text-[#A3A6AE] hover:text-white hover:bg-[#1D2026] border border-transparent hover:border-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-[#91ACFF]"
            aria-label={`Shopping bag with ${totalItemsCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#91ACFF] text-[#0D0E11] text-[10px] font-mono font-bold flex items-center justify-center animate-in zoom-in-75">
                {totalItemsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#A3A6AE] hover:text-white hover:bg-[#1D2026] transition-colors focus:outline-none focus:ring-1 focus:ring-[#91ACFF]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#15171C] border-b border-white/10 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono uppercase tracking-widest text-[#F5F5F2] hover:text-[#91ACFF] py-2 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
