import { useContext, forwardRef, useEffect, useCallback } from "react";
import { Unity } from "react-unity-webgl";
import styled from "styled-components";
import UnityGameContext from "@/contexts/UnityGameProvider";
import { useGame } from "./useGame";
import { useCustomWallet } from "@/contexts/CustomWallet";
import { AuthenticationContext } from "@/contexts/Authentication";

export const useUnityGame = () => useContext(UnityGameContext);

const UnityGame = styled(Unity)`
  width: 100%;
  height: 100%;
`;

// eslint-disable-next-line react/display-name
const UnityGameComponent = forwardRef(
  (
    props: {
      setIsEndGameModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    },
    ref
  ) => {
    const { unityProvider } = useUnityGame();
    const { endGame } = useGame();
    const { isConnected } = useCustomWallet();
    const { playerInfor } = useContext(AuthenticationContext);

    const handleComponentEvent = useCallback(
      ({ detail }: CustomEvent<{ Score: number }>) => {
        const { Score } = detail;

        if (!isConnected) return;

        const round =
          playerInfor.current_round !== 0 ? playerInfor.current_round : 1;

        console.log("endgame", Score, round);

        endGame(round, playerInfor.id.id, Score).then((res) => {
          console.log(res);
          //   props.setIsEndGameModalOpen(true);
        });
      },
      [playerInfor]
    );

    useEffect(() => {
      // Add the event listener
      addEventListener(
        "PushRewardForPlayerEvent",
        handleComponentEvent as EventListener
      );

      // Clean up the event listener on unmount
      return () => {
        removeEventListener(
          "PushRewardForPlayer",
          handleComponentEvent as EventListener
        );
      };
    }, [handleComponentEvent]);

    return <UnityGame unityProvider={unityProvider} />;
  }
);

export default UnityGameComponent;
