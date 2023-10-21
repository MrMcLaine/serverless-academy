import { readFileSync, writeFileSync, existsSync } from 'fs';

const fileDB = 'db.txt';
const ENCODING = 'utf-8';

async function getAllUsers() {

    if (existsSync(fileDB)) {
        const rawData = readFileSync(fileDB, ENCODING);

        return JSON.parse(rawData);
    }

    return [];
}

async function addUsers(users) {
    const existingUsers = await getAllUsers();
    writeFileSync(fileDB, JSON.stringify([...existingUsers, ...users]), ENCODING);
}

async function getUserByName(name) {
    const users = await getAllUsers();

    return users.find(user => user.name.toLowerCase() === name.toLowerCase());
}

export {
    addUsers,
    getUserByName,
    getAllUsers
}