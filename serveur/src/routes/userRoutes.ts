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
 *     parameters:
 *       - in: query
 *         name: groupId
 *         schema:
 *           type: integer
 *         description: Filtrer par groupe
 *     responses:
 *       200:
 *         description: Succès
 *   post:
 *     summary: Crée un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nom, prenom]
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               groupId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Champs manquants
 *
 * /api/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Utilisateur introuvable
 *   put:
 *     summary: Met à jour un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               groupId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Utilisateur introuvable
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Supprimé
 *       404:
 *         description: Utilisateur introuvable
 */
router.get('/api/users', userController.getUsers);
router.get('/api/users/:id', checkIdParam, userController.getUserById);
router.post('/api/users', userController.createUser);
router.put('/api/users/:id', checkIdParam, userController.updateUser);
router.delete('/api/users/:id', checkIdParam, userController.deleteUser);

export default router;
