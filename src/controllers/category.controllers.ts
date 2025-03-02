import { Request, Response, NextFunction } from "express";
import Category from "../models/category.models";

/**
 * Create a new Category
 */
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description } = req.body;

        // Check if the category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            const error = new Error("Category already exists");
            (error as any).statusCode = 400;
            throw error;
        }

        const newCategory = new Category({ name, description });
        await newCategory.save();

        res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error) {
        next(error);
    }
};

/**
 * Get all Categories
 */
export const getCategories = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

/**
 * Get a Category by ID
 */
export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);

        if (!category) {
            const error = new Error("Category not found");
            (error as any).statusCode = 404;
            throw error;
        }

        res.json(category);
    } catch (error) {
        next(error);
    }
};

/**
 * Update a Category
 */
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;
        const { name, description } = req.body;

        const category = await Category.findByIdAndUpdate(categoryId, { name, description }, { new: true });

        if (!category) {
            const error = new Error("Category not found");
            (error as any).statusCode = 404;
            throw error;
        }

        res.json({ message: "Category updated successfully", category });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a Category
 */
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            const error = new Error("Category not found");
            (error as any).statusCode = 404;
            throw error;
        }

        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        next(error);
    }
};
