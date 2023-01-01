import client from "../database";

export interface Product {
  id?: number;
  name: string;
  price: number;
}

export class Products {
  async index(): Promise<Product[]> {
    const conn = await client.connect();
    const sql = "SELECT * FROM products";
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }
  async show(id: number): Promise<Product> {
    const conn = await client.connect();
    const sql = "SELECT * FROM products WHERE id=($1)";
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }
  async create(product: Product): Promise<Product> {
    const conn = await client.connect();
    const sql = "INSERT INTO products(name,price) VALUES($1,$2) RETURNING *";
    const result = await conn.query(sql, [product.name, product.price]);
    conn.release();
    return result.rows[0];
  }
  async delete(id: number): Promise<Product> {
    const conn = await client.connect();
    const sql = "DELETE FROM products WHERE id=($1)";
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }
}
