import express, { Response, Request } from "express";
import { authMiddleware } from "../middlewares/auth";
import { Orders, Order } from "../models/orders";

const ordersStore = new Orders();

const index = async (req: Request, res: Response) => {
  const orders = await ordersStore.index();
  res.json(orders);
};
const create = async (req: Request, res: Response) => {
  const { userId, status } = req.body;
  const order: Order = {
    userId,
    status,
  };
  const result = await ordersStore.create(order);
  res.json(result);
};
const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  const orderSelected = await ordersStore.show(Number(id));
  res.json(orderSelected);
};
const addProduct = async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const { quantity, productId } = req.body;
  const productAdded = await ordersStore.addProduct(
    quantity,
    Number(orderId),
    productId
  );
  res.json(productAdded);
};
const ordersRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.post("/order", authMiddleware, create);
  app.get("/orders/:id", show);
  /* add product related to join tables */
  app.post("/orders/:id/products", addProduct);
};
export default ordersRoutes;
