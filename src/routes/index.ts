import {Router} from 'express'
import {getUsers, getUser, createUser, signInUser, updateUser, deleteUser} from '../controllers/UsersController'
import {getCourses, getCourse, createCourse, updateCourse, deleteCourse} from '../controllers/CoursesController'

const router = Router();

// user-related endpoints
router.get('/users', getUsers) // get all users
router.get('/users/:id', getUser) // get specific user
router.post('/users/signup', createUser) // register user
router.post('/users/login', signInUser) // register user
router.put('/users/:id', updateUser) // update user
router.delete('/users/:id', deleteUser) // delete user

// course-related endpoints
router.get('/courses', getCourses) // get all courses
router.get('/courses/:id', getCourse) // get specific course
router.post('/courses', createCourse) // create course
router.put('/courses/:id', updateCourse) // update course
router.delete('/courses/:id', deleteCourse) // delete course

export default router;