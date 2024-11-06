import clientConfig from "@/config/clientConfig";
import { useCustomWallet } from "@/contexts/CustomWallet";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { useContract } from "./useContract";

export const useCredit = () => {
  const { callContract } = useContract();

  const claimCredit = async (
    address: string
  ): Promise<SuiTransactionBlockResponse> => {
    const txb = new Transaction();

    const args = [txb.pure.address(address)];
    const functionName = "claim_credit";

    return await callContract(args, functionName);
  };

  // const fetchCredit = async (): Promise<SuiTransactionBlockResponse> => {

  // };

  return { claimCredit };
};
