import path from 'path';
import fs from 'fs';

function fileReaderToMap(basePath) {
    let contentMap = new Map();

    const files = fs.readdirSync(basePath);

    files.forEach(file => {
        const filePath = path.join(basePath, file);

        if (fs.statSync(filePath).isFile()) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const namesInFile = new Set(fileContent.split('\n'));

            namesInFile.forEach(name => {
                contentMap.set(name, (contentMap.get(name) || 0) + 1);
            });
        }
    });

    return contentMap;
}

export default fileReaderToMap;