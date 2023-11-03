import { Router } from 'express';
import userController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post('/auth/sign-up', userController.register);
router.post('/auth/sign-in', userController.login);
router.get('/me', authMiddleware, userController.getCurrentUser);

export default router;