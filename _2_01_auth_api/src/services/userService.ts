import pool from '../db';
import { comparePassword, hashPassword } from '../utils/hashUtils';
import { SQL_QUERIES } from '../constants';
import { generateRandomCode } from '../utils/generateRandomCode';
import { authService } from './AuthService';

const register = async (userData: { email: string; password: string }) => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query(SQL_QUERIES.FIND_USER_BY_EMAIL, [
            userData.email,
        ]);
        if (rows.length) {
            return { success: false, message: 'User already exists.' };
        }

        const hashedPassword = await hashPassword(userData.password);
        const refreshTokenCode = generateRandomCode(5);

        const newUser = await client.query(SQL_QUERIES.INSERT_NEW_USER, [
            userData.email,
            hashedPassword,
            refreshTokenCode,
        ]);

        if (!newUser) {
            return { success: false, message: 'Failed to create user.' };
        }

        const accessToken = authService.generateAccessToken({
            email: userData.email,
        });
        const refreshToken = authService.generateRefreshToken({
            email: userData.email,
            code: refreshTokenCode,
        });

        return {
            success: true,
            data: {
                id: newUser.rows[0].id,
                accessToken: accessToken,
                refreshToken: refreshToken,
            },
        };
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
};

const login = async (userData: { email: string; password: string }) => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query(SQL_QUERIES.FIND_USER_BY_EMAIL, [
            userData.email,
        ]);
        const user = rows[0];

        if (!user) {
            return { success: false, message: 'User does not exist.' };
        }

        const isValid = await comparePassword(userData.password, user.password);
        if (!isValid) {
            return { success: false, message: 'Invalid password.' };
        }

        const accessToken = authService.generateAccessToken({
            email: userData.email,
        });
        const refreshToken = authService.generateRefreshToken({
            email: userData.email,
            code: user.refreshTokenCode,
        });

        return {
            success: true,
            data: {
                id: user.id,
                accessToken: accessToken,
                refreshToken: refreshToken,
            },
        };
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
};

export default {
    register,
    login,
};