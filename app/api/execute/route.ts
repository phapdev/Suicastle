import { NextRequest, NextResponse } from "next/server";
import { enokiClient } from "../EnokiClient";
import { ExecuteSponsoredTransactionApiInput } from "@/contexts/CustomWallet";
import { z } from "zod";

const ExecuteSchema = z.object({
  digest: z.string(),
  signature: z.string(),
});

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    
    if (!body || !body.digest || !body.signature) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log('Request body:', body);

    const { digest, signature }: ExecuteSponsoredTransactionApiInput = body;

    return enokiClient
      .executeSponsoredTransaction({
        digest,
        signature,
      })
      .then(({ digest }) => {
        return NextResponse.json(
          { digest },
          {
            status: 200,
          }
        );
      })
      .catch((error) => {
        console.error(error);
        return NextResponse.json(
          {
            error: "Could not execute sponsored transaction block.",
          },
          {
            status: 500,
          }
        );
      });
  } catch (error) {
    console.error('Execute error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
