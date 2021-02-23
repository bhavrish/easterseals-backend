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
exports.postFeedback = exports.getFeedback = void 0;
const database_1 = require("../database");
// get all participant feedback (ADMIN FUNCTION)
exports.getFeedback = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('Select * FROM course_feedback');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
// create new course page (USER FUNCTION)
exports.postFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { course_quality, course_relevance, course_navigation, course_comprehension, recommended, suggestions } = req.body;
    try {
        yield database_1.pool.query('INSERT INTO course_feedback (course_quality, course_relevance, course_navigation, course_comprehension, recommended, suggestions) VALUES ($1, $2, $3, $4, $5, $6, $7)', [course_quality, course_relevance, course_navigation, course_comprehension, recommended, suggestions]);
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
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
