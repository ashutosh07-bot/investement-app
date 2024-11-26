import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useMetaMask } from '../hooks/useMetaMask';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';
import { AppBar, Box, Button, Container, Grid, Paper, Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { logout } = useAuth();
  const { connectWallet } = useMetaMask();
  
  const [topCryptos, setTopCryptos] = useState<any[]>([]);
  const [walletBalance, setWalletBalance] = useState<any>(null);
  const [priceData, setPriceData] = useState<any>(null);
  
  const fetchTopCryptos = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
        },
      });
      setTopCryptos(response.data);
    } catch (error) {
      console.error('Error fetching top cryptocurrencies:', error);
    }
  };

  const fetchPriceData = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {
        params: {
          vs_currency: 'usd',
          days: '7',
        },
      });
      setPriceData(response.data);
    } catch (error) {
      console.error('Error fetching price data for chart:', error);
    }
  };

  const getWalletBalance = async () => {
    const walletAddress = await connectWallet();
    if (walletAddress) {
      setWalletBalance({ address: walletAddress, balance: 0 });
    }
  };

  useEffect(() => {
    fetchTopCryptos();
    fetchPriceData();
    getWalletBalance();
  }, []);

  return (
    <Container>
      <AppBar position="sticky">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
          <Typography variant="h6">Crypto Investment Dashboard</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={() => logout()}>
              Logout
            </Button>
            <Button variant="outlined" color="secondary" style={{color: 'white', borderColor: 'white'}} component={Link} to="/portfolio">
              View Portfolio
            </Button>
          </Box>
        </Box>
      </AppBar>

      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={3}>
          {/* Wallet Information */}
          {
            walletBalance && 
            (
              <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h6">Wallet Information</Typography>
              <Typography variant="body2">Wallet Address: {walletBalance ? walletBalance?.address : 'Not connected'}</Typography>
              <Typography variant="body2" >Balance: {walletBalance ? walletBalance?.balance : 'Fetching...'}</Typography>
              {
                !walletBalance.address && (
                  <Button variant="contained" color="primary" onClick={getWalletBalance}>
                    Connect Wallet
                  </Button>
                )
              }
            </Paper>
          </Grid>
            )
          }

          {/* Top 10 Cryptocurrencies */}
          <Grid item xs={12} sm={6} md={8}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Top 10 Cryptocurrencies
              </Typography>
              <Grid container spacing={2}>
                {topCryptos.map((crypto) => (
                  <Grid item xs={12} sm={6} md={4} key={crypto.id}>
                    <Paper sx={{ padding: 2 }}>
                      <Typography variant="body1">{crypto.name}</Typography>
                      <Typography variant="body2">Price: ${crypto.current_price}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Price Movement Chart */}
          <Grid item xs={12}>
            <Paper sx={{ padding: 3 }}>
              {priceData && (
                <Box>
                  <Typography variant="h6">Price Movement (Bitcoin - 7 Days)</Typography>
                  <Chart
                    type="line"
                    data={{
                      labels: priceData?.prices.map((price: any) => new Date(price[0]).toLocaleDateString()),
                      datasets: [
                        {
                          label: 'Bitcoin Price (USD)',
                          data: priceData?.prices.map((price: any) => price[1]),
                          borderColor: 'rgba(75,192,192,1)',
                          borderWidth: 2,
                          fill: false,
                        },
                      ],
                    }}
                  />
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
