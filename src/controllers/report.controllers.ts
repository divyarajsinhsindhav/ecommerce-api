import { Request, Response, NextFunction } from "express";
import Order from "../models/order.models";

// Get Sales Category-wise
export const getSalesByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sales = await Order.aggregate([
            { $match: { status: "delivered" } },
            { $unwind: "$products" },
            {
                $lookup: {
                    from: "products",
                    localField: "products.productId",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            { $unwind: "$productDetails" },
            {
                $lookup: {
                    from: "categories",
                    localField: "productDetails.category",
                    foreignField: "_id",
                    as: "categoryDetails",
                },
            },
            { $unwind: "$categoryDetails" },
            {
                $group: {
                    _id: "$categoryDetails.name",
                    totalSales: { $sum: "$products.quantity" },
                    totalRevenue: { $sum: { $multiply: ["$products.quantity", "$productDetails.price"] } },
                },
            },
            { $sort: { totalSales: -1 } },
        ]);

        res.json({ sales });
    } catch (error) {
        next(error);
    }
};

// Get Top-Selling Products
export const getTopSellingProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const topProducts = await Order.aggregate([
            { $match: { status: "delivered" } },
            { $unwind: "$products" },
            {
                $group: {
                    _id: "$products.productId",
                    totalSold: { $sum: "$products.quantity" },
                },
            },
            { $sort: { totalSold: -1 } },
            { $limit: 10 }, // Top 10 products
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            { $unwind: "$productDetails" },
            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    name: "$productDetails.name",
                    totalSold: 1,
                },
            },
        ]);

        res.json({ topProducts });
    } catch (error) {
        next(error);
    }
};

// Get Worst-Selling Products
export const getWorstSellingProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const worstProducts = await Order.aggregate([
            { $match: { status: "delivered" } },
            { $unwind: "$products" },
            {
                $group: {
                    _id: "$products.productId",
                    totalSold: { $sum: "$products.quantity" },
                },
            },
            { $sort: { totalSold: 1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            { $unwind: "$productDetails" },
            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    name: "$productDetails.name",
                    totalSold: 1,
                },
            },
        ]);

        res.json({ worstProducts });
    } catch (error) {
        next(error);
    }
};
