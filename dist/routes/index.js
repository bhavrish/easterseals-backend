"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = require("../controllers/UsersController");
const FeedbackController_1 = require("../controllers/FeedbackController");
const GradesController_1 = require("../controllers/GradesController");
const router = express_1.Router();
router.get('/', (req, res) => { res.json({ backend_status: "running" }); });
// user-related endpoints
router.get('/users', UsersController_1.getUsers); // get all users (ADMIN FUNCTION)
router.get('/users/:userID', UsersController_1.getUser); // get specific user (ADMIN FUNCTION)
router.post('/users/signup', UsersController_1.createUser); // register user (USER FUNCTION)
router.post('/users/login', UsersController_1.signInUser); // log in user (USER FUNCTION)
router.put('/users/:userID', UsersController_1.updateUser); // update user details (USER FUNCTION)
router.delete('/users/:userID', UsersController_1.deleteUser); // delete user (USER/ ADMIN FUNCTION)
// feedback-related endpoints
router.get('/feedback', FeedbackController_1.getAllFeedback); // get feedback for all courses (ADMIN FUNCTION)
router.get('/feedback/:courseID', FeedbackController_1.getCourseFeedback); // get feedback for specific course (ADMIN FUNCTION)
router.post('/feedback', FeedbackController_1.postFeedback); // post new feedback about course (USER FUNCTION)
// grade-related endpoints
router.get('/grades', GradesController_1.getAllGrades); // get all grades (ADMIN FUNCTION)
router.get('/grades/user/:userID', GradesController_1.getUserGrades); // get grades for specific user (USER/ ADMIN FUNCTION)
router.get('/grades/:id', GradesController_1.getCourseGrades); // get grades for specific course (ADMIN FUNCTION)
router.post('/grades', GradesController_1.uploadGrade); // upload new grade for a course (USER FUNCTION)
exports.default = router;
