const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Database Connection Pool
// Railway provides these MYSQL variables automatically when you link the DB
const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
=======
// LOCAL DATABASE CONFIGURATION
// Ensure your local MySQL Workbench is running and password matches
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Akshat@2006', // <--- Update this to your local MySQL password
    database: 'flipkart_clone'
>>>>>>> 7a2aca8 (Initial local backup after reverting from cloud)
});

// --- API ROUTES ---

<<<<<<< HEAD
// 1. Get Products (with Search and Category filters)
=======
// 1. Get Products (Search & Category)
>>>>>>> 7a2aca8 (Initial local backup after reverting from cloud)
app.get('/api/products', async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = 'SELECT * FROM products WHERE 1=1';
        let params = [];

        if (search && search.trim() !== '') {
            query += ' AND title LIKE ?';
            params.push(`%${search}%`);
        }
        if (category && category.trim() !== '') {
            query += ' AND category = ?';
            params.push(category);
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

<<<<<<< HEAD
// 2. Signup
=======
// 2. User Signup
>>>>>>> 7a2aca8 (Initial local backup after reverting from cloud)
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
            [name, email, hashedPassword]
        );
        res.json({ success: true, user: { id: result.insertId, name, email } });
    } catch (err) {
<<<<<<< HEAD
        res.status(500).json({ error: "User already exists or database error" });
    }
});

// 3. Login
=======
        res.status(500).json({ error: "User already exists" });
    }
});

// 3. User Login
>>>>>>> 7a2aca8 (Initial local backup after reverting from cloud)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length > 0) {
            const match = await bcrypt.compare(password, users[0].password);
            if (match) {
                return res.json({ 
                    success: true, 
                    user: { id: users[0].id, name: users[0].name, email: users[0].email } 
                });
            }
        }
<<<<<<< HEAD
        res.status(401).json({ error: "Invalid email or password" });
=======
        res.status(401).json({ error: "Invalid credentials" });
>>>>>>> 7a2aca8 (Initial local backup after reverting from cloud)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

<<<<<<< HEAD
// 4. Place Order (Transaction based)
=======
// 4. Place Order
>>>>>>> 7a2aca8 (Initial local backup after reverting from cloud)
app.post('/api/orders', async (req, res) => {
    const { total, name, address, userId, items } = req.body;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

<<<<<<< HEAD
        // Save main order
=======
>>>>>>> 7a2aca8 (Initial local backup after reverting from cloud)
        const [orderResult] = await connection.query(
            'INSERT INTO orders (total, name, address, user_id) VALUES (?, ?, ?, ?)', 
            [total, name, address, userId || null]
        );
        const orderId = orderResult.insertId;

<<<<<<< HEAD
        // Save order items
=======
>>>>>>> 7a2aca8 (Initial local backup after reverting from cloud)
        for (const item of items) {
            await connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)',
                [orderId, item.id, item.quantity, item.price]
            );
        }

        await connection.commit();
        res.json({ success: true, orderId });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
});

// 5. Get Order History
app.get('/api/orders/:userId', async (req, res) => {
    try {
        const query = `
            SELECT o.id as order_id, o.total, o.created_at, 
                   oi.quantity, oi.price_at_purchase,
                   p.title, p.image_url
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = ?
            ORDER BY o.created_at DESC
        `;
        const [rows] = await pool.query(query, [req.params.userId]);
        
<<<<<<< HEAD
        // Group results by Order ID
=======
>>>>>>> 7a2aca8 (Initial local backup after reverting from cloud)
        const grouped = rows.reduce((acc, row) => {
            if (!acc[row.order_id]) {
                acc[row.order_id] = { 
                    id: row.order_id, 
                    total: row.total, 
                    date: row.created_at, 
                    items: [] 
                };
            }
            acc[row.order_id].items.push(row);
            return acc;
        }, {});

        res.json(Object.values(grouped));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

<<<<<<< HEAD
// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
=======
// Local Port
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
>>>>>>> 7a2aca8 (Initial local backup after reverting from cloud)
});