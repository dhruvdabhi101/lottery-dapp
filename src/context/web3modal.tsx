'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

const projectId = '70bfcdc417c153ff8a1b108803054fca'

// 2. Set chains
const testnet = {
  chainId: 11155111,
  name: 'Sepolia test network',
  currency: 'SepoliaETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://rpc.sepolia.org'
}

const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'localhost:3000/', // origin must match your domain & subdomain
  icons: []
}

const ethersConfig = defaultConfig({
  metadata,
})

createWeb3Modal({
  ethersConfig,
  chains: [testnet],
  projectId,
  enableAnalytics: true, 
  enableOnramp: true,
  themeMode: 'light'
})

export function Web3Modal({ children }: {children: any}) {
  return children
}
