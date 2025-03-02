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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const category_models_1 = __importDefault(require("../models/category.models"));
// Create a new Category
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        // Check if the category already exists
        const existingCategory = yield category_models_1.default.findOne({ name });
        if (existingCategory) {
            res.status(400).json({ message: "Category already exists" });
            return;
        }
        const newCategory = new category_models_1.default({ name, description });
        yield newCategory.save();
        res.status(201).json({ message: "Category created successfully", category: newCategory });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
        return;
    }
});
exports.createCategory = createCategory;
// Get all Categories
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_models_1.default.find();
        res.json(categories);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
        return;
    }
});
exports.getCategories = getCategories;
// Get a Category by ID
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const category = yield category_models_1.default.findById(categoryId);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.json(category);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
        return;
    }
});
exports.getCategoryById = getCategoryById;
// Update a Category
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const { name, description } = req.body;
        const category = yield category_models_1.default.findByIdAndUpdate(categoryId, { name, description }, { new: true });
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.json({ message: "Category updated successfully", category });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
        return;
    }
});
exports.updateCategory = updateCategory;
// Delete a Category
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const category = yield category_models_1.default.findByIdAndDelete(categoryId);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.json({ message: "Category deleted successfully" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
        return;
    }
});
exports.deleteCategory = deleteCategory;
