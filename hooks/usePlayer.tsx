import clientConfig from "@/config/clientConfig";
import { useCustomWallet } from "@/contexts/CustomWallet";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { useContract } from "./useContract";
import { useSuiClient } from "@mysten/dapp-kit";

export const usePlayer = () => {
  const { callContract } = useContract();
  const suiClient = useSuiClient();

  const getPlayerInfor = async (address: string) => {
    const txn = await suiClient.getOwnedObjects({
      owner: address,
    });

    if (txn.data.length === 0) throw new Error("User haven't create account");

    const idPlayerInfor = txn.data[0].data?.objectId;

    if (!idPlayerInfor) {
      throw new Error("User haven't create account");
    }

    const data = await suiClient.getObject({
      id: idPlayerInfor,
      options: { showContent: true },
    });

    if (data.error) throw new Error("Can not get user data");

    return data.data;
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
      ],
      target: `${clientConfig.PACKAGE_ID}::sui_castle::${functionName}`,
    });

    return await callContract(txb);
  };

  const getDashboardInfor = async (): Promise<SuiTransactionBlockResponse> => {
    const txb = new Transaction();
    const functionName = "get_top_players_by_points";

    txb.moveCall({
      arguments: [txb.object(clientConfig.GAMESTATE_ID)],
      target: `${clientConfig.PACKAGE_ID}::sui_castle::${functionName}`,
    });

    return await callContract(txb);
  };

  return { getPlayerInfor, createAccount, getDashboardInfor };
};
