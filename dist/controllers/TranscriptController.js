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
exports.getUserDetails = exports.getUserTranscript = void 0;
const database_1 = require("../database");
const { createTranscript, formatDatePath } = require('../../src/transcript_helper/createTranscript.js');
// generates a PDF of user's completed courses
const getUserTranscript = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = parseInt(req.params.userID);
    try {
        // retrieve student name
        const student = yield database_1.pool.query("SELECT name FROM users WHERE id = $1", [user_id]);
        // get all completed courses
        const completed_courses = yield database_1.pool.query("SELECT course_id, date_completed FROM course_progress WHERE user_id = $1 AND date_completed IS NOT NULL", [user_id]);
        // retrieve course details (course title) from courses table
        // for each completed course
        for (let index = 0; index < completed_courses.rows.length; index++) {
            // retrieve the course name
            const course_name = yield database_1.pool.query("SELECT course_name FROM courses WHERE id = $1", [completed_courses.rows[index].course_id]);
            // add the course name to the object
            completed_courses.rows[index].course_name = course_name.rows[0].course_name;
        }
        student.rows[0].completed_courses = completed_courses.rows;
        // if this user has not completed any courses display message
        if (student.rows[0].completed_courses.length == 0) {
            return res.status(400).json({
                message: "No completed courses for this user"
            });
        }
        else { // otherwise generate a transcript pdf of completed courses
            let current_date = formatDatePath(new Date());
            let filename = student.rows[0].name + ' Transcript ' + current_date + '.pdf';
            let path = 'user transcripts/' + filename;
            createTranscript(student.rows[0], path);
            return res.status(200).json({ message: "Transcript generated successfully!" });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server Error");
    }
});
exports.getUserTranscript = getUserTranscript;
// returns user transcript details as a JSON
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = parseInt(req.params.userID);
    try {
        // retrieve student name
        const student = yield database_1.pool.query("SELECT name FROM users WHERE id = $1", [user_id]);
        // get all completed courses
        const completed_courses = yield database_1.pool.query("SELECT course_id, date_completed FROM course_progress WHERE user_id = $1 AND date_completed IS NOT NULL", [user_id]);
        // retrieve course details (course title) from courses table
        // for each completed course
        for (let index = 0; index < completed_courses.rows.length; index++) {
            // retrieve the course name
            const course_name = yield database_1.pool.query("SELECT course_name FROM courses WHERE id = $1", [completed_courses.rows[index].course_id]);
            // add the course name to the object
            completed_courses.rows[index].course_name = course_name.rows[0].course_name;
        }
        student.rows[0].message = "Courses Completed Transcript";
        student.rows[0].completed_courses = completed_courses.rows;
        if (student.rows[0].completed_courses.length == 0) {
            return res.status(400).json({
                message: "No completed courses for this user"
            });
        }
        else {
            return res.status(200).json(student.rows[0]);
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal Server Error");
    }
});
exports.getUserDetails = getUserDetails;
