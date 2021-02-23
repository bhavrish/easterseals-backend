"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = require("../controllers/UsersController");
const CoursesController_1 = require("../controllers/CoursesController");
const FeedbackControllers_1 = require("../controllers/FeedbackControllers");
const router = express_1.Router();
// user-related endpoints
router.get('/users', UsersController_1.getUsers); // get all users (ADMIN FUNCTION)
router.get('/users/:id', UsersController_1.getUser); // get specific user (ADMIN FUNCTION)
router.post('/users/signup', UsersController_1.createUser); // register user (USER FUNCTION)
router.post('/users/login', UsersController_1.signInUser); // log in user (USER FUNCTION)
router.put('/users/:id', UsersController_1.updateUser); // update user details (USER FUNCTION)
router.delete('/users/:id', UsersController_1.deleteUser); // delete user (USER/ ADMIN FUNCTION)
// course-related endpoints
router.get('/courses/:id', CoursesController_1.getCourse); // get specific course (USER FUNCTION)
router.post('/courses', CoursesController_1.createCoursePage); // create new course page (ADMIN FUNCTION)
router.put('/courses', CoursesController_1.updatePageNumber); // update progress in specific course (USER FUNCTION)
router.delete('/courses/:id', CoursesController_1.deleteCourse); // delete course (ADMIN FUNCTION)
// feedback-related endpoints
router.get('/feedback', FeedbackControllers_1.getFeedback); // get feedback for all courses (ADMIN FUNCTION)
router.post('/feedback', FeedbackControllers_1.postFeedback); // post new feedback about course (USER FUNCTION)
exports.default = router;
