"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getAllOrders = exports.getUserOrders = exports.placeOrder = void 0;
const order_models_1 = __importDefault(require("../models/order.models"));
const product_models_1 = __importDefault(require("../models/product.models"));
// Place an Order
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products } = req.body;
        const userId = req.user._id;
        // Calculate total amount
        let totalAmount = 0;
        for (const item of products) {
            const product = yield product_models_1.default.findById(item.productId);
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            totalAmount += product.price * item.quantity;
        }
        const newOrder = new order_models_1.default({
            user: userId,
            products,
            totalAmount,
            status: "pending",
        });
        yield newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
        return;
    }
});
exports.placeOrder = placeOrder;
// Get User's Orders
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const orders = yield order_models_1.default.find({ user: userId }).populate("products.productId");
        res.json(orders);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
        return;
    }
});
exports.getUserOrders = getUserOrders;
// Get All Orders (Admin Only)
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_models_1.default.find().populate("user").populate("products.productId");
        res.json(orders);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
        return;
    }
});
exports.getAllOrders = getAllOrders;
// Update Order Status (Admin Only)
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
        if (!validStatuses.includes(status)) {
            res.status(400).json({ message: "Invalid order status" });
            return;
        }
        const order = yield order_models_1.default.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        res.json({ message: "Order status updated", order });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
        return;
    }
});
exports.updateOrderStatus = updateOrderStatus;
