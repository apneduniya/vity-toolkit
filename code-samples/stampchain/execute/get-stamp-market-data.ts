import { VityToolKit, Action } from "vity-toolkit";


const toolKit = new VityToolKit();

const params = {
    stampId: 1000,
};

const result = await toolKit.executeAction({ action: Action.STAMPCHAIN_GET_STAMP_MARKET_DATA, inputParams: params });
console.log(result.data);


