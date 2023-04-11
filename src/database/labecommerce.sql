-- Active: 1680544360789@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

SELECT * from purchases;

INSERT INTO users(id, email, password)
VALUES ("u001", "anabarbiepocket@gmeioso.com", "senhadagota");
INSERT INTO users(id, email, password)
VALUES ("u002", "rafaelgc83@gmail.com", "senhadoquere");
INSERT INTO users(id, email, password)
VALUES ("u003", "allanrgc@gmail.com", "senhasenhosa");
DROP TABLE users;
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

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL DEFAULT(0),
    delivered_at TEXT DEFAULT (DATETIME("now", "localtime")) NOT NULL,
    
    Foreign Key (buyer_id) REFERENCES users(id)
);
DROP TABLE purchases;

INSERT INTO purchases
VALUES
    ("pu001", "u001", 21, 0, NULL),
    ("pu002", "u001", 10.50, 0, NULL),
    ("pu003", "u002", 2, 0, NULL),
    ("pu004", "u002", 7, 0, NULL);

UPDATE purchases SET delivered_at = DATETIME('now', "localtime") WHERE id = "pu002";
SELECT * FROM purchases;

SELECT
    users.id as userID,
    users.email,
    purchases.id as purchaseID,
    purchases.total_price,
    purchases.paid,
    purchases.delivered_at,
    purchases.buyer_id
    FROM users
    INNER JOIN purchases
    ON users.id = purchases.buyer_id;

INSERT INTO purchases
VALUES
    ("pu005", 12, 1, DATETIME("now", "localtime"), "u003");

SELECT * FROM purchases INNER JOIN users ON buyer_id = users.id WHERE users.id = "u001";


CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id REAL NOT NULL,
    quantity INTEGER NOT NULL
);
INSERT INTO purchases_products
VALUES
    ("pu001", "p002", 1),
    ("pu001", "p004", 3),
    ("pu001", "p005", 2),
    ("pu002", "p004", 5),
    ("pu003", "p001", 1),
    ("pu003", "p003", 4);
SELECT * FROM purchases_products;

SELECT 
    purchases_products.purchase_id AS compraID,
    purchases_products.product_id AS produtoID,
    purchases_products.quantity,
    purchases.total_price,
    purchases.paid,
    purchases.delivered_at,
    purchases.buyer_id,
    products.id,
    products.name,
    products.price,
    products.category
FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;


--Aprofundamento Knex
-- id, buyer_id, total_price, paid, delivered_at
INSERT INTO products(id, name, price, category)
VALUES ("p006", "Teclado Gamer", 300, "Eletronic");
INSERT INTO products(id, name, price, category)
VALUES ("p007", "Mouse Gamer", 200, "Eletronic");
INSERT INTO products(id, name, price, category)
VALUES ("p008", "Pasta térmica", 30, "Eletronic");
INSERT INTO purchases
VALUES
    ("pu006", "u003", 560, 1, DATETIME("now", "localtime"));

-- purchase_id, product_id, quantity
INSERT INTO purchases_products
VALUES
    ("pu006", "p006", 1),
    ("pu006", "p007", 1),
    ("pu006", "p008", 2);