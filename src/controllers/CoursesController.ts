import {Request, Response} from 'express'
import { pool } from '../database'
import { QueryResult } from 'pg';

export const getCourses = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('Select * FROM courses_content');
        return res.status(200).json(response.rows);
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const getCourse = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);

    try {
        const response: QueryResult = await pool.query('Select * FROM courses_content WHERE id = $1', [id]); 
        return res.status(200).json(response.rows);
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const createCourse = async (req: Request, res: Response): Promise<Response> => {
    const {name, content} = req.body;

    try {
        await pool.query('INSERT INTO courses_content (name, content) VALUES ($1, $2)', [name, content]);
        return res.json({
            message: 'Course created succesfully',
            body: {
                course: {
                    name,
                    content
                }
            }
        });
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const updateCourse = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { name, content } = req.body;

    try {
        await pool.query('UPDATE courses_content SET name = $1, content = $2 WHERE id = $4', [name, content, id]); 
        return res.json('Course ${id} updated succesfully');
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

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