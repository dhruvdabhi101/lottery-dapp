'use client'
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useAppContext } from "@/context/AppProvider";

const Home = () => {
  const { isConnected } = useWeb3ModalAccount()
  const [loading, setLoading] = useState(false);
  const [lotteryPlayers, setLotteryPlayers] = useState([])
  const [lotteryStatus, setLotteryStatus] = useState<boolean | undefined>()
  const { getLotteryStatus, getLotteryPlayers} = useAppContext()
  const { push } = useRouter()
  const fetchData = async () => {
    setLoading(true)
    const lotteryres =await getLotteryStatus()
    const [players, status] = await Promise.all([getLotteryPlayers(), getLotteryStatus()])
    setLotteryStatus(lotteryres!)
    setLotteryPlayers(players!)
    console.log(lotteryres)
    console.log(players)
    //@ts-ignore
    console.log(players[0])
    setLoading(false)
  }
  useEffect(() => {
    if (!isConnected) {
      push('/')
    } else {
      fetchData()
    }
  }, [isConnected])
  return (
    <div>
      <w3m-button />
     <div>Lottery Status: {lotteryStatus ? 'Ended' : 'Not ended'}</div> 
     <div>Participants: </div>
    </div>
  )
}
export default Home;
