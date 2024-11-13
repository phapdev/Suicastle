import clientConfig from "@/config/clientConfig";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { useContract } from "./useContract";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";

export const useMarketplace = () => {
  const { callContract } = useContract();

  const buyHero = async (
    id_account: string
  ): Promise<SuiTransactionBlockResponse> => {
    const txb = new Transaction();

    const functionName = "buy_hero";

    txb.moveCall({
      arguments: [txb.object(id_account), txb.object(SUI_CLOCK_OBJECT_ID)],
      target: `${clientConfig.PACKAGE_ID}::sui_castle::${functionName}`,
    });

    return await callContract(txb);
  };

  return { buyHero };
};
