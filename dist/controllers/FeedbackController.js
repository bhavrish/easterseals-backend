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
exports.postFeedback = exports.getCourseFeedback = exports.getAllFeedback = void 0;
const database_1 = require("../database");
// get feedback for all courses (ADMIN FUNCTION)
exports.getAllFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('Select * FROM user_feedback');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
// get user feedback for specific course (ADMIN FUNCTION)
exports.getCourseFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course_id = parseInt(req.params.courseID);
    try {
        const response = yield database_1.pool.query('Select * FROM user_feedback WHERE course_id = $1', [course_id]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
// post new feedback about course (USER FUNCTION)
exports.postFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, feedback, user_id, course_id } = req.body;
    try {
        yield database_1.pool.query('INSERT INTO user_feedback (rating, feedback, user_id, course_id) VALUES ($1, $2, $3, $4)', [rating, feedback, user_id, course_id]);
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
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
