import React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthenticationContextProps, UserProps } from "@/types/Authentication";
import { createContext } from "react";
import { ChildrenProps } from "@/types/ChildrenProps";
import { isFollowingUserPropsSchema } from "@/helpers/isFollowingUserPropsSchema";
import { useQuery } from "@tanstack/react-query";
import { PlayerInfo } from "@/types/types";
import { usePlayer } from "@/hooks/usePlayer";

export const anonymousUser: UserProps = {
  firstName: "",
  lastName: "",
  role: "anonymous",
  email: "",
  picture: "",
};

const player_infor: PlayerInfo = {
  address_id: "",
  current_round: 0,
  game_finished: false,
  hero_owned: "",
  name: "",
  last_claim_time: "",
  round1_finish_time: "",
  round1_play_time: "",
  round2_finish_time: "",
  round2_play_time: "",
  round3_finish_time: "",
  round3_play_time: "",
  credits: "0",
  point: "0",
  gold: "0",
  id: {
    id: "",
  },
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider"
    );
  }
  return context;
};

export const AuthenticationContext = createContext<AuthenticationContextProps>({
  user: anonymousUser,
  isLoading: false,
  setIsLoading: () => {},
  handleLoginAs: () => {},
  handleLogout: () => {},
  playerInfor: player_infor,
  handleGetPlayerInfor: () => {},
  selectedHero: 0,
  setSelectedHero: () => {},
});

export const AuthenticationProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<UserProps>(anonymousUser);
  const [playerInfor, setPlayerInfor] = useState<PlayerInfo>(player_infor);
  const [isLoading, setIsLoading] = useState(false);
  const { getPlayerInfor } = usePlayer();
  const [selectedHero, setSelectedHero] = useState(0);

  const pathname = usePathname();
  const router = useRouter();

  const handleLoginAs = useCallback(
    async (user: UserProps) => {
      setUser(user);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("userRole", user.role);
      if (pathname === "/" || pathname === "/auth") {
        router.push("/");
      }
    },
    [pathname, router]
  );

  useEffect(() => {
    const initialUser = sessionStorage.getItem("user");
    if (initialUser) {
      const parsedUser = JSON.parse(initialUser);
      if (!isFollowingUserPropsSchema(parsedUser)) {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("userRole");
        setUser(anonymousUser);
      } else {
        handleLoginAs(parsedUser);
      }
    } else {
      setUser(anonymousUser);
    }
    setIsLoading(false);
  }, [handleLoginAs, router]);
  const handleLogout = () => {
    setUser(anonymousUser);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userRole");
    router.push("/");
  };

  const handleGetPlayerInfor = (address: string) => {
    getPlayerInfor(address)
      .then((res) => {
        if (!res) {
          return;
        }

        if (res.content?.dataType === "moveObject")
          setPlayerInfor(res.content.fields as PlayerInfo);
      })
      .catch((error: Error) => {
        console.log(error);
        router.push("/auth/create-account");
      });
  };
  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        setIsLoading,
        handleLoginAs,
        handleLogout,
        playerInfor,
        handleGetPlayerInfor,
        selectedHero,
        setSelectedHero,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
