function splitInput(input) {
    return input.split(' ').filter(value => value.trim() !== '');
}

module.exports = splitInput;