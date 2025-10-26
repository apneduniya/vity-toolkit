import { z } from "zod";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { getPrivateKeyFromContext } from "../../../helpers/getPrivateKey";


export const solanaWalletGetMyPublicKey = async (): Promise<string> => {
    try {
        const credentials = await getPrivateKeyFromContext('user');
        return toolMessage({
            success: true,
            data: {
                publicKey: credentials.publicKey,
            },
        });
    } catch (error: any) {
        return toolMessage({
            success: false,
            data: {
                error: `No user credentials found: ${error.message}`,
            },
        });
    }
}

export const solanaWalletGetMyPublicKeyTool = createAction({
    name: "solanaWalletGetMyPublicKeyTool",
    description: "Get the public key of the current user",
    inputParams: z.object({}),
    execute: solanaWalletGetMyPublicKey,
});


