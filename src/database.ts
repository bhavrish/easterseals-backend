import { Pool } from 'pg'

export const pool = new Pool({
    user: 'bhaveshshah',
    host: 'localhost',
    port: 5433,
    password: '',
    database: 'easterseals',
})