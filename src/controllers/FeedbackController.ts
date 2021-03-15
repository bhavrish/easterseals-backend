import {Request, Response} from 'express'
import { pool } from '../database'
import { QueryResult } from 'pg';


// get feedback for all courses (ADMIN FUNCTION)
export const getAllFeedback = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('Select * FROM user_feedback');
        return res.status(200).json(response.rows);
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

// get user feedback for specific course (ADMIN FUNCTION)
export const getCourseFeedback = async (req: Request, res: Response): Promise<Response> => {
    const course_id = parseInt(req.params.courseID);

    try {
        const response: QueryResult = await pool.query('Select * FROM user_feedback WHERE course_id = $1', [course_id]);
        return res.status(200).json(response.rows);
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

// post new feedback about course (USER FUNCTION)
export const postFeedback = async (req: Request, res: Response): Promise<Response> => {
    const {rating, feedback, user_id, course_id} = req.body;

    try {
        await pool.query('INSERT INTO user_feedback (rating, feedback, user_id, course_id) VALUES ($1, $2, $3, $4)', [rating, feedback, user_id, course_id]);
        return res.json({
            message: 'Feedback posted succesfully',
            body: {
                course_feedback: {
                    rating,
                    feedback,
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