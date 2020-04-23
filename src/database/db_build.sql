BEGIN;

DROP TABLE IF EXISTS product, prices CASCADE;

CREATE TABLE product (
  id            serial          PRIMARY KEY,
  name          VARCHAR(100)    NOT NULL,
  quantity      INTEGER         NOT NULL
);

CREATE TABLE prices (
  id            serial         PRIMARY KEY,
  name        VARCHAR(100)    UNIQUE NOT NULL,
  price         DECIMAL(5,2)   NOT NULL 
 
);


INSERT INTO product(name, quantity) VALUES
  ('Coca-cola', 3),
  ('Pringles', 10),
  ('3% milk', 2),
  ('Soya milk', 1),
  ('Chips', 10),
  ('Meat', 1),
  ('Pepsi', 3),
  ('Cheese', 2),
  ('Almond milk', 1),
  ('Socks', 5),
  ('Fish', 5),
  ('Chicken', 3),
  ('Bread',10),
  ('Honey',2),
  ('Toilet Paper',1)
RETURNING ID;

INSERT INTO prices(name,price) VALUES
  ('Coca-cola',9),
  ('Pringles',50),
  ('3% milk',6.99),
  ('Soya milk', 10),
  ('Chips', 15),
  ('Meat', 30),
  ('Pepsi', 7),
  ('Cheese', 25),
  ('Almond milk', 20),
  ('Socks', 20),
  ('Fish', 100),
  ('Chicken', 90),
  ('Bread',15),
  ('Honey',80),
  ('Toilet Paper',30)

RETURNING ID;

COMMIT;