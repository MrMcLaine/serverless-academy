function getUniqueNames(mapWithNames) {
    const uniqueNames = new Set(mapWithNames.keys());

    return uniqueNames.size;
}

function getAllNamesFromSelectedFiles(mapWithNames, numberFileCount) {
    let count = 0;

    mapWithNames.forEach(value => {
        if (value >= numberFileCount) count++;
    });

    return count;
}

export { getUniqueNames, getAllNamesFromSelectedFiles };