import { VityToolKit, Action } from "vity-toolkit";


const toolKit = new VityToolKit();

const params = {
    query: "pixel",
    sortOrder: "DESC" as const,
    page: 1,
    pageSize: 10,
};

const result = await toolKit.executeAction({ action: Action.STAMPCHAIN_SEARCH_STAMPS, inputParams: params });
console.log(result.data);


