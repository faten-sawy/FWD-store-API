import client from "../database";
import bcrypt from "bcrypt";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
}

const handleHashPassword = (realPassword: string): string => {
  const salt = 10;
  return bcrypt.hashSync(realPassword, salt);
};

export class Users {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT firstName, lastName, id FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      console.log(err);
      throw new Error(`status is 404: ${err}`);
    }
  }
  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users(firstName,lastName,password) VALUES($1,$2,$3) RETURNING *";
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        handleHashPassword(String(user.password)),
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`status is 404: ${err}`);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "SELECT firstName,lastName FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`status is 404: ${err}`);
    }
  }
  async login(user: User): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT password FROM users WHERE firstName=($1) AND lastName=($2)";
      const result = await conn.query(sql, [user.firstName, user.lastName]);
      const { password } = result.rows[0];

      const isPasswordRight = bcrypt.compareSync(user.password, password);
      if (isPasswordRight) {
        const returnedSql =
          "SELECT firstName,lastName,id from users WHERE firstName=($1) AND lastName=($2)";
        const userInfo = await conn.query(returnedSql, [
          user.firstName,
          user.lastName,
        ]);

        return userInfo.rows[0];
      } else {
        return null;
      }
      conn.release();
    } catch (err) {
      console.log(err);
      throw new Error(`status is 404: ${err}`);
    }
  }
}
