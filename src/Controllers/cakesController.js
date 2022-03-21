import { stripHtml } from "string-strip-html";
import db from "../database.js";

export const newCakeController = async (req, res) => {
    const { name, price, description, image } = req.body;
    const cake = {
        name: stripHtml(name).result.trim(),
        price: stripHtml(price).result.trim(),
        description: stripHtml(description).result.trim(),
        image: stripHtml(image).result.trim()
    }
    console.log(cake);

    try {
        const existentCake = await db.query(`
            SELECT name
            FROM cakes
            WHERE name = $1
       `, [cake.name]);

        if (existentCake.rowCount !== 0) return res.sendStatus(409);

        await db.query(`
            INSERT INTO cakes(name, price, description, image)
            VALUES ($1, $2, $3, $4);
        `, [cake.name, cake.price, cake.description, cake.image]);

        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}
