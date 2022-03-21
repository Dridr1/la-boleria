import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./Routes/index.js";
import dayjs from "dayjs";

const app = express();
app.use(cors());
app.use(json());
app.use(router);

dotenv.config();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));