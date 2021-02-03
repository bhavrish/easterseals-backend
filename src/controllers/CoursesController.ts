import {Request, Response} from 'express'
import { pool } from '../database'
import { QueryResult } from 'pg';

// get specific course (USER FUNCTION)
export const getCourse = async (req: Request, res: Response): Promise<Response> => {
    const name = parseInt(req.params.name);
    const userID = parseInt(req.body.userID);

    try {
        const pageQueryString = name + "_current_page";
        const currentPage: QueryResult = await pool.query('SELECT $1 FROM courses_grades WHERE users.id = $2;', [pageQueryString, userID]);
        
        const response: QueryResult = await pool.query('Select * FROM courses_content WHERE courseName = $1 AND pageNumber >= $2', [name, currentPage]); 
        return res.status(200).json(response.rows);
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

// create new course page (ADMIN FUNCTION)
export const createCoursePage = async (req: Request, res: Response): Promise<Response> => {
    const {courseName, pageTitle, pageNumber, pageType, content, choices, correctAnswer} = req.body;

    try {
        await pool.query('INSERT INTO courses_content (courseName, pageTitle, pageNumber, pageType, content, choices, correctAnswer) VALUES ($1, $2, $3, $4, $5, $6, $7)', [courseName, pageTitle, pageNumber, pageType, content, choices, correctAnswer]);
        return res.json({
            message: 'Course page created succesfully',
            body: {
                course: {
                    courseName,
                    pageTitle,
                    pageNumber,
                    pageType, // either "content" or "question"
                    content,
                    choices, // multiple choices for "question" pages
                    correctAnswer
                }
            }
        });
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

// update progress in specific course (USER FUNCTION)
export const updatePageNumber = async (req: Request, res: Response): Promise<Response> => {
    const {name, userID, page} = req.body;

    try {
        const pageQueryString = name + "_current_page";
        await pool.query('UPDATE courses_content SET $1 = $2 WHERE id = $3', [pageQueryString, page, userID]); 
        return res.json('Course ${id} updated succesfully');
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

// delete course (ADMIN FUNCTION)
export const deleteCourse = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);

    try {
        await pool.query('DELETE FROM courses_content WHERE id = $1', [id]); 
        return res.json('Course ${id} deleted succesfully');
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}