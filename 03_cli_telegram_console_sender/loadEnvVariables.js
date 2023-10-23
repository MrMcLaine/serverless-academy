import * as fs from "fs";

export const loadEnvVariables = () => {
    const envData = fs.readFileSync('.env', 'utf-8');
    const envVars = envData.split('\n');

    envVars.forEach(line => {
        const [key, value] = line.split('=');

        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
};