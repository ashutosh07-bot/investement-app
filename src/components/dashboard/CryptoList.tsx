import React, { useEffect, useState } from 'react';
import { fetchTopCryptos } from '../../services/cryptoAPI';

const CryptoList: React.FC = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const getCryptos = async () => {
      const data = await fetchTopCryptos();
      setCryptos(data);
    };

    getCryptos();
  }, []);

  return (
    <ul>
      {cryptos.map((crypto: any) => (
        <li key={crypto?.id}>
          {crypto?.name}: ${crypto?.current_price}
        </li>
      ))}
    </ul>
  );
};

export default CryptoList;
