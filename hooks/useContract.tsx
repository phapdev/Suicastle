import clientConfig from "@/config/clientConfig";
import { useCustomWallet } from "@/contexts/CustomWallet";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { Transaction, TransactionArgument } from "@mysten/sui/transactions";

export const useContract = () => {
  const { sponsorAndExecuteTransactionBlock, address, executeTransactionBlockWithoutSponsorship } = useCustomWallet();

  const callContract = async (
    txb: Transaction
  ): Promise<SuiTransactionBlockResponse> => {
    const recipient = address!;

    return await sponsorAndExecuteTransactionBlock({
      tx: txb,
      network: clientConfig.SUI_NETWORK_NAME,
      includesTransferTx: true,
      allowedAddresses: [recipient],
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    })
      .then((resp) => {
        console.log(resp);
        return resp;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  return { callContract };
};
