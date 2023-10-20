const { byeMessage } = require("./textData");

function oneQuestion(interactiveInterface, question, callback) {
    interactiveInterface.question(question, (answer) => {
        if(answer === 'exit') {
            interactiveInterface.close();
            console.log('\n' + byeMessage);
        } else {
            callback(answer);
        }
    });
}

module.exports = oneQuestion;
