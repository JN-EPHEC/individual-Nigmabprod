import { Router } from 'express';
import * as groupController from '../controllers/groupControllers.js';

const router = Router();

router.get('/api/groups', groupController.getGroups);
router.post('/api/groups', groupController.createGroup);

export default router;
