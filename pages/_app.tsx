import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
import { Inter } from '@next/font/google'
import { PeraWalletConnect } from '@perawallet/connect'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WalletProvider, useInitializeProviders, PROVIDER_ID } from '@txnlab/use-wallet'
import { WalletConnectModalSign } from '@walletconnect/modal-sign-html'
import algosdk from 'algosdk'
import Toaster from 'components/Toaster'
import { NODE_NETWORK, NODE_PORT, NODE_TOKEN, NODE_URL } from 'constants/env'
import type { AppProps } from 'next/app'

import 'styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function App({ Component, pageProps, router }: AppProps) {
  const walletProviders = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
      { id: PROVIDER_ID.EXODUS },
      {
        id: PROVIDER_ID.WALLETCONNECT,
        clientStatic: WalletConnectModalSign,
        clientOptions: {
          projectId: process.env.NEXT_PUBLIC_WC2_PROJECT_ID || '',
          relayUrl: process.env.NEXT_PUBLIC_WC2_RELAY_URL,
          metadata: {
            name: 'next-use-wallet',
            description: 'Next.js @txnlab/use-wallet example',
            url: 'https://next-use-wallet.vercel.app/',
            icons: ['https://next-use-wallet.vercel.app/nfd.svg']
          },
          modalOptions: {
            explorerRecommendedWalletIds: [
              // Fireblocks desktop wallet
              '5864e2ced7c293ed18ac35e0db085c09ed567d67346ccb6f58a0327a75137489'
            ]
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
    algosdkStatic: algosdk,
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
