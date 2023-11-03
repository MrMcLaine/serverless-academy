export const SQL_QUERIES = {
    FIND_USER_BY_EMAIL: 'SELECT * FROM users WHERE email = $1',
    INSERT_NEW_USER: 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
};
