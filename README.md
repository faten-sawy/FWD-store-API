# Storefront Backend Project

## Getting Started

## run locally 
    1-clone project
    2-install postgres
    3-create database
        - CREATE DATABASE store
    4-npm install
        - npm i
    5- setup database
        - npm run setup
    6- build project
       - npm run build
    6- run server
        npm run start

## Ports
    1-database port : 5432
    2- server port : 3000
    
## API endpoints
### products
    1- GET    /products (index)
    2- GET    /products/:id (show)
    3- POST   /product (create) (token required)
    4- DELETE /product (delete)

### users 
    1- GET  /users (index) (token required)
    2- POST /user (create) (token required)
    3- GET  /user/:id (show) (token required)  
    4- POST /login 

### orders 
    1- GET  /orders (index)
    2- POST /order (create) (token required)
    3- GET  /orders/:id (show) 
    4- POST /orders/:id/products  => that for add product  