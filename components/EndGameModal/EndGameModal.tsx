"use client";
import React, { useContext, useState } from "react";
import { Modal, Button } from "@mui/material";
import { useGame } from "@/hooks/useGame";
import { AuthenticationContext } from "@/contexts/Authentication";
import Image from "next/image";
import clsx from "clsx";
import { OpenTreasureEvent } from "@/types/Events";
import { number } from "zod";

interface EndGameModalProps {
  open: boolean;
}

const EndGameModal: React.FC<EndGameModalProps> = ({ open }) => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { openTreasure } = useGame();
  const [gold, setGold] = useState(0);
  const { handleGetPlayerInfor, playerInfor } = useContext(
    AuthenticationContext
  );

  const handleOpenTreasure = async () => {
    setIsLoading(true);
    const res = await openTreasure(playerInfor.id.id);

    if (res.events) {
      const event = res.events[0].parsedJson as OpenTreasureEvent;

      setGold(Number(event.gold_earned));
      await handleGetPlayerInfor(playerInfor.address_id);
    }
    setIsLoading(false);
  };

  return (
    <Modal
      open={open}
      className="flex items-center justify-center backdrop-blur-sm"
    >
      <>
        {step === 0 && (
          <div className="flex w-3/4 flex-col items-center justify-around rounded-lg  px-6 py-10 text-white">
            <h1 className="text-white text-2xl">
              You got <b className="text-mainColor">1</b> treasure
            </h1>
            <div className="h-24 w-2/3 object-cover shadow-inner brightness-75 translate-x-7">
              <Image
                src={gold === 0 ? "/treasure.gif" : "/treasureOpen.gif"}
                fill
                alt="treasure"
              />
            </div>
            <div className="w-full flex justify-around mt-5">
              <button
                onClick={handleOpenTreasure}
                className="rounded-lg bg-mainColor px-4 py-1 disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? "Opening..." : "Open it!"}
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex w-3/4 flex-col items-center justify-around rounded-lg bg-[#222222] px-6 py-10 text-white">
            <h1 className="text-white text-2xl">Play Again?</h1>
            <div className="w-full flex justify-around mt-5">
              <button
                onClick={() => {
                  location.reload();
                }}
                className="rounded-lg bg-mainColor px-4 py-1"
              >
                Play Again
              </button>
              <button
                onClick={() => {
                  location.href = "/";
                }}
                className="rounded-lg bg-mainColor px-4 py-1"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </>
    </Modal>
  );
};

export default EndGameModal;
