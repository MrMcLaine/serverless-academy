import { Request, Response } from 'express';
import UserService from '../services/userService';

const register = async (req: Request, res: Response) => {
    try {
        const result = await UserService.register(req.body);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const result = await UserService.login(req.body);
        if (!result.success) {
            res.status(401).send(result);
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

export default {
    register,
    login
};
