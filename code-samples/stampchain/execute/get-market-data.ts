import { VityToolKit, Action } from "vity-toolkit";


const toolKit = new VityToolKit();

const params = {
    minHolderCount: 10,
    minFloorPriceBTC: 0.001,
    minVolume24h: 0.01,
    page: 1,
    pageSize: 10,
    sort: "DESC" as const,
};

const result = await toolKit.executeAction({ action: Action.STAMPCHAIN_GET_MARKET_DATA, inputParams: params });
console.log(result.data);


