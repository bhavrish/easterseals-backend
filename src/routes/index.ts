import {Router} from 'express'
import {getUsers, getUser, createUser, signInUser, updateUser, deleteUser} from '../controllers/UsersController'
import {getCourse, createCoursePage, updatePageNumber, deleteCourse} from '../controllers/CoursesController'
import {getFeedback, postFeedback} from '../controllers/FeedbackControllers'

const router = Router();

// user-related endpoints
router.get('/users', getUsers) // get all users (ADMIN FUNCTION)
router.get('/users/:id', getUser) // get specific user (ADMIN FUNCTION)
router.post('/users/signup', createUser) // register user (USER FUNCTION)
router.post('/users/login', signInUser) // log in user (USER FUNCTION)
router.put('/users/:id', updateUser) // update user details (USER FUNCTION)
router.delete('/users/:id', deleteUser) // delete user (USER/ ADMIN FUNCTION)

// course-related endpoints
router.get('/courses/:id', getCourse) // get specific course (USER FUNCTION)
router.post('/courses', createCoursePage) // create new course page (ADMIN FUNCTION)
router.put('/courses', updatePageNumber) // update progress in specific course (USER FUNCTION)
router.delete('/courses/:id', deleteCourse) // delete course (ADMIN FUNCTION)

// feedback-related endpoints
router.get('/feedback', getFeedback) // get feedback for all courses (ADMIN FUNCTION)
router.post('/feedback', postFeedback) // post new feedback about course (USER FUNCTION)

export default router;