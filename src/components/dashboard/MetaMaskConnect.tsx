import React from 'react';
import { useMetaMask } from '../../hooks/useMetaMask';

const MetaMaskConnect: React.FC = () => {
  const { connectWallet } = useMetaMask();

  const handleConnect = async () => {
    try {
      const walletAddress = await connectWallet();
      console.log('Connected Wallet:', walletAddress);
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  return <button onClick={handleConnect}>Connect MetaMask</button>;
};

export default MetaMaskConnect;
