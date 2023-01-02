import Orders from "../models/orders";
import client from "../database";
import { app } from "../server";
import supertest from "supertest";
import { Products } from "../models/products";

const storeOrder = new Orders();
const storeProduct = new Products();
const request = supertest(app);
let token: string;
const product = {
  name: "pen",
  price: 5,
};
const user = {
  firstName: "faten",
  lastName: "sawy",
  password: "123",
};

describe("Orders Model", () => {
  it("should have an index method", () => {
    expect(storeOrder.index).toBeDefined();
  });
  it("index method return list of orders", async () => {
    const result = await storeOrder.index();
    expect(result).toEqual([]);
  });
  it("should have an create method", () => {
    expect(storeOrder.create).toBeDefined();
  });
  it("should have an show method", () => {
    expect(storeOrder.show).toBeDefined();
  });
  it("should have an addProduct method", () => {
    expect(storeOrder.addProduct).toBeDefined();
  });
});

/* TEST ENDPOINTS */

describe("Test end points", () => {
  beforeAll(async () => {
    await storeProduct.create(product);
    const response = await request.post("/user").send(user);
    token = response.body.token;
  });
  afterAll(async () => {
    const conn = await client.connect();
    const orderProductsSql =
      "DELETE FROM order_products; \n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;";
    const productsSql =
      "DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;";
    const ordersSql =
      "DELETE FROM orders; \n ALTER SEQUENCE orders_id_seq RESTART WITH 1;";
    const usersSql =
      "DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;";
    await conn.query(orderProductsSql);
    await conn.query(productsSql);
    await conn.query(ordersSql);
    await conn.query(usersSql);
    conn.release();
  });
  it("expects create endpoint to add an Order", async () => {
    const response = await request
      .post("/order")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        status: "active",
        userId: 1,
      });
    expect(response.body).toEqual({
      status: "active",
      userid: 1,
      id: 1,
    });
  });
  it("expects get orders endpoint", async () => {
    const response = await request.get("/orders");
    expect(response.body).toEqual([
      {
        status: "active",
        userid: 1,
        id: 1,
      },
    ]);
  });
  it("expects get order endpoint ", async () => {
    const response = await request.get("/orders/1");
    expect(response.body).toEqual({
      status: "active",
      userid: 1,
      id: 1,
    });
  });
  it("expects add product endpoint to add product the Order", async () => {
    const response = await request
      .post("/orders/1/products")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        productId: 1,
        quantity: 2,
      });
    expect(response.body).toEqual({
      id: 1,
      quantity: 2,
      orderid: 1,
      productid: 1,
    });
  });
});
