# Multi-Vendor E-Commerce Backend

A robust and scalable backend system for a multi-vendor e-commerce platform, built as a skill assessment. This project features a complete API with Role-Based Access Control (RBAC), authentication, and full CRUD functionalities for managing vendors, products, and users.

---

## ✨ Key Features

* **Authentication:** Secure user authentication using JSON Web Tokens (JWT).
* **Role-Based Access Control (RBAC):** Granular permission system for three distinct roles: `admin`, `manager` (vendor owner), and `user` (vendor staff).
* **Automatic Database Seeding:** The server automatically populates the database with initial users on the first run if they don't exist.
* **Full CRUD Functionality:** Complete Create, Read, Update, and Delete operations for all major entities.
* **Modular Architecture:** Clean, module-based 3-layer architecture (controller, service, model) for better organization and scalability.
* **Advanced Querying:** Includes features like searching, filtering, sorting, and pagination for list-based endpoints.
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

প্রজেক্টটি আপনার লোকাল মেশিনে চালানোর জন্য নিচের ধাপগুলো অনুসরণ করুন।

### Prerequisites

* [Node.js](https://nodejs.org/en) (v18 or higher)
* [npm](https://www.npmjs.com/)
* [MongoDB](https://www.mongodb.com/try/download/community) (local installation or an Atlas account)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd multi-vendor-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    * প্রজেক্টের রুট ডিরেক্টরিতে `.env` নামে একটি ফাইল তৈরি করুন।
    * `.env.example` ফাইল থেকে সব ভ্যারিয়েবল কপি করে আপনার নিজের তথ্য দিয়ে `.env` ফাইলটি পূরণ করুন।

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    সার্ভারটি চালু হওয়ার সাথে সাথেই ডাটাবেসের সাথে কানেক্ট হবে এবং ডাটাবেস খালি থাকলে **স্বয়ংক্রিয়ভাবে** প্রাথমিক ডেটা (সিড) তৈরি করে নেবে।

---

## ⚙️ Environment Variables

প্রজেক্টটি চালানোর জন্য, আপনার `.env` ফাইলে নিচের ভ্যারিয়েবলগুলো যোগ করতে হবে:

```env
# Port
PORT=5000

# Database
DATABASE_URL=mongodb://localhost:2717/multi-vendor-db

# JWT Secrets
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_ACCESS_EXPIRATION_TIME=1d

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

* `npm run dev`: ডেভেলপমেন্ট মোডে সার্ভার চালু করে (hot-reloading সহ)।
* `npm run start`: কম্পাইল করা JavaScript ফাইল থেকে সার্ভার চালু করে।
* `npm run build`: TypeScript কোডকে JavaScript-এ কম্পাইল করে।
* `npm run lint`: ESLint ব্যবহার করে কোডবেস পরীক্ষা করে।

---

## 🔐 API Endpoints

প্রজেক্টের প্রধান API এন্ডপয়েন্টগুলো নিচে দেওয়া হলো:

| Endpoint                          | Method | Description                                | Required Role(s)      |
| --------------------------------- | :----: | ------------------------------------------ | --------------------- |
| `/api/v1/auth/login`              | `POST` | User login to get JWT token.               | Public                |
| `/api/v1/products`                | `GET`  | Get a list of products (with query).       | `admin`, `manager`, `user` |
| `/api/v1/products`                | `POST` | Create a new product.                      | `admin`, `manager`, `user` |
| `/api/v1/products/:id`            | `PATCH`| Update a product.                          | `admin`, `manager`, `user` |
| `/api/v1/products/:id`            | `DELETE`| Delete a product.                          | `admin`, `manager`, `user` |
| `/api/v1/vendors`                 | `GET`  | Get a list of all vendors.                 | `admin`               |
| `/api/v1/vendors`                 | `POST` | Create a new vendor.                       | `admin`               |
| `/api/v1/vendors/:id`             | `PATCH`| Update a vendor (status or profile).       | `admin`, `manager`      |
| `/api/v1/users/:userId/assign-manager` | `PATCH`| Assign manager role to a user.             | `admin`               |

---

## 👤 Author

* **Name:** Saidul Islam Rana (আপনার নাম দিন)
* **GitHub:** [@codewithsaidul](https://github.com/codewithsaidul) (আপনার GitHub প্রোফাইল লিঙ্ক দিন)
* **LinkedIn:** [@codewithsaidul](https://linkedin.com/in/codewithsaidul) (আপনার LinkedIn প্রোফাইল লিঙ্ক দিন)