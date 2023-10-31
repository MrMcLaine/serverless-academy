export function formatter(data) {
    let users = {};

    for (let entry of data) {
        const { _id: userId, name: userName } = entry.user;
        const { startDate, endDate } = entry;

        users[userId] = users[userId] || { userId, userName, vacations: [] };
        users[userId].vacations.push({ startDate, endDate });
    }

    return Object.values(users);
}