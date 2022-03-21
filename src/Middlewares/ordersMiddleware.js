import orderSchema from "../Schemas/orderSchema.js";

const validateNewOrderMiddleware = (req, res, next) => {
    const validation = orderSchema.validate(req.body);
    if (validation.error) return res.sendStatus(400);
    next();
}

export default validateNewOrderMiddleware;