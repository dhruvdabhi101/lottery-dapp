'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '70bfcdc417c153ff8a1b108803054fca'

// 2. Set chains
const testnet = {
  chainId: 11155111,
  name: 'Sepolia test network',
  currency: 'SepoliaETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://rpc.sepolia.org'
}

// 3. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'localhost:3000/', // origin must match your domain & subdomain
  icons: []
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  metadata,
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [testnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeMode: 'light'
})

export function Web3Modal({ children }: {children: any}) {
  return children
}
