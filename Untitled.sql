-- 1. Create and Use the Database
CREATE DATABASE IF NOT EXISTS flipkart_clone;
USE flipkart_clone;

-- 2. Drop existing tables to avoid conflicts (Optional, careful with data)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- 3. Create Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Products Table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    image_url TEXT,
    category VARCHAR(100),
    description TEXT,
    rating DECIMAL(3, 1) DEFAULT 4.0,
    reviews INT DEFAULT 0
);

-- 5. Create Orders Table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    total DECIMAL(10, 2) NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 6. Create Order Items Table (Linked to Orders and Products)
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 7. Insert Seed Data into Products
INSERT INTO products (title, price, original_price, image_url, category, description, rating, reviews) VALUES
('iPhone 15 (Black, 128 GB)', 65999, 79900, 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/h/d/9/-original-imagtc2qzgnn7hbv.jpeg', 'Mobiles', '128 GB ROM | 6.1 inch Super Retina XDR Display | 48MP + 12MP Camera | A16 Bionic Chip', 4.6, 1250),
('Samsung Galaxy S24 Ultra', 129999, 134999, 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/5/i/7/-original-imagx6rd69uz96jj.jpeg', 'Mobiles', '12 GB RAM | 256 GB ROM | 6.8 inch Quad HD+ Display | 200MP + 50MP + 12MP + 10MP Camera', 4.8, 850),
('MacBook Air M2', 89990, 114900, 'https://rukminim2.flixcart.com/image/312/312/xif0q/computer/2/v/v/-original-imagfdf4xnbyyxpa.jpeg', 'Laptops', '8 GB RAM | 256 GB SSD | 13.6 inch Liquid Retina Display | 1080p FaceTime HD Camera', 4.7, 3200),
('Dell Inspiron 15', 34990, 52000, 'https://rukminim2.flixcart.com/image/312/312/xif0q/computer/n/o/s/-original-imagp7pf2yvjuz6n.jpeg', 'Laptops', 'Intel Core i3 12th Gen | 8 GB RAM | 512 GB SSD | Windows 11 Home', 4.2, 1100),
('Sony WH-1000XM5', 29990, 34990, 'https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/d/j/f/-original-imagm7p9vzhgzx6f.jpeg', 'Electronics', 'Wireless Noise Cancelling Headphones | 30hr Battery Life | Multipoint Connection', 4.5, 950),
('boAt Airdopes 131', 999, 2990, 'https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/y/m/c/airdopes-131-boat-original-imagm9vyrh2mczxy.jpeg', 'Electronics', 'Wireless Earbuds with IWP Technology | Type C Charging | Up to 60H Playback', 4.1, 45000),
('Nothing Phone (2a)', 23999, 27999, 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/v/i/x/-original-imagz6vh6p7c5p87.jpeg', 'Mobiles', '8 GB RAM | 128 GB ROM | Dimensity 7200 Pro Processor | 50MP Dual Camera', 4.5, 4500);

-- 8. Verify Data
SELECT * FROM products;