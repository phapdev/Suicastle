import React, { createContext, ReactNode } from "react";
import { useUnityContext } from "react-unity-webgl";

// Create UnityGame context
const UnityGameContext = createContext<any>(null);

interface GameProviderProps {
  children: ReactNode;
}

export const UnityGameProvider: React.FC<GameProviderProps> = ({
  children,
}) => {
  const { isLoaded, unityProvider } = useUnityContext({
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
      }}
    >
      {children}
    </UnityGameContext.Provider>
  );
};

export default UnityGameContext;
