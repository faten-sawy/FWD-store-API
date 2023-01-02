import express, { Response, Request } from "express";
import { authMiddleware } from "../middlewares/auth";
import Orders, { Order } from "../models/orders";

const ordersStore = new Orders();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await ordersStore.index();
    res.json(orders);
  } catch (err) {
    console.log(err);
    throw new Error(`status is 404: ${err}`);
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const { userId, status } = req.body;
    const order: Order = {
      userId,
      status,
    };
    const result = await ordersStore.create(order);
    res.json(result);
  } catch (err) {
    console.log(err);
    throw new Error(`status is 404: ${err}`);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orderSelected = await ordersStore.show(Number(id));
    res.json(orderSelected);
  } catch (err) {
    console.log(err);
    throw new Error(`status is 404: ${err}`);
  }
};
const addProduct = async (req: Request, res: Response) => {
  try {
    const { id: orderId } = req.params;
    const { quantity, productId } = req.body;
    const productAdded = await ordersStore.addProduct(
      quantity,
      Number(orderId),
      productId
    );
    res.json(productAdded);
  } catch (err) {
    console.log(err);
    throw new Error(`status is 404: ${err}`);
  }
};
const ordersRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.post("/order", authMiddleware, create);
  app.get("/orders/:id", show);
  /* add product related to join tables */
  app.post("/orders/:id/products", authMiddleware, addProduct);
};
export default ordersRoutes;
