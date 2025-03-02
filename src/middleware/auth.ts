import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

interface DecodedToken {
    id: string | mongoose.Types.ObjectId;
    role: string;
}

const authMiddleware = (roles: ("admin" | "user")[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            res.status(401).json({ error: "Unauthorized: No token provided" });
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

            if (!roles.includes(decoded.role as "admin" | "user")) {
                res.status(403).json({ error: "Forbidden: Insufficient permissions" });
                return;
            }

            (req as any).user = { id: decoded.id, role: decoded.role };
            next(); 
        } catch (error) {
            res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
    };
};

export default authMiddleware;
