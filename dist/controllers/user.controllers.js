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
exports.viewProducts = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_models_1 = __importDefault(require("../models/user.models"));
const product_models_1 = __importDefault(require("../models/product.models"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = new user_models_1.default({ name, email, password: hashedPassword });
    yield user.save();
    res.status(201).json({ message: "User registered" });
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_models_1.default.findOne({ email });
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token }); // Ensure a response is returned
});
exports.loginUser = loginUser;
const viewProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_models_1.default.find();
    res.json(products);
});
exports.viewProducts = viewProducts;
