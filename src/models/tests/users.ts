import { Users, User } from "../users";
import client from "../../database";
import { app } from "../../server";
import supertest from "supertest";

const storeUser = new Users();
const request = supertest(app);
let token: string;
const fakeUser: User = {
  firstName: "faten",
  lastName: "sawy",
  password: "123",
};
describe("Users Model", () => {
  it("should have an index method", async () => {
    expect(storeUser.index).toBeDefined();
  });
  it("index method should return list of users", async () => {
    const result = await storeUser.index();
    expect(result).toEqual([]);
  });
  it("should have an create method", async () => {
    expect(storeUser.create).toBeDefined();
  });
  it("should have an show method", async () => {
    expect(storeUser.show).toBeDefined();
  });
});

/* TEST ENDPOINTS */

describe("Test end points", () => {
  beforeAll(async () => {
    const response = await request.post("/user").send(fakeUser);
    token = response.body;
  });
  afterAll(async () => {
    const conn = await client.connect();
    const sql =
      "DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;";
    await conn.query(sql);
    await conn.release();
  });
  it("expects create endpoint to add a User", async () => {
    const response = await request.post("/user").send(fakeUser);
    token = response.body;
    expect(response.status).toEqual(200);
  });
  it("expects create endpoint to add a User", async () => {
    const response = await request
      .get("/users")
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toEqual(200);
  });
  it("expects create endpoint to add a User", async () => {
    const response = await request
      .get("/user/1")
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toEqual(200);
  });
});
