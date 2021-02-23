import {Request, Response} from 'express'
import { pool } from '../database'
import { QueryResult } from 'pg';


// get all participant feedback (ADMIN FUNCTION)
export const getFeedback = async (res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('Select * FROM course_feedback');
        return res.status(200).json(response.rows);
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

// create new course page (USER FUNCTION)
export const postFeedback = async (req: Request, res: Response): Promise<Response> => {
    const {course_quality, course_relevance, course_navigation, course_comprehension, recommended, suggestions} = req.body;

    try {
        await pool.query('INSERT INTO course_feedback (course_quality, course_relevance, course_navigation, course_comprehension, recommended, suggestions) VALUES ($1, $2, $3, $4, $5, $6, $7)', [course_quality, course_relevance, course_navigation, course_comprehension, recommended, suggestions]);
        return res.json({
            message: 'Course page created succesfully',
            body: {
                course: {
                    course_quality,
                    course_relevance,
                    course_navigation,
                    course_comprehension,
                    recommended,
                    suggestions
                }
            }
        });
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}