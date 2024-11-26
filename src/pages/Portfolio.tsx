import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useMetaMask } from '../hooks/useMetaMask';
import { AppBar, Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export type PortfolioItem = {
  symbol: string; 
  amount: number; 
};


const Portfolio = () => {
  const { isAuthenticated, logout } = useAuth(); 
  const { connectWallet } = useMetaMask(); 
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]); 
  const handleConnectWallet = async () => {
    if (!isAuthenticated) {
      alert('Please log in first');
      return;
    }

    try {
      const walletAddress = await connectWallet(); 
      fetchPortfolio(walletAddress); 
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const fetchPortfolio = async (walletAddress: string) => {
    const fetchedPortfolio = [
      { symbol: 'BTC', amount: 0.5 },
      { symbol: 'ETH', amount: 3.0 },
      { symbol: 'ADA', amount: 1000 },
    ];
    setPortfolio(fetchedPortfolio);
  };

  return (
    <Container>
      <AppBar position="sticky">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
          <Typography variant="h6">Crypto Investment Dashboard</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={() => logout()}>
              Logout
            </Button>
            <Button variant="outlined" color="secondary" style={{color: 'white', borderColor: 'white'}} component={Link} to="/dashboard">
              View Dashboard
            </Button>
          </Box>
        </Box>
      </AppBar>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Investment Portfolio
        </Typography>

        {!isAuthenticated && (
          <Typography variant="h6" color="error">
            Please log in to view your portfolio.
          </Typography>
        )}

        {isAuthenticated && (
          <>
            <Button variant="contained" color="primary" onClick={handleConnectWallet}>
              Connect MetaMask Wallet
            </Button>
            <Grid container spacing={2} mt={2}>
              {portfolio.length === 0 ? (
                <Typography variant="body1">No portfolio data available. Connect your wallet.</Typography>
              ) : (
                portfolio.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{item.symbol}</Typography>
                        <Typography variant="body2">Amount: {item.amount}</Typography>
                        {/* You can display the current value in USD here */}
                        <Typography variant="body2">Current Value: $1000</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Portfolio;
