/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // @see https://github.com/WalletConnect/walletconnect-monorepo/issues/1908#issuecomment-1487801131
    config.externals.push('pino-pretty', 'lokijs')
    return config
  },
  reactStrictMode: true
}

module.exports = nextConfig
