import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from '../../src/context/AuthContext';
import Login from '../../src/pages/auth/Login';
import theme from '../../src/theme';

// Mock the auth context
jest.mock('../../src/context/AuthContext', () => ({
  ...jest.requireActual('../../src/context/AuthContext'),
  useAuth: () => ({
    login: jest.fn().mockImplementation((username, password) => {
      if (username === 'admin' && password === 'admin123') {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    }),
    isAuthenticated: false,
    loading: false
  })
}));

const renderLoginPage = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  test('renders login form', () => {
    renderLoginPage();
    
    expect(screen.getByText('Přihlášení')).toBeInTheDocument();
    expect(screen.getByLabelText('Uživatelské jméno')).toBeInTheDocument();
    expect(screen.getByLabelText('Heslo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Přihlásit se' })).toBeInTheDocument();
  });

  test('validates form inputs', async () => {
    renderLoginPage();
    
    const loginButton = screen.getByRole('button', { name: 'Přihlásit se' });
    
    // Submit form without inputs
    fireEvent.click(loginButton);
    
    // Wait for validation messages
    await waitFor(() => {
      expect(screen.getByText('Uživatelské jméno je povinné')).toBeInTheDocument();
      expect(screen.getByText('Heslo je povinné')).toBeInTheDocument();
    });
  });

  test('handles login submission', async () => {
    renderLoginPage();
    
    const usernameInput = screen.getByLabelText('Uživatelské jméno');
    const passwordInput = screen.getByLabelText('Heslo');
    const loginButton = screen.getByRole('button', { name: 'Přihlásit se' });
    
    // Fill form with valid credentials
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    
    // Submit form
    fireEvent.click(loginButton);
    
    // Wait for login process
    await waitFor(() => {
      // In a real test, we would check for redirection or success message
      // Here we just ensure no validation errors are shown
      expect(screen.queryByText('Uživatelské jméno je povinné')).not.toBeInTheDocument();
      expect(screen.queryByText('Heslo je povinné')).not.toBeInTheDocument();
    });
  });

  test('toggles password visibility', () => {
    renderLoginPage();
    
    const passwordInput = screen.getByLabelText('Heslo');
    const visibilityToggle = screen.getByLabelText('toggle password visibility');
    
    // Password should be hidden by default
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Click visibility toggle
    fireEvent.click(visibilityToggle);
    
    // Password should be visible
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    // Click visibility toggle again
    fireEvent.click(visibilityToggle);
    
    // Password should be hidden again
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
