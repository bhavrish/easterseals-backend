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
const getAllFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('Select * FROM user_feedback');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getAllFeedback = getAllFeedback;
// get user feedback for specific course (ADMIN FUNCTION)
const getCourseFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getCourseFeedback = getCourseFeedback;
// post new feedback about course (USER FUNCTION)
const postFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, question, user_id, course_id } = req.body;
    try {
        // check if user has given feedback for course before
        const feedback = yield database_1.pool.query('Select * FROM user_feedback WHERE user_id = $1 AND course_id = $2 AND question = $3', [user_id, course_id, question]);
        if (feedback.rowCount > 0) {
            yield database_1.pool.query('UPDATE user_feedback SET rating = $1 WHERE user_id = $2 AND course_id = $3 AND question = $4', [rating, user_id, course_id, question]);
            return res.json({
                message: 'Feedback updated succesfully',
                body: {
                    course_feedback: {
                        rating,
                        question,
                        user_id,
                        course_id
                    }
                }
            });
        }
        else {
            yield database_1.pool.query('INSERT INTO user_feedback (rating, question, user_id, course_id) VALUES ($1, $2, $3, $4)', [rating, question, user_id, course_id]);
            return res.json({
                message: 'Feedback posted succesfully',
                body: {
                    course_feedback: {
                        rating,
                        question,
                        user_id,
                        course_id
                    }
                }
            });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
exports.postFeedback = postFeedback;
