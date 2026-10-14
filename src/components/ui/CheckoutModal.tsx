import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, CheckCircle, ShieldAlert, ArrowRight, Package, Sparkles } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    items,
    subtotal,
    shipping,
    total,
    confirmedTotal,
    completeCheckout,
    isOrderConfirmed,
    setIsOrderConfirmed,
    orderNumber,
  } = useCart();

  const [formData, setFormData] = useState({
    email: 'client@example.com',
    fullName: 'Alexander Vance',
    address: '428 Königstraße, Atelier 4',
    city: 'Munich',
    postalCode: '80331',
    country: 'Germany',
    shippingSpeed: 'express',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Valid contact email is required';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Recipient name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      completeCheckout();
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsOrderConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#17191E] border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#A4A6AE] hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {isOrderConfirmed ? (
          /* Confirmation State */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-status-success/20 border border-status-success/40 flex items-center justify-center text-status-success">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-widest text-[#8CA8FF]">
                Order Confirmed · Demonstration Simulation
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F5F4F0]">
                Thank You, {formData.fullName}.
              </h2>
              <p className="text-xs text-[#A4A6AE] max-w-md mx-auto">
                Your custom architectural order has been queued for simulated master crafting. No real payment was charged.
              </p>
            </div>

            <div className="bg-[#101114] p-4 rounded-xl border border-white/10 max-w-md mx-auto text-left space-y-2 font-mono text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#A4A6AE]">Order Reference:</span>
                <span className="text-[#8CA8FF] font-semibold">{orderNumber}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#A4A6AE]">Destination:</span>
                <span className="text-[#F5F4F0]">{formData.city}, {formData.country}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#A4A6AE]">Notification Sent To:</span>
                <span className="text-[#F5F4F0]">{formData.email}</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm">
                <span className="text-[#A4A6AE]">Total Simulated Value:</span>
                <span className="text-[#8CA8FF]">${(confirmedTotal || total).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-xl bg-[#8CA8FF] hover:bg-[#B1C2FF] text-[#101114] font-display font-semibold text-xs tracking-wider uppercase transition-colors"
            >
              Return to Showroom
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8CA8FF] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulated Express Checkout</span>
            </div>
            <h2 id="checkout-modal-title" className="font-display text-xl md:text-2xl font-bold text-[#F5F4F0]">
              Review & Confirm Order
            </h2>

            {/* Disclaimer Alert */}
            <div className="mt-4 p-3 rounded-xl bg-[#202229] border border-white/10 flex items-start gap-2.5 text-xs text-[#A4A6AE]">
              <ShieldAlert className="w-4 h-4 text-[#8CA8FF] shrink-0 mt-0.5" />
              <span>
                Demonstration Environment: No financial transaction will take place and no credit card is requested.
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Order Items Preview */}
              <div className="bg-[#101114] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase text-[#6B6E7B] mb-1">Order Items ({items.length}):</div>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs font-mono text-[#F5F4F0]">
                    <span>
                      {item.quantity}× {item.name} {item.size ? `(${item.sizeSystem || 'US'} ${item.size})` : ''}
                    </span>
                    <span className="text-[#8CA8FF]">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-2 flex justify-between font-mono text-sm font-bold text-[#F5F4F0]">
                  <span>Total (inc. delivery)</span>
                  <span className="text-[#8CA8FF]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="font-display text-sm font-semibold text-[#F5F4F0]">Delivery Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[#A4A6AE] uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#101114] border border-white/15 focus:border-[#8CA8FF] rounded-lg px-3 py-2 text-xs text-[#F5F4F0] focus:outline-none"
                    />
                    {errors.email && <p className="text-[10px] text-status-error mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#A4A6AE] uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#101114] border border-white/15 focus:border-[#8CA8FF] rounded-lg px-3 py-2 text-xs text-[#F5F4F0] focus:outline-none"
                    />
                    {errors.fullName && <p className="text-[10px] text-status-error mt-1">{errors.fullName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#A4A6AE] uppercase mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#101114] border border-white/15 focus:border-[#8CA8FF] rounded-lg px-3 py-2 text-xs text-[#F5F4F0] focus:outline-none"
                  />
                  {errors.address && <p className="text-[10px] text-status-error mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[#A4A6AE] uppercase mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#101114] border border-white/15 focus:border-[#8CA8FF] rounded-lg px-3 py-2 text-xs text-[#F5F4F0] focus:outline-none"
                    />
                    {errors.city && <p className="text-[10px] text-status-error mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#A4A6AE] uppercase mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-[#101114] border border-white/15 focus:border-[#8CA8FF] rounded-lg px-3 py-2 text-xs text-[#F5F4F0] focus:outline-none"
                    />
                    {errors.postalCode && <p className="text-[10px] text-status-error mt-1">{errors.postalCode}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#A4A6AE] uppercase mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#101114] border border-white/15 focus:border-[#8CA8FF] rounded-lg px-3 py-2 text-xs text-[#F5F4F0] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-xs font-mono text-[#A4A6AE] hover:text-white transition-colors"
                >
                  Return to Bag
                </button>
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl bg-[#8CA8FF] hover:bg-[#B1C2FF] text-[#101114] font-display font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg"
                >
                  <span>Complete Simulated Order (${total.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
