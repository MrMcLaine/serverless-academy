import { Request, Response } from 'express';
import UserService from '../services/userService';
import { errorHandler } from "../handlers/errorHandler";

const register = async (req: Request, res: Response) => {
    try {
        const result = await UserService.register(req.body);
        res.status(201).send(result);
    } catch (error) {
        errorHandler(res, error);
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const result = await UserService.login(req.body);
        if (!result.success) {
            res.status(404).send(result);
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        errorHandler(res, error);
    }
};

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).send({ success: false, message: 'No email provided or user not authenticated.' });
        }
        const result = await UserService.getCurrentUser(req.user.email);
        res.status(200).send(result);
    } catch (error) {
        errorHandler(res, error);
    }
}

export default {
    register,
    login,
    getCurrentUser
};
