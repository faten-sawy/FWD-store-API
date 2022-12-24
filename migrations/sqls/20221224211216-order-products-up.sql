/* Replace with your SQL commands */
CREATE TABLE order_products(id SERIAL PRIMARY KEY,quantity integer,
orderId integer REFERENCES orders(id),productId integer REFERENCES products(id))