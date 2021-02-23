"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const isProduction = process.env.NODE_ENV === 'production';
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
exports.pool = new pg_1.Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction
});
// export const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
// })
