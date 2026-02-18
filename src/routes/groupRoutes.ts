import { Router } from 'express';
import Group from '../models/Group.js';

const router = Router();

router.get('/api/groups', async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
});

router.post('/api/groups', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const group = await Group.create({ name });
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group' });
  }
});

export default router;
