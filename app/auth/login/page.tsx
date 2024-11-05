"use client";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { redirect } from "next/navigation";

import "../../globals.css";
import { useCustomWallet } from "@/contexts/CustomWallet";

export default function LoginPage() {
  const { isConnected, logout, redirectToAuthUrl, emailAddress, address } =
    useCustomWallet();

  useEffect(() => {
    if (isConnected) {
      redirect("/");
    }
  }, [isConnected]);

  return (
    <>
      <div className="flex w-full flex-col items-center space-y-72">
        <img src="/banner.png" className="w-2/3" />
        <button
          className="mt-10 inline-flex items-center rounded-lg bg-white px-8 py-2 text-center text-2xl font-medium text-black shadow-sm shadow-white"
          onClick={() => {
            redirectToAuthUrl();
          }}
        >
          <FcGoogle />
          <span className="ml-1">Sign in</span>
        </button>
      </div>
    </>
  );
}
