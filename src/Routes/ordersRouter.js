import { Router } from "express";
import { getOrder, getOrders, getOrdersByClient, newOrder } from "../Controllers/ordersController.js";
import validateNewOrderMiddleware from "../Middlewares/ordersMiddleware.js";

const ordersRouter = Router();

ordersRouter.post("/order", validateNewOrderMiddleware, newOrder);
ordersRouter.get("/orders", getOrders);
ordersRouter.get("/orders/:id", getOrder);
ordersRouter.get("/clients/:id/orders", getOrdersByClient);
export default ordersRouter;