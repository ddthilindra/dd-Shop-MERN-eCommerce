import express from 'express';
const router = express.Router();
import { authUser, delteUser, getAllUsers, getUserById, getUserProfile, registerUser, updateUser, updateUserProfile } from '../../controllers/user.controller.js';
import { authMiddleware,adminAuthMiddleware } from '../../lib/utils.js';

// @route    POST /api/users/register
router.post('/', registerUser);
// @route    GET /api/users
router.get('/',authMiddleware,adminAuthMiddleware, getAllUsers);
// @route    POST /api/users/login
router.post('/login', authUser);
// @route    POST /api/users/profile
router.get('/profile',authMiddleware, getUserProfile)
// @route    PUT /api/users/profile
router.put('/profile',authMiddleware, updateUserProfile)
// @route    DELETE /api/users/:id
router.delete('/:id',authMiddleware,adminAuthMiddleware, delteUser)
// @route    GET /api/users/:id
router.get('/:id',authMiddleware,adminAuthMiddleware, getUserById)
// @route    UPDATE /api/users/:id
router.put('/:id',authMiddleware,adminAuthMiddleware, updateUser)

export default router;
