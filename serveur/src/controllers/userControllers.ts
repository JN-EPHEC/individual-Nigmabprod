import type { Request, Response, NextFunction } from "express";
import { supabase } from "../config/database.js";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { groupId } = req.query;
        let query = supabase.from('users').select('*, groups(*)');
        if (groupId) {
            query = query.eq('groupId', groupId);
        }
        const { data, error } = await query;
        if (error) throw error;
        res.json(data);
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
        const now = new Date().toISOString();
        const { data, error } = await supabase
            .from('users')
            .insert({ nom, prenom, groupId: groupIdValue, createdAt: now, updatedAt: now })
            .select()
            .single();
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const { data, error } = await supabase
            .from('users')
            .select('*, groups(*)')
            .eq('id', id)
            .single();
        if (error) {
            if (error.code === 'PGRST116') return res.status(404).json({ error: 'User not found' });
            throw error;
        }
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const { nom, prenom, groupId } = req.body;
        const { data, error } = await supabase
            .from('users')
            .update({ nom, prenom, groupId: groupId ?? null, updatedAt: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();
        if (error) {
            if (error.code === 'PGRST116') return res.status(404).json({ error: 'User not found' });
            throw error;
        }
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);
        if (error) throw error;
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
