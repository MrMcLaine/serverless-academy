const readline = require('readline');
const oneQuestion = require("./oneQuestion");
const sortUtils = require("./sortUtils");
const { welcomeMessage, sortingOptionsMessage } = require("./textData");
const splitInput = require("./splitInput");

const interactiveInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function initProgram() {
    oneQuestion(interactiveInterface, welcomeMessage, (input) => {
        if (input.toLowerCase() === 'exit') {
            interactiveInterface.close();
        } else {
            const words = splitInput(input);
            chooseSortingOption(words);
        }
    });
}

function chooseSortingOption(words) {
    oneQuestion(interactiveInterface, sortingOptionsMessage, (choice) => {
        sortUtils(words, choice);
        initProgram();
    });
}

initProgram();