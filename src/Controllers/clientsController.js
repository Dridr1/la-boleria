import { stripHtml } from "string-strip-html";
import db from "../database.js";

export const newClientController = async (req, res) => {
    const { name, address, phone } = req.body;
    const client = {
        name: stripHtml(name).result.trim(),
        address: stripHtml(address).result.trim(),
        phone: stripHtml(phone).result.trim()
    }
    try {
        await db.query(`
            INSERT INTO clients(name, address, phone)
            VALUES ($1, $2, $3);
        `, [client.name, client.address, client.phone]);

        return res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}