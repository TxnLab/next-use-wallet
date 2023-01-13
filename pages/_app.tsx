import { Inter } from '@next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { reconnectProviders, initializeProviders, WalletProvider } from '@txnlab/use-wallet'
import { useEffect } from 'react'
import Toaster from 'components/Toaster'
import { NODE_NETWORK, NODE_PORT, NODE_TOKEN, NODE_URL } from 'constants/env'
import type { AppProps } from 'next/app'

import 'styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const walletProviders = initializeProviders([], {
  network: NODE_NETWORK,
  nodeServer: NODE_URL,
  nodeToken: NODE_TOKEN,
  nodePort: NODE_PORT
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    reconnectProviders(walletProviders)
  }, [])

  return (
    <>
      <style jsx global>
        {`
          :root {
            --sans-font: ${inter.style.fontFamily};
          }
        `}
      </style>

      <Toaster />

      <WalletProvider value={walletProviders}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </WalletProvider>
    </>
  )
}
