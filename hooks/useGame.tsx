import clientConfig from "@/config/clientConfig";
import { useCustomWallet } from "@/contexts/CustomWallet";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { useContract } from "./useContract";
import { useSuiClient } from "@mysten/dapp-kit";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";

const MAX_ROUND = 3;

export const useGame = () => {
  const { callContract, callAdminContract } = useContract();
  const suiClient = useSuiClient();

  const playRound = async (
    round: number,
    account_id: string
  ): Promise<SuiTransactionBlockResponse> => {
    if (round < 0 || round > MAX_ROUND) throw new Error("Invalid round input");

    const txb = new Transaction();
    const functionName = `play_round${round}`;

    txb.moveCall({
      arguments: [txb.object(account_id), txb.object(SUI_CLOCK_OBJECT_ID)],
      target: `${clientConfig.PACKAGE_ID}::sui_castle::${functionName}`,
    });

    return await callContract(txb);
  };

  const endGame = async (
    round: number,
    player_id: string,
    points: number
  ): Promise<SuiTransactionBlockResponse> => {
    const txb = new Transaction();
    const functionName = `add_certificate_round${round}`;

    txb.moveCall({
      arguments: [
        txb.object(player_id),
        txb.pure.u64(points),
        txb.object(SUI_CLOCK_OBJECT_ID),
      ],
      target: `${clientConfig.PACKAGE_ID}::sui_castle::${functionName}`,
    });

    return await callContract(txb);
  };

  const openTreasure = async (
    player_id: string
  ): Promise<SuiTransactionBlockResponse> => {
    const txb = new Transaction();
    const functionName = `open_treasure_round11`;

    txb.moveCall({
      arguments: [txb.object(player_id), txb.object(SUI_CLOCK_OBJECT_ID)],
      target: `${clientConfig.PACKAGE_ID}::sui_castle::${functionName}`,
    });

    return await callContract(txb);
  };

  return { playRound, endGame, openTreasure };
};
