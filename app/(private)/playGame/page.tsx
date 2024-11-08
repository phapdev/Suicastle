"use client";
import React, { useState, useEffect, useContext } from "react";
import { Modal } from "@mui/material";
import UnityGameComponent, { useUnityGame } from "@/hooks/useUnityGame";
import { useGame } from "@/hooks/useGame";
import { useCustomWallet } from "@/contexts/CustomWallet";
import { AuthenticationContext } from "@/contexts/Authentication";

// import EndGameModal from "../../components/EndGameModal/EndGameModal";

const PlayGame: React.FC = () => {
  const { isLoaded } = useUnityGame();
  const [loadGame, setLoadGame] = useState(false);
  const { playRound } = useGame();
  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState(false);
  const [isSign, setIsSign] = useState(false);
  const { isConnected } = useCustomWallet();
  const { playerInfor, handleGetPlayerInfor } = useContext(
    AuthenticationContext
  );

  useEffect(() => {
    if (!isConnected) return;

    if (isLoaded && !isSign) {
      setLoadGame(false);

      const round =
        playerInfor.current_round !== 0 ? playerInfor.current_round : 1;

      playRound(round, playerInfor.id.id).then(async (res) => {
        setIsSign(true);
        await handleGetPlayerInfor(playerInfor.address_id);
      });
    }
  }, [isLoaded, playRound, isSign]);

  return (
    <>
      {/* <EndGameModal open={isEndGameModalOpen} /> */}
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
