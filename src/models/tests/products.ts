import { Product, Products } from "../products";

import supertest from "supertest";
import { app } from "../../server";
import client from "../../database";

const store = new Products();
const request = supertest(app);
let token: string;

/* Test products Model */
describe("Products Model", () => {
  it("should have an index method", () => {
    console.log(request);
    expect(store.index).toBeDefined();
  });

  it("index method return list of products", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
  it("show have an show method", async () => {
    expect(store.show).toBeDefined();
  });
  it("show have an create method", async () => {
    expect(store.create).toBeDefined();
  });
  it("show have an delete method", async () => {
    expect(store.delete).toBeDefined();
  });
});

/* Test products endpoints */
describe("test product end point response", () => {
  const fakeUser = {
    firstName: "faten",
    lastName: "sawy",
    password: "123",
  };
  const product: Product = {
    name: "pen",
    price: 5,
  };

  beforeAll(async () => {
    const response = await request.post("/user").send(fakeUser);
    token = response.body;
  });
  afterAll(async () => {
    const conn = await client.connect();
    const productSql =
      "DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;";
    const userSql =
      "DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;";
    await conn.query(productSql);
    await conn.query(userSql);
    conn.release();
  });
  it("expects create endpoint to add a Product", async () => {
    const response = await request
      .post("/product")
      .set({ Authorization: `Bearer ${token}` })
      .send(product);
    expect(response.body).toEqual({
      id: 1,
      name: "pen",
      price: 5,
    });
  });
  it("descripe endpoint response", async () => {
    const response = await request
      .get("/products")
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
  });
  it("descripe endpoint response", async () => {
    const response = await request.get("/products/1");
    expect(response.status).toBe(200);
  });
});
