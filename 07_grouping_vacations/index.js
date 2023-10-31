import { readData, writeData } from "./fileHandler.js";
import { formatter } from "./formatter.js";

function initProgram() {
    const input = readData('data/data.json');
    const formattedData = formatter(input);
    writeData('data/formattedData.json', formattedData);
}

initProgram();