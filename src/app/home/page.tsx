// @ts-nocheck
"use client";
import { useState } from "react";
import { useEffect } from "react";
import { Box, Button, Heading, Image, background } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useAppContext } from "@/context/AppProvider";
import TableData from "@/component/TableData";
import { OwnerAddress } from "@/contract/contractInfo";
import { ClimbingBoxLoader } from "react-spinners";

const Home = () => {
  const { isConnected, address } = useWeb3ModalAccount();
  const [loading, setLoading] = useState(false);
  const [lotteryPlayers, setLotteryPlayers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [lotteryStatus, setLotteryStatus] = useState<boolean | undefined>();
  const [isParticipant, setIsParticipant] = useState<boolean>(false);
  const {
    getLotteryStatus,
    getLotteryPlayers,
    getLotteryWinners,
    participate,
    restartLottery,
    endLottery,
    getWinnerAmount,
  } = useAppContext();
  const { push } = useRouter();
  const fetchData = async () => {
    setLoading(true);
    try {
      const [players, status, winners] = await Promise.all([
        getLotteryPlayers(),
        getLotteryStatus(),
        getLotteryWinners(),
      ]);
      setLotteryPlayers(players!);
      setLotteryStatus(status!);
      setWinners(winners!);
      //@ts-ignore
      if (players && players?.includes(address!)) {
        setIsParticipant(true);
      }
      if (winners && winners?.includes(address!)) {
        setIsParticipant(true);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const getTicket = async () => {
    try {
      await participate();
      setIsParticipant(true);
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  const refresh = async () => {
    try {
      await restartLottery();
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLottery = async () => {
    try {
      await endLottery();
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isConnected) {
      push("/");
    } else {
      fetchData();
    }
  }, [isConnected, address]);


  if (loading) {
    return (
      <div className="flex flex-col h-screen w-full justify-center items-center ">
        <ClimbingBoxLoader />
      </div>
    )
  }
  return (
    <div className="w-full flex flex-col h-full p-3">
      <div className="flex flex-col gap-8">
        <div className="flex flex-row justify-end">
          <w3m-button />
        </div>
        {winners && winners.length > 0 && (
          <div className="flex flex-col gap-3">
            <Heading as="h1" size="lg" textAlign="center" mb={4}>
              Winners
            </Heading>
            <TableData data={winners} />
          </div>
        )}


        <div className="flex flex-col gap-3">
          <Heading as="h1" size="lg" textAlign="center" mb={4}>
            Participants
          </Heading>
          <TableData data={lotteryPlayers} />
          {/* Checking if you are a participant and if lottery is completed, then we won't show the participate button */}
          {!isParticipant && !lotteryStatus && (
            <div className="self-center mt-6">
              <Button
                colorScheme="purple"
                padding={5}
                disabled={!lotteryStatus}
                onClick={getTicket}
              >
                Participate
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* we will give access to change the lottery only to the owner of the contract  */}
      {address === OwnerAddress ? (
        <div className="flex flex-row gap-3 self-center mt-5">
          <div>
            <Button
              colorScheme="purple"
              padding={5}
              onClick={async () => {
                await refresh();
              }}
            >
              Refresh Lottery
            </Button>
          </div>
          <div>
            <Button
              colorScheme="red"
              padding={5}
              onClick={async () => {
                await deleteLottery();
              }}
            >
              End Lottery
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Home;
