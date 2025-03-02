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
exports.listProducts = exports.addProduct = exports.adminLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_models_1 = __importDefault(require("../models/user.models"));
const product_models_1 = __importDefault(require("../models/product.models"));
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const admin = yield user_models_1.default.findOne({ email, role: "admin" });
    if (!admin || !(yield bcryptjs_1.default.compare(password, admin.password))) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
});
exports.adminLogin = adminLogin;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new product_models_1.default(req.body);
    yield product.save();
    res.status(201).json(product);
});
exports.addProduct = addProduct;
const listProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_models_1.default.find();
    res.json(products);
});
exports.listProducts = listProducts;
