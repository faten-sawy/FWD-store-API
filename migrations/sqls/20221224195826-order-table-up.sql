/* Replace with your SQL commands */
CREATE TABLE orders(status text,userId integer REFERENCES users(id) ,id SERIAL PRIMARY KEY )