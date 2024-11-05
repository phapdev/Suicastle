import { useContext, forwardRef, useEffect, useCallback } from "react";
import { Unity } from "react-unity-webgl";
import styled from "styled-components";
import UnityGameContext from "@/contexts/UnityGameProvider";
// import useGame from "../hooks/useGame";

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

    return <UnityGame unityProvider={unityProvider} />;
  }
);

export default UnityGameComponent;
