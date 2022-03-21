import joi from 'joi';

const orderSchema = joi.object({
    clientId: joi.number().min(0).required(),
    cakeId: joi.number().min(0).required(),
    quantity: joi.number().greater(0).less(5).required(),
    totalPrice: joi.number().min(0).required()
});

export default orderSchema;