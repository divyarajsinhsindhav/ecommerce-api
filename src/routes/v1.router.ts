import express from "express";
import { adminLogin, addProduct, listProducts, updateProduct, deleteProduct } from "../controllers/admin.controllers";
import { registerUser, loginUser, viewProducts, viewProduct } from "../controllers/user.controllers";
import { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/order.controllers";
import { getSalesByCategory, getTopSellingProducts, getWorstSellingProducts } from "../controllers/report.controllers";
import { 
    createCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} from "../controllers/category.controllers";
import authMiddleware from "../middleware/auth";

const router = express.Router();

//Admin Routes
router.post("/admin/login", adminLogin);
router.post("/admin/products", authMiddleware(["admin"]), addProduct);
router.get("/admin/products", authMiddleware(["admin"]), listProducts);
router.patch("/admin/products/:productId", authMiddleware(["admin"]), updateProduct);
router.delete("/admin/products/:productId", authMiddleware(["admin"]), deleteProduct);
router.get("/admin/order", authMiddleware(["admin"]), getAllOrders);
router.patch("/admin/order/:orderId/status", authMiddleware(["admin"]), updateOrderStatus);
router.post("/admin/category", authMiddleware(["admin"]), createCategory);
router.put("/admin/category/:categoryId", authMiddleware(["admin"]), updateCategory);
router.delete("/admin/category/:categoryId", authMiddleware(["admin"]), deleteCategory);
router.get("/admin/sales/category-wise", authMiddleware(["admin"]), getSalesByCategory);
router.get("/admin/sales/top-products", authMiddleware(["admin"]), getTopSellingProducts);
router.get("/admin/sales/worst-products", authMiddleware(["admin"]), getWorstSellingProducts);


//User Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/products", viewProducts);
router.get("/product/:productId", viewProduct);
router.post("/order", authMiddleware(["user"]), placeOrder);
router.get("/order", authMiddleware(["user"]), getUserOrders);
router.get("/category", getCategories);
router.get("category/:categoryId", getCategoryById);

export default router;
