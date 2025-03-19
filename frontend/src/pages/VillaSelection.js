import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Button
} from '@mui/material';
import { useCart } from '../context/CartContext';

// Placeholder images - in a real app, these would be actual images
const villaImages = {
  'oh-yeah': 'https://via.placeholder.com/400x300?text=Oh+Yeah+Villa',
  'amazing-pool': 'https://via.placeholder.com/400x300?text=Amazing+Pool+Villa',
  'little-castle': 'https://via.placeholder.com/400x300?text=Little+Castle+Villa'
};

const villas = [
  {
    id: 1,
    name: 'Oh Yeah Villa',
    slug: 'oh-yeah',
    description: 'Luxusní vila s krásným výhledem na moře a soukromým bazénem.',
    image: villaImages['oh-yeah']
  },
  {
    id: 2,
    name: 'Amazing Pool Villa',
    slug: 'amazing-pool',
    description: 'Prostorná vila s velkým bazénem a venkovní terasou pro relaxaci.',
    image: villaImages['amazing-pool']
  },
  {
    id: 3,
    name: 'Little Castle Villa',
    slug: 'little-castle',
    description: 'Unikátní vila ve stylu malého hradu s luxusním vybavením a soukromou zahradou.',
    image: villaImages['little-castle']
  }
];

const VillaSelection = () => {
  const navigate = useNavigate();
  const { setSelectedVilla, clearCart } = useCart();

  const handleVillaSelect = (villa) => {
    // Clear cart when changing villa
    clearCart();
    
    // Set selected villa
    setSelectedVilla(villa);
    
    // Navigate to inventory page
    navigate(`/inventory/${villa.id}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Vyberte vilu
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Zvolte vilu, pro kterou chcete spravovat minibar a další služby.
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {villas.map((villa) => (
          <Grid item xs={12} sm={6} md={4} key={villa.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea onClick={() => handleVillaSelect(villa)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={villa.image}
                  alt={villa.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {villa.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {villa.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ p: 2 }}>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => handleVillaSelect(villa)}
                >
                  Vybrat vilu
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VillaSelection;
