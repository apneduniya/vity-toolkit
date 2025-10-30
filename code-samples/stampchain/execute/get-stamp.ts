import { VityToolKit, Action } from "vity-toolkit";


const toolKit = new VityToolKit();

const params = {
    stampId: 1000,
    includeBase64: false,
};

const result = await toolKit.executeAction({ action: Action.STAMPCHAIN_GET_STAMP, inputParams: params });
console.log(result.data);


