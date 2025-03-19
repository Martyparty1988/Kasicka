import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions,
  Button,
  Tabs,
  Tab,
  Divider,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment
} from '@mui/material';
import { 
  Add as AddIcon,
  LocalDrink as DrinkIcon,
  LocalBar as AlcoholIcon,
  SportsBar as BeerIcon,
  Spa as RelaxIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';

// TabPanel component for category tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`category-tabpanel-${index}`}
      aria-labelledby={`category-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Inventory = () => {
  const { villaId } = useParams();
  const { addToCart, selectedVilla } = useCart();
  const { settings } = useSettings();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [villa, setVilla] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [customPrices, setCustomPrices] = useState({});

  // Fetch villa details
  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/villas/${villaId}`);
        setVilla(response.data);
      } catch (err) {
        console.error('Error fetching villa:', err);
        setError('Nepodařilo se načíst informace o vile');
      }
    };

    // If we already have the villa from context, use it
    if (selectedVilla && selectedVilla.id === parseInt(villaId)) {
      setVilla(selectedVilla);
    } else {
      fetchVilla();
    }
  }, [villaId, selectedVilla]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Nepodařilo se načíst kategorie');
      }
    };

    fetchCategories();
  }, []);

  // Fetch inventory items
  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/villas/${villaId}/inventory`);
        
        // Combine villa-specific and shared items
        const allItems = [
          ...response.data.villaSpecificItems.map(vi => ({
            ...vi.item,
            isAvailable: vi.isAvailable,
            stockQuantity: vi.stockQuantity,
            customPriceCzk: vi.customPriceCzk,
            customPriceEur: vi.customPriceEur
          })),
          ...response.data.sharedItems
        ];
        
        setItems(allItems);
        
        // Initialize custom prices for items with isCustomPrice=true
        const initialCustomPrices = {};
        allItems.forEach(item => {
          if (item.isCustomPrice) {
            initialCustomPrices[item.id] = {
              czk: item.customPriceCzk || item.priceCzk || 0,
              eur: item.customPriceEur || item.priceEur || 0
            };
          }
        });
        setCustomPrices(initialCustomPrices);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching inventory:', err);
        setError('Nepodařilo se načíst inventář');
        setLoading(false);
      }
    };

    if (villaId) {
      fetchInventory();
    }
  }, [villaId]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddToCart = (item) => {
    // For custom price items, use the custom price
    if (item.isCustomPrice) {
      const customPrice = customPrices[item.id];
      const priceToUse = settings.currency === 'CZK' ? customPrice.czk : customPrice.eur;
      
      addToCart({
        ...item,
        priceCzk: settings.currency === 'CZK' ? customPrice.czk : customPrice.czk,
        priceEur: settings.currency === 'EUR' ? customPrice.eur : customPrice.eur,
        pricePerUnit: priceToUse
      });
    } else {
      addToCart(item);
    }
  };

  const handleCustomPriceChange = (itemId, currency, value) => {
    setCustomPrices(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [currency]: parseFloat(value) || 0
      }
    }));
  };

  // Get items by category
  const getItemsByCategory = (categoryId) => {
    return items.filter(item => item.categoryId === categoryId);
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
        Inventář - {villa?.name || 'Vila'}
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          aria-label="inventory categories"
        >
          {categories.map((category, index) => (
            <Tab 
              key={category.id} 
              label={category.name} 
              icon={
                category.name === 'Nealkoholické nápoje' ? <DrinkIcon /> :
                category.name === 'Alkoholické nápoje' ? <AlcoholIcon /> :
                category.name === 'Pivo' ? <BeerIcon /> :
                category.name === 'Relax' ? <RelaxIcon /> : null
              } 
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>
      
      {categories.map((category, index) => (
        <TabPanel key={category.id} value={tabValue} index={index}>
          <Grid container spacing={3}>
            {getItemsByCategory(category.id).map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.imageUrl || `https://via.placeholder.com/300x140?text=${encodeURIComponent(item.name)}`}
                    alt={item.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {item.name}
                    </Typography>
                    
                    {item.description && (
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {item.description}
                      </Typography>
                    )}
                    
                    {item.isCustomPrice ? (
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          label={`Cena (${settings.currency})`}
                          type="number"
                          size="small"
                          fullWidth
                          value={settings.currency === 'CZK' ? customPrices[item.id]?.czk || '' : customPrices[item.id]?.eur || ''}
                          onChange={(e) => handleCustomPriceChange(
                            item.id, 
                            settings.currency.toLowerCase(), 
                            e.target.value
                          )}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {settings.currency === 'CZK' ? 'Kč' : '€'}
                              </InputAdornment>
                            ),
                          }}
                          sx={{ mb: 1 }}
                        />
                      </Box>
                    ) : (
                      <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                        {settings.currency === 'CZK' 
                          ? `${item.priceCzk} Kč` 
                          : `${item.priceEur} €`}
                      </Typography>
                    )}
                  </CardContent>
                  
                  <Divider />
                  
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary" 
                      startIcon={<AddIcon />}
                      onClick={() => handleAddToCart(item)}
                      fullWidth
                    >
                      Přidat do košíku
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            
            {getItemsByCategory(category.id).length === 0 && (
              <Grid item xs={12}>
                <Typography variant="body1" color="text.secondary" align="center">
                  V této kategorii nejsou žádné položky.
                </Typography>
              </Grid>
            )}
          </Grid>
        </TabPanel>
      ))}
    </Box>
  );
};

export default Inventory;
