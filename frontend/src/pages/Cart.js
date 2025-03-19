import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Grid,
  Card,
  CardContent,
  Divider,
  TextField,
  InputAdornment,
  FormControlLabel,
  Switch,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    cartItems, 
    selectedVilla, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    calculateSubtotal,
    calculateDiscount,
    calculateCityTax,
    calculateTotal
  } = useCart();
  const { settings, updateSetting } = useSettings();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Redirect to villa selection if no villa is selected
  useEffect(() => {
    if (!selectedVilla) {
      navigate('/villas');
    }
  }, [selectedVilla, navigate]);
  
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };
  
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };
  
  const handleClearCart = () => {
    clearCart();
  };
  
  const handleDiscountToggle = () => {
    updateSetting('applyDiscount', !settings.applyDiscount);
  };
  
  const handleGuestCountChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      updateSetting('guestCount', value);
    }
  };
  
  const handleNightsCountChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      updateSetting('nightsCount', value);
    }
  };
  
  const handleCurrencyChange = () => {
    updateSetting('currency', settings.currency === 'CZK' ? 'EUR' : 'CZK');
  };
  
  const handleCreateOrder = async () => {
    if (cartItems.length === 0) {
      setError('Košík je prázdný');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Prepare order items
      const orderItems = cartItems.map(item => ({
        itemId: item.id,
        quantity: item.quantity,
        pricePerUnit: settings.currency === 'CZK' ? item.priceCzk : item.priceEur
      }));
      
      // Create order
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, {
        villaId: selectedVilla.id,
        orderItems,
        guestCount: settings.guestCount,
        nightsCount: settings.nightsCount,
        discountPercentage: settings.applyDiscount ? settings.discountPercentage : 0,
        currency: settings.currency,
        exchangeRate: settings.exchangeRate,
        notes: ''
      });
      
      setSuccess('Objednávka byla úspěšně vytvořena');
      
      // Clear cart
      clearCart();
      
      // Navigate to invoice page
      navigate(`/invoice/${response.data.id}`);
    } catch (err) {
      console.error('Error creating order:', err);
      setError(err.response?.data?.message || 'Nepodařilo se vytvořit objednávku');
    } finally {
      setLoading(false);
    }
  };
  
  // Format price based on currency
  const formatPrice = (price) => {
    return settings.currency === 'CZK' 
      ? `${price.toFixed(2)} Kč` 
      : `${price.toFixed(2)} €`;
  };
  
  // Get price based on currency
  const getItemPrice = (item) => {
    return settings.currency === 'CZK' ? item.priceCzk : item.priceEur;
  };
  
  // Calculate item total
  const calculateItemTotal = (item) => {
    const price = getItemPrice(item);
    return price * item.quantity;
  };
  
  if (!selectedVilla) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Košík
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        {selectedVilla.name}
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Položka</TableCell>
                    <TableCell align="right">Cena</TableCell>
                    <TableCell align="center">Množství</TableCell>
                    <TableCell align="right">Celkem</TableCell>
                    <TableCell align="center">Akce</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell align="right">
                        {formatPrice(getItemPrice(item))}
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IconButton 
                            size="small"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ mx: 1 }}>
                            {item.quantity}
                          </Typography>
                          <IconButton 
                            size="small"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {formatPrice(calculateItemTotal(item))}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton 
                          color="error"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Košík je prázdný
              </Typography>
              <Button 
                variant="contained" 
                sx={{ mt: 2 }}
                onClick={() => navigate(`/inventory/${selectedVilla.id}`)}
              >
                Přejít do inventáře
              </Button>
            </Paper>
          )}
          
          {cartItems.length > 0 && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="outlined" 
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleClearCart}
              >
                Vyprázdnit košík
              </Button>
            </Box>
          )}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Souhrn objednávky
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Počet hostů"
                      type="number"
                      size="small"
                      fullWidth
                      value={settings.guestCount}
                      onChange={handleGuestCountChange}
                      inputProps={{ min: 1 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Počet nocí"
                      type="number"
                      size="small"
                      fullWidth
                      value={settings.nightsCount}
                      onChange={handleNightsCountChange}
                      inputProps={{ min: 1 }}
                    />
                  </Grid>
                </Grid>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Button 
                  variant="outlined"
                  fullWidth
                  onClick={handleCurrencyChange}
                >
                  {settings.currency === 'CZK' ? 'Přepnout na EUR' : 'Přepnout na CZK'}
                </Button>
              </Box>
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={settings.applyDiscount}
                    onChange={handleDiscountToggle}
                  />
                }
                label={`Sleva ${settings.discountPercentage}%`}
              />
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Mezisoučet:</Typography>
                <Typography variant="body1">{formatPrice(calculateSubtotal())}</Typography>
              </Box>
              
              {settings.applyDiscount && (
                <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Sleva ({settings.discountPercentage}%):</Typography>
                  <Typography variant="body1" color="error">-{formatPrice(calculateDiscount())}</Typography>
                </Box>
              )}
              
              <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">
                  City Tax ({settings.guestCount} {settings.guestCount === 1 ? 'osoba' : settings.guestCount < 5 ? 'osoby' : 'osob'} × {settings.nightsCount} {settings.nightsCount === 1 ? 'noc' : settings.nightsCount < 5 ? 'noci' : 'nocí'}):
                </Typography>
                <Typography variant="body1">{formatPrice(calculateCityTax())}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Celkem:</Typography>
                <Typography variant="h6" color="primary">{formatPrice(calculateTotal())}</Typography>
              </Box>
              
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                startIcon={<ReceiptIcon />}
                onClick={handleCreateOrder}
                disabled={loading || cartItems.length === 0}
              >
                {loading ? <CircularProgress size={24} /> : 'Vytvořit objednávku'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
