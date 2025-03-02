"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controllers_1 = require("../controllers/admin.controllers");
const user_controllers_1 = require("../controllers/user.controllers");
const order_controllers_1 = require("../controllers/order.controllers");
const report_controllers_1 = require("../controllers/report.controllers");
const category_controllers_1 = require("../controllers/category.controllers");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
//Admin Routes
router.post("/admin/login", admin_controllers_1.adminLogin);
router.post("/admin/products", (0, auth_1.default)("admin"), admin_controllers_1.addProduct);
router.get("/admin/products", (0, auth_1.default)("admin"), admin_controllers_1.listProducts);
router.get("/admin/all", (0, auth_1.default)("admin"), order_controllers_1.getAllOrders);
router.patch("/admin/order/:orderId/status", (0, auth_1.default)("admin"), order_controllers_1.updateOrderStatus);
router.post("/admin/category", (0, auth_1.default)("admin"), category_controllers_1.createCategory);
router.put("/admin/category/:categoryId", (0, auth_1.default)("admin"), category_controllers_1.updateCategory);
router.delete("/admin/category/:categoryId", (0, auth_1.default)("admin"), category_controllers_1.deleteCategory);
router.get("/admin/sales/category-wise", (0, auth_1.default)("admin"), report_controllers_1.getSalesByCategory);
router.get("/admin/sales/top-products", (0, auth_1.default)("admin"), report_controllers_1.getTopSellingProducts);
router.get("/admin/sales/worst-products", (0, auth_1.default)("admin"), report_controllers_1.getWorstSellingProducts);
//User Routes
router.post("/register", user_controllers_1.registerUser);
router.post("/login", user_controllers_1.loginUser);
router.get("/products", user_controllers_1.viewProducts);
router.post("/order", (0, auth_1.default)("user"), order_controllers_1.placeOrder);
router.get("/order", (0, auth_1.default)("user"), order_controllers_1.getUserOrders);
router.get("/category", category_controllers_1.getCategories);
router.get("category/:categoryId", category_controllers_1.getCategoryById);
exports.default = router;
