import clientConfig from "@/config/clientConfig";
import { useCustomWallet } from "@/contexts/CustomWallet";
import {
  SuiObjectData,
  SuiObjectResponse,
  SuiTransactionBlockResponse,
} from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { useContract } from "./useContract";
import { useSuiClient } from "@mysten/dapp-kit";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";

export const usePlayer = () => {
  const { callContract } = useContract();
  const suiClient = useSuiClient();

  const getPlayerInfor = async (address: string) => {
    var result: SuiObjectData | null = null;
    const txn = await suiClient.getOwnedObjects({
      owner: address,
    });

    const idObjects = txn.data.map((data) => data.data?.objectId);
    if (idObjects.length === 0) throw new Error("User haven't create account");

    for (const id of idObjects) {
      if (!id) continue;
      const data = await suiClient.getObject({
        id: id,
        options: { showContent: true },
      });

      if (data.error) throw new Error("Can not get user data");

      if (data.data?.content?.dataType === "moveObject")
        if (data.data.content.type.split("::").includes("PlayerAccount"))
          result = data.data as SuiObjectData;
    }

    return result;
  };

  const createAccount = async (
    username: string
  ): Promise<SuiTransactionBlockResponse> => {
    const txb = new Transaction();
    const functionName = "create_account";

    txb.moveCall({
      arguments: [
        txb.object(clientConfig.GAMESTATE_ID),
        txb.pure.string(username),
        txb.object(SUI_CLOCK_OBJECT_ID),
      ],
      target: `${clientConfig.PACKAGE_ID}::sui_castle::${functionName}`,
    });

    return await callContract(txb);
  };

  const getDashboardInfor = async (): Promise<SuiTransactionBlockResponse> => {
    const txb = new Transaction();
    const functionName = "get_top_players_by_points";

    txb.moveCall({
      arguments: [
        txb.object(clientConfig.GAMESTATE_ID),
        txb.object(SUI_CLOCK_OBJECT_ID),
      ],
      target: `${clientConfig.PACKAGE_ID}::sui_castle::${functionName}`,
    });

    return await callContract(txb);
  };

  return { getPlayerInfor, createAccount, getDashboardInfor };
};
