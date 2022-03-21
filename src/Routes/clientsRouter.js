import { Router } from "express";
import { newClientController } from "../Controllers/clientsController.js";
import validateNewClientMiddleware from "../Middlewares/clientsMiddleware.js";

const clientsRouter = Router();

clientsRouter.post("/clients", validateNewClientMiddleware, newClientController);

export default clientsRouter;