import { readFileSync, writeFileSync } from 'fs';

export function readData(filePath) {
    try {
        const rawData = readFileSync(filePath, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error(`Error reading from ${filePath}:`, error.message);
        return null;
    }
}

export function writeData(filePath, data, formatted = true) {
    try {
        const spaces = formatted ? 2 : null;
        writeFileSync(filePath, JSON.stringify(data, null, spaces), 'utf8');
    } catch (error) {
        console.error(`Error writing to ${filePath}:`, error.message);
    }
}
