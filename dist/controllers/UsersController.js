"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.signInUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const database_1 = require("../database");
const bcryptjs = require('bcryptjs');
// get all users (ADMIN FUNCTION)
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('Select * FROM users');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getUsers = getUsers;
// get specific user (ADMIN FUNCTION)
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = parseInt(req.params.userID);
    try {
        const response = yield database_1.pool.query('Select * FROM users WHERE id = $1', [userID]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getUser = getUser;
// register user (USER FUNCTION)
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var { name, email, password, phone_num, date_of_birth, race, gender, address, employment_status, military_affiliated, military_affiliation, military_start_date, military_end_date, last_rank, military_speciality, household_size, income, current_course, completed_courses, referral_source, resources } = req.body;
    try {
        // check if user exists
        const user = yield database_1.pool.query('Select * FROM users WHERE email = $1', [email]);
        if (user.rowCount > 0)
            return res.status(200).json("Username already exists!");
        // hash password
        const salt = yield bcryptjs.genSalt(10);
        password = yield bcryptjs.hash(password, salt);
        // create record in users DB
        const newUserRecord = yield database_1.pool.query('INSERT INTO users (name, email, password, phone_num, date_of_birth, race, gender, address, employment_status, military_affiliated, military_affiliation, military_start_date, military_end_date, last_rank, military_speciality, household_size, income, current_course, completed_courses, referral_source, resources) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)', [name, email, password, phone_num, date_of_birth, race, gender, address, employment_status,
            military_affiliated, military_affiliation, military_start_date, military_end_date, last_rank,
            military_speciality, household_size, income, current_course, completed_courses, referral_source, resources]);
        const newUser = yield database_1.pool.query('Select * FROM users WHERE email = $1', [email]);
        return res.status(200).json(newUser.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
exports.createUser = createUser;
// log in user (USER FUNCTION)
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // check if user exists
        const user = yield database_1.pool.query('Select * FROM users WHERE email = $1', [email]);
        if (user.rowCount == 0)
            return res.status(200).json("Incorrect username");
        // check if hashed passwords match
        const isMatch = yield bcryptjs.compare(password, user.rows[0].password);
        if (!isMatch)
            res.status(401).json({ msg: 'Incorrect password' });
        return res.status(200).json(user.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
exports.signInUser = signInUser;
// update user details (USER FUNCTION)
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = parseInt(req.params.userID);
    const { name, email, phone_num } = req.body;
    try {
        yield database_1.pool.query('UPDATE users SET name = $1, email = $2, phone_num = $3 WHERE id = $4', [name, email, phone_num, userID]);
        return res.json('User ' + userID + ' updated succesfully');
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
exports.updateUser = updateUser;
// delete user (USER/ ADMIN FUNCTION)
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = parseInt(req.params.userID);
    try {
        yield database_1.pool.query('DELETE FROM users WHERE id = $1', [userID]);
        return res.json('User ' + userID + ' deleted succesfully');
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
exports.deleteUser = deleteUser;
