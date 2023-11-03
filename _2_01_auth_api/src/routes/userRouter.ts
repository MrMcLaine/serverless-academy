import { Router } from 'express';
import userController from "../controllers/userController";

const router = Router();

router.post('/sign-up', userController.register);
router.post('/sign-in', userController.login);

export default router;