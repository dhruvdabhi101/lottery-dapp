// app/providers.tsx
'use client'

import { Web3Modal } from '@/context/web3modal'
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (<Web3Modal>
    <ChakraProvider>{children}</ChakraProvider>
  </Web3Modal>)
}
