import type { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import Group from "../models/Group.js";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { groupId } = req.query;
        const where = groupId ? { groupId } : {};
        const users = await User.findAll({ where, include: [{ model: Group, as: 'group' }] });
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nom, prenom, groupId } = req.body;
        if (!nom || !prenom) {
            return res.status(400).json({ error: 'Nom and prenom are required' });
        }
        const groupIdValue = groupId && groupId !== '' ? parseInt(groupId) : null;
        const user = await User.create({ nom, prenom, groupId: groupIdValue });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
};
