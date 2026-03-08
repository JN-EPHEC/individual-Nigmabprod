import { Router } from 'express';
import * as userController from '../controllers/userControllers.js';
import { checkIdParam } from '../middlewares/checkIdParam.js';

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
router.get('/api/users/:id', checkIdParam, userController.getUserById);
router.post('/api/users', userController.createUser);
router.put('/api/users/:id', checkIdParam, userController.updateUser);
router.delete('/api/users/:id', checkIdParam, userController.deleteUser);

export default router;
