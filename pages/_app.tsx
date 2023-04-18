import { Inter } from '@next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  reconnectProviders,
  initializeProviders,
  WalletProvider,
  WalletClient
} from '@txnlab/use-wallet'
import { useEffect, useState } from 'react'
import Toaster from 'components/Toaster'
import { NODE_NETWORK, NODE_PORT, NODE_TOKEN, NODE_URL } from 'constants/env'
import type { AppProps } from 'next/app'

import 'styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function App({ Component, pageProps, router }: AppProps) {
  const [walletProviders, setWalletProviders] = useState<Record<
    string,
    Promise<WalletClient | null>
  > | null>(null)

  useEffect(() => {
    async function initialize() {
      const providers = await initializeProviders([], {
        network: NODE_NETWORK,
        nodeServer: NODE_URL,
        nodeToken: NODE_TOKEN,
        nodePort: NODE_PORT
      })

      setWalletProviders(providers)
      reconnectProviders(providers)
    }

    initialize()
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
