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

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const user = await User.findByPk(id, { include: [{ model: Group, as: 'group' }] });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const { nom, prenom, groupId } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.update({ nom, prenom, groupId: groupId ?? null });
        res.json(user);
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
