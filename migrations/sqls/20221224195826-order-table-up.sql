/* Replace with your SQL commands */
CREATE TABLE orders (
    status text,userId integer REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE ,id SERIAL PRIMARY KEY )