import jwt from 'jsonwebtoken';

interface Payload {
    email: string;
    code?: number;
}

class AuthService {
    generateAccessToken(data: Payload): string {
        const payload = {
            email: data.email
        };

        return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: process.env.ACCESS_TOKEN_TTL });
    }

    generateRefreshToken(data: Payload): string {
        const payload = {
            email: data.email,
            code: data.code
        };

        return jwt.sign(payload, process.env.JWT_SECRET!);
    }
}

export const authService = new AuthService();
