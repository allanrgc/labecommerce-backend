-- Active: 1680544360789@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

SELECT * from users;

INSERT INTO users(id, name, email, password)
VALUES ("u001", "Ana Barbie", "anabarbiepocket@gmeioso.com", "senhadagota");
INSERT INTO users(id, name, email, password)
VALUES ("u002", "Rafael Gomes", "rafaelgc83@gmail.com", "senhadoquere");
INSERT INTO users(id, name, email, password)
VALUES ("u003", "Allan Rafael", "allanrgc@gmail.com", "senhasenhosa");
DROP TABLE productss;
UPDATE users SET password = "1445787" WHERE id = "u002";

SELECT * FROM users ORDER BY email ASC;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);
SELECT * from products;

INSERT INTO products(id, name, price, description, image_url)
VALUES ("p001", "Fire Stick", 300, "Eletronic", "https://m.media-amazon.com/images/I/61DjN6pVKBL._AC_SX679_.jpg");
INSERT INTO products(id, name, price, description, image_url)
VALUES ("p002", "Biotônico Fontoura", 10.50, "Healty", "https://www.drogariaminasbrasil.com.br/media/product/183/biotonico-fontoura-400ml-84d.jpg");
INSERT INTO products(id, name, price, description, image_url)
VALUES ("p003", "Almofada", 2, "Healty", "https://http2.mlstatic.com/D_NQ_NP_637122-CBT48295892426_112021-O.webp");
INSERT INTO products(id, name, price, description, image_url)
VALUES ("p004", "Pipoca", 1, "Food", "https://serdigital.com.br/temp/bokus/images/produtos/bokus/salgada.png");
INSERT INTO products(id, name, price, description, image_url)
VALUES ("p005", "Doritos", 7, "Food", "https://m.media-amazon.com/images/I/610trEtCQuS._AC_SX425_.jpg");




UPDATE products SET price = 10.55 WHERE id = "p002";

SELECT * FROM products WHERE description IN ("Eletronic");
SELECT * FROM products WHERE id IN ("p001", "p002");
SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;
SELECT * FROM products WHERE price >= 10 AND price <= 300;

DELETE from products WHERE id = "123456";

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL DEFAULT(0),
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    Foreign Key (buyer_id) REFERENCES users(id)
);
DROP TABLE purchases;

INSERT INTO purchases(id, buyer_id, total_price, paid)
VALUES
    ("pu001", "u001", 21, 0),
    ("pu002", "u001", 10.50, 0),
    ("pu003", "u002", 2, 0),
    ("pu004", "u002", 7, 0);

UPDATE purchases SET created_at = DATETIME('now', "localtime") WHERE id = "pu002";
SELECT * FROM purchases;

SELECT
    users.id as userID,
    users.name,
    users.email,
    purchases.id as purchaseID,
    purchases.total_price,
    purchases.paid,
    purchases.created_at,
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
    purchases.created_at,
    purchases.buyer_id,
    products.id,
    products.name,
    products.price,
    products.description
FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;


--Aprofundamento Knex
-- id, buyer_id, total_price, paid, created_at
INSERT INTO products(id, name, price, description, image_url)
VALUES ("p006", "Teclado Gamer", 300, "Eletronic", "https://m.media-amazon.com/images/I/51jKLG-FptL._AC_SY450_.jpg");
INSERT INTO products(id, name, price, description, image_url)
VALUES ("p007", "Mouse Gamer", 200, "Eletronic", "https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SY450_.jpg");
INSERT INTO products(id, name, price, description, image_url)
VALUES ("p008", "Pasta térmica", 30, "Eletronic", "https://m.media-amazon.com/images/I/51cMKhK1YiL._AC_SY450_.jpg");
INSERT INTO purchases
VALUES
    ("pu006", "u003", 560, 1, DATETIME("now", "localtime"));

-- purchase_id, product_id, quantity
INSERT INTO purchases_products
VALUES
    ("pu006", "p006", 1),
    ("pu006", "p007", 1),
    ("pu006", "p008", 2);