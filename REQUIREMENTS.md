# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
    1- GET    /products (index)
    2- GET    /products/:id (show)
    3- POST   /product (create) (token required)
    4- DELETE /product (delete)

#### Users
    1- GET  /users (index) (token required)
    2- POST /user (create) (token required)
    3- GET  /user/:id (show) (token required)  
    4- POST /login 

#### Orders
    1- GET  /orders (index)
    2- POST /order (create) (token required)
    3- GET  /orders/:id (show) 
    4- POST /orders/:id/products  => that for add product

## Database Schema
### Table: products (name text, price integer, id SERIAL PRIMARY KEY )
### Table: users (firstName text, lastName text, password text, id SERIAL PRIMARY KEY)
### TAble: orders (status text,userId integer REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE ,id SERIAL PRIMARY KEY )
### Table: order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    orderId  integer REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    productId integer REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

