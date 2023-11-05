import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const CSV_PATH = path.join(__dirname, '..', 'data', 'IP2LOCATION-LITE-DB1.CSV');

const ipToDecimal = (ip: string): number => {
    return ip.split('.').reduce((ipInt: number, octet: string) => {
        return (ipInt << 8) + parseInt(octet, 10);
    }, 0);
};

export const findCountryByIP = (userIP: string) => {
    return new Promise((resolve, reject) => {

        if (!fs.existsSync(CSV_PATH)) {
            return reject(new Error('CSV file not found'));
        }

        const userIPDecimal = ipToDecimal(userIP);
        let found = false;

        fs.createReadStream(CSV_PATH)
            .pipe(csv({
                headers: ['from', 'to', 'country_code', 'country_name'],
                skipLines: 1
            }))
            .on('data', (row) => {

                const rangeStart = parseInt(row.from, 10);
                const rangeEnd = parseInt(row.to, 10);

                if (isNaN(rangeStart) || isNaN(rangeEnd)) {
                    console.log('Invalid range in row:', row);
                    return;
                }

                if (userIPDecimal >= rangeStart && userIPDecimal <= rangeEnd) {
                    found = true;
                    resolve(row.country_name);
                }
            })
            .on('end', () => {
                if (!found) reject(new Error('Country not found for IP'));
            })
            .on('error', (error) => reject(error));
    });
};