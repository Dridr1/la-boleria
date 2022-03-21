import { Router } from "express";
import { newCakeController } from "../Controllers/cakesController.js";
import { validateNewCakeMiddleware } from "../Middlewares/cakesMiddleware.js";

const cakesRouter = Router();

cakesRouter.post("/cakes", validateNewCakeMiddleware, newCakeController);

export default cakesRouter;