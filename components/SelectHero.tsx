"use client";
import React, { useContext, useState } from "react";
import { heros } from "@/lib/var";
import { AuthenticationContext } from "@/contexts/Authentication";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

const SelectHero = () => {
  const { playerInfor, setSelectedHero, selectedHero } = useContext(
    AuthenticationContext
  );

  return (
    <div className="w-full">
      <div className="relative z-10 flex w-full flex-col justify-between">
        <div className="flex w-full justify-center">
          <h1 className=" px-5 text-3xl text-mainColor">Select hero</h1>
        </div>
        <div className="flex w-full items-center justify-between text-2xl">
          <button
            onClick={() => {
              //   if (selectedMap > 1) handleChangeLevel(false);
            }}
          >
            <FaCaretLeft />
          </button>
          <img
            src={""}
            className="h-full w-1/3 object-cover shadow-inner brightness-75"
          />
          <button
            onClick={() => {
              //   if (selectedMap < maps.length) handleChangeLevel(true);
            }}
          >
            <FaCaretRight />
          </button>
        </div>
        <div className="mt-10 flex w-full justify-center">
          <button className="disabled:opacity-15 border-2 border-white px-10 py-2 text-2xl hover:bg-white rounded">
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectHero;
