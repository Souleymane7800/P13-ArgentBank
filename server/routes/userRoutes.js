import express from 'express';
import * as userController from '../controllers/userController.js';
import validateToken from '../middleware/tokenValidation.js';

const router = express.Router();

router.post('/signup', userController.createUser)

router.post('/login', userController.loginUser)

router.post(
  '/profile',
  validateToken,
  userController.getUserProfile
)

router.put(
  '/profile',
  validateToken,
  userController.updateUserProfile
)

export default router;