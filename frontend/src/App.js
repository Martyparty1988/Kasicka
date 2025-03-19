import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Layouts
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Pages
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import VillaSelection from './pages/VillaSelection';
import Inventory from './pages/Inventory';
import Cart from './pages/Cart';
import Invoice from './pages/Invoice';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Guards
import PrivateRoute from './components/guards/PrivateRoute';
import GuestRoute from './components/guards/GuestRoute';

const App = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          } />
        </Route>

        {/* App routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/villas" replace />} />
          
          <Route path="/villas" element={
            <PrivateRoute>
              <VillaSelection />
            </PrivateRoute>
          } />
          
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          
          <Route path="/inventory/:villaId" element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          } />
          
          <Route path="/cart" element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          } />
          
          <Route path="/invoice/:orderId" element={
            <PrivateRoute>
              <Invoice />
            </PrivateRoute>
          } />
          
          <Route path="/settings" element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
};

export default App;
