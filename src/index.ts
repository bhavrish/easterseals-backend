import express from "express";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';
import routes from "./routes/index";

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

app.use(routes);
app.listen(PORT);