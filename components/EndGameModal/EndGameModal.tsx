"use client";
import React, { useContext, useState } from "react";
import { Modal, Button } from "@mui/material";
import { useGame } from "@/hooks/useGame";
import { AuthenticationContext } from "@/contexts/Authentication";
import Image from "next/image";
import clsx from "clsx";
import { OpenTreasureEvent } from "@/types/Events";
import { BiSolidCoinStack } from "react-icons/bi";

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
              {gold === 0 ? (
                <>
                  You got a <b className="text-mainColor">treasure</b>
                </>
              ) : (
                "Congratulations! You got"
              )}
            </h1>
            <div className="h-24 w-2/3 object-cover shadow-inner brightness-75 translate-x-7 relative mt-10">
              <Image
                src={gold === 0 ? "/treasure.gif" : "/treasureOpen.gif"}
                fill
                alt="treasure"
                className="z-20 relative"
              />
              <div
                className={clsx(
                  "absolute bottom-0 left-1/2 -translate-x-12 z-10 delay-700 transition-all flex flex-col items-center duration-300",
                  gold !== 0 && "-translate-y-20"
                )}
              >
                <p className="text-3xl text-mainColor">{gold}</p>
                <BiSolidCoinStack />
              </div>
            </div>
            <div className="w-full flex justify-around mt-5">
              {gold === 0 ? (
                <button
                  onClick={handleOpenTreasure}
                  className="rounded-lg bg-mainColor px-4 py-1 disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? "Opening..." : "Open it!"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setStep(1);
                  }}
                  className="rounded-lg bg-mainColor px-4 py-1 disabled:opacity-70"
                  disabled={isLoading}
                >
                  Yayyy!
                </button>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex w-3/4 flex-col items-center justify-around rounded-lg  px-6 py-10 text-white">
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
