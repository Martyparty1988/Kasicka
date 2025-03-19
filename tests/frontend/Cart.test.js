import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CartProvider } from '../../src/context/CartContext';
import { SettingsProvider } from '../../src/context/SettingsContext';
import Cart from '../../src/pages/Cart';
import theme from '../../src/theme';

// Mock the cart context
jest.mock('../../src/context/CartContext', () => ({
  ...jest.requireActual('../../src/context/CartContext'),
  useCart: () => ({
    cartItems: [
      { id: 1, name: 'Coca-Cola', priceCzk: 32, priceEur: 1.28, quantity: 2 },
      { id: 2, name: 'Budvar', priceCzk: 59, priceEur: 2.36, quantity: 1 }
    ],
    selectedVilla: { id: 1, name: 'Oh Yeah Villa' },
    updateQuantity: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
    calculateSubtotal: jest.fn().mockReturnValue(123),
    calculateDiscount: jest.fn().mockReturnValue(12.3),
    calculateCityTax: jest.fn().mockReturnValue(12),
    calculateTotal: jest.fn().mockReturnValue(122.7)
  })
}));

// Mock settings context
jest.mock('../../src/context/SettingsContext', () => ({
  ...jest.requireActual('../../src/context/SettingsContext'),
  useSettings: () => ({
    settings: {
      guestCount: 2,
      nightsCount: 3,
      currency: 'CZK',
      exchangeRate: 25,
      applyDiscount: true,
      discountPercentage: 10
    },
    updateSetting: jest.fn()
  })
}));

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock axios
jest.mock('axios', () => ({
  post: jest.fn().mockResolvedValue({ data: { id: 1 } })
}));

const renderCartPage = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SettingsProvider>
          <CartProvider>
            <Routes>
              <Route path="*" element={<Cart />} />
            </Routes>
          </CartProvider>
        </SettingsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Cart Page', () => {
  test('renders cart page with title', () => {
    renderCartPage();
    
    expect(screen.getByText('Košík')).toBeInTheDocument();
    expect(screen.getByText('Oh Yeah Villa')).toBeInTheDocument();
  });

  test('displays cart items', () => {
    renderCartPage();
    
    expect(screen.getByText('Coca-Cola')).toBeInTheDocument();
    expect(screen.getByText('Budvar')).toBeInTheDocument();
  });

  test('displays order summary', () => {
    renderCartPage();
    
    expect(screen.getByText('Souhrn objednávky')).toBeInTheDocument();
    expect(screen.getByText('Mezisoučet:')).toBeInTheDocument();
    expect(screen.getByText('Sleva (10%):')).toBeInTheDocument();
    expect(screen.getByText(/City Tax/)).toBeInTheDocument();
    expect(screen.getByText('Celkem:')).toBeInTheDocument();
  });

  test('has functional quantity controls', () => {
    const { useCart } = require('../../src/context/CartContext');
    renderCartPage();
    
    // Find quantity controls for the first item
    const decreaseButton = screen.getAllByRole('button')[0]; // First decrease button
    const increaseButton = screen.getAllByRole('button')[1]; // First increase button
    
    // Click decrease button
    fireEvent.click(decreaseButton);
    expect(useCart().updateQuantity).toHaveBeenCalledWith(1, 1); // id=1, quantity=2-1=1
    
    // Click increase button
    fireEvent.click(increaseButton);
    expect(useCart().updateQuantity).toHaveBeenCalledWith(1, 3); // id=1, quantity=2+1=3
  });

  test('has functional remove item button', () => {
    const { useCart } = require('../../src/context/CartContext');
    renderCartPage();
    
    // Find remove button for the first item
    const removeButtons = screen.getAllByRole('button').filter(
      button => button.querySelector('svg[data-testid="DeleteIcon"]')
    );
    
    // Click remove button
    fireEvent.click(removeButtons[0]);
    expect(useCart().removeFromCart).toHaveBeenCalledWith(1); // id=1
  });

  test('has functional clear cart button', () => {
    const { useCart } = require('../../src/context/CartContext');
    renderCartPage();
    
    // Find clear cart button
    const clearCartButton = screen.getByText('Vyprázdnit košík');
    
    // Click clear cart button
    fireEvent.click(clearCartButton);
    expect(useCart().clearCart).toHaveBeenCalled();
  });

  test('has functional create order button', async () => {
    renderCartPage();
    
    // Find create order button
    const createOrderButton = screen.getByText('Vytvořit objednávku');
    
    // Click create order button
    fireEvent.click(createOrderButton);
    
    // Check if navigation was called with correct path
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/invoice/1');
    });
  });
});
