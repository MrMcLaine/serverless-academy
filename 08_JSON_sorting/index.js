import axios from 'axios';

const endpoints = Array.from({ length: 22 }, (_, i) => `http://localhost:4000/json-${i + 1}`);

async function findIsDoneInJson(json) {
    if (json.hasOwnProperty('isDone')) {
        return json.isDone;
    }
    for (let key in json) {
        if (typeof json[key] === 'object') {
            const result = findIsDoneInJson(json[key]);
            if (result !== undefined) return result;
        }
    }
}

async function requestData(url) {
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const response = await axios.get(url);
            return findIsDoneInJson(response.data);
        } catch (error) {
            if (attempt === 2) {
                console.error(`[Fail] ${url}: ${error.message}`);
                return null;
            }
        }
    }
}

async function processEndpoints() {
    let trueCount = 0;
    let falseCount = 0;

    for (const url of endpoints) {
        const isDone = await requestData(url);
        if (isDone !== null) {
            console.log(`[Success] ${url}: isDone - ${isDone}`);
            isDone ? trueCount++ : falseCount++;
        }
    }

    console.log(`\nFound True values: ${trueCount},\nFound False values: ${falseCount}`);
}

processEndpoints();
