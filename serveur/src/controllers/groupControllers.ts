import type { Request, Response, NextFunction } from "express";
import Group from "../models/Group.js";

export const getGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await Group.findAll();
        res.json(groups);
    } catch (error) {
        next(error);
    }
};

export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const group = await Group.create({ name });
        res.status(201).json(group);
    } catch (error) {
        next(error);
    }
};
