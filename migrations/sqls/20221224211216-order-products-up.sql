/* Replace with your SQL commands */
CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    quantity integer,
    orderId  integer REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    productId integer REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);