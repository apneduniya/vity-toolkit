import { fakeWeatherGenerateTool } from "./actions/generate";

export class FakeWeatherTool {
    getTools() {
        return [fakeWeatherGenerateTool];
    }
}


