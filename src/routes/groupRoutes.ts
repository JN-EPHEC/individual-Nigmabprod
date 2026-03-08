import { Router } from 'express';
import * as groupController from '../controllers/groupControllers.js';

const router = Router();


/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Récupère les groups existants
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: Succès
 */
router.get('/api/groups', groupController.getGroups);
router.post('/api/groups', groupController.createGroup);

export default router;
