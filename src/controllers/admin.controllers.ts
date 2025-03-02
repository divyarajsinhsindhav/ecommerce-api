import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.models";
import Product from "../models/product.models";

/**
 * Admin Login
 */
export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const admin = await User.findOne({ email, role: "admin" });

        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            const error = new Error("Invalid credentials");
            (error as any).statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

        res.json({ success: true, token });
    } catch (error) {
        next(error);
    }
};

/**
 * Add Product
 */
export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ success: true, product });
    } catch (error) {
        next(error);
    }
};

/**
 * List Products
 */
export const listProducts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find();
        res.json({ success: true, products });
    } catch (error) {
        next(error);
    }
};

/**
 * Update Product
 */
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;

        const product = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }

        res.json({ success: true, product });
    } catch (error) {
        next(error);
    }
};


/**
 * Delete Product
 */
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        if (!product) {
            const error = new Error("Product not found");
            (error as any).statusCode = 404;
            throw error;
        }
        res.json({ success: true, product });
    } catch (error) {
        next(error);
    }
};
