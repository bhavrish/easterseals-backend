import {Request, Response} from 'express'
import { pool } from '../database'
import { QueryResult } from 'pg';


// get all participant feedback (ADMIN FUNCTION)
export const getFeedbacks = async (res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('Select * FROM course_feedback');
        return res.status(200).json(response.rows);
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}
