'use client'

import { Heading, Image } from "@chakra-ui/react";
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
    <div className="flex flex-col w-full justify-center p-3">
      <div className="flex self-end p-3">
       <w3m-button />
  `   </div>
      <div className="w-full h-full flex flex-col gap-7">
        <Heading as="h1" fontSize={['3xl','5xl','7xl']} textAlign="center" mb={4} >
          Stake your Deez 
          </Heading>
        <Image src={'/frontpage.png'} className="border-[3px] border-black shadow-lg w-[90%] h-[90%]  md:w-[60%] md:h-[60%] self-center" />
      </div>
    <Image src="/arrow.svg" className="absolute size-10 md:w-20 md:h-20  right-40 top-10 -rotate-45" />
    </div>
  );
}
