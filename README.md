# Flipkart Clone - Full Stack E-Commerce Web App

A high-performance e-commerce platform inspired by Flipkart, built using the **MERN (MongoDB, Express, React, Node.js)** stack with **MySQL** as the relational database. This project features a robust product search system, category filtering, user authentication, and a complete checkout workflow.

## 🚀 Features

* **Responsive UI:** Clean and interactive user interface built with React and Tailwind CSS.
* **Product Management:** Dynamic product listing with search and category-based filtering.
* **User Authentication:** Secure Signup and Login functionality using `bcrypt` for password hashing.
* **Cart System:** Fully functional shopping cart powered by Redux for state management.
* **Order Workflow:** Transactional order placement with persistent storage in MySQL.
* **Order History:** Users can track their past orders and purchase details.

## 🛠️ Tech Stack

**Frontend:**
* React.js
* Redux (State Management)
* Tailwind CSS (Styling)
* React Router (Navigation)

**Backend:**
* Node.js & Express.js
* MySQL (Relational Database)
* `mysql2` (Promise-based database driver)
* `bcrypt` (Secure Password Encryption)
* CORS (Cross-Origin Resource Sharing)

## 📁 Project Structure

```text
.
├── backend/            # Express server & API routes
│   ├── server.js       # Main entry point
│   └── package.json    # Backend dependencies
├── frontend/           # React application
│   ├── src/            # Components, Hooks, and Redux store
│   ├── public/         # Static assets
│   └── package.json    # Frontend dependencies
├── Untitled.sql        # Database schema and seed data
└── README.md

```

