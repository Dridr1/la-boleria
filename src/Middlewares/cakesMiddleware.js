import cakeSchema from "../Schemas/cakeSchema.js"

export const validateNewCakeMiddleware = (req, res, next) => {
    const validation = cakeSchema.validate(req.body);
    if(validation.error){
        if (validation.error.details[0].message.includes("name")) {
            return res.sendStatus(400);
        } else if (validation.error.details[0].message.includes("price")) {
            return res.sendStatus(400);
        } else if (validation.error.details[0].message.includes("description")) {
            return res.sendStatus(400)
        } else if (validation.error.details[0].message.includes("image")) {
            return res.sendStatus(422);
        }
    }

    next();
}