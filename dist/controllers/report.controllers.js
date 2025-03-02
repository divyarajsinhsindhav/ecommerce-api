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
exports.getWorstSellingProducts = exports.getTopSellingProducts = exports.getSalesByCategory = void 0;
const order_models_1 = __importDefault(require("../models/order.models"));
//Get Sales Category-wise
const getSalesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield order_models_1.default.aggregate([
            { $match: { status: "Completed" } },
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
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
        return;
    }
});
exports.getSalesByCategory = getSalesByCategory;
//Get Top-Selling Products
const getTopSellingProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topProducts = yield order_models_1.default.aggregate([
            { $match: { status: "Completed" } },
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
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
        return;
    }
});
exports.getTopSellingProducts = getTopSellingProducts;
//Get Worst-Selling Products
const getWorstSellingProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const worstProducts = yield order_models_1.default.aggregate([
            { $match: { status: "Completed" } }, // Only completed orders
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
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
        return;
    }
});
exports.getWorstSellingProducts = getWorstSellingProducts;
