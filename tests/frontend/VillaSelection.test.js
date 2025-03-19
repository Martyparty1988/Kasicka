import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CartProvider } from '../../src/context/CartContext';
import VillaSelection from '../../src/pages/VillaSelection';
import theme from '../../src/theme';

// Mock the cart context
jest.mock('../../src/context/CartContext', () => ({
  ...jest.requireActual('../../src/context/CartContext'),
  useCart: () => ({
    setSelectedVilla: jest.fn(),
    clearCart: jest.fn()
  })
}));

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const renderVillaSelectionPage = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <VillaSelection />
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('VillaSelection Page', () => {
  test('renders villa selection page with title', () => {
    renderVillaSelectionPage();
    
    expect(screen.getByText('Vyberte vilu')).toBeInTheDocument();
    expect(screen.getByText('Zvolte vilu, pro kterou chcete spravovat minibar a další služby.')).toBeInTheDocument();
  });

  test('displays all three villas', () => {
    renderVillaSelectionPage();
    
    expect(screen.getByText('Oh Yeah Villa')).toBeInTheDocument();
    expect(screen.getByText('Amazing Pool Villa')).toBeInTheDocument();
    expect(screen.getByText('Little Castle Villa')).toBeInTheDocument();
  });

  test('navigates to inventory page when villa is selected', async () => {
    renderVillaSelectionPage();
    
    // Find and click the first "Vybrat vilu" button
    const selectButtons = screen.getAllByText('Vybrat vilu');
    fireEvent.click(selectButtons[0]);
    
    // Check if navigation was called with correct path
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(expect.stringMatching(/\/inventory\/\d+/));
    });
  });

  test('displays villa descriptions', () => {
    renderVillaSelectionPage();
    
    expect(screen.getByText(/Luxusní vila s krásným výhledem/)).toBeInTheDocument();
    expect(screen.getByText(/Prostorná vila s velkým bazénem/)).toBeInTheDocument();
    expect(screen.getByText(/Unikátní vila ve stylu malého hradu/)).toBeInTheDocument();
  });
});
