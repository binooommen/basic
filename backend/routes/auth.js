import express from 'express';
import { register, login, updateName, updatePassword } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/user/name', authenticateToken, updateName);
router.put('/user/password', authenticateToken, updatePassword);

export default router;
