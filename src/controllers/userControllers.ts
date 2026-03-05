import type { Request, Response } from "express";
import User from "../models/User";
import { Group } from "../models/associations";


export const getAllUsers = async (req: Request, res: Response) => {
    try {
    const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

export const getAllUsersFetchGroup = async (where: any) => {
    try {
    const users = await User.findAll({ 
      where,
      include: [{ model: Group, as: 'group' }]
    });
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
