'use client'

import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { push } = useRouter()
  useEffect(() => {
    if (isConnected) push('/home')
  },[isConnected])
  return (
    <div>
      <w3m-button />
    </div>
  );
}
