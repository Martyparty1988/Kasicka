import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSettings } from './SettingsContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { settings } = useSettings();
  const [cartItems, setCartItems] = useState([]);
  const [selectedVilla, setSelectedVilla] = useState(null);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedVilla = localStorage.getItem('selectedVilla');
    
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart:', error);
      }
    }
    
    if (storedVilla) {
      try {
        setSelectedVilla(JSON.parse(storedVilla));
      } catch (error) {
        console.error('Failed to parse selected villa:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Save selected villa to localStorage when it changes
  useEffect(() => {
    if (selectedVilla) {
      localStorage.setItem('selectedVilla', JSON.stringify(selectedVilla));
    }
  }, [selectedVilla]);
  
  // Add item to cart
  const addToCart = (item, quantity = 1) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        toast.success(`${item.name} množství aktualizováno v košíku`);
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        toast.success(`${item.name} přidáno do košíku`);
        return [...prevItems, { ...item, quantity }];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => {
      const item = prevItems.find(i => i.id === itemId);
      if (item) {
        toast.info(`${item.name} odebráno z košíku`);
      }
      return prevItems.filter(item => item.id !== itemId);
    });
  };
  
  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    toast.info('Košík byl vyprázdněn');
  };
  
  // Calculate subtotal (without city tax)
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      // Skip city tax items
      if (item.isCityTax) return total;
      
      const price = settings.currency === 'CZK' ? item.priceCzk : item.priceEur;
      return total + (price * item.quantity);
    }, 0);
  };
  
  // Calculate city tax
  const calculateCityTax = () => {
    const cityTaxPerNightPerGuest = settings.currency === 'CZK' ? 50 : 2; // 2 EUR or 50 CZK
    return settings.guestCount * settings.nightsCount * cityTaxPerNightPerGuest;
  };
  
  // Calculate discount
  const calculateDiscount = () => {
    if (!settings.applyDiscount) return 0;
    return (settings.discountPercentage / 100) * calculateSubtotal();
  };
  
  // Calculate total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const cityTax = calculateCityTax();
    
    return subtotal - discount + cityTax;
  };
  
  const value = {
    cartItems,
    selectedVilla,
    setSelectedVilla,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateSubtotal,
    calculateDiscount,
    calculateCityTax,
    calculateTotal,
    itemCount: cartItems.reduce((count, item) => count + item.quantity, 0)
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
