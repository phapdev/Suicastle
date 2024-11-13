"use client";
import { useContext, useEffect, useState } from "react";

import { useAlert } from "@/contexts/AlertProvider";
import { useCustomWallet } from "@/contexts/CustomWallet";
import { useRouter } from "next/navigation";
import { usePlayer } from "@/hooks/usePlayer";
import { shortenAddress } from "@/lib/utils";

const CreateAccount = () => {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { isConnected, address, logout } = useCustomWallet();
  const { setAlert } = useAlert();
  const router = useRouter();
  const { createAccount } = usePlayer();

  useEffect(() => {
    if (!isConnected) router.push("/auth/login");
  }, [isConnected]);

  const handleSubmit = async () => {
    if (!username) {
      setAlert("All fields must be filled.", "info");
      return;
    }
    setLoading(true);

    try {
      const result = await createAccount(username);

      if (result) router.push("/");
    } catch (error) {
      setAlert("Can not create account, please try again.", "error");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="flex w-full flex-col items-center space-y-20 pb-32">
        <img src="/banner.png" className="w-2/3" />
        <div className="bg-[#222222] rounded-3xl p-6 flex flex-col items-center text-white w-2/3">
          <h1 className="text-2xl tracking-wider">Create account</h1>
          <p className="text-white/70">{shortenAddress(address, 5)}</p>
          <input
            type="text"
            className="bg-[#DDDDDD]/20 rounded-full text-white/50 px-5 py-1 focus:outline-none mt-6 w-full"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-mainColor text-black mt-5 px-6 py-2 tracking-widest"
            disabled={loading}
          >
            {loading ? "creating..." : "Create"}
          </button>
          <p className="mt-3 text-white">
            Want to change account?{" "}
            <b onClick={logout} className="text-mainColor underline cursor-pointer">
              Logout
            </b>
          </p>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
