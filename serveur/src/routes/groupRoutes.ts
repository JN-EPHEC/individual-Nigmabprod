import { Router } from 'express';
import * as groupController from '../controllers/groupControllers.js';

const router = Router();

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Récupère la liste des groupes
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: Succès
 *   post:
 *     summary: Crée un groupe
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Groupe créé
 *       400:
 *         description: Champ manquant
 */
router.get('/api/groups', groupController.getGroups);
router.post('/api/groups', groupController.createGroup);

export default router;
