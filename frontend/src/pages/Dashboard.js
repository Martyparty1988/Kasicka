import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Divider,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  LocalDrink as DrinkIcon,
  LocalBar as AlcoholIcon,
  SportsBar as BeerIcon,
  Spa as RelaxIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

// Chart component placeholder
// In a real app, you would use a library like Chart.js or Recharts
const ChartPlaceholder = ({ title, height = 200 }) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height,
      bgcolor: 'action.hover'
    }}
  >
    <Typography variant="body1" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      (Zde by byl zobrazen graf)
    </Typography>
  </Paper>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { settings } = useSettings();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    topSellingItems: [],
    recentOrders: [],
    inventoryAlerts: []
  });
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // In a real app, these would be actual API calls
        // For demo purposes, we'll simulate the data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate dashboard data
        setStats({
          totalOrders: 156,
          totalRevenue: settings.currency === 'CZK' ? 45680 : 1827.2,
          averageOrderValue: settings.currency === 'CZK' ? 292.82 : 11.71,
          topSellingItems: [
            { id: 1, name: 'Coca-Cola', category: 'Nealkoholické nápoje', quantity: 78 },
            { id: 2, name: 'Budvar', category: 'Pivo', quantity: 65 },
            { id: 3, name: 'Gin Tonic', category: 'Alkoholické nápoje', quantity: 42 },
            { id: 4, name: 'Red Bull', category: 'Nealkoholické nápoje', quantity: 39 },
            { id: 5, name: 'Wellness balíček', category: 'Relax', quantity: 12 }
          ],
          recentOrders: [
            { id: 101, villaName: 'Oh Yeah Villa', date: '2025-03-18', amount: settings.currency === 'CZK' ? 450 : 18 },
            { id: 102, villaName: 'Amazing Pool Villa', date: '2025-03-17', amount: settings.currency === 'CZK' ? 1250 : 50 },
            { id: 103, villaName: 'Little Castle Villa', date: '2025-03-16', amount: settings.currency === 'CZK' ? 780 : 31.2 },
            { id: 104, villaName: 'Oh Yeah Villa', date: '2025-03-15', amount: settings.currency === 'CZK' ? 320 : 12.8 }
          ],
          inventoryAlerts: [
            { id: 1, name: 'Coca-Cola', currentStock: 5, minStock: 10 },
            { id: 2, name: 'Budvar', currentStock: 3, minStock: 10 },
            { id: 3, name: 'Prosecco', currentStock: 2, minStock: 5 }
          ]
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Nepodařilo se načíst data pro dashboard');
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [settings.currency]);
  
  // Format currency
  const formatCurrency = (value) => {
    return settings.currency === 'CZK' 
      ? `${value.toLocaleString()} Kč` 
      : `${value.toLocaleString()} €`;
  };
  
  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Nealkoholické nápoje':
        return <DrinkIcon />;
      case 'Alkoholické nápoje':
        return <AlcoholIcon />;
      case 'Pivo':
        return <BeerIcon />;
      case 'Relax':
        return <RelaxIcon />;
      default:
        return <InventoryIcon />;
    }
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
      </Box>
    );
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Vítejte, {user?.username || 'uživateli'}! Zde je přehled aktuálních statistik.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Celkový počet objednávek
              </Typography>
              <Typography variant="h4" component="div">
                {stats.totalOrders}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Za posledních 30 dní
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Celkové tržby
              </Typography>
              <Typography variant="h4" component="div">
                {formatCurrency(stats.totalRevenue)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Za posledních 30 dní
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Průměrná hodnota objednávky
              </Typography>
              <Typography variant="h4" component="div">
                {formatCurrency(stats.averageOrderValue)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Za posledních 30 dní
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tržby podle dní
              </Typography>
              <ChartPlaceholder title="Graf tržeb podle dní" height={300} />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tržby podle kategorií
              </Typography>
              <ChartPlaceholder title="Koláčový graf tržeb podle kategorií" height={300} />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Top Selling Items */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Nejprodávanější položky
              </Typography>
              <List>
                {stats.topSellingItems.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemIcon>
                      {getCategoryIcon(item.category)}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.name} 
                      secondary={item.category} 
                    />
                    <Typography variant="body2">
                      {item.quantity} ks
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recent Orders */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Poslední objednávky
              </Typography>
              <List>
                {stats.recentOrders.map((order) => (
                  <ListItem key={order.id}>
                    <ListItemIcon>
                      <MoneyIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={order.villaName} 
                      secondary={new Date(order.date).toLocaleDateString()} 
                    />
                    <Typography variant="body2" color="primary">
                      {formatCurrency(order.amount)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Button 
                variant="text" 
                fullWidth 
                sx={{ mt: 1 }}
              >
                Zobrazit všechny objednávky
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Inventory Alerts */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upozornění na nízký stav zásob
              </Typography>
              {stats.inventoryAlerts.length > 0 ? (
                <List>
                  {stats.inventoryAlerts.map((alert) => (
                    <ListItem key={alert.id}>
                      <ListItemIcon>
                        <InventoryIcon color="error" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={alert.name} 
                        secondary={`Aktuální stav: ${alert.currentStock} ks (Minimální stav: ${alert.minStock} ks)`} 
                      />
                      <Button variant="outlined" size="small">
                        Doplnit
                      </Button>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" color="text.secondary" align="center">
                  Žádné položky nemají nízký stav zásob.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
