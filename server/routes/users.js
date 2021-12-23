import express from 'express'
import userController from '../controllers/userController'
import auth from '../middlewares/isAuth'

const router = express.Router()

router.get('/populate', userController.populateUsers)
router.get('/all', auth.isAuth, userController.getAllUsers)

export default router