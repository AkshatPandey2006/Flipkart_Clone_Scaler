const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
});

// --- API ROUTES ---

// 1. Get Products (with Search and Category filters)
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

// 2. Signup
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
        res.status(500).json({ error: "User already exists or database error" });
    }
});

// 3. Login
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
        res.status(401).json({ error: "Invalid email or password" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Place Order (Transaction based)
app.post('/api/orders', async (req, res) => {
    const { total, name, address, userId, items } = req.body;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Save main order
        const [orderResult] = await connection.query(
            'INSERT INTO orders (total, name, address, user_id) VALUES (?, ?, ?, ?)', 
            [total, name, address, userId || null]
        );
        const orderId = orderResult.insertId;

        // Save order items
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
        
        // Group results by Order ID
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

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});