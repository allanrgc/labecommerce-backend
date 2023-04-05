-- Active: 1680544360789@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

SELECT * from users;

INSERT INTO users(id, email, password)
VALUES ("u001", "emaildo@gmeidev.com", "senhadagota");
INSERT INTO users(id, email, password)
VALUES ("u002", "miminviacarta@gmeioso.com", "senhadoquere");
INSERT INTO users(id, email, password)
VALUES ("u003", "emaildoallan@gmail.com", "senhasenhosa");

UPDATE users SET password = "1445787" WHERE id = "u002";

SELECT * FROM users ORDER BY email ASC;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);
SELECT * from products;

INSERT INTO products(id, name, price, category)
VALUES ("p001", "Fire Stick", 300, "Eletronic");
INSERT INTO products(id, name, price, category)
VALUES ("p002", "Biotônico Fontora", 10.50, "Healty");
INSERT INTO products(id, name, price, category)
VALUES ("p003", "Almofada", 2, "Healty");
INSERT INTO products(id, name, price, category)
VALUES ("p004", "Pipoca", 1, "Food");
INSERT INTO products(id, name, price, category)
VALUES ("p005", "Doritos", 7, "Food");

UPDATE products SET price = 10.55 WHERE id = "p002";

SELECT * FROM products WHERE category IN ("Eletronic");
SELECT * FROM products WHERE id IN ("p001", "p002");
SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;
SELECT * FROM products WHERE price >= 100 AND price <= 300;

DELETE from products WHERE id = "123456";