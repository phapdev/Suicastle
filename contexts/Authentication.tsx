import React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthenticationContextProps, UserProps } from "@/types/Authentication";
import { createContext } from "react";
import { ChildrenProps } from "@/types/ChildrenProps";
import { isFollowingUserPropsSchema } from "@/helpers/isFollowingUserPropsSchema";
import { useQuery } from "@tanstack/react-query";

export const anonymousUser: UserProps = {
  firstName: "",
  lastName: "",
  role: "anonymous",
  email: "",
  picture: "",
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
});

export const AuthenticationProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<UserProps>(anonymousUser);
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleLoginAs = useCallback(
    async (user: UserProps) => {
      setUser(user);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("userRole", user.role);
      if (pathname === "/" || pathname === "/auth") {
        router.push("/");
      } else {
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
        router.push("/");
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

  return (
    <AuthenticationContext.Provider
      value={{ user, isLoading, setIsLoading, handleLoginAs, handleLogout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
