/* import { Request,Response,express } from "express"; */
import client from "../database";

export interface Order {
  id?: number;
  status?: string;
  userId?: number;
}

export default class Orders {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      console.log(err);
      throw new Error(`status is 404: ${err}`);
    }
  }
  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "INSERT INTO orders(userId,status) VALUES($1,$2) RETURNING *";
      const result = await conn.query(sql, [order.userId, order.status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`status is 404: ${err}`);
    }
  }
  async show(orderId: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [orderId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`status is 404: ${err}`);
    }
  }
  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO order_products(quantity,orderId,productId) VALUES($1,$2,$3) RETURNING *";
      const result = await conn.query(sql, [quantity, orderId, productId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`status is 404: ${err}`);
    }
  }
}
