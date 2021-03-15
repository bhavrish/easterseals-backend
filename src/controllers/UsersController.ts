import {Request, Response} from 'express'
import { pool } from '../database'
import { QueryResult } from 'pg';
const bcryptjs = require('bcryptjs');

// get all users (ADMIN FUNCTION)
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('Select * FROM users');
        return res.status(200).json(response.rows);
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

// get specific user (ADMIN FUNCTION)
export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const userID = parseInt(req.params.userID);

    try {
        const response: QueryResult = await pool.query('Select * FROM users WHERE id = $1', [userID]); 
        return res.status(200).json(response.rows);
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

// register user (USER FUNCTION)
export const createUser = async (req: Request, res: Response): Promise<Response> => {
    var {name, email, password, phone_num, date_of_birth, race, gender, address, employment_status,
        military_affiliated, military_affiliation, military_start_date, military_end_date, last_rank,
        military_speciality, household_size, income, current_course, completed_courses, referral_source, resources} = req.body;

    try {
        // check if user exists
        const user: QueryResult = await pool.query('Select * FROM users WHERE email = $1', [email]);
        if (user.rowCount > 0)
            return res.status(200).json("Username already exists!");

        // hash password
        const salt = await bcryptjs.genSalt(10);
        password = await bcryptjs.hash(password, salt);

        // create record in users DB
        const newUserRecord = await pool.query('INSERT INTO users (name, email, password, phone_num, date_of_birth, race, gender, address, employment_status, military_affiliated, military_affiliation, military_start_date, military_end_date, last_rank, military_speciality, household_size, income, current_course, completed_courses, referral_source, resources) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)', 
        [name, email, password, phone_num, date_of_birth, race, gender, address, employment_status,
            military_affiliated, military_affiliation, military_start_date, military_end_date, last_rank,
            military_speciality, household_size, income, current_course, completed_courses, referral_source, resources]);
        
        const newUser: QueryResult = await pool.query('Select * FROM users WHERE email = $1', [email]);
        return res.status(200).json(newUser.rows);
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

// log in user (USER FUNCTION)
export const signInUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
        // check if user exists
        const user: QueryResult = await pool.query('Select * FROM users WHERE email = $1', [email]);

        if (user.rowCount == 0)
            return res.status(200).json("Incorrect username");

        // check if hashed passwords match
        const isMatch: boolean = await bcryptjs.compare(
            password,
            user.rows[0].password
        );
        
        if (!isMatch)
            res.status(401).json({ msg: 'Incorrect password' });
                   
        return res.status(200).json(user.rows);
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

// update user details (USER FUNCTION)
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const userID = parseInt(req.params.userID);
    const { name, email, phone_num } = req.body;

    try {
        await pool.query('UPDATE users SET name = $1, email = $2, phone_num = $3 WHERE id = $4', [name, email, phone_num, userID]); 
        return res.json('User ' + userID + ' updated succesfully');
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

// delete user (USER/ ADMIN FUNCTION)
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const userID = parseInt(req.params.userID);

    try {
        await pool.query('DELETE FROM users WHERE id = $1', [userID]); 
        return res.json('User ' + userID + ' deleted succesfully');
    }
    catch(e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}