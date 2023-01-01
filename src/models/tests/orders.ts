import { Orders } from "../orders";
import client from "../../database";
import { app } from "../../server";
import supertest from "supertest";

const storeOrder = new Orders();
const request = supertest(app);
let token: string;
/* let product = {
  name: "pen",
  price: 5,
}; */
const user = {
  firstName: "faten",
  lastName: "sawy",
  password: "123",
};
const order = {
  status: "active",
  userId: 1,
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
    const response = await request.post("/users").send(user);
    token = response.body;
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
      .send(order);
    expect(response.status).toBe(200);
  });
  it("expects get orders endpoint", async () => {
    const response = await request.get("/orders");
    expect(response.body).toEqual([]);
  });
  it("expects get order endpoint ", async () => {
    const response = await request.get("/orders/1");
    expect(response.status).toBe(200);
  });
});
