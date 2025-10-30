import { VityToolKit, Action } from "vity-toolkit";


const toolKit = new VityToolKit();

const params = {
    limit: 15,
};

const result = await toolKit.executeAction({ action: Action.STAMPCHAIN_GET_RECENT_STAMPS, inputParams: params });
console.log(result.data);


