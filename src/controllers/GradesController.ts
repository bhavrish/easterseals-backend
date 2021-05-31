import {Request, Response} from 'express'
import { pool } from '../database'
import { QueryResult } from 'pg';


// get all grades (ADMIN FUNCTION)
export const getAllGrades = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('Select * FROM user_grades');
        return res.status(200).json(response.rows);
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

// get grades for specific user (USER/ ADMIN FUNCTION)
export const getUserGrades = async (req: Request, res: Response): Promise<Response> => {
    const user_id = parseInt(req.params.userID);

    try {
        const response: QueryResult = await pool.query('Select * FROM user_grades WHERE user_id = $1', [user_id]);
        return res.status(200).json(response.rows);
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

// get grades for specific course (ADMIN FUNCTION)
export const getCourseGrades = async (req: Request, res: Response): Promise<Response> => {
    const course_id = parseInt(req.params.course_id);

    try {
        const response: QueryResult = await pool.query('Select * FROM user_grades WHERE course_id = $1', [course_id]);
        return res.status(200).json(response.rows);
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

// upload new course grade for a user (USER FUNCTION)
export const uploadGrade = async (req: Request, res: Response): Promise<Response> => {
    const {grade, user_id, course_id} = req.body;

    try {
        await pool.query('INSERT INTO user_grades (grade, user_id, course_id) VALUES ($1, $2, $3)', [grade, user_id, course_id]);
        return res.json({
            message: 'Grade uploaded succesfully',
            body: {
                user_grade: {
                    grade,
                    user_id,
                    course_id
                }
            }
        });
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}