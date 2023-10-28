import path from 'path';
import { fileURLToPath } from 'url';
import fileReaderToMap from './fileReaderToMap.js';
import { getAllNamesFromSelectedFiles, getUniqueNames } from './counter.js';
import timerWrapper from './timerWrapper.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function countApp() {
    const basePath = path.join(__dirname, 'data');
    const mapWithNames = fileReaderToMap(basePath, 20);

    console.log(getUniqueNames(mapWithNames));
    console.log(getAllNamesFromSelectedFiles(mapWithNames, 20));
    console.log(getAllNamesFromSelectedFiles(mapWithNames, 10));
}

timerWrapper(countApp);
