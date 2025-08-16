import express from 'express';
import {
  register,
  login,
  getUsers,
  updateUserController,   // 👈 corregido
  deleteUserController    // 👈 corregido
} from '../controllers/userController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', verifyToken, getUsers);
router.put('/:id', verifyToken, updateUserController);  // 👈 corregido
router.delete('/:id', verifyToken, deleteUserController); // 👈 corregido

export default router;