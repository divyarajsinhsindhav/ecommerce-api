import { Request, Response, NextFunction } from "express";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`[ERROR] ${err.message}`);

    // Default error status
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    // Send JSON response with error details
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            statusCode,
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        },
    });
};

export default errorMiddleware;
