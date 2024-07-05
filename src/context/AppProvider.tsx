import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import { BrowserProvider, parseUnits } from "ethers";
import { LotteryABI, LOTTERYADDRESS } from "@/contract/contractInfo";

export const appContext = createContext({
  connectWalletAndContract: () => Promise.resolve(),
  getLotteryPlayers: () => Promise.resolve(),
  getLotteryStatus: () => Promise.resolve(),
  getLotteryWinners: () => Promise.resolve(),
  lotteryContract: undefined as Contract | undefined,
  participate: () => Promise.resolve(),
  endLottery: () => Promise.resolve(),
  restartLottery: () => Promise.resolve(),
  getWinnerAmount: (address: string) => Promise.resolve(),
  owner: '',
});

import { ReactNode } from "react";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [lotteryContract, setLotteryContract] = useState<Contract>();
  const owner = '0x9f74C3351798E7C1D069ABCCC1E9Bf98573c22A2';
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    if (isConnected) {
      connectWalletAndContract()
    }
  }, [isConnected])

  const connectWalletAndContract = async () => {
    const provider = new ethers.BrowserProvider(walletProvider!)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(LOTTERYADDRESS, LotteryABI, signer)
    setLotteryContract(contract)
  }


  const getLotteryPlayers = async () => {
    try {
      const players = await lotteryContract?.getParticipants();
    return players;
    } catch (error) {
      console.log(error)
    }   
  }

  const getLotteryStatus = async () => {
    try {
      const lotteryStatusRes = await lotteryContract?.lotteryEnded();
      return lotteryStatusRes;
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  const getLotteryWinners = async () => {
    try {
      const players = await lotteryContract?.getWinners();
      return players;
    } catch (error) {
      console.log(error)
    }  
  }

  const participate = async () => {
    try {
      const options = {
        value: ethers.parseUnits('0.000015', 'ether')
      }
      let tx = await lotteryContract?.participate(options)
      await tx.wait();

    } catch (error) {
      console.log(error)
    }
  }
  const endLottery = async () => {
    try {
      let tx = await lotteryContract?.endLottery()
      await tx.wait();
    } catch (error) {
      console.log(error)
    }
  }
  const restartLottery = async () => {
    try {
      let tx = await lotteryContract?.restartLottery()
      await tx.wait()
    } catch (error) {
      console.log(error)
    }
  }
  const getWinnerAmount = async (address: string) => {
    try {
      let res = await lotteryContract?.prizeMoney(address)
      return res;
    } catch (error) {
      console.log(error)
    }
  }
    

  return <appContext.Provider value={{
    connectWalletAndContract,
    getLotteryPlayers,
    getLotteryStatus,
    getLotteryWinners,
    lotteryContract,
    participate,
    endLottery,
    restartLottery,
    getWinnerAmount,
    owner,
  }}> {children} </appContext.Provider>
}
export const useAppContext = () => {
  return useContext(appContext)
}
