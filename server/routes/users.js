import express from 'express'
import userController from '../controllers/userController'
import isAuth from '../middlewares/isAuth'

const router = express.Router()

router.get('/populate', userController.populateUsers)
router.get('/all', isAuth(false), userController.getAllUsers)

export default router