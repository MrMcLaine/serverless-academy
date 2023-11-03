import pool from '../db';
import bcrypt from 'bcrypt';

const register = async (userData: { email: string; password: string }) => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query('SELECT * FROM users WHERE email = $1', [userData.email]);
        if (rows.length) {
            return { success: false, message: 'User already exists.' };
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = await client.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
            [userData.email, hashedPassword]
        );

        return { success: true, data: newUser.rows[0] };
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
};

const login = async (userData: { email: string; password: string }) => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query('SELECT * FROM users WHERE email = $1', [userData.email]);
        const user = rows[0];

        if (!user) {
            return { success: false, message: 'User does not exist.' };
        }

        const isValid = await bcrypt.compare(userData.password, user.password);
        if (!isValid) {
            return { success: false, message: 'Invalid password.' };
        }

        return { success: true, data: { id: user.id, email: user.email } };
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
};

export default {
    register,
    login
};
