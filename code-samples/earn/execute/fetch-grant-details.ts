import { VityToolKit, Action } from "../../../src";


const toolKit = new VityToolKit();
const result = await toolKit.executeAction({ action: Action.EARN_FETCH_GRANT_DETAILS, inputParams: { slug: 'Solana-fdn-coindcx-instagrant' } });

console.log(result.data);