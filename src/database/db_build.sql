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
  -- product_id    INTEGER        REFERENCES product(id) ON UPDATE CASCADE

);



INSERT INTO product(name, quantity) VALUES
  ('coca-cola', 100),
  ('pringles', 50),
  ('milk', 300)
RETURNING ID;

INSERT INTO prices(name,price) VALUES
  ('coca-cola',5.99),
  ('pringles',10.99),
  ('milk',6.99)
RETURNING ID;

COMMIT;