import express from 'express';
const router = express.Router();
import { authUser } from '../../controllers/user.controller.js';

// @route    POST POST /api/users/login
router.post('/login', authUser);

export default router;
