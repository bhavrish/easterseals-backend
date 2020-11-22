"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = require("../controllers/UsersController");
const CoursesController_1 = require("../controllers/CoursesController");
const router = express_1.Router();
// user-related endpoints
router.get('/users', UsersController_1.getUsers); // get all users
router.get('/users/:id', UsersController_1.getUser); // get specific user
router.post('/users/signup', UsersController_1.createUser); // register user
router.post('/users/login', UsersController_1.signInUser); // register user
router.put('/users/:id', UsersController_1.updateUser); // update user
router.delete('/users/:id', UsersController_1.deleteUser); // delete user
// course-related endpoints
router.get('/courses', CoursesController_1.getCourses); // get all courses
router.get('/courses/:id', CoursesController_1.getCourse); // get specific course
router.post('/courses', CoursesController_1.createCourse); // create course
router.put('/courses/:id', CoursesController_1.updateCourse); // update course
router.delete('/courses/:id', CoursesController_1.deleteCourse); // delete course
exports.default = router;
