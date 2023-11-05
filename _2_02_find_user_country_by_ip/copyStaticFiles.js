const fs = require('fs-extra');

const sourceDir = './src/data';
const destDir = './dist/data';

fs.copy(sourceDir, destDir, function (err) {
    if (err){
        console.error('Помилка під час копіювання файлів:', err);
    } else {
        console.log('Файли було успішно скопійовано.');
    }
});