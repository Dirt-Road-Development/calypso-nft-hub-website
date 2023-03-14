import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import { useEffect, useState } from 'react';
import { WagmiConfig } from 'wagmi';
import { createWagmiClient } from '../wagmi';
import CalypsoLogo from "/calypso_nft_hub.svg";

/** CSS */
import "../styles/imports.css";
import "../styles/global.css";
import "../styles/navigation.css";
import "../styles/footer.css";
import '@rainbow-me/rainbowkit/styles.css';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), [])

  return (
    <WagmiConfig client={createWagmiClient()}>
      <RainbowKitProvider chains={[
        {
          id: 1564830818,
          iconUrl: "/calypso_nft_hub.svg"
        },
        {
          id: 344106930,
          iconUrl: "/calypso_nft_hub.svg"
        }
      ]}>
        <NextHead>
          <title>SKALE | Calypso NFT Hub</title>
          <link rel="shortcut icon" href="/calypso_nft_hub.svg" />
        </NextHead>

        {mounted && (
          <>
            <Navigation />
            <Component {...pageProps} />
            <Footer />
          </>
        )}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App;