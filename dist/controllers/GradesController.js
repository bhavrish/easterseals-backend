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
exports.uploadGrade = exports.getCourseGrades = exports.getUserGrades = exports.getAllGrades = void 0;
const database_1 = require("../database");
// get all grades (ADMIN FUNCTION)
const getAllGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('Select * FROM user_grades');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getAllGrades = getAllGrades;
// get grades for specific user (USER/ ADMIN FUNCTION)
const getUserGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = parseInt(req.params.userID);
    try {
        const response = yield database_1.pool.query('Select * FROM user_grades WHERE user_id = $1', [user_id]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getUserGrades = getUserGrades;
// get grades for specific course (ADMIN FUNCTION)
const getCourseGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course_id = parseInt(req.params.course_id);
    try {
        const response = yield database_1.pool.query('Select * FROM user_grades WHERE course_id = $1', [course_id]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getCourseGrades = getCourseGrades;
// upload new grade for a course (USER FUNCTION)
const uploadGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { grade, user_id, course_id } = req.body;
    try {
        yield database_1.pool.query('INSERT INTO user_grades (grade, user_id, course_id) VALUES ($1, $2, $3)', [grade, user_id, course_id]);
        return res.json({
            message: 'Feedback posted succesfully',
            body: {
                user_grade: {
                    grade,
                    user_id,
                    course_id
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
exports.uploadGrade = uploadGrade;
