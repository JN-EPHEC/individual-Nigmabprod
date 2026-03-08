import type { Request, Response, NextFunction } from "express";

export const checkIdParam = (req : Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        res.status(400).json({message: "id invalide"})
        return;
    }
    next()
}