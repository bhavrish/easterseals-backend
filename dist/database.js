"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: process.env.USER,
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});
