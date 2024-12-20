"use client";
import { ContentCopy } from "@mui/icons-material";
import { shortenAddress } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { BiSolidCoinStack } from "react-icons/bi";
import { RiKey2Fill } from "react-icons/ri";
import { FaRankingStar } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useCustomWallet } from "@/contexts/CustomWallet";
import { AuthenticationContext } from "@/contexts/Authentication";
import PlayerInfoModal from "./PlayerInforModal";
import LeaderboardModal from "./LeaderboardModal";

const MobileHeader = () => {
  const [openToolTip, setOpenToolTip] = useState(false);
  const [openPlayerModal, setPlayerModal] = useState(false);
  const [openLeaderboardModal, setLeaderboardModal] = useState(false);
  const router = useRouter();
  const { user, handleGetPlayerInfor, playerInfor } = useContext(
    AuthenticationContext
  );
  const { isConnected, address } = useCustomWallet();

  useEffect(() => {
    if (!isConnected) router.push("/auth/login");
    if (!address) return;
    handleGetPlayerInfor(address);
  }, [isConnected, address]);

  useEffect(() => {
    if (openToolTip) {
      setTimeout(() => {
        setOpenToolTip(false);
      }, 1000);
    }
  }, [openToolTip]);

  const handlePlayerInfoClose = () => {
    setPlayerModal(false);
  };

  const handleLeaderboardClose = () => {
    setLeaderboardModal(false);
  };

  return (
    <header className="flex w-full flex-row items-start justify-between px-4 py-4">
      <PlayerInfoModal
        open={openPlayerModal}
        handleClose={handlePlayerInfoClose}
        playerInfo={playerInfor}
        userInfor={user}
      />
      <LeaderboardModal
        open={openLeaderboardModal}
        handleClose={handleLeaderboardClose}
      />
      <div className="flex flex-grow flex-col justify-start space-y-4">
        <div
          className="cursor-pointer text-3xl text-white"
          onClick={() => {
            router.back();
          }}
        >
          <IoIosArrowBack />
        </div>
        <div className="flex w-fit items-center space-x-2 rounded-full bg-[#DDDDDD] px-4 py-1">
          <RiKey2Fill /> <p>{playerInfor.credits}</p>
        </div>
        <div className="flex w-fit items-center space-x-2 rounded-full bg-[#DDDDDD] px-4 py-1">
          <BiSolidCoinStack /> <p>{playerInfor.gold}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-grow-[4] items-start justify-center">
        <div className="font-vt323 flex items-center rounded-full bg-[#DDDDDD]/20 px-5 py-1 text-white">
          <Tooltip
            open={openToolTip}
            onOpen={() => {
              setOpenToolTip(true);
            }}
            title="Copied!"
          >
            <div className="flex items-center space-x-2">
              <ContentCopy
                onClick={() => {
                  setOpenToolTip(true);
                  if (!isConnected) return;
                  if (!address) return;
                  navigator.clipboard.writeText(address);
                }}
                className="cursor-pointer !text-base"
              />
              <span className="text-lg">
                <p>{shortenAddress(address, 5)}</p>
              </span>
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="relative flex flex-grow flex-col items-end space-y-4 ps-4 text-3xl text-white">
        <button
          className="size-10 rounded-full"
          onClick={() => {
            setPlayerModal(true);
          }}
        >
          <img src={user.picture} alt="" className="rounded-full" />
        </button>
        <button
          onClick={() => {
            setLeaderboardModal(true);
          }}
        >
          <FaRankingStar />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
