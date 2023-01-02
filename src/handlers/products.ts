import express, { Request, Response } from "express";
import { Products, Product } from "../models/products";
import { authMiddleware } from "../middlewares/auth";
const store = new Products();

const index = async (req: Request, res: Response) => {
  try {
    const productsResult = await store.index();
    res.json(productsResult);
  } catch (err) {
    console.log(err);
    throw new Error(`status is 404: ${err}`);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productResult = await store.show(Number(id));
    res.json(productResult);
  } catch (err) {
    console.log(err);
    throw new Error(`status is 404: ${err}`);
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    const product: Product = {
      name,
      price,
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    throw new Error(`status is 404: ${err}`);
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const deletedItem = await store.delete(id);
    res.json(deletedItem);
  } catch (err) {
    console.log(err);
    throw new Error(`status is 404: ${err}`);
  }
};

const productsRoutes = async (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/product", authMiddleware, create);

  app.delete("/product", deleteProduct);
};

export default productsRoutes;
