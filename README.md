অবশ্যই। আপনার সম্পূর্ণ `README.md` ফাইলটিকে ইংরেজিতে এবং এমনভাবে দিচ্ছি, যাতে এটি আপনার নিজের লেখা মনে হয় এবং আপনার কাজের গভীরতা ও চিন্তাভাবনাকে তুলে ধরে।

এখানে আমি একটি নতুন সেকশন **"💡 Architectural Decisions"** যোগ করেছি, যেখানে আপনার নেওয়া কিছু গুরুত্বপূর্ণ সিদ্ধান্তের ব্যাখ্যা দেওয়া হয়েছে। এটা আপনার কাজকে আরও বেশি প্রফেশনাল হিসেবে উপস্থাপন করবে।

-----

### \#\# চূড়ান্ত README.md (Fully English & Professional)

এই সম্পূর্ণ টেক্সটটি কপি করে আপনার `README.md` ফাইলে পেস্ট করে দিন।

````markdown
# Multi-Vendor E-Commerce Backend

A robust and scalable backend system for a multi-vendor e-commerce platform, built as a 24-hour skill assessment. This project features a complete API with a granular Role-Based Access Control (RBAC) system, secure JWT authentication, and full CRUD functionalities for the core entities.

---

## 💡 Architectural Decisions

Given the 24-hour time constraint, I prioritized building a solid and scalable foundation over adding extensive features. My key architectural decisions were:

* **Modular, 3-Layer Architecture:** I structured the application into modules (`auth`, `user`, `vendor`, `product`), with each module following a 3-layer pattern (route, controller, service). This approach keeps the codebase clean, organized, and easy to maintain or scale in the future.
* **Centralized Logic:** Core functionalities like authentication (`checkAuth`), role-checking (`RBAC`), and validation are handled through reusable middleware to keep the code DRY and consistent.
* **Automatic Seeding:** To ensure a smooth setup process for the evaluator, I implemented an automatic database seeding function that runs on server startup. It populates the database with the required demo users and data only if the database is empty.

---

## ✨ Key Features

* **Authentication:** Secure user authentication using JSON Web Tokens (JWT).
* **Role-Based Access Control (RBAC):** Granular permission system for three distinct roles: `admin`, `manager` (vendor owner), and `user` (vendor staff).
* **Automatic Database Seeding:** The server automatically populates the database with initial users on the first run.
* **Full CRUD Functionality:** Complete Create, Read, Update, and Delete operations for all major entities.
* **Advanced Querying:** Includes features like searching and pagination for list-based endpoints.
* **Validation:** Robust request data validation using Zod.
* **Centralized Error Handling:** A global error handler for consistent and predictable error responses.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Language:** TypeScript
* **Database:** MongoDB with Mongoose ODM
* **Authentication:** `jsonwebtoken`, `bcrypt`
* **Validation:** `zod`
* **Dev Tools:** `eslint`, `prettier`, `ts-node-dev`

---

## 🚀 Getting Started

Follow these steps to get the development environment running locally.

### Prerequisites

* [Node.js](https://nodejs.org/en) (v18 or higher)
* [npm](https://www.npmjs.com/)
* [MongoDB](https://www.mongodb.com/try/download/community) (local installation or an Atlas account)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/codewithsaidul/multi-vendor-backend](https://github.com/codewithsaidul/multi-vendor-backend)
    cd multi-vendor-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    * Create a `.env` file in the root directory of the project.
    * Copy the variables from the `.env.example` file and provide your own values.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The server will start, connect to the database, and automatically seed it with initial data if it's empty.

---

## ⚙️ Environment Variables

The following variables are required to run the application. Copy this into your `.env` file.

```env
# Port
PORT=5000

# Database
DATABASE_URL=mongodb://localhost:2717/multi-vendor-db

# JWT Secrets
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_ACCESS_EXPIRATION_TIME=3d

# Seed User Credentials (for automatic seeding)
ADMIN_EMAIL=admin@demo.com
ADMIN_PASSWORD=Admin@123

MANAGER_EMAIL=manager@demo.com
MANAGER_PASSWORD=Manager@123

USER_EMAIL=user@demo.com
USER_PASSWORD=User@123
```

---

## 📜 Available Scripts

* `npm run dev`: Starts the server in development mode with hot-reloading using `ts-node-dev`.
* `npm run start`: Starts the production server from the compiled JavaScript files.
* `npm run build`: Compiles the TypeScript code to JavaScript.
* `npm run lint`: Lints the codebase using ESLint.

---

## 🔐 API Endpoints

The primary API endpoints for this project are listed below:

| Endpoint                               | Method  | Description                              | Required Role(s)         |
| -------------------------------------- | :-----: | ---------------------------------------- | ------------------------ |
| `/api/v1/auth/login`                   | `POST`  | User login to get JWT token.             | Public                   |
| `/api/v1/products`                     |  `GET`  | Get a list of products (with query).     | `admin`, `manager`, `user` |
| `/api/v1/products`                     | `POST`  | Create a new product.                    | `admin`, `manager`, `user` |
| `/api/v1/products/:id`                 | `PATCH` | Update a product.                        | `admin`, `manager`, `user` |
| `/api/v1/products/:id`                 | `DELETE`| Delete a product.                        | `admin`, `manager`, `user` |
| `/api/v1/vendors`                      |  `GET`  | Get a list of all vendors.               | `admin`                  |
| `/api/v1/vendors`                      | `POST`  | Create a new vendor.                     | `admin`                  |
| `/api/v1/vendors/:id`                  | `PATCH` | Update a vendor (status or profile).     | `admin`, `manager`       |
| `/api/v1/users/:userId/assign-manager` | `PATCH` | Assign manager role to a user.           | `admin`                  |

---

## 👤 Author

* **Name:** Saidul Islam Rana
* **GitHub:** [@codewithsaidul](https://github.com/codewithsaidul)
* **LinkedIn:** [@codewithsaidul](https://linkedin.com/in/codewithsaidul)

````