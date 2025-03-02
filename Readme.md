# Ecommerce API Documentation

This README provides an overview of the routes in the project. The routes serve both admin and user functionalities, including product management, order processing, and report generation.

## Technologies

- TypeScript
- Node.js
- Express.js

---

## Route Overview

### Admin Routes

| Method | Endpoint                                  | Middleware         | Controller Function               | Description                              |
| ------ | ----------------------------------------- | ------------------ | --------------------------------- | ---------------------------------------- |
| POST   | `/admin/login`                            | None               | adminLogin                        | Admin login functionality                |
| POST   | `/admin/products`                         | authMiddleware("admin")  | addProduct                   | Add a new product                        |
| GET    | `/admin/products`                         | authMiddleware("admin")  | listProducts                 | List all products                        |
| GET    | `/admin/order`                              | authMiddleware("admin")  | getAllOrders                 | Retrieve all orders                      |
| PATCH  | `/admin/order/:orderId/status`            | authMiddleware("admin")  | updateOrderStatus            | Update specific order status             |
| POST   | `/admin/category`                         | authMiddleware("admin")  | createCategory               | Create a new category                    |
| PUT    | `/admin/category/:categoryId`             | authMiddleware("admin")  | updateCategory               | Update an existing category              |
| DELETE | `/admin/category/:categoryId`             | authMiddleware("admin")  | deleteCategory               | Delete a category                        |
| GET    | `/admin/sales/category-wise`              | authMiddleware("admin")  | getSalesByCategory           | Get sales statistics by category         |
| GET    | `/admin/sales/top-products`               | authMiddleware("admin")  | getTopSellingProducts        | Get top selling products                 |
| GET    | `/admin/sales/worst-products`             | authMiddleware("admin")  | getWorstSellingProducts      | Get worst selling products               |

### User Routes

| Method | Endpoint                | Middleware         | Controller Function   | Description                              |
| ------ | ----------------------- | ------------------ | --------------------- | ---------------------------------------- |
| POST   | `/register`             | None               | registerUser          | User registration                        |
| POST   | `/login`                | None               | loginUser             | User login                               |
| GET    | `/products`             | None               | viewProducts          | View available products                  |
| POST   | `/order`                | authMiddleware("user") | placeOrder         | Place an order                          |
| GET    | `/order`                | authMiddleware("user") | getUserOrders      | Retrieve user's orders                   |
| GET    | `/category`             | None               | getCategories         | Get all product categories               |
| GET    | `/category/:categoryId` | None               | getCategoryById       | Get a specific category by its ID        |

*Note:* The route for getting a single category requires a preceding slash (`/category/:categoryId`). Verify route configuration if issues occur.

---

## Authentication Middleware

The `authMiddleware` function is utilized to protect sensitive routes. Replace `"admin"` or `"user"` within the middleware to specify the required user role needed to access the endpoint.

---

## Error Middleware

The error middleware is implemented to handle errors that occur during route processing. The middleware is automatically triggered when an error is thrown in the application.

---

## Usage

1. Ensure all controllers and middleware are properly imported and exported.
2. Import and mount these routes in your main server file.
3. Secure the API by configuring the authentication middleware as required.
4. Test the routes using Postman or a similar tool.

---

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server using `"npx nodemon --exec "ts-node src/server.ts"`.

---

## Conclusion

This documentation summarizes the routing mechanism for the API. The routes are categorized based on user roles and provide a clear overview of the functionalities available in the application. For further details, refer to the individual controller functions and middleware implementations.