import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Receipt as ReceiptIcon,
  Print as PrintIcon,
  Image as ImageIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useSettings } from '../context/SettingsContext';

const Invoice = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { settings, updateSetting } = useSettings();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [invoice, setInvoice] = useState(null);
  const [order, setOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [invoiceStatus, setInvoiceStatus] = useState('pending');
  
  // Fetch invoice if exists
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`);
        setOrder(response.data);
        
        // Check if invoice exists for this order
        if (response.data.invoices && response.data.invoices.length > 0) {
          setInvoice(response.data.invoices[0]);
          setInvoiceStatus(response.data.invoices[0].status);
          
          // Get payment method
          const paymentMethodResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/payment-methods/${response.data.invoices[0].paymentMethodId}`
          );
          setPaymentMethod(paymentMethodResponse.data.name.toLowerCase());
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order/invoice:', err);
        setError('Nepodařilo se načíst fakturu');
        setLoading(false);
      }
    };
    
    fetchInvoice();
  }, [orderId]);
  
  // Create invoice
  const handleCreateInvoice = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Get payment method ID
      const paymentMethodsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/payment-methods`);
      const paymentMethodObj = paymentMethodsResponse.data.find(
        pm => pm.name.toLowerCase() === paymentMethod
      );
      
      if (!paymentMethodObj) {
        throw new Error('Platební metoda nenalezena');
      }
      
      // Create invoice
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/invoices`, {
        orderId,
        paymentMethodId: paymentMethodObj.id,
        status: invoiceStatus
      });
      
      setInvoice(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error creating invoice:', err);
      setError(err.response?.data?.message || 'Nepodařilo se vytvořit fakturu');
      setLoading(false);
    }
  };
  
  // Update invoice status
  const handleUpdateStatus = async (newStatus) => {
    if (!invoice) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/invoices/${invoice.id}/status`,
        { status: newStatus }
      );
      
      setInvoice(response.data);
      setInvoiceStatus(response.data.status);
      setLoading(false);
    } catch (err) {
      console.error('Error updating invoice status:', err);
      setError(err.response?.data?.message || 'Nepodařilo se aktualizovat stav faktury');
      setLoading(false);
    }
  };
  
  // Generate PDF
  const handleGeneratePdf = async () => {
    if (!invoice) return;
    
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/api/invoices/${invoice.id}/pdf`);
      // In a real app, this would download the PDF
      alert('PDF by bylo staženo v produkční verzi');
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Nepodařilo se vygenerovat PDF');
    }
  };
  
  // Generate JPEG
  const handleGenerateJpeg = async () => {
    if (!invoice) return;
    
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/api/invoices/${invoice.id}/jpeg`);
      // In a real app, this would download the JPEG
      alert('JPEG by bylo staženo v produkční verzi');
    } catch (err) {
      console.error('Error generating JPEG:', err);
      setError('Nepodařilo se vygenerovat JPEG');
    }
  };
  
  // Handle payment method change
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  
  // Handle invoice status change
  const handleInvoiceStatusChange = (event) => {
    setInvoiceStatus(event.target.value);
  };
  
  // Format price based on currency
  const formatPrice = (price, currency) => {
    return currency === 'CZK' 
      ? `${price.toFixed(2)} Kč` 
      : `${price.toFixed(2)} €`;
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ mt: 2 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />} 
          sx={{ mt: 2 }}
          onClick={() => navigate(-1)}
        >
          Zpět
        </Button>
      </Box>
    );
  }
  
  if (!order) {
    return (
      <Box sx={{ mt: 2 }}>
        <Alert severity="error">Objednávka nenalezena</Alert>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />} 
          sx={{ mt: 2 }}
          onClick={() => navigate('/villas')}
        >
          Zpět na výběr vily
        </Button>
      </Box>
    );
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {invoice ? 'Faktura' : 'Vytvořit fakturu'}
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Informace o objednávce
            </Typography>
            <Typography variant="body1">
              <strong>Číslo objednávky:</strong> {order.orderNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Vila:</strong> {order.villa?.name || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Datum:</strong> {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              <strong>Stav:</strong> {order.status}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Informace o hostovi
            </Typography>
            <Typography variant="body1">
              <strong>Počet hostů:</strong> {order.guestCount}
            </Typography>
            <Typography variant="body1">
              <strong>Počet nocí:</strong> {order.nightsCount}
            </Typography>
            <Typography variant="body1">
              <strong>Měna:</strong> {order.currency}
            </Typography>
            {order.discountPercentage > 0 && (
              <Typography variant="body1">
                <strong>Sleva:</strong> {order.discountPercentage}%
              </Typography>
            )}
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Položky objednávky
        </Typography>
        
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Položka</TableCell>
                <TableCell align="right">Cena za jednotku</TableCell>
                <TableCell align="center">Množství</TableCell>
                <TableCell align="right">Celkem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.orderItems?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.item?.name || 'Neznámá položka'}
                  </TableCell>
                  <TableCell align="right">
                    {formatPrice(item.pricePerUnit, order.currency)}
                  </TableCell>
                  <TableCell align="center">
                    {item.quantity}
                  </TableCell>
                  <TableCell align="right">
                    {formatPrice(item.totalPrice, order.currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Souhrn
                </Typography>
                
                <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Mezisoučet:</Typography>
                  <Typography variant="body1">
                    {formatPrice(order.totalAmount, order.currency)}
                  </Typography>
                </Box>
                
                {order.discountPercentage > 0 && (
                  <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1">
                      Sleva ({order.discountPercentage}%):
                    </Typography>
                    <Typography variant="body1" color="error">
                      -{formatPrice(order.totalAmount - order.totalAmountWithDiscount, order.currency)}
                    </Typography>
                  </Box>
                )}
                
                <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">
                    City Tax ({order.guestCount} {order.guestCount === 1 ? 'osoba' : order.guestCount < 5 ? 'osoby' : 'osob'} × {order.nightsCount} {order.nightsCount === 1 ? 'noc' : order.nightsCount < 5 ? 'noci' : 'nocí'}):
                  </Typography>
                  <Typography variant="body1">
                    {formatPrice(order.cityTaxAmount, order.currency)}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Celkem:</Typography>
                  <Typography variant="h6" color="primary">
                    {formatPrice(order.finalAmount, order.currency)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      
      {!invoice ? (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Vytvořit fakturu
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="payment-method-label">Způsob platby</InputLabel>
                  <Select
                    labelId="payment-method-label"
                    id="payment-method"
                    value={paymentMethod}
                    label="Způsob platby"
                    onChange={handlePaymentMethodChange}
                  >
                    <MenuItem value="cash">Hotově</MenuItem>
                    <MenuItem value="card">Kartou</MenuItem>
                    <MenuItem value="unpaid">Neplaceno</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="invoice-status-label">Stav faktury</InputLabel>
                  <Select
                    labelId="invoice-status-label"
                    id="invoice-status"
                    value={invoiceStatus}
                    label="Stav faktury"
                    onChange={handleInvoiceStatusChange}
                  >
                    <MenuItem value="pending">Čeká na zaplacení</MenuItem>
                    <MenuItem value="paid">Zaplaceno</MenuItem>
                    <MenuItem value="cancelled">Stornováno</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<ReceiptIcon />}
              onClick={handleCreateInvoice}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Vytvořit fakturu'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Faktura #{invoice.invoiceNumber}
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Datum vystavení:</strong> {new Date(invoice.issuedDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  <strong>Datum splatnosti:</strong> {new Date(invoice.dueDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  <strong>Způsob platby:</strong> {invoice.paymentMethod?.name || paymentMethod}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Stav faktury:</strong> {invoice.status}
                </Typography>
                {invoice.paidDate && (
                  <Typography variant="body1">
                    <strong>Datum zaplacení:</strong> {new Date(invoice.paidDate).toLocaleDateString()}
                  </Typography>
                )}
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="update-status-label">Změnit stav</InputLabel>
                  <Select
                    labelId="update-status-label"
                    id="update-status"
                    value={invoiceStatus}
                    label="Změnit stav"
                    onChange={(e) => handleUpdateStatus(e.target.value)}
                  >
                    <MenuItem value="pending">Čeká na zaplacení</MenuItem>
                    <MenuItem value="paid">Zaplaceno</MenuItem>
                    <MenuItem value="cancelled">Stornováno</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<PrintIcon />}
                  onClick={handleGeneratePdf}
                >
                  Stáhnout PDF
                </Button>
              </Grid>
              
              <Grid item xs={1<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>