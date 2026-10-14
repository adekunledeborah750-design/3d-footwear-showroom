import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ShoeConfiguration } from '../types';
import confetti from 'canvas-confetti';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, config?: ShoeConfiguration) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderConfirmed: boolean;
  setIsOrderConfirmed: (confirmed: boolean) => void;
  orderNumber: string | null;
  confirmedTotal: number;
  completeCheckout: () => void;
  subtotal: number;
  shipping: number;
  total: number;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'footwear_showroom_cart_items';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [confirmedTotal, setConfirmedTotal] = useState<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items]);

  const addToCart = (product: Product, config?: ShoeConfiguration) => {
    setItems(prevItems => {
      // Generate a unique key for custom configurations vs standard items
      const configKey = config
        ? `${product.id}-${config.upperColorName}-${config.soleColorName}-${config.laceColorName}-${config.material}-${config.size}`
        : `${product.id}-standard`;

      const existingIndex = prevItems.findIndex(item => item.id === configKey);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }

      const newItem: CartItem = {
        id: configKey,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        size: config?.size,
        sizeSystem: config?.sizeSystem,
        configuration: config
          ? {
              upperColorName: config.upperColorName,
              upperColor: config.upperColor,
              soleColorName: config.soleColorName,
              soleColor: config.soleColor,
              laceColorName: config.laceColorName,
              laceColor: config.laceColor,
              materialName: config.materialName,
            }
          : undefined,
      };

      return [newItem, ...prevItems];
    });

    // Auto-open cart drawer to show customer confirmation
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems(prev =>
      prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const completeCheckout = () => {
    const randomOrder = `NXR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(randomOrder);
    setConfirmedTotal(total);
    setIsOrderConfirmed(true);
    setItems([]);

    // Celebrate with elegant confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8CA8FF', '#F5F4F0', '#B1C2FF', '#202229'],
      });
    } catch {
      // Ignore
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderConfirmed,
        setIsOrderConfirmed,
        orderNumber,
        confirmedTotal,
        completeCheckout,
        subtotal,
        shipping,
        total,
        totalItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
