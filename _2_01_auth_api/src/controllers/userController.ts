import { Request, Response } from 'express';
import UserService from '../services/userService';
import {errorHandler} from "../handlers/errorHandler";

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
            res.status(401).send(result);
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        errorHandler(res, error);
    }
};

export default {
    register,
    login
};