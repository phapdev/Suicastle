"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import { useAlert } from "@/contexts/AlertProvider";
import Timer from "@/components/timer/Timer";
import { useCustomWallet } from "@/contexts/CustomWallet";
import { useRouter } from "next/navigation";
import { useCredit } from "@/hooks/useCredit";
import { AuthenticationContext } from "@/contexts/Authentication";
import SelectHero from "@/components/SelectHero";

const maps = [
  {
    id: 1,
    image: "/game-map/Castle_Blue.png",
  },
  {
    id: 2,
    image: "/game-map/Castle_Purple.png",
  },
  {
    id: 3,
    image: "/game-map/Castle_Red.png",
  },
  {
    id: 4,
    image: "/game-map/Castle.png",
  },
];

const HomeMobile = () => {
  const [currentMap, setCurrentMap] = useState(1);
  const [selectedMap, setSelectedMap] = useState(1);
  const [expiryTimestamp, setExpiryTimestamp] = useState(new Date());
  const [isClaiming, setIsClaiming] = useState(false);
  const { setAlert } = useAlert();
  const router = useRouter();
  const { isConnected } = useCustomWallet();
  const { handleGetPlayerInfor, playerInfor } = useContext(
    AuthenticationContext
  );
  const { claimCredit } = useCredit();

  const handleClaimCredit = async () => {
    if (!isConnected) return;
    setIsClaiming(true);

    try {
      await claimCredit(playerInfor.id.id);
      setIsClaiming(false);
    } catch (error) {
      setAlert("Fail to claim credits, please try again", "error");
      return;
    } finally {
      setAlert("+3 Credit for play game!", "success");
      await handleGetPlayerInfor(playerInfor.address_id);
    }
  };

  useEffect(() => {
    if (!isConnected) return;

    const test = new Date(Number(playerInfor.last_claim_time) + 86400000);

    setExpiryTimestamp(test);

    const crtMap =
      maps.find((map) => {
        return (
          map.id ===
          (playerInfor.game_finished || playerInfor.current_round == 0
            ? playerInfor.current_round + 1
            : playerInfor.current_round)
        );
      })?.id || 1;

    setCurrentMap(crtMap);
    setSelectedMap(crtMap);
  }, [isConnected, playerInfor]);

  const handleChangeLevel = (isNext: boolean) => {
    if (isNext) {
      setSelectedMap((prev) => prev + 1);
    } else {
      setSelectedMap((prev) => prev - 1);
    }
  };

  const handlePlayGame = () => {
    if (!isConnected) return;
    if (Number(playerInfor.credits) !== 0) {
      router.push("/playGame");
    } else {
      setAlert(
        "You don't have any credit for play game. Please claim more credit.",
        "info"
      );
    }
  };

  return (
    <div
      id="home"
      className="mx-auto flex w-full max-w-screen-sm flex-col items-center px-8"
    >
      <div className="flex w-full flex-grow flex-col justify-center text-white">
        {/* select hero */}
        <SelectHero />
        {/* game */}
        <div className="relative z-10 flex w-full flex-col justify-between mt-10">
          <div className="flex w-full justify-center">
            <h1 className="border-b-2 border-white px-5 text-3xl text-mainColor">
              MAP {`${selectedMap !== 4 ? "0" + selectedMap : "???"}`}
            </h1>
          </div>
          <div className="flex w-full items-center justify-between text-2xl">
            <button
              onClick={() => {
                if (selectedMap > 1) handleChangeLevel(false);
              }}
            >
              <FaCaretLeft />
            </button>
            <img
              src={
                maps.find((map) => {
                  return map.id === selectedMap;
                })?.image
              }
              className="h-full w-2/3 object-cover shadow-inner brightness-75"
            />
            <button
              onClick={() => {
                if (selectedMap < maps.length) handleChangeLevel(true);
              }}
            >
              <FaCaretRight />
            </button>
          </div>
          <div className="mt-10 flex w-full justify-center">
            <button
              disabled={currentMap !== selectedMap}
              className="disabled:opacity-15 border-2 border-white px-10 py-2 text-2xl hover:bg-white rounded"
              onClick={handlePlayGame}
            >
              Play
            </button>
          </div>
        </div>
        <div className="mt-10 flex w-full flex-col">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex w-full flex-col items-center space-y-2 p-4 text-xl">
              <img src="/tower.png" />
              <button
                className="w-full rounded-lg bg-mainColor py-1 text-2xl text-black disabled:cursor-not-allowed disabled:text-gray-500 disabled:opacity-80"
                onClick={handleClaimCredit}
                disabled={new Date() < expiryTimestamp || isClaiming}
              >
                {isClaiming
                  ? "Claiming..."
                  : `Claim ${new Date() > expiryTimestamp ? "+3" : ""}`}
              </button>
              <Timer expiryTimestamp={expiryTimestamp} />
            </div>
            <div className="flex w-full flex-col items-center space-y-2 p-4 text-xl">
              <Link href={"/marketplace"}>
                <img src="/house.png" />
              </Link>
              <span className="flex flex-col items-center font-light">
                <p>Marketplace</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMobile;
