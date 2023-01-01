import express, { Request, Response } from "express";
import { Products, Product } from "../models/products";
import { authMiddleware } from "../middlewares/auth";
const store = new Products();

const index = async (req: Request, res: Response) => {
  const productsResult = await store.index();
  res.json(productsResult);
};
const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productResult = await store.show(Number(id));
  res.json(productResult);
};
const create = async (req: Request, res: Response) => {
  const { name, price } = req.body;
  const product: Product = {
    name,
    price,
  };
  const newProduct = await store.create(product);
  res.json(newProduct);
  console.log(res);
};
const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.body;
  const deletedItem = await store.delete(id);
  res.json(deletedItem);
};

const productsRoutes = async (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/product", authMiddleware, create);

  app.delete("/product", deleteProduct);
};

export default productsRoutes;
