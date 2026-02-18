import { Router } from 'express';
import User from '../models/User.js';
import Group from '../models/Group.js';

const router = Router();

router.get('/api/users', async (req, res) => {
  try {
    const { groupId } = req.query;
    const where = groupId ? { groupId } : {};
    const users = await User.findAll({ 
      where,
      include: [{ model: Group, as: 'group' }]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/api/users', async (req, res) => {
  try {
    const { nom, prenom, groupId } = req.body;
    if (!nom || !prenom) {
      return res.status(400).json({ error: 'Nom and prenom are required' });
    }
    const groupIdValue = groupId && groupId !== '' ? parseInt(groupId) : null;
    const user = await User.create({ nom, prenom, groupId: groupIdValue });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
