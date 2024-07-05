// app/providers.tsx
'use client'

import { AppProvider } from '@/context/AppProvider'
import { Web3Modal } from '@/context/web3modal'
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Web3Modal>
      <AppProvider>
      <ChakraProvider>{children}</ChakraProvider>
      </AppProvider>
    </Web3Modal>
  )
}
