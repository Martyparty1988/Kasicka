import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // Default settings
  const [settings, setSettings] = useState({
    guestCount: 2,
    nightsCount: 1,
    currency: 'CZK',
    exchangeRate: 25,
    applyDiscount: false,
    discountPercentage: 10,
    paymentMethod: 'cash',
    language: 'cs',
    darkMode: false
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const storedSettings = localStorage.getItem('settings');
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch (error) {
        console.error('Failed to parse settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('settings', JSON.stringify(settings));
    }
  }, [settings, isAuthenticated]);

  // Update a single setting
  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Update multiple settings at once
  const updateSettings = (newSettings) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  // Reset settings to defaults
  const resetSettings = () => {
    setSettings({
      guestCount: 2,
      nightsCount: 1,
      currency: 'CZK',
      exchangeRate: 25,
      applyDiscount: false,
      discountPercentage: 10,
      paymentMethod: 'cash',
      language: 'cs',
      darkMode: false
    });
  };

  const value = {
    settings,
    updateSetting,
    updateSettings,
    resetSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
