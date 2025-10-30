import { VityToolKit, Action } from "vity-toolkit";


const toolKit = new VityToolKit();

const params = {
    dayRange: 14,
    fullDetails: true,
    page: 1,
    pageSize: 10,
};

const result = await toolKit.executeAction({ action: Action.STAMPCHAIN_GET_RECENT_SALES, inputParams: params });
console.log(result.data);


