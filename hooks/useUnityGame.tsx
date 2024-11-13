import {
  useContext,
  forwardRef,
  useEffect,
  useCallback,
  useState,
} from "react";
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
    const { unityProvider, sendMessage, requestPointerLock } = useUnityGame();
    const { endGame } = useGame();
    const { isConnected } = useCustomWallet();
    const { playerInfor, selectedHero } = useContext(AuthenticationContext);
    const [isCalledEndgame, setIsCalledEndgame] = useState(false);

    const handleEndGameEvent = useCallback(
      ({ detail }: CustomEvent<{ Score: number }>) => {
        console.log("handleEndGameEvent", detail);
        if (isCalledEndgame) return;

        setIsCalledEndgame(true);
        const { Score } = detail;
        if (!isConnected) return;

        const round =
          playerInfor.current_round !== 0 ? playerInfor.current_round : 1;

        endGame(round, playerInfor.id.id, Score).then((res) => {
          props.setIsEndGameModalOpen(true);
          requestPointerLock();
        });
      },
      [playerInfor, isCalledEndgame]
    );

    const handleGameCanPlayEvent = () => {
      sendMessage("GameController", "SettingForGameOpen", selectedHero);
    };

    useEffect(() => {
      // Add the event listener
      addEventListener(
        "PushRewardForPlayerEvent",
        handleEndGameEvent as EventListener
      );

      addEventListener("GameCanPlay", handleGameCanPlayEvent as EventListener);

      // Clean up the event listener on unmount
      return () => {
        removeEventListener(
          "PushRewardForPlayer",
          handleEndGameEvent as EventListener
        );

        removeEventListener(
          "GameCanPlay",
          handleGameCanPlayEvent as EventListener
        );
      };
    }, [handleEndGameEvent, handleGameCanPlayEvent]);

    return <UnityGame unityProvider={unityProvider} />;
  }
);

export default UnityGameComponent;
