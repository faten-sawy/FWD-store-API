# Storefront Backend Project

## Getting Started

## Environment viable  
    POSTGRES_HOST = 'localhost'
    POSTGRES_DB = 'store'
    POSTGRES_TEST_DB = 'store_test'
    POSTGRES_USER = 'full_stack_user'
    POSTGRES_PASSWORD = 'admin'
    ENV = dev
    database port = 5432
    server port = 3000

## Run locally 
    1-clone project
    2-install postgres
    3-create database
        - CREATE USER full_stack_user with password 'admin'
        - CREATE DATABASE store
        - CREATE DATABASE store_test
        - GRANT ALL PRIVILEGES ON DATABASE store TO full_stack_user
        - GRANT ALL PRIVILEGES ON DATABASE store_test TO full_stack_user
    4-npm install
        - npm i
    5- setup database
        - npm run setup
    6- build project
       - npm run build
    6- run server
        npm run start


    
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
