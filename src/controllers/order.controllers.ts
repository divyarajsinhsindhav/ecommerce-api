import { Request, Response, NextFunction } from "express";
import Order from "../models/order.models";
import Product from "../models/product.models";
import mongoose from "mongoose";

/**
 * Place an Order
 */
export const placeOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { products } = req.body;
        const userId = (req as any).user?.id;

        if (!userId) {
            res.status(401).json({ error: "Unauthorized: User ID missing" });
            return;
        }

        if (!products || !Array.isArray(products) || products.length === 0) {
            res.status(400).json({ error: "Invalid request: Products are required" });
            return;
        }

        console.log("Received order from user:", userId, "Products:", products);

        // Calculate total amount
        let totalAmount = 0;
        const validatedProducts = [];

        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                res.status(404).json({ error: `Product with ID ${item.productId} not found` });
                return;
            }
            totalAmount += product.price * item.quantity;
            validatedProducts.push({ productId: product._id, quantity: item.quantity });
        }

        const newOrder = new Order({
            user: new mongoose.Types.ObjectId(userId),
            products: validatedProducts,
            totalAmount,
            status: "pending",
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        next(error);
    }
};
/**
 * Get User's Orders
 */
export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const orders = await Order.find({ user: userId }).populate("products.productId");

        res.json(orders);
    } catch (error) {
        next(error);
    }
};

/**
 * Get All Orders (Admin Only)
 */
export const getAllOrders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await Order.find().populate("user").populate("products.productId");
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

/**
 * Update Order Status (Admin Only)
 */
export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
        if (!validStatuses.includes(status)) {
            const error = new Error("Invalid order status");
            (error as any).statusCode = 400;
            throw error;
        }

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            const error = new Error("Order not found");
            (error as any).statusCode = 404;
            throw error;
        }

        res.json({ message: "Order status updated", order });
    } catch (error) {
        next(error);
    }
};
