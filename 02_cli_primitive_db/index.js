import inquirer from 'inquirer';
import {
    AGE_MESSAGE,
    GENDER_MESSAGE,
    NAME_MESSAGE,
    SEARCH_MESSAGE,
    USER_SEARCH_MESSAGE
} from "./textData.js";
import { addUsers, getUserByName, getAllUsers } from "./dbUtils.js";

const GENDER_CHOICES = ['Male', 'Female'];

async function addUser() {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: NAME_MESSAGE,
            },
            {
                type: 'list',
                name: 'gender',
                message: GENDER_MESSAGE,
                choices: GENDER_CHOICES,
                when: (answers) => answers.name,
            },
            {
                type: 'input',
                name: 'age',
                message: AGE_MESSAGE,
                when: (answers) => answers.name,
            }
        ]);

        return answers.name ? answers : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function main() {
    let users = [];

    try {
        while (true) {
            const user = await addUser();
            if (!user) break;

            users.push(user);
        }

        if (users.length) {
            await addUsers(users);
        }

        const { search } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'search',
                message: SEARCH_MESSAGE,
            }
        ]);

        if (search) {

            const allUsers = await getAllUsers();
            console.log(allUsers);

            const { nameToSearch } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'nameToSearch',
                    message: USER_SEARCH_MESSAGE,
                }
            ]);

            const foundUser = await getUserByName(nameToSearch);

            if (foundUser) {
                console.log(`User ${nameToSearch} was found:`, foundUser);
            } else {
                console.log(`User ${nameToSearch} was not found.`);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

main();
