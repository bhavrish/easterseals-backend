import { Pool } from 'pg'
import * as dotenv from 'dotenv';

export const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})