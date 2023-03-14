import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  bitskiWallet,
  braveWallet,
  coinbaseWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  mewWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets';
import { Chain, configureChains, createClient } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

// const isProduction: boolean = process.env.NODE_ENV === "production";
const isProduction = true;

type ChainNames = "calypso";

export const clients: Record<ChainNames, Chain> = {
  "calypso":  {
    id: isProduction ? 1564830818 : 344106930,
    name: isProduction ? 'SKALE | Calypso' : 'SKALE | Calypso Testnet',
    network: 'calypso',
    nativeCurrency: {
      decimals: 18,
      name: 'sFUEL',
      symbol: 'sFUEL',
    },
    testnet: isProduction ? false : true,
    rpcUrls: {
      public: { http: ([] as string[]).concat(isProduction ? "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague" : "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar") },
      default: { http: ([] as string[]).concat(isProduction ? "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague" : "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar") },
    },
    blockExplorers: {
      etherscan: { name: 'Blockscout', url: isProduction ? "https://honorable-steel-rasalhague.explorer.mainnet.skalenodes.com" : "https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com" },
      default: { name: 'Blockscout', url: isProduction ? "https://honorable-steel-rasalhague.explorer.mainnet.skalenodes.com" : "https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com" },
    },
    contracts: {}
  }
};

export const createWagmiClient = () => {
  const customChains = [clients["calypso"]]

  const { provider, chains } = configureChains(
    customChains,
    [
      jsonRpcProvider({
        rpc: chain => ({ http: chain.rpcUrls.default.http[0] }),
      })
    ]
  );

  const connectors = connectorsForWallets([
    {
      groupName: 'Available Wallets',
      wallets: [
        coinbaseWallet({ appName: "SKALE Calypso NFT Hub Website", chains }),
        metaMaskWallet({ chains }),
        walletConnectWallet({ chains }),
        argentWallet({ chains }),
        bitskiWallet({ chains }),
        braveWallet({ chains }),
        imTokenWallet({ chains }),
        injectedWallet({ chains }),
        ledgerWallet({ chains }),
        mewWallet({ chains }),
        omniWallet({ chains }),
        rainbowWallet({ chains }),
        trustWallet({ chains })
      ],
    },
  ]);
  
  
  
  return createClient({
    autoConnect: true,
    connectors,
    provider
  });
}