import express from 'express';
const router = express.Router();
import { authUser, getUserProfile } from '../../controllers/user.controller.js';
import { authMiddleware } from '../../lib/utils.js';

// @route    POST POST /api/users/login
router.post('/login', authUser);
// @route    POST POST /api/users/login
router.get('/profile',authMiddleware, getUserProfile);

export default router;
