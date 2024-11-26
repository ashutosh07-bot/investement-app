const API_URL = 'https://api.coingecko.com/api/v3';

export const fetchTopCryptos = async () => {
  const response = await fetch(`${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10`);
  return await response.json();
};

export const fetchHistoricalData = async (coinId: string) => {
  const response = await fetch(`${API_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=30`);
  return await response.json();
};
