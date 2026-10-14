import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shipping,
    total,
    setIsCheckoutOpen,
  } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          className="w-screen max-w-md bg-[#17191E] border-l border-white/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-heading"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#8CA8FF]" />
              <h2 id="cart-drawer-heading" className="font-display text-base font-bold text-[#F5F4F0] tracking-wide">
                STUDIO BAG ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-[#A4A6AE] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#202229] border border-white/10 flex items-center justify-center text-[#A4A6AE]">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-base font-semibold text-[#F5F4F0]">Your bag is empty</h3>
                  <p className="text-xs text-[#A4A6AE] max-w-xs leading-relaxed">
                    Explore our curated collection or craft your own bespoke 3D product.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 text-xs font-mono uppercase tracking-widest text-[#8CA8FF] hover:underline"
                >
                  Continue Exploring
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#202229]/80 border border-white/10 flex gap-4 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg bg-[#101114] border border-white/10 overflow-hidden shrink-0 flex items-center justify-center p-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display text-sm font-semibold text-[#F5F4F0] leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#A4A6AE] hover:text-status-error transition-colors p-1"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Details if Present */}
                      {item.configuration ? (
                        <div className="mt-1.5 space-y-0.5 text-[11px] font-mono text-[#A4A6AE]">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: item.configuration.upperColor }} />
                            <span>Upper: {item.configuration.upperColorName}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: item.configuration.soleColor }} />
                            <span>Sole: {item.configuration.soleColorName}</span>
                          </div>
                          <div>Material: {item.configuration.materialName}</div>
                          {item.size && (
                            <div>Size: {item.sizeSystem || 'US'} {item.size}</div>
                          )}
                        </div>
                      ) : (
                        item.size && (
                          <div className="mt-1 text-[11px] font-mono text-[#A4A6AE]">
                            Size: {item.sizeSystem || 'US'} {item.size}
                          </div>
                        )
                      )}
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                      <div className="flex items-center border border-white/15 rounded-lg bg-[#101114]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-[#A4A6AE] hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono text-[#F5F4F0]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-[#A4A6AE] hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-semibold text-[#8CA8FF]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] font-mono text-[#6B6E7B]">
                            ${item.price.toFixed(2)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Totals */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#17191E] space-y-4">
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-[#A4A6AE]">
                  <span>Subtotal</span>
                  <span className="text-[#F5F4F0]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#A4A6AE]">
                  <span>Courier Delivery</span>
                  <span>{shipping === 0 ? <span className="text-status-success font-semibold">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <div className="text-[10px] text-[#8CA8FF] font-sans">
                    Add ${(150 - subtotal).toFixed(2)} more for complimentary expedited delivery.
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#F5F4F0] pt-2 border-t border-white/10">
                  <span>Estimated Total</span>
                  <span className="text-[#8CA8FF] text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#A4A6AE] bg-[#101114]/50 p-2.5 rounded-lg border border-white/5">
                <ShieldCheck className="w-4 h-4 text-[#8CA8FF] shrink-0" />
                <span>Encrypted simulated checkout · Demonstration preview</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#8CA8FF] hover:bg-[#B1C2FF] text-[#101114] font-display font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <span>Proceed to Demonstration Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2 text-xs font-mono uppercase tracking-widest text-[#A4A6AE] hover:text-white transition-colors"
                >
                  Continue Exploring
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
