"use client";
import React, { useContext, useState } from "react";
import { heros } from "@/lib/var";
import { AuthenticationContext } from "@/contexts/Authentication";
import { FaCaretLeft, FaCaretRight, FaLock } from "react-icons/fa6";

const SelectHero = () => {
  const { playerInfor, setSelectedHero, selectedHero } = useContext(
    AuthenticationContext
  );
  const [currentHero, setCurrentHero] = useState<number>(selectedHero);

  const handleSelectHero = () => {
    setSelectedHero(currentHero);
  };

  const isOwnThisHero = (id: number) => {
    if (id === 1 && playerInfor.hero_owned == "2") return true;
    if (id === 0) return true;
    return false;
  };

  return (
    <div className="w-full">
      <div className="relative z-10 flex w-full flex-col justify-between">
        <div className="flex w-full justify-center">
          <h1 className=" px-5 text-3xl text-mainColor">Select hero</h1>
        </div>
        <div className="flex w-full items-center justify-center text-2xl">
          <button
            onClick={() => {
              if (currentHero > 0) setCurrentHero((prev) => prev - 1);
            }}
          >
            <FaCaretLeft />
          </button>
          <img
            src={heros.at(currentHero)?.image}
            className="h-full h-24 w-2/3 object-cover shadow-inner brightness-75"
          />
          <button
            onClick={() => {
              if (currentHero < heros.length - 1)
                setCurrentHero((prev) => prev + 1);
            }}
          >
            <FaCaretRight />
          </button>
        </div>
        <div className="mt-3 flex w-full justify-center">
          {heros.at(currentHero)?.is_valid && isOwnThisHero(currentHero) ? (
            <button
              onClick={handleSelectHero}
              disabled={selectedHero === currentHero}
              className="disabled:opacity-75 bg-white text-black  w-28 h-10 text-xl disabled:bg-[#ccc]  rounded"
            >
              {selectedHero === currentHero ? "Selected" : "Select"}
            </button>
          ) : (
            <button
              disabled
              className="disabled:opacity-75 bg-white text-black flex justify-center items-center  w-28 h-10 text-xl disabled:bg-[#ccc]  rounded"
            >
              <FaLock />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectHero;
