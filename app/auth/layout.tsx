"use client";

import { useRouter } from "next/navigation";
import "@fontsource/vt323";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const hideSidebarRoutes = ["/playGame"];

  return (
    <div className="size-full flex justify-center items-center" id="login">{children}</div>
  );
};

export default Layout;
