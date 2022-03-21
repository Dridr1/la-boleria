import clientSchema from "../Schemas/clientSchema.js";

const validateNewClientMiddleware = (req, res, next) => {
    const validation = clientSchema.validate(req.body);
    if (validation.error) return res.sendStatus(400);
    next();       
}

export default validateNewClientMiddleware;