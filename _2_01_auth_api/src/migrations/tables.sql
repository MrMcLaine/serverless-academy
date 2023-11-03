CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE
    usersToken (
        token_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        token VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );