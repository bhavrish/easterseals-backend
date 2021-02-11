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
exports.deleteCourse = exports.updatePageNumber = exports.createCoursePage = exports.getCourse = void 0;
const database_1 = require("../database");
// get specific course (USER FUNCTION)
exports.getCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = parseInt(req.params.name);
    const userID = parseInt(req.body.userID);
    try {
        const pageQueryString = name + "_current_page";
        const currentPage = yield database_1.pool.query('SELECT $1 FROM courses_grades WHERE users.id = $2;', [pageQueryString, userID]);
        const response = yield database_1.pool.query('Select * FROM courses_content WHERE courseName = $1 AND pageNumber >= $2', [name, currentPage]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
// create new course page (ADMIN FUNCTION)
exports.createCoursePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseName, pageTitle, pageNumber, pageType, content, choices, correctAnswer } = req.body;
    try {
        yield database_1.pool.query('INSERT INTO courses_content (courseName, pageTitle, pageNumber, pageType, content, choices, correctAnswer) VALUES ($1, $2, $3, $4, $5, $6, $7)', [courseName, pageTitle, pageNumber, pageType, content, choices, correctAnswer]);
        return res.json({
            message: 'Course page created succesfully',
            body: {
                course: {
                    courseName,
                    pageTitle,
                    pageNumber,
                    pageType,
                    content,
                    choices,
                    correctAnswer
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
// update progress in specific course (USER FUNCTION)
exports.updatePageNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, userID, page } = req.body;
    try {
        const pageQueryString = name + "_current_page";
        yield database_1.pool.query('UPDATE courses_content SET $1 = $2 WHERE id = $3', [pageQueryString, page, userID]);
        return res.json('Course ${id} updated succesfully');
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
// delete course (ADMIN FUNCTION)
exports.deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield database_1.pool.query('DELETE FROM courses_content WHERE id = $1', [id]);
        return res.json('Course ${id} deleted succesfully');
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
