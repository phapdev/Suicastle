import React, { createContext, ReactNode } from "react";
import { useUnityContext } from "react-unity-webgl";
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import { UnityProvider } from "react-unity-webgl/distribution/types/unity-provider";

// Create UnityGame context
const UnityGameContext = createContext<{
  isLoaded: boolean;
  unityProvider: any;
  sendMessage: (
    gameObjectName: string,
    methodName: string,
    parameter?: ReactUnityEventParameter
  ) => void;
  requestPointerLock: () => void;
}>({
  isLoaded: false,
  unityProvider: undefined,
  sendMessage: function (
    gameObjectName: string,
    methodName: string,
    parameter?: ReactUnityEventParameter
  ): void {
    throw new Error("Function not implemented.");
  },
  requestPointerLock: function (): void {
    throw new Error("Function not implemented.");
  }
});

interface GameProviderProps {
  children: ReactNode;
}

export const UnityGameProvider: React.FC<GameProviderProps> = ({
  children,
}) => {
  const { isLoaded, unityProvider, sendMessage, requestPointerLock } =
    useUnityContext({
      loaderUrl: "build/Build/Build.loader.js",
      dataUrl: "build/Build/Build.data",
      frameworkUrl: "build/Build/Build.framework.js",
      codeUrl: "build/Build/Build.wasm",
    });

  return (
    <UnityGameContext.Provider
      value={{
        isLoaded,
        unityProvider,
        sendMessage,
        requestPointerLock,
      }}
    >
      {children}
    </UnityGameContext.Provider>
  );
};

export default UnityGameContext;
