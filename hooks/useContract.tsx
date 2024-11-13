import clientConfig from "@/config/clientConfig";
import { useCustomWallet } from "@/contexts/CustomWallet";
import { useSuiClient } from "@mysten/dapp-kit";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { Transaction, TransactionArgument } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

export const useContract = () => {
  const { sponsorAndExecuteTransactionBlock, address } = useCustomWallet();
  const suiClient = useSuiClient();

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
        showEvents: true,
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

  const callAdminContract = async (txb: Transaction) => {
    const secretKey =
      "suiprivkey1qrh3ckx098gnyfxyrjhv0zx72mmqww84e7wgtea32dtf4c8psmvakn656g6";
    const keypair = Ed25519Keypair.fromSecretKey(secretKey, {
      skipValidation: true,
    });

    const result = await suiClient.signAndExecuteTransaction({
      signer: keypair,
      // @ts-ignore
      transaction: txb,
    });
    return await suiClient.waitForTransaction({ digest: result.digest });
  };

  return { callContract, callAdminContract };
};
