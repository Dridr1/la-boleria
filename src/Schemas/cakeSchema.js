import joi from "joi";

const cakeSchema = joi.object({
    name: joi.string().required().min(2),
    price: joi.number().greater(0).required(),
    description: joi.string().required(),
    image: joi.string().uri().required()
});

export default cakeSchema;