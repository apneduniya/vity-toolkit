import { VityToolKit, Action } from "../../../src";


const toolKit = new VityToolKit();
const result = await toolKit.executeAction({ action: Action.EARN_FETCH_FEED, inputParams: { type: 'submission', id: '747224bf-1d61-4b98-adc9-52e965cd455c' } });

console.log(result.data);