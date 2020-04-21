BEGIN;

-- DROP TABLE IF EXISTS product, prices CASCADE;

CREATE TABLE product (
  id            serial          PRIMARY KEY,
  name          VARCHAR(100)    NOT NULL,
  quantity      INTEGER         NOT NULL
);

CREATE TABLE prices (
  price         DECIMAL(5,2)   NOT NULL ,
  product_id    INTEGER        REFERENCES product(id) ON UPDATE CASCADE
);


INSERT INTO product(name, quantity) VALUES
  ('coca-cola', 100),
  ('pringles', 50),
  ('milk', 300)
RETURNING ID;

INSERT INTO prices(price, productid) VALUES
  (5.99, 1),
  (10.99, 2),
  (6.99, 3),
RETURNING ID;

COMMIT;