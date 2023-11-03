import { Request, Response, NextFunction } from 'express';
import { authService } from "../services/AuthService";

declare global {
    namespace Express {
        interface Request {
            user?: { email: string };
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).send({ success: false, message: 'No token provided.' });
    }

    const payload = authService.verifyAccessToken(token);
    if (!payload) {
        return res.status(403).send({ success: false, message: 'Invalid or expired token.' });
    }

    req.user = { email: payload.email };
    next();
};

export default authMiddleware;
