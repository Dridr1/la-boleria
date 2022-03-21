import db from "../database.js";
import dayjs from "dayjs";

export const newOrder = async (req, res) => {
    const { clientId, cakeId, quantity, totalPrice } = req.body;

    try {
        const clientIdExist = await db.query(`
            SELECT * FROM clients WHERE id=$1;
        `, [clientId]);

        if (clientIdExist.rowCount === 0) return res.sendStatus(404);

        const cakeIdExist = await db.query(`
            SELECT * FROM cakes WHERE id=$1
        `, [cakeId]);

        if (cakeIdExist.rowCount === 0) return res.sendStatus(404);

        await db.query(`
            INSERT INTO orders("clientId", "cakeId", quantity, "createdAt", "totalPrice")
            VALUES ($1, $2, $3, $4, $5);
        `, [clientId, cakeId, quantity, dayjs().format("YYYY-MM-DD HH:mm"), totalPrice]);

        return res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const getOrders = async (req, res) => {
    const dateString = req.query.date;
    try {
        const result = await db.query({
            text: `
            SELECT 
                orders.*,
                cakes.*,
                clients.*
            FROM orders
            JOIN clients ON clients.id=orders."clientId"
            JOIN cakes ON cakes.id=orders."cakeId"
            ${typeof (dateString) === 'string' ? `WHERE orders."createdAt" LIKE '$1'` : ''}
        `,
            rowMode: "array"
        }, typeof (dateString) === 'string' ? [dateString + '%'] : []);

        const filteredObject = formatResults(result.rows);
        if (filteredObject.length === 0) return res.sendStatus(404);
        return res.send(filteredObject).status(200);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const getOrder = async (req, res) => {
    const { id } = req.params;
    if (id.match(re)) return res.sendStatus(400);
    try {
        console.log(parseInt(id));
        const result = await db.query({
            text: `
                SELECT 
                    orders.*,
                    cakes.*,
                    clients.*
                FROM orders
                JOIN clients ON clients.id=orders."clientId"
                JOIN cakes ON cakes.id=orders."cakeId"
                WHERE orders.id=$1;
            `,
            rowMode: "array"
        }, [id]);

        if (result.rowCount === 0) return res.sendStatus(404);
        return res.send(formatResults(result.rows)).status(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const getOrdersByClient = async (req, res) => {
    const { id } = req.params;
    try {
        const clientExist = await db.query(`
            SELECT * FROM clients
            WHERE id=$1
        `, [id]);

        if(clientExist.rowCount === 0) return res.sendStatus(404);

        const result = await db.query(`
            SELECT 
                orders."id" as "orderId",
                orders."quantity",
                orders."createdAt",
                orders."totalPrice",
                cakes.name AS cakeName
            FROM orders
            JOIN cakes ON cakes.id=orders."cakeId"
            JOIN clients ON cakes.id=orders."clientId"
            WHERE clients."id"=$1
        `, [id]);

        return res.send(result.rows).status(200);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

const formatResults = (rows) => {
    const filteredOrders = rows.map(row => {
        const [, clientId, cakeId, quantity, createdAt, totalPrice, , cakeName, cakePrice,
            cakeImage, cakeDescription, , clientName, clientAdress, clientPhone] = row;
        return {
            client: {
                id: clientId,
                name: clientName,
                address: clientAdress,
                phone: clientPhone
            },
            cake: {
                id: cakeId,
                name: cakeName,
                price: cakePrice,
                description: cakeDescription,
                image: cakeImage
            },
            createdAt,
            quantity,
            totalPrice
        }
    });
    return filteredOrders;
}