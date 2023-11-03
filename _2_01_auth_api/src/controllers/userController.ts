import { Request, Response } from 'express';
import UserService from '../services/userService';

const register = async (req: Request, res: Response) => {
    console.log('Start register');
    const result = await UserService.register(req.body);
    res.status(201).send(result);
};

const login = async (req: Request, res: Response) => {
    const result = await UserService.login(req.body);
    res.status(200).send(result);
};

export default {
    register,
    login
};
