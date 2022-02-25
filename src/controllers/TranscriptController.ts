import { Request, Response } from 'express'
import { pool } from '../database'
import { QueryResult } from 'pg';

const { createTranscript, formatDatePath } = require('../transcript_helper/createTranscript.js');

// generates a PDF of user's completed courses
export const getUserTranscript = async (req: Request, res: Response): Promise<Response> => {
    const user_id = parseInt(req.params.userID);

    try {
        // retrieve student name
        const student: QueryResult = await pool.query("SELECT name FROM users WHERE id = $1", [user_id]);

        // get all completed courses
        const completed_courses: QueryResult = await pool.query("SELECT course_id, date_completed FROM course_progress WHERE user_id = $1 AND date_completed IS NOT NULL", [user_id])

        // retrieve course details (course title) from courses table
        // for each completed course
        for (let index = 0; index < completed_courses.rows.length; index++) {
            // retrieve the course name
            const course_name: QueryResult = await pool.query("SELECT course_name FROM courses WHERE id = $1", [completed_courses.rows[index].course_id]);

            // add the course name to the object
            completed_courses.rows[index].course_name = course_name.rows[0].course_name;
        }

        student.rows[0].message = "Courses Completed Transcript"
        student.rows[0].completed_courses = completed_courses.rows

        let current_date = formatDatePath(new Date())   ;
        let filename = student.rows[0].name + ' Transcript ' + current_date +  '.pdf';
        let path = 'user transcripts/' + filename
        
        createTranscript(student.rows[0], path)

        return res.status(200).json({ message: "Transcript generated successfully!" });
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server Error");
    }

};


// returns user transcript details as a JSON
export const getUserDetails = async (req: Request, res: Response): Promise<Response> => {
    const user_id = parseInt(req.params.userID);

    try {
        // retrieve student name
        const student: QueryResult = await pool.query("SELECT name FROM users WHERE id = $1", [user_id]);

        // get all completed courses
        const completed_courses: QueryResult = await pool.query("SELECT course_id, date_completed FROM course_progress WHERE user_id = $1 AND date_completed IS NOT NULL", [user_id])

        // retrieve course details (course title) from courses table
        // for each completed course
        for (let index = 0; index < completed_courses.rows.length; index++) {
            // retrieve the course name
            const course_name: QueryResult = await pool.query("SELECT course_name FROM courses WHERE id = $1", [completed_courses.rows[index].course_id]);

            // add the course name to the object
            completed_courses.rows[index].course_name = course_name.rows[0].course_name;
        }

        student.rows[0].message = "Courses Completed Transcript"
        student.rows[0].completed_courses = completed_courses.rows

        return res.status(200).json(
            student.rows[0]
        );

    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server Error");
    }

};
