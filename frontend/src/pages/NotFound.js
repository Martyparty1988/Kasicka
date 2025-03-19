import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          p: 4,
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        
        <Typography variant="h4" component="h2" gutterBottom>
          Stránka nenalezena
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Omlouváme se, ale požadovaná stránka nebyla nalezena. Je možné, že byla přesunuta, odstraněna, nebo nikdy neexistovala.
        </Typography>
        
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            component={RouterLink}
            to="/"
          >
            Zpět na hlavní stránku
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFound;
