import clientConfig from "@/config/clientConfig";
import { useCustomWallet } from "@/contexts/CustomWallet";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { useContract } from "./useContract";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";

export const useCredit = () => {
  const { callContract } = useContract();

  const claimCredit = async (
    id_account: string
  ): Promise<SuiTransactionBlockResponse> => {
    const txb = new Transaction();

    const functionName = "claim_credit";

    txb.moveCall({
      arguments: [txb.object(id_account), txb.object(SUI_CLOCK_OBJECT_ID)],
      target: `${clientConfig.PACKAGE_ID}::sui_castle::${functionName}`,
    });

    return await callContract(txb);
  };

  return { claimCredit };
};
