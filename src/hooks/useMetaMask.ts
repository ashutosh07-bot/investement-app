import detectEthereumProvider from '@metamask/detect-provider';

interface MetaMaskEthereumProvider {
  request: (args: { method: string; params?: Array<any> }) => Promise<any>;
}

export const useMetaMask = () => {
  const connectWallet = async () => {
    const provider = (await detectEthereumProvider()) as MetaMaskEthereumProvider | null;

    if (provider) {
      try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        return accounts[0];
      } catch (error) {
        console.error('MetaMask Connection Error:', error);
        throw new Error('Failed to connect to MetaMask');
      }
    } else {
      throw new Error('MetaMask not installed');
    }
  };

  return { connectWallet };
};
