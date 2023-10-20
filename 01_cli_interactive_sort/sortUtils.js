function sortUtils(values, choice) {
    switch (choice) {
        case '1':
            sortWordsAlphabetically(values);
            break;
        case '2':
            sortNumbersAscending(values);
            break;
        case '3':
            sortNumbersDescending(values);
            break;
        case '4':
            sortWordsByLength(values);
            break;
        case '5':
            getUniqueWords(values);
            break;
        case '6':
            getUniqueValues(values);
            break;
        default:
            console.log('\n', 'Invalid choice. Please enter a number from 1 to 6.', '\n');
    }
}

function sortWordsAlphabetically(values) {
    const sortedWords = values
        .filter(value => isNaN(value))
        .sort()
    console.log('\n', 'Sorted alphabetically:', sortedWords, '\n');
}

function sortNumbersAscending(values) {
    const sortedNumbers = values
        .filter(value => !isNaN(value))
        .map(Number)
        .sort((a, b) => a - b)
    console.log('\n', 'Sorted numbers (ascending):', sortedNumbers, '\n');
}

function sortNumbersDescending(values) {
    const sortedNumbers = values
        .filter(value => !isNaN(value))
        .map(Number)
        .sort((a, b) => b - a)
    console.log('\n', 'Sorted numbers (descending):', sortedNumbers, '\n');
}

function sortWordsByLength(values) {
    const sortedWords = values
        .filter(value => isNaN(value))
        .sort((a, b) => a.length - b.length)
    console.log('\n', 'Sorted by word length:', sortedWords, '\n');
}

function getUniqueWords(values) {
    const uniqueWords = [...new Set(values.filter(value => isNaN(value)))];
    console.log('\n', 'Unique words:', uniqueWords, '\n');
}

function getUniqueValues(values) {
    const uniqueValues = [...new Set(values)];
    console.log('\n', 'Unique values:', uniqueValues, '\n');
}

module.exports = sortUtils;