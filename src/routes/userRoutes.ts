import { Router } from 'express';
import * as userController from '../controllers/userControllers.js';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Succès
 */
router.get('/api/users', userController.getUsers);
router.post('/api/users', userController.createUser);
router.delete('/api/users/:id', userController.deleteUser);

export default router;
