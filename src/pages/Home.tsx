import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Container, Grid } from '@mui/material';

const Home = () => (
  <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Welcome to Crypto Investment Platform
      </Typography>
      <Typography variant="h6" align='center' paragraph>
        A modern platform to manage and track your crypto investments, access real-time data, and optimize your portfolio.
      </Typography>
      
      <Grid container justifyContent="center">
        <Grid item>
          <Link to="/login">
            <Button variant="contained" color="primary" size="large">
              Login
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export default Home;
