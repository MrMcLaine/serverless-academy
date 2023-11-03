import pool from '../db';
import { comparePassword, hashPassword } from "../utils/hashUtils";
import { SQL_QUERIES } from "../constants";


const register = async (userData: { email: string; password: string }) => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query(SQL_QUERIES.FIND_USER_BY_EMAIL, [userData.email]);
        if (rows.length) {
            return { success: false, message: 'User already exists.' };
        }

        const hashedPassword = await hashPassword(userData.password);

        const newUser = await client.query(SQL_QUERIES.INSERT_NEW_USER, [userData.email, hashedPassword]);

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
        const { rows } = await client.query(SQL_QUERIES.FIND_USER_BY_EMAIL, [userData.email]);
        const user = rows[0];

        if (!user) {
            return { success: false, message: 'User does not exist.' };
        }

        const isValid = await comparePassword(userData.password, user.password);
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
