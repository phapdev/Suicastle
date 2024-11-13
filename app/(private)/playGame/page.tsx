"use client";
import React, { useState, useEffect, useContext } from "react";
import UnityGameComponent, { useUnityGame } from "@/hooks/useUnityGame";
import { useGame } from "@/hooks/useGame";
import { useCustomWallet } from "@/contexts/CustomWallet";
import { AuthenticationContext } from "@/contexts/Authentication";
import EndGameModal from "@/components/EndGameModal/EndGameModal";

const PlayGame: React.FC = () => {
  const [loadGame, setLoadGame] = useState(false);
  const { playRound } = useGame();
  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState(false);
  const [isSign, setIsSign] = useState(false);
  const { isConnected } = useCustomWallet();
  const { playerInfor, handleGetPlayerInfor } = useContext(
    AuthenticationContext
  );

  useEffect(() => {
    if (!isConnected || playerInfor.id.id == "") return;

    console.log(playerInfor.id.id)

    if (!isSign) {
      setLoadGame(false);

      const round =
        playerInfor.current_round !== 0 ? playerInfor.current_round : 1;

      playRound(round, playerInfor.id.id).then(async (res) => {
        setIsSign(true);
        await handleGetPlayerInfor(playerInfor.address_id);
      });
    }
  }, [isSign, playerInfor, isConnected]);

  return (
    <>
      <EndGameModal open={isEndGameModalOpen} />
      {!loadGame ? (
        <div className="h-full w-full">
          <UnityGameComponent setIsEndGameModalOpen={setIsEndGameModalOpen} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
export default PlayGame;
