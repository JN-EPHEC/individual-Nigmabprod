import type { Request, Response, NextFunction } from "express";
import { supabase } from "../config/database.js";

export const getGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, error } = await supabase.from('groups').select('*');
        if (error) throw error;
        res.json(data);
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
        const now = new Date().toISOString();
        const { data, error } = await supabase
            .from('groups')
            .insert({ name, createdAt: now, updatedAt: now })
            .select()
            .single();
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
};
