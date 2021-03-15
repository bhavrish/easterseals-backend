import {Router} from 'express'
import {getUsers, getUser, createUser, signInUser, updateUser, deleteUser} from '../controllers/UsersController'
import {getAllFeedback, getCourseFeedback, postFeedback} from '../controllers/FeedbackController'
import {getAllGrades, getUserGrades, getCourseGrades, uploadGrade} from '../controllers/GradesController'

const router = Router();

router.get('/', (req, res) => { res.json({ backend_status : "running" }); });

// user-related endpoints
router.get('/users', getUsers) // get all users (ADMIN FUNCTION)
router.get('/users/:userID', getUser) // get specific user (ADMIN FUNCTION)
router.post('/users/signup', createUser) // register user (USER FUNCTION)
router.post('/users/login', signInUser) // log in user (USER FUNCTION)
router.put('/users/:userID', updateUser) // update user details (USER FUNCTION)
router.delete('/users/:userID', deleteUser) // delete user (USER/ ADMIN FUNCTION)

// feedback-related endpoints
router.get('/feedback', getAllFeedback) // get feedback for all courses (ADMIN FUNCTION)
router.get('/feedback/:courseID', getCourseFeedback) // get feedback for specific course (ADMIN FUNCTION)
router.post('/feedback', postFeedback) // post new feedback about course (USER FUNCTION)

// grade-related endpoints
router.get('/grades', getAllGrades) // get all grades (ADMIN FUNCTION)
router.get('/grades/user/:userID', getUserGrades) // get grades for specific user (USER/ ADMIN FUNCTION)
router.get('/grades/:id', getCourseGrades) // get grades for specific course (ADMIN FUNCTION)
router.post('/grades', uploadGrade) // upload new grade for a course (USER FUNCTION)

export default router;