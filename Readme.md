# Ecommerce API Documentation

This README provides an overview of the routes in the project. The routes serve both admin and user functionalities, including product management, order processing, and report generation.

## Technologies

- TypeScript
- Node.js
- Express.js

---

## Route Overview

This section categorizes the API endpoints into Admin and User routes. Each endpoint is listed with the HTTP method, route path, any required middleware for authentication, the corresponding controller function that handles the request, and a brief description of its functionality. The Admin routes are primarily for managing the application’s critical data and operations, while the User routes handle both public actions and authenticated user operations.

## Admin Routes

| Method | Route                                | Middleware                  | Controller              | Description                                                                        |
|--------|--------------------------------------|-----------------------------|-------------------------|------------------------------------------------------------------------------------|
| POST   | /admin/login                         | None                        | adminLogin              | Authenticates an admin user and initiates a session.                               |
| POST   | /admin/products                      | authMiddleware(["admin"])    | addProduct              | Adds a new product; note the use of "admin" middleware indicates limited access.    |
| GET    | /admin/products                      | authMiddleware(["admin"])   | listProducts            | Retrieves a list of all products for admin overview.                               |
| PATCH  | /admin/products/:productId           | authMiddleware(["admin"])   | updateProduct           | Updates details of an existing product identified by productId.                    |
| DELETE | /admin/products/:productId           | authMiddleware(["admin"])   | deleteProduct           | Removes a product from the catalog using its productId.                            |
| GET    | /admin/order                         | authMiddleware(["admin"])   | getAllOrders            | Fetches all orders made by users for administrative review.                        |
| PATCH  | /admin/order/:orderId/status         | authMiddleware(["admin"])   | updateOrderStatus       | Updates the status of a specific order identified by orderId.                        |
| POST   | /admin/category                      | authMiddleware(["admin"])   | createCategory          | Creates a new product category for organizing the product catalog.                 |
| PUT    | /admin/category/:categoryId          | authMiddleware(["admin"])   | updateCategory          | Modifies an existing category identified by categoryId.                            |
| DELETE | /admin/category/:categoryId          | authMiddleware(["admin"])   | deleteCategory          | Deletes a product category using its categoryId.                                   |
| GET    | /admin/sales/category-wise           | authMiddleware(["admin"])   | getSalesByCategory      | Retrieves sales reports grouped by product categories.                             |
| GET    | /admin/sales/top-products            | authMiddleware(["admin"])   | getTopSellingProducts   | Retrieves a report of the top-selling products.                                    |
| GET    | /admin/sales/worst-products          | authMiddleware(["admin"])   | getWorstSellingProducts | Retrieves a report of the least performing products based on sales data.             |

## User Routes

| Method | Route                         | Middleware                  | Controller     | Description                                                                                |
|--------|-------------------------------|-----------------------------|----------------|--------------------------------------------------------------------------------------------|
| POST   | /register                     | None                        | registerUser   | Registers a new user in the system.                                                        |
| POST   | /login                        | None                        | loginUser      | Authenticates a user and initiates a user session.                                         |
| GET    | /products                     | None                        | viewProducts   | Displays a list of available products for browsing.                                        |
| GET    | /product/:productId          | None                        | viewProduct    | Shows detailed information about a specific product identified by productId.               |
| POST   | /order                        | authMiddleware(["user"])    | placeOrder     | Allows an authenticated user to place a new order.                                         |
| GET    | /order                        | authMiddleware(["user"])    | getUserOrders  | Retrieves a list of orders placed by the authenticated user.                               |
| GET    | /category                     | None                        | getCategories  | Fetches a list of all product categories available.                                        |
| GET    | /category/:categoryId         | None                        | getCategoryById| Provides detailed information about a specific category identified by categoryId.          |


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