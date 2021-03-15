import express from "express";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';
import routes from "./routes/index";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());

app.use(routes);
app.listen(PORT);