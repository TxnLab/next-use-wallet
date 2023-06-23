import { Inter } from '@next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WalletProvider, useInitializeProviders, PROVIDER_ID } from '@txnlab/use-wallet'
import Toaster from 'components/Toaster'
import { NODE_NETWORK, NODE_PORT, NODE_TOKEN, NODE_URL } from 'constants/env'
import type { AppProps } from 'next/app'

import 'styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function App({ Component, pageProps, router }: AppProps) {
  const walletProviders = useInitializeProviders({
    providers: [
      PROVIDER_ID.DEFLY,
      PROVIDER_ID.PERA,
      PROVIDER_ID.DAFFI,
      PROVIDER_ID.EXODUS,
      {
        id: PROVIDER_ID.WALLETCONNECT,
        clientOptions: {
          projectId: process.env.NEXT_PUBLIC_WC2_PROJECT_ID || '',
          relayUrl: process.env.NEXT_PUBLIC_WC2_RELAY_URL,
          metadata: {
            name: 'next-use-wallet',
            description: 'Next.js @txnlab/use-wallet example',
            url: 'https://next-use-wallet.vercel.app/',
            icons: ['https://next-use-wallet.vercel.app/nfd.svg']
          }
        }
      }
    ],
    nodeConfig: {
      network: NODE_NETWORK,
      nodeServer: NODE_URL,
      nodePort: NODE_PORT,
      nodeToken: NODE_TOKEN
    },
    debug: true
  })

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
